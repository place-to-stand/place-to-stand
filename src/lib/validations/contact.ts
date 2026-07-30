import { z } from 'zod'

const optionalString = z
  .string()
  .trim()
  .max(256, 'Must be 256 characters or fewer.')
  .optional()
  .or(z.literal(''))

// Website validation happens server-side after URL normalization
const optionalUrl = z
  .string()
  .trim()
  .max(256, 'Must be 256 characters or fewer.')
  .optional()
  .or(z.literal(''))

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  company: optionalString,
  website: optionalUrl,
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  // Opt-in only. Absent or false means we reply to the enquiry but never add
  // the person to the marketing audience.
  marketingConsent: z.boolean().optional(),
})

export type ContactFormValues = z.infer<typeof contactSchema>
