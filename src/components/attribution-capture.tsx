'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { captureAttribution } from '@/src/lib/forms/attribution-store'

/**
 * Records first-touch attribution on every page load and client-side route
 * change. Renders nothing.
 *
 * Mounted in `app/layout.tsx` as a sibling of `PostHogProvider`, deliberately
 * not a child: that provider early-returns its children untouched when
 * `NEXT_PUBLIC_POSTHOG_KEY` is unset, which is the case in local dev, so
 * anything nested inside it silently never runs there.
 *
 * `useSearchParams` needs a `<Suspense>` boundary around this component or the
 * whole route opts out of static rendering. `PostHogPageView` does the same.
 */
export function AttributionCapture() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    captureAttribution(searchParams.toString(), pathname)
  }, [pathname, searchParams])

  return null
}
