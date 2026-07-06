/**
 * Domain types for the Opportunity Audit.
 *
 * The audit is a voluntary worksheet: a business answers a series of questions,
 * and a scoring engine maps those answers to (a) the phase of business they are
 * in and (b) the custom-software opportunities most likely to move the needle.
 *
 * These types are intentionally engine-agnostic. Today the answers are scored by
 * a deterministic rule-based engine (see `engine.ts`). Later, the same
 * `AuditAnswers` can be handed to a Claude agent that returns an `AuditResult`.
 */

/** The five phases a business can land in, ordered by maturity. */
export type PhaseId =
  | 'foundation'
  | 'launch'
  | 'growth'
  | 'optimization'
  | 'transformation'

/** The custom-software opportunity areas the agency can deliver. */
export type ServiceId =
  | 'workflow-automation'
  | 'internal-tools'
  | 'customer-portal'
  | 'data-integration'
  | 'custom-crm'
  | 'ecommerce'
  | 'mobile-app'
  | 'ai-solutions'
  | 'analytics-bi'
  | 'legacy-modernization'

export type QuestionType = 'single' | 'multi' | 'text'

/** A selectable answer option, with the scoring weight it contributes. */
export interface AuditOption {
  id: string
  label: string
  description?: string
  /** Points this option adds toward each business phase. */
  phaseWeights?: Partial<Record<PhaseId, number>>
  /** Points this option adds toward each opportunity recommendation. */
  serviceWeights?: Partial<Record<ServiceId, number>>
}

export interface AuditSection {
  id: string
  title: string
  subtitle: string
}

export interface AuditQuestion {
  id: string
  sectionId: string
  type: QuestionType
  prompt: string
  helper?: string
  required?: boolean
  /** Present for `single` and `multi` questions. */
  options?: AuditOption[]
  /** Present for `text` questions. */
  placeholder?: string
}

/** `single`/`text` answers are a string; `multi` answers are a string[]. */
export type AnswerValue = string | string[]
export type AuditAnswers = Record<string, AnswerValue>

export interface PhaseDefinition {
  id: PhaseId
  name: string
  tagline: string
  description: string
  /** Plain-language signals that indicate a business is in this phase. */
  signals: string[]
  /** What the agency typically recommends as a next step in this phase. */
  nextSteps: string[]
}

export interface ServiceDefinition {
  id: ServiceId
  name: string
  tagline: string
  description: string
  /** Name of a lucide-react icon. */
  icon: string
}

export interface ServiceRecommendation {
  service: ServiceDefinition
  score: number
  /** Human-readable answer labels that drove this recommendation. */
  reasons: string[]
}

export interface AuditResult {
  phase: PhaseDefinition
  phaseScores: Record<PhaseId, number>
  recommendations: ServiceRecommendation[]
  summary: string
  /** Which engine produced the result, so the UI can label it honestly. */
  generatedBy: 'rules' | 'ai'
}
