import { describe, expect, it } from 'vitest'
import {
  jsonLdString,
  organizationJsonLd,
  webSiteJsonLd,
} from './structured-data'

describe('organizationJsonLd', () => {
  it('is a plain top-level Organization', () => {
    expect(organizationJsonLd['@context']).toBe('https://schema.org')
    expect(organizationJsonLd['@type']).toBe('Organization')
    expect(organizationJsonLd.name).toBe('Place To Stand')
    expect(organizationJsonLd.url).toBe('https://placetostandagency.com/')
    expect(organizationJsonLd.description.length).toBeGreaterThan(20)
  })

  it('carries a contact point with an email and a contact type', () => {
    expect(organizationJsonLd.contactPoint.length).toBeGreaterThan(0)
    for (const point of organizationJsonLd.contactPoint) {
      expect(point['@type']).toBe('ContactPoint')
      expect(point.email).toMatch(/@placetostandagency\.com$/)
      expect(point.contactType.length).toBeGreaterThan(0)
    }
  })

  it('carries a postal address for each location', () => {
    expect(organizationJsonLd.address).toHaveLength(2)
    for (const address of organizationJsonLd.address) {
      expect(address['@type']).toBe('PostalAddress')
      expect(address.addressLocality.length).toBeGreaterThan(0)
      expect(address.addressRegion.length).toBeGreaterThan(0)
      expect(address.addressCountry).toBe('US')
    }
  })

  it('lists founders and sameAs profiles', () => {
    expect(organizationJsonLd.founder.map(f => f.name)).toEqual([
      'Jason Desiderio',
      'Kris Crawford',
    ])
    expect(organizationJsonLd.sameAs.length).toBeGreaterThan(0)
  })
})

describe('webSiteJsonLd', () => {
  it('names the site and points at the organization', () => {
    expect(webSiteJsonLd['@type']).toBe('WebSite')
    expect(webSiteJsonLd.publisher['@id']).toBe(organizationJsonLd['@id'])
  })
})

describe('jsonLdString', () => {
  it('escapes < so content cannot close the script tag', () => {
    expect(jsonLdString({ a: '</script>' })).toBe('{"a":"\\u003c/script>"}')
    expect(JSON.parse(jsonLdString(organizationJsonLd))['@type']).toBe(
      'Organization'
    )
  })
})
