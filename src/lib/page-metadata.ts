import type { Metadata } from 'next'
import { SITE_NAME } from '@/src/lib/site'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  /** Share title, when it should differ from `title | Place To Stand`. */
  shareTitle?: string
}

/**
 * Metadata for one page with og:url equal to its canonical URL. A page that
 * sets only `alternates.canonical` inherits the root layout's og:url of `/`,
 * which tells crawlers and link previews that every page is the home page.
 */
export function pageMetadata({
  title,
  description,
  path,
  shareTitle,
}: PageMetadataInput): Metadata {
  const fullTitle = shareTitle ?? `${title} | ${SITE_NAME}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      // Setting openGraph here drops the root opengraph-image file, so name it.
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/twitter-image'],
    },
  }
}
