import type { ComponentProps, ReactNode } from 'react'
import { TrackedLink } from '@/src/components/tracked-link'
import { cn } from '@/src/lib/utils'

/**
 * The one-line nudge that closes a section: a question, then an inline link
 * ("Recognize yourself in one of these? The free audit shows where to
 * start."). Each clause is an inline-block, so on narrow screens the line
 * breaks between the question and the link instead of orphaning a word.
 */
export function ClosingLine({
  lead,
  linkText,
  href = '/audit',
  location,
  after,
  className,
}: {
  /** The question before the link. */
  lead: ReactNode
  linkText: ReactNode
  href?: ComponentProps<typeof TrackedLink>['href']
  /** Analytics location for the link. */
  location: string
  /** Text right after the link, e.g. '.' or ', free.' */
  after?: ReactNode
  className?: string
}) {
  return (
    <p className={cn('text-base text-balance text-text-muted', className)}>
      <span className='inline-block'>{lead}</span>{' '}
      <span className='inline-block'>
        <TrackedLink
          href={href}
          location={location}
          className='font-semibold text-accent underline decoration-accent-subtle underline-offset-4 transition-colors hover:text-accent/80'
        >
          {linkText}
        </TrackedLink>
        {after}
      </span>
    </p>
  )
}
