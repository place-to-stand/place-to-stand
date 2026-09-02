'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { checkBotId } from 'botid/server'
import {
  contactSchema,
  type ContactFormValues,
} from '@/src/lib/validations/contact'
import {
  buildContactSubmissionPayload,
  type ContactSubmissionContext,
} from '@/src/lib/forms/contact-payload'
import {
  PORTAL_PATHS,
  postToPortal,
  resolvePortalTarget,
} from '@/src/lib/forms/portal'
import { resolveContactSubject } from '@/src/lib/forms/contact-subjects'

export type ContactActionResult =
  | { success: true }
  | {
      success: false
      message?: string
      errors?: Partial<Record<keyof ContactFormValues, string[]>>
    }

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

export async function sendContact(
  values: ContactFormValues,
  /**
   * Analytics, campaign, and device context gathered in the browser. Absent when
   * the client could not collect it; the submission still goes to the portal.
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

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey) {
    return {
      success: false,
      message: 'Email service is not configured. Please try again later.',
    } as const
  }

  const { name, email, message, company, website, marketingConsent } =
    parsed.data

  const resend = new Resend(apiKey)

  const trimmedName = name.trim()
  const [firstName, ...restOfName] = trimmedName.split(/\s+/)
  const lastName = restOfName.join(' ').trim()
  const trimmedCompany = company?.trim() || null
  const rawWebsite = website?.trim() || null
  const trimmedMessage = message.trim()
  const subject = resolveContactSubject(parsed.data)
  const greetingName = firstName || trimmedName || 'there'

  // Normalize website (add https:// if missing) then validate
  const normalizedWebsite = rawWebsite ? normalizeUrl(rawWebsite) : null
  const validatedWebsite =
    normalizedWebsite && isValidUrl(normalizedWebsite)
      ? normalizedWebsite
      : null
  // Keep original for display in emails
  const trimmedWebsite = rawWebsite

  const detailLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
  ]

  if (trimmedCompany) {
    detailLines.push(`Company: ${trimmedCompany}`)
  }

  if (trimmedWebsite) {
    detailLines.push(`Website: ${trimmedWebsite}`)
  }

  if (trimmedMessage) {
    detailLines.push('', 'Message:', ...trimmedMessage.split(/\r?\n/))
  }

  const clientEmailLines = [
    `Hi ${greetingName},`,
    '',
    "Thanks for reaching out to Place To Stand. Here's a quick summary of what you shared:",
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
  ]

  if (trimmedCompany) {
    clientEmailLines.push(`Company: ${trimmedCompany}`)
  }

  if (trimmedWebsite) {
    clientEmailLines.push(`Website: ${trimmedWebsite}`)
  }

  if (trimmedMessage) {
    clientEmailLines.push('', 'Message:')
    clientEmailLines.push(...trimmedMessage.split(/\r?\n/))
  }

  clientEmailLines.push(
    '',
    "We'll get back to you within one business day. If you need to add anything in the meantime, please reach out to hello@placetostandagency.com.",
    '',
    'Talk soon,',
    'The Place To Stand Team'
  )

  // Send emails first: this is the core deliverable. If it fails, surface the
  // error so the user can retry; everything below is best-effort enrichment.
  //
  // Resend does NOT throw on API errors. It resolves with `{ data: null, error }`
  // for anything non-2xx and only rejects on a network-level failure, so an
  // unchecked `await` here would report success while sending nothing.
  try {
    const emailLines = [...detailLines]

    const teamEmail = await resend.emails.send({
      from: 'Place To Stand <hello@send.placetostandagency.com>',
      to: ['hello@placetostandagency.com'],
      replyTo: email,
      subject: `New inquiry from ${name}: ${subject}`,
      text: emailLines.join('\n'),
    })

    if (teamEmail.error) {
      console.error('Resend rejected the team notification', teamEmail.error)
      return {
        success: false,
        message: 'Failed to send your message. Please try again in a moment.',
      } as const
    }

    const clientEmail = await resend.emails.send({
      from: 'Place To Stand <hello@send.placetostandagency.com>',
      to: [email],
      replyTo: 'hello@placetostandagency.com',
      subject: 'Thanks for contacting Place To Stand',
      text: clientEmailLines.join('\n'),
    })

    if (clientEmail.error) {
      console.error('Resend rejected the client email', clientEmail.error)
      return {
        success: false,
        message: 'Failed to send your message. Please try again in a moment.',
      } as const
    }
  } catch (error) {
    console.error('Email sending failed', error)
    return {
      success: false,
      message: 'Failed to send confirmation email. Please try again later.',
    } as const
  }

  // Best-effort: add contact to Resend audience. Never blocks success.
  // Requires explicit opt-in — replying to an enquiry is not consent to
  // marketing, so an unticked box means we skip the audience entirely.
  if (audienceId && marketingConsent) {
    const contactPayload: {
      email: string
      audienceId: string
      unsubscribed: boolean
      firstName?: string
      lastName?: string
    } = {
      email,
      audienceId,
      unsubscribed: false,
    }

    if (firstName) {
      contactPayload.firstName = firstName
    }

    if (lastName) {
      contactPayload.lastName = lastName
    }

    try {
      const { error: contactError } =
        await resend.contacts.create(contactPayload)

      if (contactError) {
        const normalizedMessage = contactError.message?.toLowerCase() ?? ''
        const contactAlreadyExists =
          normalizedMessage.includes('already exists')

        if (!contactAlreadyExists) {
          console.error(
            'Failed to add contact to Resend audience',
            contactError
          )
        }
      }
    } catch (error) {
      console.error('Resend contact creation failed', error)
    }
  } else if (!audienceId) {
    console.warn('RESEND_AUDIENCE_ID not set; skipping audience add')
  }

  // Best-effort: record the submission in the portal. Never blocks success.
  // Leads are promoted from Submissions by hand, so nothing is created directly.
  if (submissionContext) {
    const userAgent =
      (await headers()).get('user-agent')?.slice(0, 1024) ?? null

    const payload = buildContactSubmissionPayload({
      context: submissionContext,
      contact: {
        name: trimmedName || name,
        email,
        company: trimmedCompany,
        website: validatedWebsite,
        subject,
        message: trimmedMessage,
        marketingConsent: marketingConsent ?? false,
      },
      userAgent,
    })

    const target = resolvePortalTarget(
      PORTAL_PATHS.contactSubmissions,
      process.env.CONTACT_INTAKE_TOKEN
    )

    if (target) {
      await postToPortal(target, payload, {
        submissionId: payload.submissionId,
      })
    } else {
      // Dev affordance: log rather than silently drop, so the flow is
      // verifiable locally with no portal running.
      console.info(
        'PORTAL_API_BASE_URL/CONTACT_INTAKE_TOKEN not set; contact submission not forwarded',
        JSON.stringify(payload, null, 2)
      )
    }
  } else {
    console.warn('No submission context supplied; skipping portal submission')
  }

  return {
    success: true,
  } as const
}
