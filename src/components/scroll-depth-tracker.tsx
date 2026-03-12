'use client'

import { useEffect, useRef } from 'react'
import { usePostHog } from 'posthog-js/react'
import { usePathname } from 'next/navigation'

const THRESHOLDS = [25, 50, 75, 100] as const

export function ScrollDepthTracker() {
  const posthog = usePostHog()
  const pathname = usePathname()
  const firedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    firedRef.current = new Set()
  }, [pathname])

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const pct = Math.round((scrollTop / docHeight) * 100)

      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold)
          posthog?.capture('scroll_depth', {
            depth: threshold,
            path: pathname,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [posthog, pathname])

  return null
}
