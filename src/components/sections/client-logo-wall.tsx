'use client'

import { useEffect, useRef, useState } from 'react'
import { clients, logoToneClass, type Client } from '@/src/lib/clients'
import {
  LOGO_SLOTS,
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
      const swap = nextSwap(
        shownRef.current,
        clients.length,
        lastSlot.current,
        held.current
      )
      lastSlot.current = swap.slot
      setFading(swap.slot)
      fadeTimer = setTimeout(() => {
        const next = [...shownRef.current]
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
    // 2 and 5 both divide the 10 cells evenly; a 3- or 4-up step would strand a
    // lone logo on the last row. Mobile halves the row gap so the grid doesn't
    // eat a whole phone screen.
    <div
      ref={ref}
      className='grid grid-cols-2 gap-x-grid-2 gap-y-grid-1 md:grid-cols-5 md:gap-grid-2'
    >
      {shown.map((index, slot) => (
        <LogoCell
          key={slot}
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

function initialSlots(): number[] {
  return Array.from(
    { length: Math.min(LOGO_SLOTS, clients.length) },
    (_, i) => i
  )
}

function LogoCell({
  client,
  leaving,
  entering,
  onHold,
  onRelease,
}: {
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
      className='group relative flex h-grid-2 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/30 md:h-grid-3'
    >
      {/* Keyed by client so a swap remounts it and replays the scan-in. */}
      <span
        key={client.title}
        style={{ transitionDuration: `${SWAP_FADE_MS}ms` }}
        className={`flex h-full w-full items-center justify-center transition-[opacity,filter,transform] ease-out ${
          leaving ? 'logo-swap-out' : 'opacity-80 group-hover:opacity-100'
        } ${entering ? 'logo-swap-in' : ''}`}
      >
        {/* Plain <img>: static, already-optimised local assets, and next/image
            would need dangerouslyAllowSVG for the vector marks. */}
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
