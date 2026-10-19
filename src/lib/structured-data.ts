import { services } from '@/src/lib/services'
import { team, type TeamMember } from '@/src/lib/team'
import {
  CONTACT_EMAIL,
  FOUNDING_YEAR,
  LEGAL_NAME,
  LOCATIONS,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/src/lib/site'

/**
 * JSON-LD for the site. One Organization with a stable @id, referenced by the
 * WebSite, the founders and every Service, so search engines and AI assistants
 * see one company with one set of facts on every page.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`

function personId(member: TeamMember): string {
  return `${SITE_URL}/team#${member.name.toLowerCase().replace(/\s+/g, '-')}`
}

function personJsonLd(member: TeamMember) {
  return {
    '@type': 'Person',
    '@id': personId(member),
    name: member.name,
    jobTitle: member.title,
    description: member.bio,
    image: absoluteUrl(member.image),
    url: absoluteUrl('/team'),
    worksFor: { '@id': ORGANIZATION_ID },
    sameAs: Object.values(member.socials).filter(Boolean),
  }
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  alternateName: ['Place To Stand Agency', 'placetostandagency.com'],
  url: `${SITE_URL}/`,
  logo: absoluteUrl('/icon.png'),
  image: absoluteUrl('/opengraph-image'),
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  foundingDate: String(FOUNDING_YEAR),
  knowsAbout: [
    'Custom software development',
    'Workflow automation',
    'AI agents',
    'Internal tools',
    'Customer portals',
    'Shopify development',
    'Systems integration',
  ],
  areaServed: { '@type': 'Country', name: 'United States' },
  address: LOCATIONS.map(location => ({
    '@type': 'PostalAddress',
    addressLocality: location.locality,
    addressRegion: location.region,
    addressCountry: location.country,
  })),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: CONTACT_EMAIL,
    url: absoluteUrl('/contact'),
    availableLanguage: 'English',
    areaServed: 'US',
  },
  founder: team.map(member => ({ '@id': personId(member) })),
  sameAs: SAME_AS,
}

export const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: { '@id': ORGANIZATION_ID },
}

/** The founders as Person entries, for the team page. */
export const teamJsonLd = {
  '@context': 'https://schema.org',
  '@graph': team.map(personJsonLd),
}

/** The services list as Service entries offered by the company. */
export const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: 'United States' },
    },
  })),
}

/** Serialize for a `<script type="application/ld+json">` without letting a
 * `</script>` in content end the tag early. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
