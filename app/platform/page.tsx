import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { OfferPageTemplate } from '@/src/components/templates/offer-page'

export const metadata: Metadata = pageMetadata({
  title: 'What we build',
  description:
    'Custom software you own: one system that runs your business, custom stores and Shopify apps that sell, and experienced engineers for teams that already write code, all sharing one home for your data.',
  path: '/platform',
})

export default function PlatformPage() {
  return <OfferPageTemplate />
}
