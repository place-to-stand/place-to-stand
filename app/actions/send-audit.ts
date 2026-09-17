'use server'

import { headers } from 'next/headers'
import { checkBotId } from 'botid/server'
import {
  auditLeadSchema,
  type AuditLeadValues,
} from '@/src/lib/validations/audit'
import { auditProgressSchema } from '@/src/lib/audit/progress-schema'
import {
  PORTAL_PATHS,
  resolvePortalTarget,
  submitToPortal,
} from '@/src/lib/forms/portal'

/**
 * Why a submission failed. Returned to the client so it can report the cause to
 * PostHog: without this every failure looks identical to an ordinary drop-off.
 */
export type AuditFailureReason =
  | 'validation'
  | 'botid_blocked'
  | 'botid_error'
  | 'not_configured'
  /** The portal answered, and the answer was an error. */
  | 'portal_rejected'
  /** The portal never answered: network failure or timeout. */
  | 'portal_unreachable'

export type AuditActionResult =
  | { success: true }
  | {
      success: false
      reason: AuditFailureReason
      message?: string
      errors?: Partial<Record<keyof AuditLeadValues, string[]>>
    }

/** Shown whenever the portal did not take the submission. */
const DELIVERY_FAILED_MESSAGE =
  "We couldn't send your audit. Please email hello@placetostandagency.com and we'll get right back to you."

/**
 * Captures the lead at the end of the Opportunity Audit.
 *
 * This action sends no email. It forwards the audit's `captured` push to the
 * portal with `deliver: true`, and the portal records the lead and sends both
 * the team notification and the visitor's results.
 *
 * The captured push lives here, not in the progress beacon, on purpose. That
 * beacon route is unauthenticated and skips BotID, which was fine while it
 * could only create an anonymous row. A push that makes the portal email an
 * address the caller chose is a different thing, so it goes through the one
 * path that verifies a human first. See `src/lib/audit/progress-schema.ts`.
 */
export async function sendAudit(
  values: AuditLeadValues,
  /**
   * The full progress payload for this attempt, built in the browser by
   * `buildAuditProgressPayload` because the session, PostHog ids and campaign
   * context only exist there. Validated below like any other client input.
   */
  progressPayload: unknown
): Promise<AuditActionResult> {
  const parsed = auditLeadSchema.safeParse(values)
  if (!parsed.success) {
    return {
      success: false,
      reason: 'validation',
      errors: parsed.error.flatten().fieldErrors,
    } as const
  }

  const progress = auditProgressSchema.safeParse(progressPayload)
  if (!progress.success) {
    console.warn('Invalid audit capture payload', progress.error.flatten())
    return {
      success: false,
      reason: 'validation',
      message: 'Something went wrong with your audit. Please try again.',
    } as const
  }

  try {
    const verification = await checkBotId({
      advancedOptions: {
        checkLevel: 'basic',
      },
    })

    if (verification.isBot) {
      console.warn('BotID blocked an audit submission attempt')

      return {
        success: false,
        reason: 'botid_blocked',
        message:
          "We couldn't verify your request. Please refresh and try again.",
      } as const
    }
  } catch (error) {
    console.error('BotID verification failed', error)

    return {
      success: false,
      reason: 'botid_error',
      message:
        'Unable to verify your request at this time. Please try again later.',
    } as const
  }

  const { name, email, company, message, marketingConsent } = parsed.data
  const userAgent = (await headers()).get('user-agent')?.slice(0, 1024) ?? null

  const payload = {
    ...progress.data,
    status: 'captured' as const,
    trigger: 'captured' as const,
    // The lead comes from the validated form values, never from the payload:
    // the payload is only trusted for the audit itself.
    lead: {
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || null,
      message: message?.trim() || null,
      marketingConsent: marketingConsent ?? false,
    },
    // Trust the request header over anything the client claims about itself.
    client: { ...progress.data.client, userAgent },
    deliver: true,
  }

  const target = resolvePortalTarget(
    PORTAL_PATHS.auditResponses,
    process.env.AUDIT_INTAKE_TOKEN
  )

  if (!target) {
    // Dev affordance: see the matching note in send-contact.ts.
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        'PORTAL_API_BASE_URL/AUDIT_INTAKE_TOKEN not set; audit capture not forwarded',
        JSON.stringify(payload, null, 2)
      )
      return { success: true } as const
    }

    console.error('Audit capture is not configured to reach the portal')
    return {
      success: false,
      reason: 'not_configured',
      message: DELIVERY_FAILED_MESSAGE,
    } as const
  }

  const result = await submitToPortal(target, payload, {
    sessionId: payload.sessionId,
  })

  if (!result.ok) {
    return {
      success: false,
      reason: result.reason,
      message: DELIVERY_FAILED_MESSAGE,
    } as const
  }

  return { success: true } as const
}
