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
  /**
   * Set this on the first section of any page whose content sits in the initial
   * viewport. The section then renders in its final visible state on the server
   * and skips the observer, the hero gate, and the transition entirely.
   *
   * This is not just a speed tweak. Chrome decides whether an element can ever
   * be the Largest Contentful Paint element the first time it paints, and an
   * element that first paints at opacity 0 is disqualified permanently — it does
   * not become eligible again when it fades in. A heading revealed this way is
   * invisible to LCP for the whole page lifetime, so the browser falls back to
   * whatever small element happened to paint at load (here, the header logo).
   * The reported number looks fine while the headline a visitor actually waits
   * for is not being measured at all.
   */
  priority?: boolean
}

const RevealContext = createContext<{ isVisible: boolean; reduced: boolean }>({
  isVisible: true,
  reduced: false,
})

/**
 * The hero plays a scripted intro on page load (see .hero-* in globals.css): the
 * headline wipes in line by line (done by ~0.74s), the subtext and CTA rise
 * (CTA finishing at ~1.0s delay + 0.6s = 1.6s), and the comparison graphic plays
 * out alongside them (~0.8s–3.0s: the stack builds, the arrow slides out, "Into
 * this" fades, the finished app slides in). A section that happens to be visible
 * on load (tall screens) would otherwise reveal in the middle of that intro and
 * beat it. This returns how long such a section should wait so it reveals only
 * once the hero is done. Only sections already in the viewport at first paint
 * are gated (see the caller), and even those reveal early the instant the user
 * scrolls — so anyone who scrolls, or a returning visitor past the replaying
 * hero, gets the content loading in without waiting. Returns 0 when there's no
 * hero on the page, under reduced motion, or once the intro has finished.
 */
const HERO_ENTRANCE_MS = 3000
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
  priority = false,
  ...props
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(priority)
  const [fromLeft, setFromLeft] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || priority) return

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

    // Only sections already in the viewport at first paint get held for the
    // hero intro. Anything below the fold reveals on scroll immediately, so
    // scrolling down during the intro (e.g. a returning visitor) still loads
    // the sections in.
    const inInitialViewport =
      node.getBoundingClientRect().top < window.innerHeight

    let gateTimer: ReturnType<typeof setTimeout> | undefined
    let onScroll: (() => void) | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const delay = inInitialViewport ? heroGateRemainingMs() : 0
        if (delay <= 0) {
          setIsVisible(true)
          return
        }

        // Visible on load while the hero intro is still playing: hold this
        // section until the intro finishes — but if the user scrolls (they want
        // to read on), reveal it right away instead of making them wait.
        const reveal = () => {
          setIsVisible(true)
          if (gateTimer) clearTimeout(gateTimer)
          if (onScroll) window.removeEventListener('scroll', onScroll)
        }
        gateTimer = setTimeout(reveal, delay)
        onScroll = reveal
        window.addEventListener('scroll', onScroll, { passive: true })
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
      if (onScroll) window.removeEventListener('scroll', onScroll)
    }
  }, [priority])

  return (
    <section
      ref={ref}
      id={id}
      data-animated-section
      style={{
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDuration: reduced || priority ? '0ms' : '2200ms',
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
export function Reveal({
  index = 0,
  className,
  style,
  children,
  ...props
}: RevealProps) {
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
