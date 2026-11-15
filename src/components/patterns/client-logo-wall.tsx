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
  ROW_SLOTS,
  ROW_PINNED,
  nextSwap,
} from '@/src/components/patterns/client-logo-wall-utils'

/** The two layouts: the original grid (two or three rows) and the hero's
 *  single quiet row. Each lists its grid classes, the cells that show at
 *  each width, and the classes that hide the rest. */
const LAYOUTS = {
  grid: {
    slots: VISIBLE_SLOTS,
    total: LOGO_SLOTS,
    pinned: 0,
    className:
      'grid grid-cols-2 gap-x-[clamp(2.25rem,9vw,4rem)] gap-y-[clamp(0.75rem,3vw,2.25rem)] min-[36rem]:grid-cols-3 min-[50rem]:grid-cols-4 min-[80rem]:grid-cols-5 min-[80rem]:gap-x-grid-2',
    hide: (slot: number) =>
      slot >= VISIBLE_SLOTS.wideTablet
        ? 'hidden min-[80rem]:flex'
        : slot >= VISIBLE_SLOTS.tablet
          ? 'hidden min-[50rem]:flex'
          : '',
    logo: 'h-[min(4.5rem,36cqw)]',
  },
  row: {
    slots: ROW_SLOTS,
    total: ROW_SLOTS.laptop,
    pinned: ROW_PINNED,
    className:
      'grid grid-cols-4 gap-x-[clamp(1.5rem,5vw,3rem)] min-[36rem]:grid-cols-5 min-[50rem]:grid-cols-6 min-[80rem]:grid-cols-7',
    hide: (slot: number) =>
      slot >= ROW_SLOTS.wideTablet
        ? 'hidden min-[80rem]:flex'
        : slot >= ROW_SLOTS.tablet
          ? 'hidden min-[50rem]:flex'
          : slot >= ROW_SLOTS.phone
            ? 'hidden min-[36rem]:flex'
            : '',
    logo: 'h-[min(2rem,40cqw)]',
  },
} as const

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
export function ClientLogoWall({
  variant = 'grid',
}: {
  /** 'row': one quiet row, for the bottom of the home hero (loads eagerly,
   *  keeps the first two pinned). */
  variant?: 'grid' | 'row'
} = {}) {
  const layout = LAYOUTS[variant]
  const [shown, setShown] = useState(() => initialSlots(layout.total))
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
    if (clients.length <= layout.total) return
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
      const showing = visibleSlots(layout.slots)
      // A cell that just went out of view (window narrowed) can't be the
      // "last swapped" one any more.
      if (lastSlot.current !== null && lastSlot.current >= showing)
        lastSlot.current = null
      const swap = nextSwap(
        shownRef.current.slice(0, showing),
        clients.length,
        lastSlot.current,
        held.current,
        Math.random,
        layout.pinned
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
  }, [layout])

  return (
    // Three rows of two on phones, two rows above that; cells that don't fit
    // are hidden (see slotVisibility). Both gaps follow the window width:
    // columns 9vw (36px to 64px; 48px at five across), rows 3vw (12px to
    // 36px).
    // Only the column count changes at breakpoints.
    <div ref={ref} className={layout.className}>
      {shown.map((index, slot) => (
        <LogoCell
          key={slot}
          className={layout.hide(slot)}
          logoClassName={layout.logo}
          eager={variant === 'row'}
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

/** How many cells show at the current width (matches the layout's `hide`). */
function visibleSlots(slots: {
  phone: number
  tablet: number
  wideTablet: number
  laptop: number
}): number {
  if (window.matchMedia('(min-width: 80rem)').matches) return slots.laptop
  if (window.matchMedia('(min-width: 50rem)').matches) return slots.wideTablet
  if (window.matchMedia('(min-width: 36rem)').matches) return slots.tablet
  return slots.phone
}

function initialSlots(total: number): number[] {
  return Array.from({ length: Math.min(total, clients.length) }, (_, i) => i)
}

function LogoCell({
  className,
  logoClassName,
  eager,
  client,
  leaving,
  entering,
  onHold,
  onRelease,
}: {
  className?: string
  logoClassName: string
  eager: boolean
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
      className={`group @container relative flex items-center justify-center ${className ?? ''}`}
    >
      {/* Keyed by client so a swap remounts it and replays the scan-in. Its
          height is 36% of the cell's width (cqw), up to 72px, so logos keep
          the same share of their cell whatever the column count. */}
      <span
        key={client.title}
        style={{ transitionDuration: `${SWAP_FADE_MS}ms` }}
        className={`flex ${logoClassName} w-full items-center justify-center transition-[opacity,filter,transform] ease-out ${
          leaving ? 'logo-swap-out' : ''
        } ${entering ? 'logo-swap-in' : ''}`}
      >
        {/* Plain <img>: static, already-optimized local assets, and next/image
            would need dangerouslyAllowSVG for the vector marks. */}
        <span
          className={`logo-hover flex h-full w-full items-center justify-center`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={client.logo}
            alt={`${client.title} logo`}
            // The grid sits below the fold: load as it nears. The hero row
            // is on the first screen.
            loading={eager ? 'eager' : 'lazy'}
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
