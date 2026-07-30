/**
 * Builds the payload the marketing site sends to the portal for every audit
 * attempt, finished or not.
 *
 * This is the authoritative shape of the contract. The portal upserts on
 * `sessionId`, so the same attempt can be pushed repeatedly as it progresses.
 * Keep this file and the portal's intake schema in step: see
 * `docs/prds/005-form-submissions/README.md`.
 *
 * Pure and side-effect free apart from reading PostHog ids off the browser
 * client via `readSubmissionAnalytics`, which yields nulls rather than throwing
 * when PostHog is disabled (as it is in local dev).
 */
import { QUESTIONS, SECTIONS } from '@/src/lib/audit/questions'
import { describeAnswers } from '@/src/lib/audit/summarize-answers'
import { readSubmissionAnalytics } from '@/src/lib/forms/context'
import type {
  SubmissionAnalytics,
  SubmissionAttribution,
  SubmissionClientInfo,
} from '@/src/lib/forms/context'
import type { AuditSession, AuditStatus } from '@/src/lib/audit/session'
import type {
  AuditResult,
  PhaseId,
  QuestionType,
  ServiceId,
} from '@/src/lib/audit/types'

export const AUDIT_SOURCE_DETAIL = 'https://placetostandagency.com/audit'

export type { AuditStatus }

/** Why this particular push happened. */
export type AuditTrigger =
  | 'started'
  | 'step_completed'
  | 'scored'
  | 'captured'
  | 'abandoned'
  | 'pagehide'

export interface AuditResponseItem {
  questionId: string
  sectionId: string
  prompt: string
  type: QuestionType
  value: string | string[] | null
  labels: string[]
}

export interface AuditProgressSummary {
  furthestStepIndex: number
  stepsTotal: number
  answeredCount: number
  questionsTotal: number
  percentComplete: number
  durationMs: number
}

export interface AuditResultPayload {
  phaseId: PhaseId
  phaseName: string
  summary: string
  generatedBy: 'rules' | 'ai'
  phaseScores: Record<PhaseId, number>
  recommendations: Array<{
    serviceId: ServiceId
    serviceName: string
    score: number
    reasons: string[]
  }>
}

export interface AuditLeadPayload {
  name: string
  email: string
  company: string | null
  marketingConsent: boolean
}

export interface AuditProgressPayload {
  sessionId: string
  status: AuditStatus
  trigger: AuditTrigger
  sourceDetail: string
  startedAt: string
  updatedAt: string
  completedAt: string | null
  progress: AuditProgressSummary
  responses: AuditResponseItem[]
  result: AuditResultPayload | null
  lead: AuditLeadPayload | null
  analytics: SubmissionAnalytics
  attribution: SubmissionAttribution
  client: SubmissionClientInfo & { userAgent: string | null }
}

interface BuildArgs {
  /** The session as it stands right now, answers and step included. */
  session: AuditSession
  status: AuditStatus
  trigger: AuditTrigger
  result?: AuditResult | null
  lead?: AuditLeadPayload | null
  completedAt?: string | null
}

function toResultPayload(result: AuditResult): AuditResultPayload {
  return {
    phaseId: result.phase.id,
    phaseName: result.phase.name,
    summary: result.summary,
    generatedBy: result.generatedBy,
    phaseScores: result.phaseScores,
    recommendations: result.recommendations.map(rec => ({
      serviceId: rec.service.id,
      serviceName: rec.service.name,
      score: rec.score,
      reasons: rec.reasons,
    })),
  }
}

export function buildAuditProgressPayload({
  session,
  status,
  trigger,
  result = null,
  lead = null,
  completedAt = null,
}: BuildArgs): AuditProgressPayload {
  const responses = describeAnswers(session.answers)
  const answeredCount = responses.filter(item => item.labels.length > 0).length
  const questionsTotal = QUESTIONS.length

  const startedMs = new Date(session.startedAt).getTime()
  const updatedMs = new Date(session.updatedAt).getTime()
  const durationMs =
    Number.isFinite(startedMs) && Number.isFinite(updatedMs)
      ? Math.max(0, updatedMs - startedMs)
      : 0

  return {
    sessionId: session.sessionId,
    status,
    trigger,
    sourceDetail: AUDIT_SOURCE_DETAIL,
    startedAt: session.startedAt,
    updatedAt: session.updatedAt,
    completedAt,
    progress: {
      furthestStepIndex: session.stepIndex,
      stepsTotal: SECTIONS.length,
      answeredCount,
      questionsTotal,
      percentComplete:
        questionsTotal > 0
          ? Math.round((answeredCount / questionsTotal) * 100)
          : 0,
      durationMs,
    },
    responses,
    result: result ? toResultPayload(result) : null,
    lead,
    analytics: readSubmissionAnalytics(),
    attribution: session.context.attribution,
    // `userAgent` is filled in server-side by the API route, which reads the
    // request header rather than trusting the client.
    client: { ...session.context.client, userAgent: null },
  }
}
