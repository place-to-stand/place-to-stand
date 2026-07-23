/**
 * Turn raw audit answers into readable question/answer pairs, grouped by section.
 *
 * Shared by the internal team email (HTML template + plain-text fallback) so the
 * team can review every response, not just the scored result. Option IDs are
 * resolved to their human labels via the QUESTIONS definitions.
 */
import { QUESTIONS, SECTIONS } from '@/src/lib/audit/questions'
import type { AuditAnswers, AuditQuestion } from '@/src/lib/audit/types'

export interface AnswerItem {
  prompt: string
  answer: string
}

export interface AnswerGroup {
  section: string
  items: AnswerItem[]
}

const NO_ANSWER = 'No answer'

function displayAnswer(
  question: AuditQuestion,
  value: AuditAnswers[string] | undefined
): string {
  if (question.type === 'text') {
    const text = typeof value === 'string' ? value.trim() : ''
    return text || NO_ANSWER
  }

  const ids = Array.isArray(value) ? value : value ? [value] : []
  if (ids.length === 0) return NO_ANSWER

  return ids
    .map(id => question.options?.find(option => option.id === id)?.label ?? id)
    .join(', ')
}

/** Every question with its answer, grouped by section, in definition order. */
export function summarizeAnswers(answers: AuditAnswers): AnswerGroup[] {
  return SECTIONS.map(section => ({
    section: section.title,
    items: QUESTIONS.filter(q => q.sectionId === section.id).map(q => ({
      prompt: q.prompt,
      answer: displayAnswer(q, answers[q.id]),
    })),
  })).filter(group => group.items.length > 0)
}
