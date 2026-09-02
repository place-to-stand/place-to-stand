import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Generated on every request; the page at /referral is the canonical copy.
      disallow: '/referral/pdf',
    },
    sitemap: 'https://placetostandagency.com/sitemap.xml',
  }
}
