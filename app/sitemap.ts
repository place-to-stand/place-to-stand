import type { MetadataRoute } from 'next'

const sections = [
  'home',
  'clients',
  'how-it-works',
  'contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.placetostandagency.com'
  const lastModified = new Date()

  const hashLinks: MetadataRoute.Sitemap = sections.map(section => ({
    url: `${baseUrl}/#${section}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const standalonePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/case-studies`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rsvp`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  return [...hashLinks, ...standalonePages]
}
