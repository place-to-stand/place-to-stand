import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { Band, PageHeader, Section } from '@/src/components/layout/section'
import { CtaBand } from '@/src/components/layout/cta-band'
import {
  ClientsSection,
  FeaturedCaseStudy,
} from '@/src/components/sections/clients-section'

export const metadata: Metadata = pageMetadata({
  title: 'Clients',
  description:
    "Some of the brands we've built software for: Shopify stores, custom marketplaces, and the systems that run them.",
  path: '/clients',
})

export default function ClientsPage() {
  return (
    <main className='flex-1 pt-page-start'>
      <Section priority className='pb-section'>
        <PageHeader
          label='Selected Clients'
          title='Who we build for'
          intro="Some of the brands we've built software for."
        />
      </Section>
      {/* Proof first: the case study clients, dark, then the rest of the
          roster on a light band. */}
      <Section id='case-study' className='scroll-mt-24 pb-band-pad'>
        <FeaturedCaseStudy />
      </Section>
      <Band tone='light'>
        <Section id='clients' className='scroll-mt-24'>
          <ClientsSection />
        </Section>
      </Band>
      <CtaBand location='clients-cta-block' />
    </main>
  )
}
