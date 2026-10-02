import { z } from 'zod'

const optionalString = z
  .string()
  .trim()
  .max(256, 'Must be 256 characters or fewer.')
  .optional()
  .or(z.literal(''))

export const auditLeadSchema = z.object({
  // Optional: the capture asks for an email alone, and name, company and
  // message arrive later (if at all) from the follow-up details form. The
  // portal greets a nameless lead by email address.
  name: optionalString,
  email: z.string().email('Please enter a valid email address.'),
  company: optionalString,
  // "Anything else we should know?" — free text, never required.
  message: z
    .string()
    .trim()
    .max(2000, 'Must be 2000 characters or fewer.')
    .optional()
    .or(z.literal('')),
  // Opt-in only. Absent or false means we still send the audit result, but the
  // person is never added to the marketing audience.
  marketingConsent: z.boolean().optional(),
})

export type AuditLeadValues = z.infer<typeof auditLeadSchema>

/** The capture itself: an email and the opt-in, nothing else. */
export const auditEmailSchema = auditLeadSchema.pick({
  email: true,
  marketingConsent: true,
})

export type AuditEmailValues = z.infer<typeof auditEmailSchema>

/** The optional follow-up once the email is in. Empty is not worth sending. */
export const auditDetailsSchema = auditLeadSchema
  .pick({ name: true, company: true, message: true })
  .refine(
    values =>
      [values.name, values.company, values.message].some(v => v?.trim()),
    { message: 'Add at least one detail.', path: ['message'] }
  )

export type AuditDetailsValues = z.infer<typeof auditDetailsSchema>
