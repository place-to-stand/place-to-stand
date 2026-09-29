import type { Instrumentation } from 'next'

/**
 * Reports server-side errors (Server Components, route handlers, server
 * actions) to PostHog Error Tracking.
 *
 * The browser SDK never sees these: the client only receives a sanitized
 * message and `error.digest`. Capturing here, with the same digest, lets a
 * crash screen in a session replay be matched to its real server stack trace.
 *
 * Env is read from `process.env` directly. Importing anything that pulls in
 * 'server-only' throws inside instrumentation.
 */
export const onRequestError: Instrumentation.onRequestError = async (
  error,
  request,
  context
) => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.NODE_ENV !== 'production') return

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return

  // Reporting must never be able to break the request it is reporting on.
  try {
    const { PostHog } = await import('posthog-node')
    const client = new PostHog(key, {
      // Same first-party proxy the browser SDK uses (src/lib/posthog-init.ts).
      host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ||
        'https://t.placetostandagency.com',
      // Serverless: send immediately rather than batching for a later flush
      // that may never come.
      flushAt: 1,
      flushInterval: 0,
    })

    const visitor = readVisitor(key, request.headers.cookie)

    client.captureException(error, visitor?.distinctId, {
      digest: (error as { digest?: string } | null)?.digest,
      path: request.path,
      method: request.method,
      routePath: context.routePath,
      routeType: context.routeType,
      renderSource: context.renderSource,
      // Mirror the browser's `person_profiles: 'identified_only'`: attribute
      // to an anonymous visitor without creating a person profile for them.
      ...(visitor && !visitor.identified && { $process_person_profile: false }),
    })

    // captureException returns void; shutdown awaits the pending send.
    await client.shutdown()
  } catch (reportingError) {
    console.error('PostHog onRequestError reporting failed', reportingError)
  }
}

/**
 * Attributes the error to the visitor's existing PostHog person by reading the
 * browser SDK's persistence cookie (`ph_<project key>_posthog`, URI-encoded
 * JSON). Undefined when absent, and posthog-node then sends it personless.
 */
function readVisitor(
  key: string,
  cookieHeader: string | string[] | undefined
): { distinctId: string; identified: boolean } | undefined {
  const header = Array.isArray(cookieHeader)
    ? cookieHeader.join('; ')
    : cookieHeader
  if (!header) return undefined

  const name = `ph_${key}_posthog=`
  const raw = header
    .split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(name))
    ?.slice(name.length)
  if (!raw) return undefined

  try {
    const persisted = JSON.parse(decodeURIComponent(raw))
    if (typeof persisted?.distinct_id !== 'string') return undefined
    return {
      distinctId: persisted.distinct_id,
      identified: persisted.$user_state === 'identified',
    }
  } catch {
    return undefined
  }
}
