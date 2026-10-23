'use client'

import { useEffect, useRef, useState } from 'react'
import { clients, logoToneClass, type Client } from '@/src/lib/clients'
import {
  LOGO_SLOTS,
  VISIBLE_SLOTS,
  SWAP_INTERVAL_MS,
  SWAP_FADE_MS,
  SCAN_IN_MS,
  FIRST_SWAP_DELAY_MS,
  nextSwap,
} from './client-logo-wall-utils'

/**
 * The homepage logo grid. It opens on the first `LOGO_SLOTS` clients (the
 * list in src/lib/clients.ts is ordered biggest names first), then every few
 * seconds blurs one logo away and scans in a client that isn't showing, so the
 * whole roster gets seen without a second row of logos.
 *
 * Phones show three rows of two; from 576px it is two rows of three, then
 * four from 800px and five from 1280px. Cell height (and so logo size) is a
 * fixed share of the cell's width, up to 72px, so logos fill their cells the
 * same way at every column count; the gaps follow the window width;
 * wide logos are also held to their cell's width. The extra cells are hidden
 * with CSS, and swaps only touch the
 * cells that show, so the whole roster still comes round at every width.
 *
 * Swaps stop while the grid is off screen, while the tab is hidden, and for
 * anyone who asks for reduced motion.
 */
export function ClientLogoWall() {
  const [shown, setShown] = useState(() => initialSlots())
  const [fading, setFading] = useState<number | null>(null)
  // The cell scanning in right now. It is cleared once the scan-in ends:
  // left on, the animation would replay whenever a hidden cell is shown again
  // (resizing across a breakpoint), which looked like several swaps at once.
  // Nothing scans in on the first render, so it doesn't play on top of the
  // section's own reveal.
  const [entering, setEntering] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const shownRef = useRef(shown)
  const lastSlot = useRef<number | null>(null)
  // The cell being hovered or focused; it never swaps out from under someone.
  const held = useRef<number | null>(null)

  useEffect(() => {
    if (clients.length <= LOGO_SLOTS) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let visible = false
    // Time of the next swap; set when the grid first scrolls into view.
    let nextAt: number | null = null
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && nextAt === null) nextAt = Date.now() + FIRST_SWAP_DELAY_MS
    })
    if (ref.current) observer.observe(ref.current)

    let fadeTimer: ReturnType<typeof setTimeout> | undefined
    let scanTimer: ReturnType<typeof setTimeout> | undefined
    const tick = setInterval(() => {
      if (!visible || document.hidden || nextAt === null) return
      if (Date.now() < nextAt) return
      nextAt = Date.now() + SWAP_INTERVAL_MS
      const showing = visibleSlots()
      // A cell that just went out of view (window narrowed) can't be the
      // "last swapped" one any more.
      if (lastSlot.current !== null && lastSlot.current >= showing)
        lastSlot.current = null
      const swap = nextSwap(
        shownRef.current.slice(0, showing),
        clients.length,
        lastSlot.current,
        held.current
      )
      lastSlot.current = swap.slot
      setFading(swap.slot)
      fadeTimer = setTimeout(() => {
        const next = [...shownRef.current]
        // The incoming client may sit in a hidden cell; hand that cell the
        // outgoing client so no logo shows twice if the window widens.
        const hiddenAt = next.indexOf(swap.client)
        if (hiddenAt !== -1) next[hiddenAt] = next[swap.slot]
        next[swap.slot] = swap.client
        shownRef.current = next
        setShown(next)
        setEntering(swap.slot)
        setFading(null)
        scanTimer = setTimeout(() => setEntering(null), SCAN_IN_MS)
      }, SWAP_FADE_MS)
    }, 1000)

    return () => {
      clearInterval(tick)
      clearTimeout(fadeTimer)
      clearTimeout(scanTimer)
      observer.disconnect()
    }
  }, [])

  return (
    // Three rows of two on phones, two rows above that; cells that don't fit
    // are hidden (see slotVisibility). Both gaps follow the window width:
    // columns 6.5vw (24px to 48px), rows 3vw (12px to 48px).
    // Only the column count changes at breakpoints.
    <div
      ref={ref}
      className='grid grid-cols-2 gap-x-[clamp(1.5rem,6.5vw,3rem)] gap-y-[clamp(0.75rem,3vw,3rem)] min-[36rem]:grid-cols-3 min-[50rem]:grid-cols-4 min-[80rem]:grid-cols-5'
    >
      {shown.map((index, slot) => (
        <LogoCell
          key={slot}
          className={slotVisibility(slot)}
          client={clients[index]}
          leaving={fading === slot}
          entering={entering === slot}
          onHold={() => (held.current = slot)}
          onRelease={() => {
            if (held.current === slot) held.current = null
          }}
        />
      ))}
    </div>
  )
}

