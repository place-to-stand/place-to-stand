'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { usePostHog } from 'posthog-js/react'
import { runAudit } from '@/src/lib/audit/engine'
import { SECTIONS } from '@/src/lib/audit/questions'
import {
  buildAuditProgressPayload,
  type AuditLeadPayload,
  type AuditTrigger,
} from '@/src/lib/audit/progress-payload'
import {
  createAuditSession,
  getAuditSessionServerSnapshot,
  getAuditSessionSnapshot,
  isResultRecoverable,
  isResumable,
  setAuditSession,
  subscribeToAuditSession,
  type AuditSession,
  type AuditStatus,
} from '@/src/lib/audit/session'
import { toast } from '@/src/components/ui/use-toast'
import { sendAuditProgress } from '@/src/lib/audit/track-progress'
import type {
  AnswerValue,
  AuditAnswers,
  AuditResult,
} from '@/src/lib/audit/types'

export type AuditStage = 'intro' | 'wizard' | 'results'

/** Stable identity so consumers do not see a new object every render. */
const EMPTY_ANSWERS: AuditAnswers = {}

export interface UseAudit {
  stage: AuditStage
  answers: AuditAnswers
  result: AuditResult | null
  isScoring: boolean
  /** Wizard step to open on, non-zero when resuming a stored session. */
  initialStepIndex: number
  sessionId: string | null
  setAnswer: (questionId: string, value: AnswerValue) => void
  start: () => void
  completeStep: (stepIndex: number) => void
  submit: () => Promise<void>
  markCaptured: (lead: AuditLeadPayload) => void
  reset: () => void
}

/**
 * Owns the audit's client state: the answers, which stage of the flow we're in,
 * and the scored result. Scoring goes through `runAudit`, which is async today
 * only so a future Claude-backed engine drops in without touching this hook.
 *
 * The session (see `lib/audit/session.ts`) is the single source of truth for
 * answers. It is mirrored to localStorage on every change so a refresh resumes,
 * and pushed to the portal at each section boundary so partial audits are
 * captured rather than lost. Every push is best-effort and never blocks the UI.
 */
