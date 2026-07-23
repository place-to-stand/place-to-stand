'use client'

import { useCallback, useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import { runAudit } from '@/src/lib/audit/engine'
import type {
  AnswerValue,
  AuditAnswers,
  AuditResult,
} from '@/src/lib/audit/types'

export type AuditStage = 'intro' | 'wizard' | 'results'

export interface UseAudit {
  stage: AuditStage
  answers: AuditAnswers
  result: AuditResult | null
  isScoring: boolean
  setAnswer: (questionId: string, value: AnswerValue) => void
  start: () => void
  submit: () => Promise<void>
  reset: () => void
}

/**
 * Owns the audit's client state: the answers, which stage of the flow we're in,
 * and the scored result. Scoring goes through `runAudit`, which is async today
 * only so a future Claude-backed engine drops in without touching this hook.
 */
export function useAudit(): UseAudit {
  const posthog = usePostHog()
  const [stage, setStage] = useState<AuditStage>('intro')
  const [answers, setAnswers] = useState<AuditAnswers>({})
  const [result, setResult] = useState<AuditResult | null>(null)
  const [isScoring, setIsScoring] = useState(false)

  const setAnswer = useCallback((questionId: string, value: AnswerValue) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }, [])

  const start = useCallback(() => {
    setAnswers({})
    setResult(null)
    setStage('wizard')
    posthog?.capture('audit_started')
  }, [posthog])

  const submit = useCallback(async () => {
    setIsScoring(true)
    try {
      const scored = await runAudit(answers)
      setResult(scored)
      setStage('results')
      posthog?.capture('audit_completed', {
        phase: scored.phase.id,
        top_service: scored.recommendations[0]?.service.id,
      })
    } finally {
      setIsScoring(false)
    }
  }, [answers, posthog])

  const reset = useCallback(() => {
    setAnswers({})
    setResult(null)
    setStage('intro')
  }, [])

  return {
    stage,
    answers,
    result,
    isScoring,
    setAnswer,
    start,
    submit,
    reset,
  }
}
