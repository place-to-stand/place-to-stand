'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { AuditProgress } from '@/src/components/audit/audit-progress'
import { QuestionField } from '@/src/components/audit/question-field'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { questionsForSection, SECTIONS } from '@/src/lib/audit/questions'
import { isAnswered } from '@/src/lib/audit/validation'
import type { AnswerValue, AuditAnswers } from '@/src/lib/audit/types'

interface AuditWizardProps {
  answers: AuditAnswers
  isScoring: boolean
  /** Where to open, non-zero when resuming a stored session. */
  initialStepIndex?: number
  onAnswer: (questionId: string, value: AnswerValue) => void
  onStepComplete: (stepIndex: number) => void
  onSubmit: () => void
  onExit: () => void
}

/** Long enough to see the selection land, short enough to feel instant. */
const AUTO_ADVANCE_MS = 280

/** Every question in worksheet order, for the "Question N of M" counter. */
const ALL_QUESTIONS = SECTIONS.flatMap(s => questionsForSection(s.id))

/**
 * The guided worksheet, one question per screen.
 *
 * Sections still drive progress, the `audit_step_*` events and the portal's
 * step pushes, so those stay comparable with earlier data. Within a section
 * the visitor sees a single question at a time, and a single-choice tap moves
 * on by itself: on a phone, two stacked questions put the Continue button
 * several screens below the first tap, which is where most people left.
 */
export function AuditWizard({
  answers,
  isScoring,
  initialStepIndex = 0,
  onAnswer,
  onStepComplete,
  onSubmit,
  onExit,
}: AuditWizardProps) {
  const posthog = usePostHog()
  const initialStep = Math.min(
    Math.max(initialStepIndex, 0),
    SECTIONS.length - 1
  )
  const [stepIndex, setStepIndex] = useState(initialStep)
  // Resuming lands on the first unanswered question of the stored section.
  const [questionIndex, setQuestionIndex] = useState(() =>
    Math.max(
      questionsForSection(SECTIONS[initialStep].id).findIndex(
        q => !isAnswered(q, answers)
      ),
      0
    )
  )
  const [showError, setShowError] = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const questionRef = useRef<HTMLDivElement>(null)

  const section = SECTIONS[stepIndex]
  const questions = useMemo(() => questionsForSection(section.id), [section.id])
  const question = questions[questionIndex]
  const isLastInSection = questionIndex === questions.length - 1
  const isLastStep = stepIndex === SECTIONS.length - 1
  const questionNumber = ALL_QUESTIONS.indexOf(question) + 1

  const cancelAutoAdvance = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    advanceTimer.current = null
  }

  useEffect(() => cancelAutoAdvance, [])

  // Each question remounts (see the keyed wrapper), which destroys whatever
  // had focus. Hand focus to the new question so keyboard and screen-reader
  // users continue from it instead of the top of the page. Compared against
  // the last focused id rather than skipped on mount, which Strict Mode's
  // double effect would defeat.
  const focusedQuestionRef = useRef(question.id)
  useEffect(() => {
    if (focusedQuestionRef.current === question.id) return
    focusedQuestionRef.current = question.id
    questionRef.current?.focus()
  }, [question.id])

  useEffect(() => {
    posthog?.capture('audit_step_viewed', {
      step: stepIndex + 1,
      section: SECTIONS[stepIndex].id,
    })
  }, [stepIndex, posthog])

  useEffect(() => {
    posthog?.capture('audit_question_viewed', {
      question_id: question.id,
      question_number: questionNumber,
      step: stepIndex + 1,
    })
  }, [question.id, questionNumber, stepIndex, posthog])

  /**
   * Moves past the current question. `answered` is passed in rather than read
   * from props because an auto-advance fires before the new answer has
   * re-rendered through.
   */
  const advance = (answered: boolean) => {
    cancelAutoAdvance()
    if (question.required && !answered) {
      setShowError(true)
      return
    }
    setShowError(false)

    if (!isLastInSection) {
      setQuestionIndex(i => i + 1)
      return
    }

    posthog?.capture('audit_step_completed', {
      step: stepIndex + 1,
      section: section.id,
    })
    onStepComplete(stepIndex)
    if (isLastStep) {
      // `submit` ignores re-entry itself, so a stray second advance is safe.
      onSubmit()
    } else {
      setStepIndex(i => i + 1)
      setQuestionIndex(0)
    }
  }

  const handleAnswer = (value: AnswerValue) => {
    // Answers are frozen while the blueprint is being built.
    if (isScoring) return
    onAnswer(question.id, value)
    setShowError(false)
    if (question.type === 'single') {
      cancelAutoAdvance()
      advanceTimer.current = setTimeout(() => advance(true), AUTO_ADVANCE_MS)
    }
  }

  const goBack = () => {
    cancelAutoAdvance()
    setShowError(false)
    if (questionIndex > 0) {
      setQuestionIndex(i => i - 1)
    } else if (stepIndex > 0) {
      const previous = questionsForSection(SECTIONS[stepIndex - 1].id)
      setStepIndex(i => i - 1)
      setQuestionIndex(previous.length - 1)
    } else {
      onExit()
    }
  }

  const isFirstQuestion = stepIndex === 0 && questionIndex === 0
  const isFinalQuestion = isLastStep && isLastInSection
  // Multi-selects never auto-advance (there is no "done" signal), so the
  // button carries the count to make clear the next move is the visitor's.
  const current = answers[question.id]
  const selectedCount =
    question.type === 'multi' && Array.isArray(current) ? current.length : 0

  return (
    <div className='mx-auto max-w-2xl py-grid-2'>
      <AuditProgress
        label={`Question ${questionNumber} of ${ALL_QUESTIONS.length}`}
        title={section.title}
        segmentIndex={stepIndex}
        segmentFill={questionIndex / questions.length}
      />

      <div className='relative border border-border p-6 sm:p-8'>
        <BlueprintCorners size={16} />
        {/* Keyed so each question mounts fresh and fades in. */}
        <div
          key={question.id}
          ref={questionRef}
          tabIndex={-1}
          className='duration-300 animate-in outline-none fade-in slide-in-from-right-2 motion-reduce:animate-none'
        >
          <QuestionField
            question={question}
            value={answers[question.id]}
            onChange={handleAnswer}
            size='lg'
          />
        </div>

        {showError && (
          <p className='mt-6 border border-accent/30 bg-accent-muted px-4 py-2 text-sm text-text'>
            Pick an answer to continue.
          </p>
        )}
      </div>

      <div className='mt-6 flex items-center justify-between'>
        <Button
          type='button'
          variant='ghost'
          onClick={goBack}
          disabled={isScoring}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          {isFirstQuestion ? 'Back to start' : 'Back'}
        </Button>

        <Button
          type='button'
          onClick={() => advance(isAnswered(question, answers))}
          disabled={isScoring}
        >
          {isScoring ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Analyzing...
            </>
          ) : isFinalQuestion ? (
            <>
              Build my blueprint
              <ArrowRight className='ml-2 h-4 w-4' />
            </>
          ) : (
            <>
              Continue
              {selectedCount > 0 && (
                <span className='ml-1.5 font-normal'>
                  &middot; {selectedCount} selected
                </span>
              )}
              <ArrowRight className='ml-2 h-4 w-4' />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
