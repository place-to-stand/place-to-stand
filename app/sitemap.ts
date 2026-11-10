import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/src/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://placetostandagency.com'
  // Pages carry no lastModified: a build timestamp marks every URL as changed
  // on every deploy, which teaches crawlers to ignore the field entirely.
  // Blog posts use their publish date, which only changes with the post.
  const posts = getAllPosts()

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/platform`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/audit`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Temporarily unlinked — Field Notes content in progress, restore in a future update
    // {
    //   url: `${baseUrl}/field-notes`,
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/clients`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/clients/heatonist`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/process`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/referral`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
