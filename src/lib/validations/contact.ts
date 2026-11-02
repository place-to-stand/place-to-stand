import { z } from 'zod'
import {
  CONTACT_SUBJECT_OTHER,
  CONTACT_SUBJECTS,
} from '@/src/lib/forms/contact-subjects'
import { HEARD_FROM_CHOICES } from '@/src/lib/forms/heard-from'

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

export const contactSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    company: optionalString,
    website: optionalUrl,
    subject: z.enum(CONTACT_SUBJECTS, { message: 'Please choose a subject.' }),
    // Only read when `subject` is "Other"; the refinement below makes it
    // required in that case.
    subjectOther: optionalString,
    message: z.string().min(10, 'Message must be at least 10 characters.'),
    // Opt-in only. Absent or false means we reply to the enquiry but never add
    // the person to the marketing audience.
    marketingConsent: z.boolean().optional(),
    // "How did you hear about us?" Never required; "" means skipped.
    heardFrom: z.enum(HEARD_FROM_CHOICES).optional().or(z.literal('')),
    // Only read when `heardFrom` is "Other".
    heardFromOther: optionalString,
  })
  .superRefine((values, ctx) => {
    if (
      values.subject === CONTACT_SUBJECT_OTHER &&
      !values.subjectOther?.trim()
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['subjectOther'],
        message: 'Please tell us what your message is about.',
      })
    }
  })

export type ContactFormValues = z.infer<typeof contactSchema>
