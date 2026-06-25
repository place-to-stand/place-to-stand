import * as React from 'react'
import { cn } from '@/src/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline'
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variant === 'default' && 'bg-accent-muted text-accent',
        variant === 'outline' && 'border border-border text-text-muted',
        className
      )}
      {...props}
    />
  )
}
