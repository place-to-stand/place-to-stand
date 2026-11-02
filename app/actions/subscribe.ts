'use server'

import { checkBotId } from 'botid/server'
import { z } from 'zod'

export type SubscribeState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string }

const subscribeSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
})

/**
 * Blog subscribe form. Submitting is the consent: the form says that signing
 * up means new posts and occasional marketing email.
 *
 * TODO: delivery is not wired yet. The portal owns the marketing audience
 * (docs/prds/005-form-submissions), but has no subscribe endpoint. Until it
 * does, development logs the address and reports success, and production
 * reports failure so no signup is silently dropped.
 */
export async function subscribe(
  _previous: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const parsed = subscribeSchema.safeParse({ email: formData.get('email') })
  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? 'Please check your email.',
    }
  }

  try {
    const verification = await checkBotId({
      advancedOptions: { checkLevel: 'basic' },
    })
    if (verification.isBot) {
      console.warn('BotID blocked a subscribe attempt')
      return {
        status: 'error',
        message:
          "We couldn't verify your request. Please refresh and try again.",
      }
    }
  } catch (error) {
    console.error('BotID verification failed', error)
    return {
      status: 'error',
      message:
        'Unable to verify your request right now. Please try again later.',
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('Blog subscribe (not forwarded):', parsed.data.email)
    return { status: 'success' }
  }

  console.error('Blog subscribe has no delivery path configured')
  return {
    status: 'error',
    message:
      "We couldn't sign you up. Please email hello@placetostandagency.com and we'll add you.",
  }
}
