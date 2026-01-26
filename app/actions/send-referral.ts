'use server'

import { Resend } from 'resend'
import { checkBotId } from 'botid/server'
import {
  referralSchema,
  type ReferralFormValues,
} from '@/src/lib/validations/referral'

export type ReferralActionResult =
  | { success: true }
  | {
      success: false
      message?: string
      errors?: Partial<Record<keyof ReferralFormValues, string[]>>
    }

export async function sendReferral(
  values: ReferralFormValues
): Promise<ReferralActionResult> {
  const parsed = referralSchema.safeParse(values)
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
      console.warn('BotID blocked a referral submission attempt')

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

  if (!apiKey) {
    return {
      success: false,
      message: 'Email service is not configured. Please try again later.',
    } as const
  }

  const { name, email, phone, message } = parsed.data

  const resend = new Resend(apiKey)

  const trimmedName = name.trim()
  const [firstName] = trimmedName.split(/\s+/)
  const greetingName = firstName || trimmedName || 'there'
  const trimmedPhone = phone?.trim() || null
  const trimmedMessage = message.trim()

  // Internal notification email
  const internalEmailLines = [
    `New referral partner inquiry from ${trimmedName}`,
    '',
    'Contact Details:',
    `  Name: ${trimmedName}`,
    `  Email: ${email.trim()}`,
  ]

  if (trimmedPhone) {
    internalEmailLines.push(`  Phone: ${trimmedPhone}`)
  }

  internalEmailLines.push('', 'Message:', trimmedMessage)

  // Confirmation email to partner
  const confirmationEmailLines = [
    `Hi ${greetingName},`,
    '',
    "Thanks for reaching out about partnering with Place To Stand. We're excited to connect with you!",
    '',
    "Here's a summary of what you shared:",
    '',
    `Name: ${trimmedName}`,
    `Email: ${email.trim()}`,
  ]

  if (trimmedPhone) {
    confirmationEmailLines.push(`Phone: ${trimmedPhone}`)
  }

  confirmationEmailLines.push(
    '',
    'Message:',
    trimmedMessage,
    '',
    "We'll be in touch soon to discuss how we can work together.",
    '',
    'Best,',
    'The Place To Stand Team'
  )

  try {
    await resend.emails.send({
      from: 'Place To Stand <noreply@notifications.placetostandagency.com>',
      to: ['hello@placetostandagency.com'],
      replyTo: email.trim(),
      subject: `Referral partner inquiry from ${trimmedName}`,
      text: internalEmailLines.join('\n'),
    })

    await resend.emails.send({
      from: 'Place To Stand <noreply@notifications.placetostandagency.com>',
      to: [email.trim()],
      replyTo: 'hello@placetostandagency.com',
      subject: 'Thanks for reaching out to Place To Stand',
      text: confirmationEmailLines.join('\n'),
    })
  } catch (error) {
    console.error('Email sending failed for referral partner', error)
    return {
      success: false,
      message: 'Failed to send your message. Please try again later.',
    } as const
  }

  return {
    success: true,
  } as const
}
