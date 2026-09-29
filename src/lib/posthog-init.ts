import posthog, { type CaptureResult } from 'posthog-js'

/**
 * Initializes the browser SDK. Called from `instrumentation-client.ts`, which
 * Next runs before React hydrates.
 *
 * It used to run in PostHogProvider's `useEffect`, which was too late for the
 * errors that matter most. React runs child effects before parent effects, so
 * an error boundary rendered on the first mount reported its crash before
 * `init` had run, and posthog-js drops calls made before `init`. And when a
 * first render crashed with no boundary, the provider unmounted before its
 * effect ever fired, so PostHog never started and even the uncaught error was
 * lost.
 */
export function initPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return

  posthog.init(key, {
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
