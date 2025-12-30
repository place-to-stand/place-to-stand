'use client'

import type { ComponentProps } from 'react'
import { cn } from '@/src/lib/utils'

interface AnimatedSectionProps extends ComponentProps<'section'> {
  id?: string
}

export function AnimatedSection({
  className,
  children,
  id,
  ...props
}: AnimatedSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'motion-safe:animate-fade-down mx-auto w-full max-w-6xl px-6 py-40 opacity-0 motion-reduce:opacity-100 md:py-28',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
