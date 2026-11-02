import type { Metadata } from 'next'
import { HeroSection } from '@/src/components/sections/hero-section'
import { ClientLogosSection } from '@/src/components/sections/client-logos-section'
import { PillarsSection } from '@/src/components/sections/pillars-section'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { ManifestoSection } from '@/src/components/sections/manifesto-section'
import { ServicesPreview } from '@/src/components/sections/services-preview'
import { WhoWeWorkWithSection } from '@/src/components/sections/who-we-work-with-section'
// Temporarily unlinked — Field Notes content in progress, restore in a future update
// import { FieldNotesPreview } from '@/src/components/sections/field-notes-preview'

import { CtaBand } from '@/src/components/layout/cta-band'

// Home targets "ai development agency", "custom business software" and
// "custom software development austin" (keyword shortlist, Nov 2 2026).
const homeTitle =
  'Place To Stand Agency | AI Development Agency & Custom Business Software'
const homeDescription =
  'An AI development agency in Austin, TX. We build custom business software, automation and AI around how your business actually runs.'

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: '/' },
  openGraph: { title: homeTitle, description: homeDescription, url: '/' },
  twitter: { title: homeTitle, description: homeDescription },
}

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      {/* The page owns the space between sections: the edge role under the
          hero's bottom line and above the callout's dots, the section role
          between sections. Sections themselves carry no outer padding. */}
      <div className='flex flex-col gap-section py-edge'>
        <ClientLogosSection />
        <WhoWeWorkWithSection />
        <PhasesSection showPoweredBy showAuditLink />
        <ServicesPreview />
        <ManifestoSection />
        <PillarsSection />
        {/* Field Notes section temporarily removed — content in progress, restore in a future update */}
      </div>

      <CtaBand location='home-cta-block' />
    </main>
  )
}
