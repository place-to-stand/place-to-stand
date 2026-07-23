import * as React from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full border border-border bg-bg-card px-5 text-base text-text transition placeholder:text-text-muted focus-visible:ring-1 focus-visible:ring-accent/40 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
