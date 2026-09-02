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
}

export function buildContactSubmissionPayload({
  context,
  contact,
  userAgent,
}: {
  context: ContactSubmissionContext
  contact: ContactSubmissionFields
  userAgent: string | null
}): ContactSubmissionPayload {
  return {
    submissionId: context.submissionId,
    sourceDetail: CONTACT_SOURCE_DETAIL,
    submittedAt: new Date().toISOString(),
    contact,
    analytics: context.analytics,
    attribution: context.attribution,
    client: { ...context.client, userAgent },
  }
}
