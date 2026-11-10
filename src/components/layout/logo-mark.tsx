'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/src/lib/utils'

/**
 * The Place To Stand mark: an outline square with a solid square inside. On
 * pointer enter or keyboard focus (of the mark, or of the link around it,
 * class `logo-link`) the inner square spins a half turn clockwise and the
 * outline a half turn anticlockwise a beat later, each overshooting a
 * little before it settles. A square looks the same after a half turn, so
 * the spin
 * always plays to the end: leaving early doesn't snap it back, and hovering
 * again mid-spin doesn't restart it. Keyframes live in globals.css
 * (.logo-mark.is-spinning).
 */
export function LogoMark() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const mark = ref.current
    if (!mark) return
    const trigger = mark.closest<HTMLElement>('.logo-link') ?? mark
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const spin = (event: Event) => {
      if (reduced.matches || mark.classList.contains('is-spinning')) return
      if (event.type === 'focus' && !trigger.matches(':focus-visible')) return
      mark.classList.add('is-spinning')
    }
    // Both end together; the outline's end clears the spin.
    const done = (event: AnimationEvent) => {
      if (event.target === mark) mark.classList.remove('is-spinning')
    }

    trigger.addEventListener('pointerenter', spin)
    trigger.addEventListener('focus', spin)
    mark.addEventListener('animationend', done)
    return () => {
      trigger.removeEventListener('pointerenter', spin)
      trigger.removeEventListener('focus', spin)
      mark.removeEventListener('animationend', done)
    }
  }, [])

  return (
    <span
      ref={ref}
      aria-hidden
      className='logo-mark inline-flex h-6 w-6 items-center justify-center border border-accent-subtle'
    >
      <span className='logo-mark-inner h-2 w-2 bg-accent' />
    </span>
  )
}

/**
 * The logo lockup: mark + name, used everywhere the two appear together
 * (header, footer). The whole lockup triggers the spin. With `href` it is a
 * link and the name turns lime on hover; without, it's a plain lockup that
 * still spins when hovered.
 */
export function LogoLockup({
  href,
  className,
}: {
  href?: '/'
  className?: string
}) {
  const content = (
    <>
      <LogoMark />
      <span
        className={cn(
          // eslint-disable-next-line design/no-raw-text-size -- the wordmark is part of the logo, not a type role
          'font-headline text-xl font-bold tracking-tight text-text',
          href && 'transition-colors group-hover:text-accent'
        )}
      >
        Place To Stand
      </span>
    </>
  )
  const classes = cn('logo-link group flex items-center gap-3', className)
  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  )
}
