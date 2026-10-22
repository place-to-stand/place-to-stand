'use client'

import { useEffect, useRef, useState } from 'react'
import { clients, logoToneClass, type Client } from '@/src/lib/clients'
import {
  LOGO_SLOTS,
  VISIBLE_SLOTS,
  SWAP_INTERVAL_MS,
  SWAP_FADE_MS,
  FIRST_SWAP_DELAY_MS,
  nextSwap,
} from './client-logo-wall-utils'

/**
 * The homepage logo grid. It opens on the first `LOGO_SLOTS` clients (the
 * list in src/lib/clients.ts is ordered biggest names first), then every few
 * seconds blurs one logo away and scans in a client that isn't showing, so the
 * whole roster gets seen without a second row of logos.
 *
 * It always shows two rows: two across on phones, three from 576px, four
 * from 736px, five on laptops. Cell height (and so logo size) follows the window width, from 44px
 * up to 72px, so it changes smoothly instead of jumping at each breakpoint;
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
  // Cells that have swapped at least once; only these play the scan-in, so
  // the first render doesn't animate on top of the section's own reveal.
  const [swapped, setSwapped] = useState<ReadonlySet<number>>(new Set())
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
        setSwapped(prev => new Set(prev).add(swap.slot))
        setFading(null)
      }, SWAP_FADE_MS)
    }, 1000)

    return () => {
      clearInterval(tick)
      clearTimeout(fadeTimer)
      observer.disconnect()
    }
  }, [])

  return (
    // Two rows at every width; cells past the second row are hidden (see
    // slotVisibility). Phones halve the row gap.
    <div
      ref={ref}
      className='grid grid-cols-2 gap-x-grid-2 gap-y-grid-1 min-[36rem]:grid-cols-3 min-[46rem]:grid-cols-4 lg:grid-cols-5 lg:gap-grid-2'
    >
      {shown.map((index, slot) => (
        <LogoCell
          key={slot}
          className={slotVisibility(slot)}
          align={slot % 2 === 0 ? 'end' : 'start'}
          client={clients[index]}
          leaving={fading === slot}
          entering={swapped.has(slot)}
          onHold={() => (held.current = slot)}
          onRelease={() => {
            if (held.current === slot) held.current = null
          }}
        />
      ))}
    </div>
  )
}

/** Hides the cells past the second row: 4 on phones, then 6, 8 and 10. */
function slotVisibility(slot: number): string {
  if (slot >= VISIBLE_SLOTS.wideTablet) return 'hidden lg:flex'
  if (slot >= VISIBLE_SLOTS.tablet) return 'hidden min-[46rem]:flex'
  if (slot >= VISIBLE_SLOTS.phone) return 'hidden min-[36rem]:flex'
  return ''
}

/** How many cells show at the current width (matches `slotVisibility`). */
function visibleSlots(): number {
  if (window.matchMedia('(min-width: 64rem)').matches)
    return VISIBLE_SLOTS.laptop
  if (window.matchMedia('(min-width: 46rem)').matches)
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

/** Two across, each logo leans toward the middle so the pair reads as one
 * group instead of two logos at the far edges; from three across they centre. */
const TWO_UP_ALIGN = {
  end: 'justify-end origin-right min-[36rem]:justify-center min-[36rem]:origin-center',
  start:
    'justify-start origin-left min-[36rem]:justify-center min-[36rem]:origin-center',
} as const

function LogoCell({
  className,
  align,
  client,
  leaving,
  entering,
  onHold,
  onRelease,
}: {
  className?: string
  align: keyof typeof TWO_UP_ALIGN
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
      className={`group relative flex h-[clamp(2.75rem,6.5vw,4.5rem)] items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/30 ${className ?? ''}`}
    >
      {/* Keyed by client so a swap remounts it and replays the scan-in. */}
      <span
        key={client.title}
        style={{ transitionDuration: `${SWAP_FADE_MS}ms` }}
        className={`flex h-full w-full items-center ${TWO_UP_ALIGN[align]} transition-[opacity,filter,transform] ease-out ${
          leaving ? 'logo-swap-out' : 'opacity-80 group-hover:opacity-100'
        } ${entering ? 'logo-swap-in' : ''}`}
      >
        {/* Plain <img>: static, already-optimised local assets, and next/image
            would need dangerouslyAllowSVG for the vector marks. */}
        <span
          className={`logo-hover flex h-full w-full items-center ${TWO_UP_ALIGN[align]}`}
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
