'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { QuestionField } from '@/src/components/audit/question-field'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { questionsForSection, SECTIONS } from '@/src/lib/audit/questions'
import { isSectionComplete } from '@/src/lib/audit/validation'
import { cn } from '@/src/lib/utils'
import type { AnswerValue, AuditAnswers } from '@/src/lib/audit/types'

interface AuditWizardProps {
  answers: AuditAnswers
  isScoring: boolean
  onAnswer: (questionId: string, value: AnswerValue) => void
  onSubmit: () => void
  onExit: () => void
}

/** The guided, section-by-section worksheet. */
export function AuditWizard({
  answers,
  isScoring,
  onAnswer,
  onSubmit,
  onExit,
}: AuditWizardProps) {
  const posthog = usePostHog()
  const [stepIndex, setStepIndex] = useState(0)
  const [showErrors, setShowErrors] = useState(false)

  const section = SECTIONS[stepIndex]
  const questions = useMemo(() => questionsForSection(section.id), [section.id])
  const isLastStep = stepIndex === SECTIONS.length - 1
  const sectionComplete = isSectionComplete(section.id, answers)

  useEffect(() => {
    posthog?.capture('audit_step_viewed', {
      step: stepIndex + 1,
      section: SECTIONS[stepIndex].id,
    })
  }, [stepIndex, posthog])

  const goNext = () => {
    if (!sectionComplete) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    posthog?.capture('audit_step_completed', {
      step: stepIndex + 1,
      section: section.id,
    })
    if (isLastStep) {
      onSubmit()
    } else {
      setStepIndex(i => i + 1)
    }
  }

  const goBack = () => {
    setShowErrors(false)
    if (stepIndex === 0) {
      onExit()
    } else {
      setStepIndex(i => i - 1)
    }
  }

  return (
    <div className='mx-auto max-w-2xl py-grid-2'>
      {/* Progress */}
      <div className='mb-8'>
        <div className='flex items-center justify-between font-mono text-xs tracking-[0.15em] text-text-muted uppercase'>
          <span>
            Step {stepIndex + 1} of {SECTIONS.length}
          </span>
          <span className='text-accent'>{section.title}</span>
        </div>
        <div className='mt-2 flex gap-1.5'>
          {SECTIONS.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                'h-1.5 flex-1 transition-colors',
                i <= stepIndex ? 'bg-accent' : 'bg-border'
              )}
            />
          ))}
        </div>
      </div>

      <div className='relative border border-border p-6 sm:p-8'>
        <BlueprintCorners size={16} />
        <h2 className='font-headline text-2xl font-semibold tracking-tight text-text uppercase'>
          {section.title}
        </h2>
        <p className='mt-1 text-sm text-text-muted'>{section.subtitle}</p>

        <div className='mt-8 space-y-8'>
          {questions.map(question => (
            <QuestionField
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={value => onAnswer(question.id, value)}
            />
          ))}
        </div>

        {showErrors && !sectionComplete && (
          <p className='mt-6 border border-accent/30 bg-accent-muted px-4 py-2 text-sm text-text'>
            Please answer the required questions (marked
            <span className='mx-1 text-accent'>*</span>) before continuing.
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
          {stepIndex === 0 ? 'Back to start' : 'Back'}
        </Button>

        <Button type='button' onClick={goNext} disabled={isScoring}>
          {isScoring ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Analyzing...
            </>
          ) : isLastStep ? (
            <>
              See my results
              <ArrowRight className='ml-2 h-4 w-4' />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className='ml-2 h-4 w-4' />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
