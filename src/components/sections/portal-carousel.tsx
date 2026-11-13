'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'
import { Button } from '@/src/components/primitives/button'
import { ArrowLeft, ArrowRight, Icon } from '@/src/components/primitives/icon'
import { cn } from '@/src/lib/utils'

/**
 * A row of slides that snaps one at a time: swipe or scroll it, or use the
 * buttons and the caption list under it. The row itself is a scroll area,
 * so arrow keys move it once it has focus. Under reduced motion the buttons
 * jump instead of gliding. Slides are rendered on the server and passed in.
 */
export function PortalCarousel({
  label,
  captions,
  slides,
}: {
  /** Names the carousel for screen readers. */
  label: string
  captions: readonly string[]
  slides: ReactNode[]
}) {
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const last = slides.length - 1

  /** Distance from one slide to the next (slide width plus the gap). */
  const step = () => {
    const items = track.current?.children
    if (!items || items.length < 2) return track.current?.clientWidth ?? 1
    return (
      (items[1] as HTMLElement).offsetLeft -
      (items[0] as HTMLElement).offsetLeft
    )
  }

  const onScroll = useCallback(() => {
    const node = track.current
    if (!node) return
    setCurrent(Math.round(node.scrollLeft / step()))
  }, [])

  const goTo = (index: number) => {
    const node = track.current
    if (!node) return
    const target = Math.max(0, Math.min(last, index))
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    node.scrollTo({
      left: target * step(),
      behavior: reduced ? 'auto' : 'smooth',
    })
    setCurrent(target)
  }

  return (
    <div
      role='region'
      aria-roledescription='carousel'
      aria-label={label}
      className='flex flex-col gap-grid-1'
    >
      <div
        ref={track}
        onScroll={onScroll}
        tabIndex={0}
        role='group'
        aria-label={`${label}: scroll sideways for more`}
        className='scrollbar-hide relative flex snap-x snap-mandatory gap-grid-1 overflow-x-auto overscroll-x-contain'
      >
        {slides.map((slide, index) => (
          <div
            key={captions[index]}
            role='group'
            aria-roledescription='slide'
            aria-label={`${index + 1} of ${slides.length}: ${captions[index]}`}
            className='w-full shrink-0 snap-start'
          >
            {slide}
          </div>
        ))}
      </div>

      <div className='flex items-center gap-grid-1'>
        <div className='flex shrink-0 gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='w-9 px-0'
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
          >
            <Icon icon={ArrowLeft} />
            <span className='sr-only'>Previous screen</span>
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='w-9 px-0'
            onClick={() => goTo(current + 1)}
            disabled={current === last}
          >
            <Icon icon={ArrowRight} />
            <span className='sr-only'>Next screen</span>
          </Button>
        </div>
        <p
          aria-live='polite'
          className='font-mono text-xs text-text-muted md:hidden'
        >
          {current + 1} / {slides.length} · {captions[current]}
        </p>
        <ul className='hidden flex-wrap gap-x-grid-1 gap-y-2 md:flex'>
          {captions.map((caption, index) => (
            <li key={caption}>
              <button
                type='button'
                onClick={() => goTo(index)}
                aria-current={index === current ? 'true' : undefined}
                className={cn(
                  'link-nav',
                  index === current && 'text-text after:transform-none'
                )}
              >
                {caption}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
