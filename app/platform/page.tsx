import type { Metadata } from 'next'
import { Band, PageHeader, Section } from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'
import { OffersSection } from '@/src/components/sections/offers'
import { OwnershipSection } from '@/src/components/sections/ownership'
import { AfterLaunchSection } from '@/src/components/sections/after-launch'
import { pageMetadata } from '@/src/lib/page-metadata'
import { JsonLd } from '@/src/components/seo/json-ld'
import { servicesJsonLd } from '@/src/lib/structured-data'
import { MOBILE_APPS } from '@/src/lib/offers'

export const metadata: Metadata = pageMetadata({
  title: 'What we build',
  description:
    'Custom operations software and Shopify development: one system that runs your business, stores that sell, and a model-agnostic MCP server with role-based access control, all on one source of data you own.',
  path: '/platform',
})

export default function PlatformPage() {
  return (
    <main className='flex-1 pt-page-start'>
      <JsonLd data={servicesJsonLd} />
      <Section priority className='pb-grid-2'>
        <PageHeader
          label='Platform'
          title='Software you own, built around your business.'
          intro={`We build two kinds of systems: ones that run the business and ones that sell. Each piece works on its own, and they all share one source of data. ${MOBILE_APPS}`}
        />
      </Section>
      <Band tone='light'>
        <OffersSection variant='detail' />
      </Band>
      <Band tone='dark'>
        <OwnershipSection />
      </Band>
      <Band tone='light'>
        <AfterLaunchSection variant='detail' />
      </Band>
      <CtaBand
        location='platform-cta-block'
        title="Tell us what's slowing you down."
      />
    </main>
  )
}
