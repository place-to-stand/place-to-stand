import type { AuditAnswers, AuditQuestion } from './types'
import { questionsForSection } from './questions'

/** True when a required question has a usable answer. */
export function isAnswered(
  question: AuditQuestion,
  answers: AuditAnswers
): boolean {
  const value = answers[question.id]
  if (question.type === 'multi') {
    return Array.isArray(value) && value.length > 0
  }
  return typeof value === 'string' && value.trim().length > 0
}

/** Required questions in a section that are still unanswered. */
export function missingRequired(
  sectionId: string,
  answers: AuditAnswers
): AuditQuestion[] {
  return questionsForSection(sectionId).filter(
    q => q.required && !isAnswered(q, answers)
  )
}

/** Whether every required question in a section is answered. */
export function isSectionComplete(
  sectionId: string,
  answers: AuditAnswers
): boolean {
  return missingRequired(sectionId, answers).length === 0
}
