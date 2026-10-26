/**
 * Facts about the business that several machine-readable surfaces share:
 * JSON-LD, page metadata, and llms.txt. Edit here and they update together.
 */
export const SITE_URL = 'https://placetostandagency.com'
export const SITE_NAME = 'Place To Stand Agency'
export const LEGAL_NAME = 'Place To Stand Agency'
export const CONTACT_EMAIL = 'hello@placetostandagency.com'

// The year the agency started working with clients. The Texas LLC came later
// (February 2026); this is the brand's start, not the legal entity's.
export const FOUNDING_YEAR = 2023

export const SITE_DESCRIPTION =
  'Off-the-shelf software is made for everyone. We build custom software, automation, and AI around how your business actually works.'

export const LOCATIONS = [
  { locality: 'Austin', region: 'TX', country: 'US' },
  { locality: 'Brooklyn', region: 'NY', country: 'US' },
] as const

/**
 * Public profiles that belong to the company itself, not to individuals.
 * Search engines and AI assistants use these to tell this Place To Stand apart
 * from other businesses with the same name, so add the LinkedIn page, Google
 * Business Profile, Bing Places, Apple Business Connect and Clutch URLs here.
 */
export const SAME_AS: string[] = [
  'https://www.linkedin.com/company/placetostandagency/',
  'https://www.google.com/search?kgmid=/g/11zd70_knp',
  'https://github.com/place-to-stand',
]

/** Build an absolute URL from a site path. */
export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString()
}
