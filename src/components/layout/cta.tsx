import type { MouseEventHandler } from 'react'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'
import { cn } from '@/src/lib/utils'

/**
 * The site's two calls to action, defined once so the header, hero and
 * closing band can't drift apart:
 * - Primary: always the lime "Book a call" button. It goes to /contact, which
 *   sells the meeting first; only the Contact page opens the Google booking
 *   page itself (pass `toCalendar`). The header may use the small size;
 *   everywhere else is lg.
 * - Secondary: always the quiet "Take the free audit" text link, never a
 *   button.
 */
export const CTA = {
  book: {
    label: 'Book a call',
    href: '/contact',
    /** Google Calendar booking page. Linked from the Contact page only. */
    calendarUrl: 'https://calendar.app.google/TTpbuVRzDy5m4GwF8',
  },
  audit: { label: 'Take the free audit', href: '/audit' },
} as const

export function BookCallButton({
  location,
  size = 'lg',
  className,
  onClick,
  toCalendar = false,
  ...data
}: {
  /** Analytics location, e.g. 'hero' or 'home-cta-block'. */
  location: string
  /** Open the Google booking page in a new tab (Contact page only). */
  toCalendar?: boolean
  size?: 'sm' | 'lg'
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  'data-pts-hero-cta'?: boolean
}) {
  return (
    <Button asChild size={size} className={className}>
      <TrackedLink
        href={toCalendar ? CTA.book.calendarUrl : CTA.book.href}
        {...(toCalendar
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        location={location}
        onClick={onClick}
        {...data}
      >
        {CTA.book.label}
      </TrackedLink>
    </Button>
  )
}

export function AuditLink({
  location,
  className,
  onClick,
}: {
  location: string
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <TrackedLink
      href={CTA.audit.href}
      location={location}
      onClick={onClick}
      className={cn('link-action', className)}
    >
      {CTA.audit.label}
    </TrackedLink>
  )
}

/**
 * The primary call to action as one unit: the "Book a call" button with
 * "or Take the free audit" centred under it. Used wherever the two appear
 * together (hero, closing bands), so the audit line always sits centred on
 * the button itself, even when another button stands beside it.
 */
export function BookCallGroup({
  location,
  className,
  buttonClassName,
  ...data
}: {
  location: string
  className?: string
  buttonClassName?: string
  'data-pts-hero-cta'?: boolean
}) {
  return (
    <div className={cn('flex flex-col items-center gap-grid-1', className)}>
      <BookCallButton
        location={location}
        className={buttonClassName}
        {...data}
      />
      {/* One label style for the whole line: mono caps at 12px under the
          button text, "or" muted and the link in the normal link colour. The
          negative right margin cancels the letter-spacing after the last
          letter, so the line centres on its ink, not its box. */}
      <p className='-mr-[0.1em] font-mono text-xs tracking-[0.1em] text-text-muted uppercase'>
        or <AuditLink location={location} />
      </p>
    </div>
  )
}
