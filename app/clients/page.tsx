import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { Band, Section } from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'
import { ClientsSection } from '@/src/components/sections/clients-section'
import { ResultsSection } from '@/src/components/sections/results'
import { Hero } from '@/src/components/sections/hero'

export const metadata: Metadata = pageMetadata({
  title: 'Clients',
  description:
    "Some of the brands we've built software for: Shopify stores, custom marketplaces, and the systems that run them.",
  path: '/clients',
})

export default function ClientsPage() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <Hero
        variant='page'
        sectionClassName='pb-section'
        label='Selected Clients'
        title='Who we build for'
        intro="Some of the brands we've built software for."
      />
      {/* Proof first: the case study clients, dark, then the rest of the
          roster on a light band. */}
      <Section id='case-study' className='scroll-mt-24 pb-band-pad'>
        <ResultsSection variant='featured' />
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
