import * as React from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[160px] w-full border border-border bg-bg-card px-5 py-4 text-base text-text transition placeholder:text-text-muted focus-visible:ring-1 focus-visible:ring-accent/40 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
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