/** Hides the cells that don't fit: 6 show on phones and at three across,
 * then 8 and 10. */
function slotVisibility(slot: number): string {
  if (slot >= VISIBLE_SLOTS.wideTablet) return 'hidden min-[80rem]:flex'
  if (slot >= VISIBLE_SLOTS.tablet) return 'hidden min-[50rem]:flex'
  return ''
}

/** How many cells show at the current width (matches `slotVisibility`). */
function visibleSlots(): number {
  if (window.matchMedia('(min-width: 80rem)').matches)
    return VISIBLE_SLOTS.laptop
  if (window.matchMedia('(min-width: 50rem)').matches)
    return VISIBLE_SLOTS.wideTablet
  if (window.matchMedia('(min-width: 36rem)').matches)
    return VISIBLE_SLOTS.tablet
  return VISIBLE_SLOTS.phone
}

function initialSlots(): number[] {
  return Array.from(
    { length: Math.min(LOGO_SLOTS, clients.length) },
    (_, i) => i
  )
}

function LogoCell({
  className,
  client,
  leaving,
  entering,
  onHold,
  onRelease,
}: {
  className?: string
  client: Client
  leaving: boolean
  entering: boolean
  onHold: () => void
  onRelease: () => void
}) {
  return (
    <a
      href={client.href}
      target='_blank'
      rel='noreferrer noopener'
      aria-label={`Visit ${client.title} (opens in a new tab)`}
      onPointerEnter={onHold}
      onPointerLeave={onRelease}
      onFocus={onHold}
      onBlur={onRelease}
      className={`group @container relative flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/30 ${className ?? ''}`}
    >
      {/* Keyed by client so a swap remounts it and replays the scan-in. Its
          height is 36% of the cell's width (cqw), up to 72px, so logos keep
          the same share of their cell whatever the column count. */}
      <span
        key={client.title}
        style={{ transitionDuration: `${SWAP_FADE_MS}ms` }}
        className={`flex h-[min(4.5rem,36cqw)] w-full items-center justify-center transition-[opacity,filter,transform] ease-out ${
          leaving ? 'logo-swap-out' : 'opacity-80 group-hover:opacity-100'
        } ${entering ? 'logo-swap-in' : ''}`}
      >
        {/* Plain <img>: static, already-optimised local assets, and next/image
            would need dangerouslyAllowSVG for the vector marks. */}
        <span
          className={`logo-hover flex h-full w-full items-center justify-center`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={client.logo}
            alt={`${client.title} logo`}
            decoding='async'
            style={{
              maxHeight: `${(client.logoScale ?? 1) * 100}%`,
              transform: client.logoNudge
                ? `translateY(${client.logoNudge}%)`
                : undefined,
            }}
            className={`w-auto max-w-full object-contain ${logoToneClass(client)}`}
          />
        </span>
      </span>
      {entering && (
        <span
          key={`${client.title}-line`}
          aria-hidden
          className='logo-swap-line pointer-events-none absolute top-1/4 h-1/2 w-px bg-accent'
        />
      )}
    </a>
  )
}
