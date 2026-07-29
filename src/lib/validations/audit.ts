import { z } from 'zod'

const optionalString = z
  .string()
  .trim()
  .max(256, 'Must be 256 characters or fewer.')
  .optional()
  .or(z.literal(''))

export const auditLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  company: optionalString,
  // Opt-in only. Absent or false means we still send the audit result, but the
  // person is never added to the marketing audience.
  marketingConsent: z.boolean().optional(),
})

export type AuditLeadValues = z.infer<typeof auditLeadSchema>
