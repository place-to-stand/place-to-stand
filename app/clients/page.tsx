import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { PageHeader, Section } from '@/src/components/layout/section'
import { CtaBand } from '@/src/components/layout/cta-band'
import { ClientsSection } from '@/src/components/sections/clients-section'

export const metadata: Metadata = pageMetadata({
  title: 'Clients',
  description:
    "A selection of the brands we've partnered with to design, build, and ship software that earns its keep.",
  path: '/clients',
})

export default function ClientsPage() {
  return (
    <main className='flex-1 pt-page-start'>
      <div className='pb-edge'>
        <Section priority id='clients' className='flex flex-col gap-header'>
          <PageHeader
            label='Selected Clients'
            title='Who we build for'
            intro="A selection of the brands we've partnered with to design, build, and ship software that earns its keep."
          />
          <ClientsSection />
        </Section>
      </div>
      <CtaBand location='clients-cta-block' />
    </main>
  )
}
