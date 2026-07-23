'use client'

import { Check } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { Textarea } from '@/src/components/ui/textarea'
import type { AnswerValue, AuditQuestion } from '@/src/lib/audit/types'

interface QuestionFieldProps {
  question: AuditQuestion
  value: AnswerValue | undefined
  onChange: (value: AnswerValue) => void
}

/** Renders one worksheet question as single-select, multi-select, or free text. */
export function QuestionField({
  question,
  value,
  onChange,
}: QuestionFieldProps) {
  return (
    <fieldset className='space-y-3'>
      <legend className='font-headline text-base font-semibold tracking-tight text-text uppercase'>
        {question.prompt}
        {question.required && <span className='ml-1 text-accent'>*</span>}
      </legend>
      {question.helper && (
        <p className='-mt-1 text-sm text-text-muted'>{question.helper}</p>
      )}

      {question.type === 'text' ? (
        <Textarea
          value={typeof value === 'string' ? value : ''}
          onChange={e => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
        />
      ) : (
        <div className='grid gap-2 sm:grid-cols-2'>
          {question.options?.map(option => {
            const selected = isSelected(question, value, option.id)
            return (
              <button
                key={option.id}
                type='button'
                aria-pressed={selected}
                onClick={() => onChange(nextValue(question, value, option.id))}
                className={cn(
                  'group flex items-start gap-3 border px-4 py-3 text-left transition',
                  selected
                    ? 'border-accent bg-accent-muted'
                    : 'border-border bg-bg-card hover:border-border-light hover:bg-bg-elevated'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition',
                    question.type === 'multi' ? 'rounded-none' : 'rounded-full',
                    selected
                      ? 'border-accent bg-accent text-bg'
                      : 'border-border-light bg-bg text-transparent'
                  )}
                >
                  <Check className='h-3.5 w-3.5' strokeWidth={3} />
                </span>
                <span className='space-y-0.5'>
                  <span className='block text-sm font-medium text-text'>
                    {option.label}
                  </span>
                  {option.description && (
                    <span className='block text-xs text-text-muted'>
                      {option.description}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </fieldset>
  )
}

function isSelected(
  question: AuditQuestion,
  value: AnswerValue | undefined,
  optionId: string
): boolean {
  if (question.type === 'multi') {
    return Array.isArray(value) && value.includes(optionId)
  }
  return value === optionId
}

/** Compute the next answer value when an option is toggled. */
function nextValue(
  question: AuditQuestion,
  value: AnswerValue | undefined,
  optionId: string
): AnswerValue {
  if (question.type !== 'multi') return optionId

  const current = Array.isArray(value) ? value : []
  return current.includes(optionId)
    ? current.filter(id => id !== optionId)
    : [...current, optionId]
}
