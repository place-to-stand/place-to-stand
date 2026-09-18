'use client'

import { useState } from 'react'
import { Check, ThumbsDown, ThumbsUp } from 'lucide-react'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { Label } from '@/src/components/ui/label'
import { Textarea } from '@/src/components/ui/textarea'
import { cn } from '@/src/lib/utils'

const COMMENT_MAX_LENGTH = 2000

export interface AuditFeedback {
  helpful: boolean | null
  comment: string | null
}

interface FeedbackCardProps {
  /** Called when the visitor votes or sends a comment. UI-only for now. */
  onSubmit?: (feedback: AuditFeedback) => void
}

/**
 * Two optional questions at the foot of the results page: a yes/no on whether
 * the result was useful, and a free-text comment. Voting is one tap; the
 * comment has its own send button so a vote is never held hostage to typing.
 */
export function FeedbackCard({ onSubmit }: FeedbackCardProps) {
  const [helpful, setHelpful] = useState<boolean | null>(null)
  const [comment, setComment] = useState('')
  const [isSent, setIsSent] = useState(false)

  const vote = (value: boolean) => {
    const next = helpful === value ? null : value
    setHelpful(next)
    onSubmit?.({ helpful: next, comment: comment.trim() || null })
  }

  const send = () => {
    onSubmit?.({ helpful, comment: comment.trim() || null })
    setIsSent(true)
  }

  return (
    <section className='relative mt-grid-1 border border-border bg-bg-panel p-6 sm:p-8'>
      <BlueprintCorners size={12} colorClassName='border-border-light' />

      {isSent ? (
        <div className='flex flex-col items-center gap-2 text-center'>
          <span className='flex h-8 w-8 items-center justify-center bg-accent-muted text-accent'>
            <Check className='h-4 w-4' strokeWidth={3} />
          </span>
          <h2 className='font-headline text-lg font-semibold tracking-tight text-text uppercase'>
            Thanks for the feedback
          </h2>
          <p className='max-w-md text-sm text-balance text-text-muted'>
            It helps us make the audit more useful for the next person.
          </p>
        </div>
      ) : (
        <div className='mx-auto flex max-w-md flex-col gap-5'>
          <div>
            <p className='font-mono text-xs tracking-[0.15em] text-text-muted uppercase'>
              Quick question
            </p>
            <h2 className='mt-2 font-headline text-lg font-semibold tracking-tight text-text uppercase'>
              Did you find these results helpful?
            </h2>
            <p className='mt-2 text-sm text-text-muted'>
              We are always refining the audit to serve meaningful information.
              Your feedback is greatly appreciated!
            </p>
          </div>

          <div
            role='group'
            aria-label='Did you find these results helpful?'
            className='grid grid-cols-2 gap-2'
          >
            <VoteButton
              label='Yes'
              icon={ThumbsUp}
              selected={helpful === true}
              onClick={() => vote(true)}
            />
            <VoteButton
              label='No'
              icon={ThumbsDown}
              selected={helpful === false}
              onClick={() => vote(false)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='audit-feedback-comment'>
              Any feedback? (optional)
            </Label>
            <Textarea
              id='audit-feedback-comment'
              rows={3}
              maxLength={COMMENT_MAX_LENGTH}
              className='min-h-24 p-3'
              placeholder='What was useful, what was missing, or what you expected to see.'
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>

          <Button
            type='button'
            variant='outline'
            size='lg'
            onClick={send}
            disabled={helpful === null && comment.trim().length === 0}
            className='w-full px-8'
          >
            Send feedback
          </Button>
        </div>
      )}
    </section>
  )
}

interface VoteButtonProps {
  label: string
  icon: typeof ThumbsUp
  selected: boolean
  onClick: () => void
}

function VoteButton({ label, icon: Icon, selected, onClick }: VoteButtonProps) {
  return (
    <button
      type='button'
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 border px-4 py-3 text-sm font-medium transition',
        selected
          ? 'border-accent bg-accent-muted text-text'
          : 'border-border bg-bg-card text-text hover:border-border-light hover:bg-bg-elevated'
      )}
    >
      <Icon
        className={cn('h-4 w-4', selected ? 'text-accent' : 'text-text-muted')}
      />
      {label}
    </button>
  )
}
