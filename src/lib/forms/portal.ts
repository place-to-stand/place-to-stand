/**
 * Server-side delivery of form submissions to the portal.
 *
 * SERVER ONLY. The intake tokens must never reach the browser, so nothing here
 * may be imported from a client component. The audit reaches this code through
 * `app/api/audit-progress/route.ts`; the contact form calls it directly from its
 * server action.
 *
 * Two delivery modes, because the two callers need opposite guarantees:
 *
 * - `postToPortal` is log-and-continue, for audit progress beacons. A dropped
 *   beacon costs one data point and must never disturb the visitor.
 * - `submitToPortal` reports the outcome, for the two form submissions. The
 *   portal records the lead and sends both emails, so if it did not accept the
 *   request the visitor has to be told — nothing else will reach us.
 *
 * See `docs/prds/005-form-submissions/README.md`.
 */

/** Paths on the portal, per the integration contract. */
export const PORTAL_PATHS = {
  auditResponses: '/api/integrations/audit-responses',
  contactSubmissions: '/api/integrations/contact-submissions',
} as const

export interface PortalTarget {
  url: string
  token: string
}

/**
 * Resolve an endpoint from `PORTAL_API_BASE_URL` plus the caller's token env
 * var. Returns null when either is unset, which is the signal to log the payload
 * locally instead of forwarding it.
 */
export function resolvePortalTarget(
  path: string,
  token: string | undefined
): PortalTarget | null {
  const baseUrl = process.env.PORTAL_API_BASE_URL

  if (!baseUrl || !token) return null

  return { url: `${baseUrl.replace(/\/+$/, '')}${path}`, token }
}

/**
 * POST a submission to the portal. Never throws, never returns a failure the
 * caller has to handle: the contract is log-and-continue.
 *
 * `context` is folded into any error log so a failure is traceable back to the
 * submission that produced it without dumping the whole payload.
 */
export async function postToPortal(
  target: PortalTarget,
  payload: unknown,
  context: Record<string, unknown>
): Promise<void> {
  try {
    const response = await fetch(target.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${target.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Portal submission rejected', {
        url: target.url,
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        ...context,
      })
    }
  } catch (error) {
    console.error('Portal submission request failed', {
      url: target.url,
      error,
      ...context,
    })
  }
}

/** Long enough for the portal to write a row and send two emails. */
const SUBMIT_TIMEOUT_MS = 15_000

export type PortalSubmitResult =
  { ok: true } | { ok: false; reason: 'portal_rejected' | 'portal_unreachable' }

/**
 * POST a form submission and report whether the portal accepted it. Never
 * throws. `portal_rejected` is an answer we did not want (4xx/5xx);
 * `portal_unreachable` is no answer at all (network error or timeout).
 */
export async function submitToPortal(
  target: PortalTarget,
  payload: unknown,
  context: Record<string, unknown>
): Promise<PortalSubmitResult> {
  try {
    const response = await fetch(target.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${target.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
    })

    if (!response.ok) {
      console.error('Portal submission rejected', {
        url: target.url,
        status: response.status,
        statusText: response.statusText,
        body: await response.text().catch(() => null),
        ...context,
      })
      return { ok: false, reason: 'portal_rejected' }
    }

    return { ok: true }
  } catch (error) {
    console.error('Portal submission request failed', {
      url: target.url,
      error,
      ...context,
    })
    return { ok: false, reason: 'portal_unreachable' }
  }
}
