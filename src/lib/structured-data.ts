import { team } from '@/src/lib/team'
import {
  CONTACT_EMAIL,
  LEGAL_NAME,
  LOCATIONS,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/src/lib/site'

/**
 * JSON-LD for the site. `Organization` carries the identity, contact point,
 * and addresses an agent needs to verify the business; `WebSite` names the
 * site itself. Both are plain top-level types (no `@graph`) so simple parsers
 * find them.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  alternateName: 'Place To Stand Agency',
  url: `${SITE_URL}/`,
  logo: absoluteUrl('/icon.png'),
  image: absoluteUrl('/opengraph-image'),
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  slogan: 'Off-the-shelf software is built for everyone. We build for you.',
  knowsAbout: [
    'Custom software development',
    'Workflow systems',
    'Business process automation',
    'AI agents',
    'Data intelligence',
    'Fractional CTO services',
    'Managed services',
  ],
  areaServed: 'US',
  address: LOCATIONS.map(location => ({
    '@type': 'PostalAddress',
    addressLocality: location.locality,
    addressRegion: location.region,
    addressCountry: location.country,
  })),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT_EMAIL,
      url: absoluteUrl('/contact'),
      availableLanguage: 'English',
      areaServed: 'US',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      url: absoluteUrl('/contact'),
      availableLanguage: 'English',
    },
  ],
  founder: team.map(member => ({
    '@type': 'Person',
    name: member.name,
    jobTitle: member.title,
    sameAs: Object.values(member.socials),
  })),
  sameAs: [...SAME_AS],
} as const

export const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: { '@id': ORGANIZATION_ID },
} as const

/** Serialize for a `<script type="application/ld+json">` without letting a
 * `</script>` in content end the tag early. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
