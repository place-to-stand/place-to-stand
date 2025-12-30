import * as React from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[160px] w-full rounded-3xl border border-ink bg-white/25 px-5 py-4 text-base text-ink shadow-sm backdrop-blur transition placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50',
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
