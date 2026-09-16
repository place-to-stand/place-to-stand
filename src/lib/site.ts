/**
 * Facts about the business that several machine-readable surfaces share:
 * JSON-LD, llms.txt, the markdown renditions of each page, and the 404 page.
 * Edit here and every surface updates together.
 */
export const SITE_URL = 'https://placetostandagency.com'
export const SITE_NAME = 'Place To Stand'
export const LEGAL_NAME = 'Place To Stand Agency'
export const CONTACT_EMAIL = 'hello@placetostandagency.com'

export const SITE_DESCRIPTION =
  'Off-the-shelf software is made for everyone. We build custom software, automation, and AI around how your business actually works.'

export const LOCATIONS = [
  { locality: 'Austin', region: 'TX', country: 'US' },
  { locality: 'Brooklyn', region: 'NY', country: 'US' },
] as const

/** Public profiles that belong to the company itself, not to individuals. */
export const SAME_AS = ['https://github.com/place-to-stand'] as const

/** Build an absolute URL from a site path. */
export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString()
}
