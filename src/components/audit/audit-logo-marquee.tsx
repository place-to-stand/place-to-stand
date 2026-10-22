'use client'

import { useEffect, useRef, useState } from 'react'
import { clients, logoToneClass } from '@/src/lib/clients'

/** Seconds per logo, so the pace stays the same as the client list grows. */
const SECONDS_PER_LOGO = 5

/**
 * The audit page's "Trusted by" strip: every client logo on a slow loop,
 * sized and centred the same way as the homepage grid (`logoScale`,
 * `logoNudge`). The list is drawn twice and slides one copy's width
 * (`.marquee` in app/globals.css), pausing on hover and standing still for
 * reduced motion. It opens with the first client (Hot Ones) in the middle of
 * the strip: a negative animation delay starts the loop part way through,
 * and the loop waits until the strip is on screen.
 */
export function AuditLogoMarquee() {
  const duration = clients.length * SECONDS_PER_LOGO
  const strip = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const [delay, setDelay] = useState<number | null>(null)
  // Held still until the strip scrolls into view, so Hot Ones is still in the
  // middle when someone first sees it.
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (!strip.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setSeen(true)
      observer.disconnect()
    })
    observer.observe(strip.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let live = true
    const imgs = Array.from(track.current?.querySelectorAll('img') ?? [])
    // Logo widths are only known once the files load.
    Promise.all(imgs.map(img => img.decode().catch(() => {}))).then(() => {
      const first = track.current?.firstElementChild as HTMLElement | null
      if (!live || !strip.current || !track.current || !first) return
      const copy = track.current.scrollWidth / 2
      const centre = first.offsetLeft + first.offsetWidth / 2
      // How far the track must already have slid for the first logo to sit
      // in the middle, wrapped into one copy's width.
      const slid =
        (((centre - strip.current.clientWidth / 2) % copy) + copy) % copy
      setDelay(-(slid / copy) * duration)
    })
    return () => {
      live = false
    }
  }, [duration])

  return (
    <div
      ref={strip}
      className={`marquee transition-opacity duration-500 ${delay === null ? 'opacity-0' : ''}`}
    >
      <ul
        ref={track}
        className='marquee-track'
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${delay ?? 0}s`,
          animationPlayState: seen ? undefined : 'paused',
        }}
      >
        {[...clients, ...clients].map((client, i) => {
          const copy = i >= clients.length
          return (
            <li
              key={`${client.title}-${i}`}
              aria-hidden={copy || undefined}
              className='flex h-grid-2 shrink-0 items-center px-4 md:h-grid-3 md:px-9'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={copy ? '' : `${client.title} logo`}
                decoding='async'
                style={{
                  height: `${(client.logoScale ?? 1) * 100}%`,
                  transform: client.logoNudge
                    ? `translateY(${client.logoNudge}%)`
                    : undefined,
                }}
                className={`w-auto opacity-80 ${logoToneClass(client)}`}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
