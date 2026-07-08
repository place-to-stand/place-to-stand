'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
} from 'react'
import { cn } from '@/src/lib/utils'

/**
 * Fires once when the element first scrolls into view. Under prefers-reduced-motion
 * it resolves to true immediately and skips the observer entirely, mirroring the
 * short-circuit in AnimatedSection so animated and static behaviour stay consistent.
 */
export function useInView<T extends Element = HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

interface BlueprintGraphicProps extends SVGProps<SVGSVGElement> {
  /** The schematic body — paths, lines, and one accent `.bp-node`. */
  children: ReactNode
  /** Ongoing-loop variant applied once drawn in (e.g. 'bp-loop-pulse'). */
  loop?: string
  /**
   * Delay (ms) before the draw-in starts once in view. The hero piece uses this
   * to sequence its draw after the hero intro finishes.
   */
  drawDelayMs?: number
}

/**
 * Client wrapper that draws a blueprint schematic in on first view, then hands
 * off to a subtle ongoing loop. The SVG body is authored in the shared
 * process-graphics style (100x100 viewBox, stroke-border-light, one fill-accent
 * node). All motion + reduced-motion handling lives in globals.css, keyed off the
 * `bp-draw` class and the `data-visible` attribute this component toggles.
 */
export function BlueprintGraphic({
  children,
  loop,
  drawDelayMs,
  className,
  style,
  ...props
}: BlueprintGraphicProps) {
  const { ref, inView } = useInView<SVGSVGElement>()

  return (
    <svg
      ref={ref}
      viewBox='0 0 100 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden
      data-visible={inView ? 'true' : undefined}
      className={cn('bp-draw', loop, className)}
      style={
        {
          ...(drawDelayMs ? { '--bp-draw-base': `${drawDelayMs}ms` } : {}),
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </svg>
  )
}
