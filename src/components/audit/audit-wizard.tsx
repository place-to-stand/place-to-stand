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
  const [stepIndex, setStepIndex] = useState(() =>
    Math.min(Math.max(initialStepIndex, 0), SECTIONS.length - 1)
  )
  // Resuming lands on the first unanswered question of the stored section.
  const [questionIndex, setQuestionIndex] = useState(() => {
    const resumed = questionsForSection(
      SECTIONS[Math.min(Math.max(initialStepIndex, 0), SECTIONS.length - 1)].id
    )
    return Math.max(
      resumed.findIndex(q => !isAnswered(q, answers)),
      0
    )
  })
  const [showError, setShowError] = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Set once the last answer submits. A second tap on the final question
  // during scoring would otherwise schedule a second submit.
  const submittedRef = useRef(false)

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

  // A successful submit unmounts the wizard. Still being here once scoring
  // stops means it failed, so let the visitor try again.
  useEffect(() => {
    if (!isScoring) submittedRef.current = false
  }, [isScoring])

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
    if (submittedRef.current) return
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
      submittedRef.current = true
      onSubmit()
    } else {
      setStepIndex(i => i + 1)
      setQuestionIndex(0)
    }
  }

  const handleAnswer = (value: AnswerValue) => {
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
          className='duration-300 animate-in fade-in slide-in-from-right-2 motion-reduce:animate-none'
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
