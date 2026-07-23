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

const WEBSITE_SOURCE_DETAIL = 'https://placetostandagency.com/audit'

export type AuditActionResult =
  | { success: true }
  | {
      success: false
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
  answers: AuditAnswers
): Promise<AuditActionResult> {
  const parsed = auditLeadSchema.safeParse(values)
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
      console.warn('BotID blocked an audit submission attempt')

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
  const portalLeadsEndpoint = process.env.PORTAL_LEADS_ENDPOINT
  const portalLeadsToken = process.env.PORTAL_LEADS_TOKEN

  if (!apiKey) {
    return {
      success: false,
      message: 'Email service is not configured. Please try again later.',
    } as const
  }

  const { name, email, company } = parsed.data

  const resend = new Resend(apiKey)

  const trimmedName = name.trim()
  const [firstName, ...restOfName] = trimmedName.split(/\s+/)
  const lastName = restOfName.join(' ').trim()
  const trimmedCompany = company?.trim() || null
  const greetingName = firstName || trimmedName || 'there'

  const resultLines = summarizeResult(result)

  const detailLines = [`Name: ${name}`, `Email: ${email}`]

  if (trimmedCompany) {
    detailLines.push(`Company: ${trimmedCompany}`)
  }

  detailLines.push('', 'Opportunity Audit result:', ...resultLines)

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

  // Send emails first — this is the core deliverable. If it fails, surface the
  // error so the user can retry; everything below is best-effort enrichment.
  try {
    await resend.emails.send({
      from: 'Place To Stand <noreply@notifications.placetostandagency.com>',
      to: ['hello@placetostandagency.com'],
      replyTo: email,
      subject: `New Opportunity Audit from ${name}`,
      text: detailLines.join('\n'),
      html: renderAuditTeamEmail({
        name,
        email,
        company: trimmedCompany,
        result,
        answers,
      }),
    })

    await resend.emails.send({
      from: 'Place To Stand <noreply@notifications.placetostandagency.com>',
      to: [email],
      replyTo: 'hello@placetostandagency.com',
      subject: 'Your Place To Stand Opportunity Audit',
      text: clientEmailLines.join('\n'),
      html: renderAuditClientEmail({ greetingName, result }),
    })
  } catch (error) {
    console.error('Email sending failed', error)
    return {
      success: false,
      message: 'Failed to send confirmation email. Please try again later.',
    } as const
  }

  // Best-effort: add contact to Resend audience. Never blocks success.
  if (audienceId) {
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
  } else {
    console.warn('RESEND_AUDIENCE_ID not set; skipping audience add')
  }

  // Best-effort: create lead in portal. Never blocks success.
  if (portalLeadsEndpoint && portalLeadsToken) {
    const portalPayload = {
      name: trimmedName || name,
      email,
      company: trimmedCompany,
      website: null,
      message: ['Opportunity Audit result:', ...resultLines].join('\n'),
      sourceDetail: WEBSITE_SOURCE_DETAIL,
    }

    try {
      const portalResponse = await fetch(portalLeadsEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${portalLeadsToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portalPayload),
      })

      if (!portalResponse.ok) {
        const errorText = await portalResponse.text()
        console.error('Failed to create portal lead', {
          status: portalResponse.status,
          statusText: portalResponse.statusText,
          body: errorText,
          payload: portalPayload,
        })
      }
    } catch (error) {
      console.error('Portal lead creation failed', error)
    }
  } else {
    console.warn('Portal lead endpoint/token not set; skipping portal lead')
  }

  return {
    success: true,
  } as const
}
