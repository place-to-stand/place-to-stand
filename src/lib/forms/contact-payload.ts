/**
 * Wire contract for `POST /api/integrations/contact-submissions`.
 *
 * Shares the `analytics` / `attribution` / `client` envelope with the audit
 * payload so both forms land in the portal's `form_submissions` table with the
 * same shape. See `docs/prds/005-form-submissions/README.md`.
 */
import type {
  SubmissionAnalytics,
  SubmissionAttribution,
  SubmissionClientInfo,
} from '@/src/lib/forms/context'

export const CONTACT_SOURCE_DETAIL = 'https://placetostandagency.com/'

export interface ContactSubmissionFields {
  name: string
  email: string
  company: string | null
  website: string | null
  /** A preset label or the visitor's own "Other" text. */
  subject: string | null
  message: string
  marketingConsent: boolean
}

/**
 * What the browser hands to the `sendContact` server action.
 *
 * The action cannot read any of this itself: PostHog ids, UTM params, and screen
 * metrics only exist in the browser. `submissionId` is minted client-side and
 * held for the lifetime of the form, so retrying a failed submit updates the
 * same portal row rather than creating a second one.
 */
export interface ContactSubmissionContext {
  submissionId: string
  analytics: SubmissionAnalytics
  attribution: SubmissionAttribution
  client: SubmissionClientInfo
}

export interface ContactSubmissionPayload {
  submissionId: string
  sourceDetail: string
  submittedAt: string
  contact: ContactSubmissionFields
  analytics: SubmissionAnalytics
  attribution: SubmissionAttribution
  client: SubmissionClientInfo & { userAgent: string | null }
  /**
   * Asks the portal to send the team notification and the visitor's
   * confirmation. The site sends no email of its own.
   */
  deliver: boolean
}

/**
 * Envelope for a submission whose browser context never arrived. The portal is
 * the only delivery path, so a missing context must not stop the message; it
 * just lands with no attribution. Built here rather than imported from
 * `context.ts`, which is client-only (it pulls in the PostHog browser client).
 */
export function emptyContactSubmissionContext(
  submissionId: string
): ContactSubmissionContext {
  return {
    submissionId,
    analytics: {
      posthogDistinctId: null,
      posthogSessionId: null,
      posthogReplayUrl: null,
    },
    attribution: {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
      gclid: null,
      referrer: null,
      landingPath: null,
    },
    client: {
      viewport: null,
      screenWidth: null,
      timezone: null,
      language: null,
    },
  }
}

export function buildContactSubmissionPayload({
  context,
  contact,
  userAgent,
  deliver,
}: {
  context: ContactSubmissionContext
  contact: ContactSubmissionFields
  userAgent: string | null
  deliver: boolean
}): ContactSubmissionPayload {
  return {
    submissionId: context.submissionId,
    sourceDetail: CONTACT_SOURCE_DETAIL,
    submittedAt: new Date().toISOString(),
    contact,
    analytics: context.analytics,
    attribution: context.attribution,
    client: { ...context.client, userAgent },
    deliver,
  }
}
