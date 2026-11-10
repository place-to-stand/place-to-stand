import type { Metadata } from 'next'
import { HeroSection } from '@/src/components/sections/hero-section'
import { ClientLogosSection } from '@/src/components/sections/client-logos-section'
import { ManifestoSection } from '@/src/components/sections/manifesto-section'
import {
  AfterLaunchSection,
  OffersSection,
  OwnershipSection,
  ResultsSection,
  StepsSection,
} from '@/src/components/sections/home-story'
import { Band } from '@/src/components/layout/section'
import { CtaBand } from '@/src/components/layout/cta-band'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
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
