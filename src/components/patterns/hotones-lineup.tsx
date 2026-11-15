'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * Home's Hot Ones crop: the "Explore the sauces" lineup from hotones.com,
 * where each card flips on click to show its tasting notes and heat level.
 * Here card #2 (House Sauce) flips once, the way it does on their site, when
 * the frame scrolls into view (once its fade-in is done), then rests on its
 * back (Jason, Nov 15). Both
 * faces are real captures: the front is cut from the lineup crop itself, the
 * back was shot on hotones.com after clicking the card.
 *
 * The flipping card is laid over its own spot in the crop (percentages of
 * the 1600 x 828 image), so nothing moves in the layout. With reduced
 * motion the back simply shows.
 */
const CARD = {
  left: (349 / 1600) * 100,
  top: (331 / 828) * 100,
  width: (286 / 1600) * 100,
  height: (450 / 828) * 100,
}

export function HotOnesLineup({ sizes }: { sizes: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Reduced motion: CSS shows the back (motion-reduce below), no flip.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        // After the frame's own fade-in (320ms delay + 750ms).
        timer = setTimeout(() => setFlipped(true), 1100)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={ref} className='relative'>
      <Image
        src='/work/hotones-lineup-sauces.webp'
        alt=''
        width={1600}
        height={828}
        sizes={sizes}
      />
      <div
        className='absolute [perspective:900px]'
        style={{
          left: `${CARD.left}%`,
          top: `${CARD.top}%`,
          width: `${CARD.width}%`,
          height: `${CARD.height}%`,
        }}
      >
        {/* The lineup's own near-black behind the card, so the card printed
            in the crop doesn't show through while this one turns. */}
        <div
          className='absolute inset-0 rounded-[5%/3.2%]'
          // Sampled from the hotones.com capture, not a site color.
          style={{ backgroundColor: '#0d0d0d' }}
        />
        <div
          className={`relative size-full transition-transform duration-700 ease-(--ease-enter) [transform-style:preserve-3d] motion-reduce:[transform:rotateY(180deg)] motion-reduce:transition-none ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- 14KB card faces, sized by their box */}
          <img
            src='/work/hotones-card2-front.webp'
            alt=''
            className='absolute inset-0 size-full rounded-[5%/3.2%] [backface-visibility:hidden]'
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- 14KB card faces, sized by their box */}
          <img
            src='/work/hotones-card2-back.webp'
            alt=''
            className='absolute inset-0 size-full [transform:rotateY(180deg)] rounded-[5%/3.2%] [backface-visibility:hidden]'
          />
        </div>
      </div>
    </div>
  )
}
