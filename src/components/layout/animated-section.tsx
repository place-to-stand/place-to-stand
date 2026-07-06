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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      // threshold 0 (fire as soon as any part enters) so tall sections still
      // reveal: intersectionRatio is a fraction of the *target*, so a section
      // taller than the viewport can never reach a large ratio on mobile.
      { rootMargin: '0px 0px -20% 0px', threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
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
        'mx-auto w-full max-w-content scroll-mt-24 px-6 py-24 lg:px-12',
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
