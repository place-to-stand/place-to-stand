'use server'

import { Resend } from 'resend'
import { checkBotId } from 'botid/server'
import {
  auditLeadSchema,
  type AuditLeadValues,
} from '@/src/lib/validations/audit'
import type { AuditAnswers, AuditResult } from '@/src/lib/audit/types'
import { summarizeAnswers } from '@/src/lib/audit/summarize-answers'
import {
  renderAuditClientEmail,
  renderAuditTeamEmail,
} from '@/src/lib/emails/audit-emails'

/**
 * Why a submission failed. Returned to the client so it can report the cause to
 * PostHog: without this every failure looks identical to an ordinary drop-off.
 */
export type AuditFailureReason =
  | 'validation'
  | 'botid_blocked'
  | 'botid_error'
  | 'not_configured'
  /** Resend accepted the request and answered with an error object. */
  | 'email_rejected'
  /** The request never reached Resend, or it threw for another reason. */
  | 'email_threw'

export type AuditActionResult =
  | { success: true }
  | {
      success: false
      reason: AuditFailureReason
      message?: string
      errors?: Partial<Record<keyof AuditLeadValues, string[]>>
    }

/** Render the scored audit into plain-text lines for emails and the lead note. */
function summarizeResult(result: AuditResult): string[] {
  const lines = [
    `Phase: ${result.phase.name} (${result.phase.tagline})`,
    result.summary,
  ]

  if (result.recommendations.length > 0) {
    lines.push('', 'Recommended opportunities:')
    result.recommendations.forEach((rec, index) => {
      lines.push(`${index + 1}. ${rec.service.name}`)
      if (rec.reasons.length > 0) {
        lines.push(`   Because they said: ${rec.reasons.join(', ')}`)
      }
    })
  }

  return lines
}

export async function sendAudit(
  values: AuditLeadValues,
  result: AuditResult,
  answers: AuditAnswers,
  /** Links this lead to its stored audit response row in the portal. */
  auditSessionId?: string | null
): Promise<AuditActionResult> {
  const parsed = auditLeadSchema.safeParse(values)
  if (!parsed.success) {
    return {
      success: false,
      reason: 'validation',
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

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey) {
    return {
      success: false,
      reason: 'not_configured',
      message: 'Email service is not configured. Please try again later.',
    } as const
  }

  const { name, email, company, message, marketingConsent } = parsed.data

  const resend = new Resend(apiKey)

  const trimmedName = name.trim()
  const [firstName, ...restOfName] = trimmedName.split(/\s+/)
  const lastName = restOfName.join(' ').trim()
  const trimmedCompany = company?.trim() || null
  const trimmedMessage = message?.trim() || null
  const greetingName = firstName || trimmedName || 'there'

  const resultLines = summarizeResult(result)

  const detailLines = [`Name: ${name}`, `Email: ${email}`]

  if (trimmedCompany) {
    detailLines.push(`Company: ${trimmedCompany}`)
  }

  if (trimmedMessage) {
    detailLines.push(
      '',
      'Additional context:',
      ...trimmedMessage.split(/\r?\n/)
    )
  }

  detailLines.push('', 'Opportunity Audit result:', ...resultLines)

  if (auditSessionId) {
    detailLines.push('', `Audit session: ${auditSessionId}`)
  }

  const answerGroups = summarizeAnswers(answers)
  if (answerGroups.length > 0) {
    detailLines.push('', 'All responses:')
    answerGroups.forEach(group => {
      detailLines.push('', group.section)
      group.items.forEach(item => {
        detailLines.push(`- ${item.prompt}`, `  ${item.answer}`)
      })
    })
  }

  const clientEmailLines = [
    `Hi ${greetingName},`,
    '',
    "Thanks for taking the Place To Stand Opportunity Audit. Here's what your answers pointed to:",
    '',
    ...resultLines,
    '',
    'Ready to start? Just reply to this email and we will take it from there.',
    '',
    'Talk soon,',
    'The Place To Stand Team',
  ]

  // Send emails first: this is the core deliverable. If it fails, surface the
  // error so the user can retry; everything below is best-effort enrichment.
  //
  // Resend does NOT throw on API errors. It resolves with `{ data: null, error }`
  // for anything non-2xx (rate limit, suppressed recipient, domain problem), and
  // only rejects on a network-level failure. An unchecked `await` here reports
  // success while sending nothing, which is exactly the bug this replaced. Check
  // `.error` on every send.
  try {
    const teamEmail = await resend.emails.send({
      from: 'Place To Stand <hello@send.placetostandagency.com>',
      to: ['hello@placetostandagency.com'],
      replyTo: email,
      subject: `New Opportunity Audit from ${name}`,
      text: detailLines.join('\n'),
      html: renderAuditTeamEmail({
        name,
        email,
        company: trimmedCompany,
        message: trimmedMessage,
        result,
        answers,
      }),
    })

    if (teamEmail.error) {
      console.error('Resend rejected the team notification', teamEmail.error)
      return {
        success: false,
        reason: 'email_rejected',
        message: 'Failed to send your audit. Please try again in a moment.',
      } as const
    }

    const clientEmail = await resend.emails.send({
      from: 'Place To Stand <hello@send.placetostandagency.com>',
      to: [email],
      replyTo: 'hello@placetostandagency.com',
      subject: 'Your Place To Stand Opportunity Audit',
      text: clientEmailLines.join('\n'),
      html: renderAuditClientEmail({ greetingName, result }),
    })

    // The team mail already landed, so a retry sends them a duplicate. A
    // duplicate lead notification is strictly better than the visitor believing
    // a result is on its way when none is.
    if (clientEmail.error) {
      console.error('Resend rejected the client email', clientEmail.error)
      return {
        success: false,
        reason: 'email_rejected',
        message: 'Failed to send your audit. Please try again in a moment.',
      } as const
    }
  } catch (error) {
    console.error('Email sending failed', error)
    return {
      success: false,
      reason: 'email_threw',
      message: 'Failed to send confirmation email. Please try again later.',
    } as const
  }

  // Best-effort: add contact to Resend audience. Never blocks success.
  // Requires explicit opt-in — asking for audit results is not consent to
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

  // The portal record for this audit is created by the progress pushes in
  // `useAudit`, not here. A successful capture fires a `captured` push carrying
  // the lead details, which upserts onto the same `sessionId` row. Nothing in
  // this action talks to the portal.

  return {
    success: true,
  } as const
}
