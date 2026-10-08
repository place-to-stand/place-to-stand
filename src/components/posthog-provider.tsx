'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

/**
 * Provides the PostHog client to `usePostHog()`. The client itself is
 * initialized earlier, before hydration, in `instrumentation-client.ts` (see
 * `src/lib/posthog-init.ts` for why), and captures pageviews on its own.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