export function useAudit(): UseAudit {
  const posthog = usePostHog()
  const session = useSyncExternalStore(
    subscribeToAuditSession,
    getAuditSessionSnapshot,
    getAuditSessionServerSnapshot
  )

  // Null means "wherever the stored session says". Once the visitor acts, this
  // takes over. Deriving the stage rather than storing it is what lets a resumed
  // session land straight in the wizard without a state update after hydration.
  const [chosenStage, setChosenStage] = useState<AuditStage | null>(null)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [isScoring, setIsScoring] = useState(false)

  // A completed session outranks a resumable one: someone who finished and then
  // lost the page (a crash, a closed tab) should land back on their results,
  // not be asked to take the audit again.
  const stage: AuditStage =
    chosenStage ??
    (isResultRecoverable(session)
      ? 'results'
      : isResumable(session)
        ? 'wizard'
        : 'intro')

  const completedAtRef = useRef<string | null>(null)
  /** True when answers changed since the last push, so pagehide can skip. */
  const dirtyRef = useRef(false)

  const push = useCallback(
    (args: {
      session: AuditSession
      status: AuditStatus
      trigger: AuditTrigger
      result?: AuditResult | null
      lead?: AuditLeadPayload | null
      beacon?: boolean
    }) => {
      sendAuditProgress(
        buildAuditProgressPayload({
          session: args.session,
          status: args.status,
          trigger: args.trigger,
          result: args.result ?? null,
          lead: args.lead ?? null,
          completedAt: completedAtRef.current,
        }),
        { beacon: args.beacon }
      )
    },
    []
  )

  /** Apply a change to the session, stamp it, persist it, and return it. */
  const commit = useCallback(
    (updater: (prev: AuditSession) => AuditSession): AuditSession | null => {
      const prev = getAuditSessionSnapshot()
      if (!prev) return null

      const next: AuditSession = {
        ...updater(prev),
        updatedAt: new Date().toISOString(),
      }
      setAuditSession(next)
      return next
    },
    []
  )

  // Report a resume once, reading the store directly so this never depends on
  // render state. The ref keeps it to a single event even as PostHog attaches.
  const resumeReportedRef = useRef(false)
  useEffect(() => {
    if (resumeReportedRef.current) return

    const stored = getAuditSessionSnapshot()
    if (!isResumable(stored) || !stored) return

    resumeReportedRef.current = true
    posthog?.capture('audit_resumed', {
      step: Math.min(stored.stepIndex, SECTIONS.length - 1) + 1,
      answers_count: Object.keys(stored.answers).length,
    })
  }, [posthog])

  // Rebuild the result for a session that was already scored but whose result is
  // no longer in memory. `runAudit` is pure over the stored answers, so this is
  // exact, not an approximation. Deliberately has no cleanup flag: under
  // `reactStrictMode` the effect runs twice, and a `cancelled` flag combined
  // with the ref guard would permanently swallow the only in-flight restore.
  const restoreAttemptedRef = useRef(false)
  useEffect(() => {
    if (restoreAttemptedRef.current || result) return

    const stored = getAuditSessionSnapshot()
    if (!isResultRecoverable(stored) || !stored) return

    restoreAttemptedRef.current = true
    void runAudit(stored.answers)
      .then(scored => {
        setResult(scored)
        completedAtRef.current = stored.updatedAt
        posthog?.capture('audit_results_restored', {
          phase: scored.phase.id,
          answers_count: Object.keys(stored.answers).length,
        })
      })
      .catch(() => {
        // Scored once but unscoreable now. Send them somewhere usable rather
        // than leaving the results stage empty forever.
        setChosenStage('intro')
        toast({
          variant: 'destructive',
          title: 'We could not rebuild your results',
          description: 'Your answers are saved. Start the audit to see them.',
        })
      })
  }, [result, posthog])

  const setAnswer = useCallback(
    (questionId: string, value: AnswerValue) => {
      commit(prev => ({
        ...prev,
        answers: { ...prev.answers, [questionId]: value },
      }))
      dirtyRef.current = true
      posthog?.capture('audit_answer_selected', {
        question_id: questionId,
        value,
      })
    },
    [commit, posthog]
  )

  const start = useCallback(() => {
    const stored = getAuditSessionSnapshot()

    // Never mint a second session on top of answers we could still use. This is
    // reachable when a scored session failed to rebuild: without the reopen the
    // visitor's answers would be overwritten and the portal would gain a
    // duplicate row for the same attempt. `reset()` still nulls the session, so
    // a deliberate "Start over" continues to yield a genuinely fresh id.
    if (stored && Object.keys(stored.answers).length > 0) {
      const reopened = commit(prev => ({ ...prev, status: 'in_progress' }))

      setResult(null)
      completedAtRef.current = null
      dirtyRef.current = false
      setChosenStage('wizard')

      posthog?.capture('audit_started', { reopened: true })
      if (reopened) {
        push({ session: reopened, status: 'in_progress', trigger: 'started' })
      }
      return
    }

    const fresh = createAuditSession()
    setAuditSession(fresh)

    setResult(null)
    completedAtRef.current = null
    dirtyRef.current = false
    // A fresh session is never resumable, so pin the stage explicitly.
    setChosenStage('wizard')

    posthog?.capture('audit_started')
    push({ session: fresh, status: 'in_progress', trigger: 'started' })
  }, [posthog, push, commit])

  const completeStep = useCallback(
    (stepIndex: number) => {
      const next = commit(prev => ({
        ...prev,
        // Track the furthest point reached, so stepping back and forward again
        // never loses ground.
        stepIndex: Math.min(
          Math.max(prev.stepIndex, stepIndex + 1),
          SECTIONS.length - 1
        ),
      }))
      if (!next) return

      dirtyRef.current = false
      push({ session: next, status: 'in_progress', trigger: 'step_completed' })
    },
    [commit, push]
  )

  const submit = useCallback(async () => {
    setIsScoring(true)
    try {
      const scored = await runAudit(getAuditSessionSnapshot()?.answers ?? {})
      setResult(scored)
      setChosenStage('results')
      posthog?.capture('audit_completed', {
        phase: scored.phase.id,
        top_service: scored.recommendations[0]?.service.id,
      })

      completedAtRef.current = new Date().toISOString()
      const next = commit(prev => ({ ...prev, status: 'completed' }))
      dirtyRef.current = false
      if (next) {
        push({
          session: next,
          status: 'completed',
          trigger: 'scored',
          result: scored,
        })
      }
    } finally {
      setIsScoring(false)
    }
  }, [posthog, commit, push])

  const markCaptured = useCallback(
    (lead: AuditLeadPayload) => {
      const next = commit(prev => ({ ...prev, status: 'captured' }))
      if (!next) return

      push({
        session: next,
        status: 'captured',
        trigger: 'captured',
        result,
        lead,
      })
    },
    [commit, push, result]
  )

  const reset = useCallback(() => {
    const current = getAuditSessionSnapshot()

    if (stage === 'wizard' && current) {
      posthog?.capture('audit_abandoned', {
        answers_count: Object.keys(current.answers).length,
      })
      // Stamped at send time, not reused from the last commit: `updatedAt` is
      // the portal's ordering key and a repeat value risks being treated as
      // stale against the push that already carried it.
      push({
        session: { ...current, updatedAt: new Date().toISOString() },
        status: 'abandoned',
        trigger: 'abandoned',
      })
    }

    setAuditSession(null)
    setResult(null)
    completedAtRef.current = null
    dirtyRef.current = false
    setChosenStage('intro')
  }, [stage, posthog, push])

  // Catch the mid-section drop-off that no other trigger sees. Reported as
  // `in_progress`, not `abandoned`: a tab switch is indistinguishable from a
  // close, so the portal infers abandonment from staleness instead.
  useEffect(() => {
    if (stage !== 'wizard') return

    const handlePageHide = () => {
      const current = getAuditSessionSnapshot()
      if (!current || !dirtyRef.current) return

      dirtyRef.current = false
      push({
        session: { ...current, updatedAt: new Date().toISOString() },
        status: 'in_progress',
        trigger: 'pagehide',
        beacon: true,
      })
    }

    window.addEventListener('pagehide', handlePageHide)
    return () => window.removeEventListener('pagehide', handlePageHide)
  }, [stage, push])

  return {
    stage,
    answers: session?.answers ?? EMPTY_ANSWERS,
    result,
    isScoring,
    initialStepIndex: Math.min(session?.stepIndex ?? 0, SECTIONS.length - 1),
    sessionId: session?.sessionId ?? null,
    setAnswer,
    start,
    completeStep,
    submit,
    markCaptured,
    reset,
  }
}
