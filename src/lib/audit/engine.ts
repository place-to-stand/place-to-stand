import type {
  AuditAnswers,
  AuditResult,
  PhaseId,
  ServiceId,
  ServiceRecommendation,
} from './types'
import { PHASES, PHASE_ORDER } from './phases'
import { QUESTIONS } from './questions'
import { SERVICES } from './services'

/**
 * An audit engine turns a set of answers into a result. The rule-based engine
 * below is the default. Swapping in a Claude-powered engine later means
 * implementing this same signature and pointing `runAudit` at it, nothing in
 * the UI has to change.
 */
export type AuditEngine = (answers: AuditAnswers) => Promise<AuditResult>

/** Max number of opportunity recommendations to surface. */
const MAX_RECOMMENDATIONS = 4

function emptyPhaseScores(): Record<PhaseId, number> {
  return {
    foundation: 0,
    launch: 0,
    growth: 0,
    optimization: 0,
    transformation: 0,
  }
}

/** Normalize any answer into the list of selected option ids it represents. */
function selectedOptionIds(value: AuditAnswers[string] | undefined): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

/**
 * Deterministic, transparent scoring. Walks every answered option, accumulates
 * its phase and service weights, then picks the leading phase and the top few
 * opportunities, each annotated with the answers that drove it.
 */
export function runRuleBasedAudit(answers: AuditAnswers): AuditResult {
  const phaseScores = emptyPhaseScores()
  const serviceScores = new Map<ServiceId, number>()
  // Track which answer labels contributed to each service, for explainability.
  const serviceReasons = new Map<ServiceId, string[]>()

  for (const question of QUESTIONS) {
    if (!question.options) continue
    const selected = selectedOptionIds(answers[question.id])

    for (const optionId of selected) {
      const option = question.options.find(o => o.id === optionId)
      if (!option) continue

      for (const [phase, weight] of Object.entries(option.phaseWeights ?? {})) {
        phaseScores[phase as PhaseId] += weight ?? 0
      }

      for (const [service, weight] of Object.entries(
        option.serviceWeights ?? {}
      )) {
        const id = service as ServiceId
        const points = weight ?? 0
        serviceScores.set(id, (serviceScores.get(id) ?? 0) + points)
        if (points > 0) {
          const reasons = serviceReasons.get(id) ?? []
          reasons.push(option.label)
          serviceReasons.set(id, reasons)
        }
      }
    }
  }

  const phaseId = leadingPhase(phaseScores)
  const phase = PHASES[phaseId]
  const recommendations = topRecommendations(serviceScores, serviceReasons)
  const summary = buildSummary(phase.name, recommendations)

  return {
    phase,
    phaseScores,
    recommendations,
    summary,
    generatedBy: 'rules',
  }
}

/** Highest-scoring phase; ties break toward the more mature phase. */
function leadingPhase(scores: Record<PhaseId, number>): PhaseId {
  let best: PhaseId = 'foundation'
  let bestScore = -Infinity

  for (const phase of PHASE_ORDER) {
    const score = scores[phase]
    // `>=` plus maturity-ordered iteration means later (more mature) phases win
    // ties, a deliberate, predictable tie-break.
    if (score >= bestScore) {
      bestScore = score
      best = phase
    }
  }
  return best
}

function topRecommendations(
  serviceScores: Map<ServiceId, number>,
  serviceReasons: Map<ServiceId, string[]>
): ServiceRecommendation[] {
  return [...serviceScores.entries()]
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_RECOMMENDATIONS)
    .map(([serviceId, score]) => ({
      service: SERVICES[serviceId],
      score,
      // De-duplicate contributing answers and keep the top three.
      reasons: [...new Set(serviceReasons.get(serviceId) ?? [])].slice(0, 3),
    }))
}

function buildSummary(
  phaseName: string,
  recommendations: ServiceRecommendation[]
): string {
  if (recommendations.length === 0) {
    return `You're in the ${phaseName} phase. Let's talk about where software could help.`
  }

  const names = recommendations.slice(0, 2).map(r => r.service.name)
  const list = names.length === 1 ? names[0] : `${names[0]} and ${names[1]}`

  return `You're in the ${phaseName} phase. Best place to start: ${list}.`
}

/**
 * The engine the app uses today. Async on purpose: a future Claude-backed
 * engine will be async, and keeping the signature stable now means the UI never
 * needs to change when we swap the implementation.
 */
export const runAudit: AuditEngine = async answers => runRuleBasedAudit(answers)
