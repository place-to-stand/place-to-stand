import type { Metadata } from 'next'
import { Hero } from '@/src/components/sections/hero'
import { ClientLogosSection } from '@/src/components/sections/client-logos-section'
import { ManifestoSection } from '@/src/components/sections/manifesto-section'
import { OffersSection } from '@/src/components/sections/offers'
import { ResultsSection } from '@/src/components/sections/results'
import { StepsSection } from '@/src/components/sections/process'
import { AfterLaunchSection } from '@/src/components/sections/after-launch'
import { OwnershipSection } from '@/src/components/sections/ownership'
import { Band } from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main className='flex-1'>
      <Hero variant='home' />
      {/* Dark under the hero for the logos, then alternating bands: light for
          reading sections, dark for proof. Bands pad themselves by the section
          role, so content-to-content spacing is the same everywhere. */}
      <div className='py-edge'>
        <ClientLogosSection />
      </div>
      <Band tone='light'>
        <OffersSection />
      </Band>
      <Band tone='dark'>
        <ResultsSection />
      </Band>
      <Band tone='light'>
        <StepsSection showBilling />
        <AfterLaunchSection />
      </Band>
      <Band tone='dark'>
        <OwnershipSection />
      </Band>
      <Band tone='light'>
        <ManifestoSection />
      </Band>
      <CtaBand
        location='home-cta-block'
        title="Tell us what's slowing you down."
      />
    </main>
  )
}
