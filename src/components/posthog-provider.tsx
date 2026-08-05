'use client'

import posthog, { type CaptureResult } from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

// Errors thrown by third-party scripts injected into the page (not by our
// code), e.g. Outlook SafeLinks scanners — never seen by real users
const IGNORED_EXCEPTION_PATTERNS = [/Object Not Found Matching Id:\d+/]

function dropInjectedScriptExceptions(
  event: CaptureResult | null
): CaptureResult | null {
  if (event?.event !== '$exception') return event

  const exceptions: { type?: string; value?: string }[] =
    event.properties?.$exception_list ?? []
  const isIgnored = exceptions.some(({ type, value }) =>
    IGNORED_EXCEPTION_PATTERNS.some(
      pattern => pattern.test(value ?? '') || pattern.test(type ?? '')
    )
  )

  return isIgnored ? null : event
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        // First-party managed reverse proxy — keeps events off ad-block lists
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST ||
          'https://t.placetostandagency.com',
        // Required when api_host is a proxy so the toolbar/app links resolve
        ui_host: 'https://us.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: false, // We capture manually for route changes
        capture_pageleave: true,
        autocapture: true,
        capture_dead_clicks: true,
        // Pinned here rather than left to the PostHog project setting: error
        // tracking is load-bearing for the audit funnel, and a UI toggle would
        // otherwise switch it off with nothing in the repo to explain it.
        capture_exceptions: true,
        before_send: dropInjectedScriptExceptions,
      })
    }
  }, [])

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + '?' + searchParams.toString()
      }
      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams, posthog])

  return null
}
