import * as React from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[160px] w-full border border-control bg-bg-card p-grid-half text-base text-text transition placeholder:text-text-muted disabled:cursor-not-allowed disabled:border-border disabled:text-text-muted',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
