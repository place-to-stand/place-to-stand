'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from 'react'
import { cn } from '@/src/lib/utils'

interface AnimatedSectionProps extends ComponentProps<'section'> {
  id?: string
}

const RevealContext = createContext<{ isVisible: boolean; reduced: boolean }>({
  isVisible: true,
  reduced: false,
})

/**
 * The hero plays a scripted intro on page load (see .hero-* in globals.css): the
 * headline lands, the comparison graphic plays out slowly (~3.0s–7.0s: the stack
 * builds, the arrow slides out, "Into this" fades, the finished app slides in),
 * then the subtext and CTA reveal, the CTA finishing at ~7.5s delay + 0.8s = 8.3s.
 * A section that
 * happens to be visible on load (tall screens) would otherwise reveal in the
 * middle of that intro and beat it. This returns how long such a section should
 * wait so it reveals only once the hero is done — anchored to first paint so a
 * section scrolled to later isn't delayed. Returns 0 when there's no hero on the
 * page, under reduced motion, or once the intro has already finished.
 */
const HERO_ENTRANCE_MS = 8300
function heroGateRemainingMs(): number {
  if (typeof window === 'undefined') return 0
  if (!document.querySelector('[data-pts-hero]')) return 0
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
  const paint = performance
    .getEntriesByType('paint')
    .find(p => p.name === 'first-contentful-paint')
  const start = paint?.startTime ?? 0
  return Math.max(0, start + HERO_ENTRANCE_MS - performance.now())
}

export function AnimatedSection({
  className,
  children,
  id,
  ...props
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [fromLeft, setFromLeft] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Alternate slide direction based on this section's order among all
    // animated sections on the page (even = from left, odd = from right).
    const sections = Array.from(
      document.querySelectorAll('[data-animated-section]')
    )
    setFromLeft(sections.indexOf(node) % 2 === 0)

    // Respect reduced-motion: reveal immediately, skip the observer.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setIsVisible(true)
      return
    }

    let gateTimer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          // If this section is visible while the hero intro is still playing,
          // hold it until the intro finishes; otherwise reveal immediately.
          const delay = heroGateRemainingMs()
          if (delay > 0) {
            gateTimer = setTimeout(() => setIsVisible(true), delay)
          } else {
            setIsVisible(true)
          }
        }
      },
      // threshold 0 (fire as soon as any part enters) so tall sections still
      // reveal: intersectionRatio is a fraction of the *target*, so a section
      // taller than the viewport can never reach a large ratio on mobile.
      { rootMargin: '0px 0px -20% 0px', threshold: 0 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (gateTimer) clearTimeout(gateTimer)
    }
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      data-animated-section
      style={{
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDuration: reduced ? '0ms' : '2200ms',
      }}
      className={cn(
        'mx-auto w-full max-w-content scroll-mt-24 px-6 py-20 lg:px-12',
        isVisible
          ? 'translate-x-0 opacity-100'
          : cn('opacity-0', fromLeft ? '-translate-x-24' : 'translate-x-24'),
        className
      )}
      {...props}
    >
      <RevealContext.Provider value={{ isVisible, reduced }}>
        {children}
      </RevealContext.Provider>
    </section>
  )
}

interface RevealProps extends ComponentProps<'div'> {
  /** Stagger order within the section. 0 reveals first, then 1, 2, … */
  index?: number
}

/**
 * Staggers a piece of section content into view once its parent
 * AnimatedSection scrolls into view. Small vertical rise + fade, sequenced
 * by `index`. Used to cascade heading → subheading → content.
 */
export function Reveal({ index = 0, className, style, children, ...props }: RevealProps) {
  const { isVisible, reduced } = useContext(RevealContext)

  return (
    <div
      style={{
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDuration: reduced ? '0ms' : '750ms',
        transitionDelay: reduced ? '0ms' : `${index * 320}ms`,
        ...style,
      }}
      className={cn(
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
