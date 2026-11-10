import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { OfferPageTemplate } from '@/src/components/templates/offer-page'

export const metadata: Metadata = pageMetadata({
  title: 'What we build',
  description:
    'Custom operations software and Shopify development: one system that runs your business, stores that sell, and a model-agnostic MCP server with role-based access control, all on one source of data you own.',
  path: '/platform',
})

export default function PlatformPage() {
  return <OfferPageTemplate />
}
