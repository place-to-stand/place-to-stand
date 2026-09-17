/**
 * Turn raw audit answers into readable question/answer pairs.
 *
 * `describeAnswers` is the low-level view: every question in definition order,
 * carrying both the raw option ids and their resolved human labels. The portal
 * payload uses it so the receiving side needs no copy of the question set,
 * which is also what lets the portal render the team email's transcript.
 */
import { QUESTIONS } from '@/src/lib/audit/questions'
import type {
  AnswerValue,
  AuditAnswers,
  AuditQuestion,
  QuestionType,
} from '@/src/lib/audit/types'

/** One question and its answer, in both machine and human form. */
export interface DescribedAnswer {
  questionId: string
  sectionId: string
  prompt: string
  type: QuestionType
  /** Raw option id(s) or free text. Null when the question is unanswered. */
  value: AnswerValue | null
  /** Human-readable labels for the selected options. Empty when unanswered. */
  labels: string[]
}

/** Selected option ids as an array, regardless of single vs multi. */
function selectedIds(value: AnswerValue | undefined): string[] {
  if (Array.isArray(value)) return value
  return value ? [value] : []
}

function resolveLabels(
  question: AuditQuestion,
  value: AnswerValue | undefined
): string[] {
  if (question.type === 'text') {
    const text = typeof value === 'string' ? value.trim() : ''
    return text ? [text] : []
  }

  return selectedIds(value).map(
    id => question.options?.find(option => option.id === id)?.label ?? id
  )
}

/**
 * Every question with its raw value and resolved labels, in definition order.
 * Unanswered questions are included with `value: null` so a partial audit has
 * the same shape as a completed one.
 */
export function describeAnswers(answers: AuditAnswers): DescribedAnswer[] {
  return QUESTIONS.map(question => {
    const raw = answers[question.id]
    const labels = resolveLabels(question, raw)

    return {
      questionId: question.id,
      sectionId: question.sectionId,
      prompt: question.prompt,
      type: question.type,
      value: labels.length > 0 ? (raw ?? null) : null,
      labels,
    }
  })
}
