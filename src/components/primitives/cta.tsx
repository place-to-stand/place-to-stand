import type { MouseEventHandler } from 'react'
import { Button } from '@/src/components/primitives/button'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { cn } from '@/src/lib/utils'

/**
 * The site's calls to action, defined once so the header, hero and closing
 * band can't drift apart:
 * - Primary: always the lime "Book a call" button. It goes to the calendar on
 *   /contact (#call), which sits on the page itself. The header may use the
 *   small size; everywhere else is lg.
 * - Secondary: always a quiet text link, never a button: "Take the free
 *   audit ->" (an action link with the arrow, like "See the platform ->") or
 *   "send us a note" (the Contact message form).
 */
export const CTA = {
  book: {
    label: 'Book a call',
    href: '/contact#call',
    /** Google Calendar booking page: the plain-link fallback under the
     *  calendar embedded on Contact. */
    calendarUrl: 'https://calendar.app.google/TTpbuVRzDy5m4GwF8',
  },
  audit: { label: 'Take the free audit', href: '/audit' },
  note: { label: 'send us a note', href: '/contact#message' },
} as const

export function BookCallButton({
  location,
  size = 'lg',
  className,
  onClick,
  ...data
}: {
  /** Analytics location, e.g. 'hero' or 'home-cta-block'. */
  location: string
  size?: 'sm' | 'lg'
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  'data-pts-hero-cta'?: boolean
}) {
  return (
    <Button asChild size={size} className={className}>
      <TrackedLink
        href={CTA.book.href}
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
      <span className='link-label'>{CTA.audit.label}</span>
      <span aria-hidden>&rarr;</span>
    </TrackedLink>
  )
}

/** The "send us a note" link to the Contact message form. */
export function NoteLink({
  location,
  className,
}: {
  location: string
  className?: string
}) {
  return (
    <TrackedLink
      href={CTA.note.href}
      location={location}
      className={cn('link-action', className)}
    >
      {CTA.note.label}
    </TrackedLink>
  )
}

/**
 * The primary call to action as one unit: the "Book a call" button with
 * "or …" centered under it: the free audit, or a note through the Contact
 * form (the closing bands). Used wherever the two appear together, so the
 * second line always sits centered on the button itself, even when another
 * button stands beside it.
 */
export function BookCallGroup({
  location,
  className,
  buttonClassName,
  secondary = 'audit',
  ...data
}: {
  location: string
  className?: string
  buttonClassName?: string
  /** The line under the button: the free audit, a note, or none (when a
   *  second button stands beside it instead). */
  secondary?: 'audit' | 'note' | 'none'
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
          button text, "or" muted and the link in the normal link color. The
          negative right margin cancels the letter-spacing after the last
          letter, so the line centers on its ink, not its box. */}
      {secondary !== 'none' && (
        <p className='-mr-[0.1em] font-mono text-xs tracking-[0.1em] text-text-muted uppercase'>
          or{' '}
          {secondary === 'note' ? (
            <NoteLink location={location} />
          ) : (
            <AuditLink location={location} />
          )}
        </p>
      )}
    </div>
  )
}
