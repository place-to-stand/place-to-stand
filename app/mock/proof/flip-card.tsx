/* eslint-disable design/no-raw-aspect -- mock */
'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Mock A2's hero: Hot Ones lineup card #2 as a real card that flips once,
 * front to back, when it scrolls into view. Reduced motion shows the back.
 */
export function FlipCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = setTimeout(() => setFlipped(true), 700)
      },
      { threshold: 0.7 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const face =
    'absolute inset-0 size-full rounded-[5%/3.3%] [backface-visibility:hidden]'
  return (
    <div
      ref={ref}
      className={`aspect-[532/810] [perspective:1400px] ${className ?? ''}`}
    >
      <div
        className={`relative size-full transition-transform duration-[900ms] ease-(--ease-enter) [transform-style:preserve-3d] motion-reduce:[transform:rotateY(180deg)] motion-reduce:transition-none ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- mock */}
        <img
          src='/mock/card2-front.webp'
          alt=''
          className={`${face} shadow-[18px_28px_48px_-12px_rgba(0,0,0,0.55)]`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- mock */}
        <img
          src='/mock/card2-back.webp'
          alt=''
          className={`${face} [transform:rotateY(180deg)] shadow-[-18px_28px_48px_-12px_rgba(0,0,0,0.55)]`}
        />
      </div>
    </div>
  )
}
