'use client'

import { useEffect, useRef, useState } from 'react'
import { clients, logoToneClass, type Client } from '@/src/lib/clients'
import {
  LOGO_SLOTS,
  SWAP_INTERVAL_MS,
  SWAP_FADE_MS,
  nextSwap,
} from './client-logo-wall-utils'

/**
 * The homepage logo grid. It opens on the first `LOGO_SLOTS` clients (the
 * list in src/lib/clients.ts is ordered biggest names first), then every few
 * seconds fades one cell out and brings in a client that isn't showing, so the
 * whole roster gets seen without a second row of logos.
 *
 * Swaps stop while the grid is off screen, while the tab is hidden, and for
 * anyone who asks for reduced motion.
 */
export function ClientLogoWall() {
  const [shown, setShown] = useState(() => initialSlots())
  const [fading, setFading] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const shownRef = useRef(shown)
  const lastSlot = useRef<number | null>(null)

  useEffect(() => {
    if (clients.length <= LOGO_SLOTS) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let visible = false
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    if (ref.current) observer.observe(ref.current)

    let fadeTimer: ReturnType<typeof setTimeout> | undefined
    const tick = setInterval(() => {
      if (!visible || document.hidden) return
      const swap = nextSwap(shownRef.current, clients.length, lastSlot.current)
      lastSlot.current = swap.slot
      setFading(swap.slot)
      fadeTimer = setTimeout(() => {
        const next = [...shownRef.current]
        next[swap.slot] = swap.client
        shownRef.current = next
        setShown(next)
        setFading(null)
      }, SWAP_FADE_MS)
    }, SWAP_INTERVAL_MS)

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
        <LogoCell key={slot} client={clients[index]} hidden={fading === slot} />
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

function LogoCell({ client, hidden }: { client: Client; hidden: boolean }) {
  return (
    <a
      href={client.href}
      target='_blank'
      rel='noreferrer noopener'
      aria-label={`Visit ${client.title} (opens in a new tab)`}
      style={{ transitionDuration: `${SWAP_FADE_MS}ms` }}
      className={`flex h-grid-2 items-center justify-center transition-opacity ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/30 md:h-grid-3 ${
        hidden ? 'opacity-0' : 'opacity-80 hover:opacity-100'
      }`}
    >
      {/* Plain <img>: static, already-optimised local assets, and next/image
          would need dangerouslyAllowSVG for the vector marks. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={client.logo}
        alt={`${client.title} logo`}
        decoding='async'
        style={{ maxHeight: `${(client.logoScale ?? 1) * 100}%` }}
        className={`w-auto max-w-full object-contain ${logoToneClass(client)}`}
      />
    </a>
  )
}
