import { z } from 'zod'
import { SUBSCRIBE_PLACEMENTS } from '@/src/lib/forms/subscribe-payload'

const nullableText = z.string().max(2048).nullable()

/**
 * What the browser posts to `/api/subscribe`. The envelope blocks are checked
 * for shape only; the portal validates them strictly and rejects anything off.
 */
export const subscribeRequestSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
  placement: z.enum(SUBSCRIBE_PLACEMENTS),
  /** The page's path, e.g. `/blog/some-post`. */
  path: z
    .string()
    .max(512)
    .regex(/^\/[^\s#?]*$/),
  context: z.object({
    submissionId: z.uuid(),
    analytics: z.object({
      posthogDistinctId: nullableText,
      posthogSessionId: nullableText,
      posthogReplayUrl: nullableText,
    }),
    attribution: z.object({
      utmSource: nullableText,
      utmMedium: nullableText,
      utmCampaign: nullableText,
      utmTerm: nullableText,
      utmContent: nullableText,
      gclid: nullableText,
      referrer: nullableText,
      landingPath: nullableText,
    }),
    client: z.object({
      viewport: z.enum(['mobile', 'tablet', 'desktop']).nullable(),
      screenWidth: z.number().int().nonnegative().nullable(),
      timezone: nullableText,
      language: nullableText,
    }),
  }),
})

export type SubscribeRequest = z.infer<typeof subscribeRequestSchema>
