/**
 * Subject presets for the contact form.
 *
 * The stored value is always a plain string: the preset label, or whatever the
 * visitor typed after choosing "Other". Keeping it a string (not an enum) means
 * the portal never has to learn a new taxonomy when this list changes.
 *
 * Other pages can preselect a subject by linking to
 * `/contact?subject=Referral%20Program`; an unknown value lands in "Other" with
 * the text filled in.
 */
export const CONTACT_SUBJECT_OTHER = 'Other'

export const CONTACT_SUBJECTS = [
  'New project',
  'Referral Program',
  'General question',
  CONTACT_SUBJECT_OTHER,
] as const

export type ContactSubjectPreset = (typeof CONTACT_SUBJECTS)[number]

export function isContactSubjectPreset(
  value: string
): value is ContactSubjectPreset {
  return (CONTACT_SUBJECTS as readonly string[]).includes(value)
}

/** The single string that goes into emails and the portal's `subject` column. */
export function resolveContactSubject(values: {
  subject: string
  subjectOther?: string
}): string {
  if (values.subject === CONTACT_SUBJECT_OTHER) {
    return values.subjectOther?.trim() || CONTACT_SUBJECT_OTHER
  }
  return values.subject
}

/** Map a `?subject=` query value onto the form's two subject fields. */
export function subjectFromQuery(
  raw: string | null
): { subject: ContactSubjectPreset; subjectOther: string } | null {
  const trimmed = raw?.trim().slice(0, 256) ?? ''
  if (!trimmed) return null
  if (isContactSubjectPreset(trimmed)) {
    return { subject: trimmed, subjectOther: '' }
  }
  return { subject: CONTACT_SUBJECT_OTHER, subjectOther: trimmed }
}
