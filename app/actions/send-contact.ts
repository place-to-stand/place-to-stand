'use server'

import { randomUUID } from 'crypto'

import { headers } from 'next/headers'
import { checkBotId } from 'botid/server'
import {
  contactSchema,
  type ContactFormValues,
} from '@/src/lib/validations/contact'
import {
  buildContactSubmissionPayload,
  emptyContactSubmissionContext,
  type ContactSubmissionContext,
} from '@/src/lib/forms/contact-payload'
import {
  PORTAL_PATHS,
  resolvePortalTarget,
  submitToPortal,
} from '@/src/lib/forms/portal'
import { resolveContactSubject } from '@/src/lib/forms/contact-subjects'

export type ContactActionResult =
  | { success: true }
  | {
      success: false
      message?: string
      errors?: Partial<Record<keyof ContactFormValues, string[]>>
    }

/** Shown whenever the portal did not take the submission. */
const DELIVERY_FAILED_MESSAGE =
  "We couldn't send your message. Please email hello@placetostandagency.com and we'll get right back to you."

function normalizeUrl(value: string): string {
  const trimmed = value.trim()
  // Add https:// if no protocol present
  if (trimmed && !/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/**
 * Contact form submission.
 *
 * This action sends no email. It hands the submission to the portal, which
 * records it and sends both the team notification and the visitor's
 * confirmation (`deliver: true`). The portal records before it sends, so a
 * mail-provider outage delays an email rather than losing the enquiry; the
 * only failure a visitor sees is the portal not accepting the request at all.
 */
export async function sendContact(
  values: ContactFormValues,
  /**
   * Analytics, campaign, and device context gathered in the browser. Absent when
   * the client could not collect it; the submission still goes to the portal
   * with an empty envelope, because the portal is now the only delivery path.
   */
  submissionContext?: ContactSubmissionContext
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    } as const
  }

  try {
    const verification = await checkBotId({
      advancedOptions: {
        checkLevel: 'basic',
      },
    })

    if (verification.isBot) {
      console.warn('BotID blocked a contact submission attempt')

      return {
        success: false,
        message:
          "We couldn't verify your request. Please refresh and try again.",
      } as const
    }
  } catch (error) {
    console.error('BotID verification failed', error)

    return {
      success: false,
      message:
        'Unable to verify your request at this time. Please try again later.',
    } as const
  }

  const { name, email, message, company, website, marketingConsent } =
    parsed.data

  const trimmedName = name.trim()
  const rawWebsite = website?.trim() || null

  // Normalize website (add https:// if missing) then validate
  const normalizedWebsite = rawWebsite ? normalizeUrl(rawWebsite) : null
  const validatedWebsite =
    normalizedWebsite && isValidUrl(normalizedWebsite)
      ? normalizedWebsite
      : null

  const target = resolvePortalTarget(
    PORTAL_PATHS.contactSubmissions,
    process.env.CONTACT_INTAKE_TOKEN
  )

  const userAgent = (await headers()).get('user-agent')?.slice(0, 1024) ?? null

  const payload = buildContactSubmissionPayload({
    context: submissionContext ?? emptyContactSubmissionContext(randomUUID()),
    contact: {
      name: trimmedName || name,
      email,
      company: company?.trim() || null,
      website: validatedWebsite,
      subject: resolveContactSubject(parsed.data),
      message: message.trim(),
      marketingConsent: marketingConsent ?? false,
    },
    userAgent,
    deliver: true,
  })

  if (!target) {
    // Dev affordance: with no portal configured, log the payload and report
    // success so the form is usable locally. Production always has both vars
    // set; if it ever did not, failing loudly is right, because nothing would
    // be delivering the message.
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        'PORTAL_API_BASE_URL/CONTACT_INTAKE_TOKEN not set; contact submission not forwarded',
        JSON.stringify(payload, null, 2)
      )
      return { success: true } as const
    }

    console.error('Contact form is not configured to reach the portal')
    return { success: false, message: DELIVERY_FAILED_MESSAGE } as const
  }

  const result = await submitToPortal(target, payload, {
    submissionId: payload.submissionId,
  })

  if (!result.ok) {
    return { success: false, message: DELIVERY_FAILED_MESSAGE } as const
  }

  return { success: true } as const
}
