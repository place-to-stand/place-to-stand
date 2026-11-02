/**
 * Choices for the optional "How did you hear about us?" question on the
 * contact form and the audit details form.
 *
 * The portal stores one plain string (`heard_from`): the choice label, or
 * "Other: <their words>". Visits from AI chatbots and word of mouth carry no
 * referrer, so analytics files them under "direct"; the visitor's own answer
 * is the only way to count them.
 */
export const HEARD_FROM_OTHER = 'Other'

export const HEARD_FROM_CHOICES = [
  'Google or another search engine',
  'ChatGPT, Claude or another AI assistant',
  'A friend, client or colleague',
  'LinkedIn',
  'Clutch or another directory',
  'An ad',
  HEARD_FROM_OTHER,
] as const

export type HeardFromChoice = (typeof HEARD_FROM_CHOICES)[number]

/** The single string sent to the portal, or null when the visitor skipped it. */
export function resolveHeardFrom(values: {
  heardFrom?: string
  heardFromOther?: string
}): string | null {
  const choice = values.heardFrom?.trim()
  if (!choice) return null
  if (choice === HEARD_FROM_OTHER) {
    const other = values.heardFromOther?.trim()
    return other
      ? `${HEARD_FROM_OTHER}: ${other}`.slice(0, 256)
      : HEARD_FROM_OTHER
  }
  return choice
}
