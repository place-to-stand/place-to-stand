import type { MetadataRoute } from 'next'
import { getAllPostSlugs, getPostBySlug } from '@/src/lib/blog'

const sections = ['home', 'clients', 'how-it-works', 'contact']

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
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/book-a-call`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rsvp`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // One sitemap entry per blog post. Reading frontmatter for `lastModified`
  // keeps the date accurate per-post rather than always now().
  const blogPages: MetadataRoute.Sitemap = getAllPostSlugs().map(slug => {
    const post = getPostBySlug(slug)
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: post ? new Date(post.date) : lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    }
  })

  return [...hashLinks, ...standalonePages, ...blogPages]
}
