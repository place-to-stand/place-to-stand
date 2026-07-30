/**
 * Server-side delivery of form submissions to the portal.
 *
 * SERVER ONLY. The intake tokens must never reach the browser, so nothing here
 * may be imported from a client component. The audit reaches this code through
 * `app/api/audit-progress/route.ts`; the contact form calls it directly from its
 * server action.
 *
 * Delivery is best-effort by design: a portal outage logs and continues, and the
 * visitor still sees success. See `docs/prds/005-form-submissions/README.md`.
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
