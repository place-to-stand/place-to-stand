/**
 * Wire contract for `POST /api/integrations/subscribe-submissions`.
 *
 * A mailing-list signup. Shares the `analytics` / `attribution` / `client`
 * envelope with the contact and audit payloads, so signups land in the
 * portal's `form_submissions` table (kind `subscribe`) with the same
 * attribution data. The portal records the row and adds the address to the
 * marketing audience; it sends no email. Submitting is the consent: every
 * subscribe form says what signing up means.
 */
import { CONTACT_EMAIL, SITE_URL } from '@/src/lib/site'
import type {
  SubmissionAnalytics,
  SubmissionAttribution,
  SubmissionClientInfo,
} from '@/src/lib/forms/context'
import type { ContactSubmissionContext } from '@/src/lib/forms/contact-payload'

/** Where on the page the form sits. The footer one is on every page. */
export const SUBSCRIBE_PLACEMENTS = ['blog', 'footer'] as const
export type SubscribePlacement = (typeof SUBSCRIBE_PLACEMENTS)[number]

/** What `/api/subscribe` answers. */
export type SubscribeResponse = { ok: true } | { ok: false; message: string }

/** Shown whenever the signup did not reach the portal. */
export const SUBSCRIBE_FAILED_MESSAGE = `We couldn't sign you up. Please email ${CONTACT_EMAIL} and we'll add you.`

/** Same envelope the contact form hands its action. */
export type SubscribeSubmissionContext = ContactSubmissionContext

export interface SubscribeSubmissionPayload {
  submissionId: string
  sourceDetail: string
  submittedAt: string
  subscriber: { email: string }
  analytics: SubmissionAnalytics
  attribution: SubmissionAttribution
  client: SubmissionClientInfo & { userAgent: string | null }
}

/**
 * The page the visitor signed up on, as a full URL, with `#footer` when it
 * was the footer form, so the portal can tell the two apart.
 */
export function subscribeSourceDetail(
  path: string,
  placement: SubscribePlacement
): string {
  return `${SITE_URL}${path}${placement === 'footer' ? '#footer' : ''}`
}

export function buildSubscribeSubmissionPayload({
  context,
  email,
  sourceDetail,
  userAgent,
}: {
  context: SubscribeSubmissionContext
  email: string
  sourceDetail: string
  userAgent: string | null
}): SubscribeSubmissionPayload {
  return {
    submissionId: context.submissionId,
    sourceDetail,
    submittedAt: new Date().toISOString(),
    subscriber: { email },
    analytics: context.analytics,
    attribution: context.attribution,
    client: { ...context.client, userAgent },
  }
}
