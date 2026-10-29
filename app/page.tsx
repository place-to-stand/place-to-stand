import type { Metadata } from 'next'
import { HeroSection } from '@/src/components/sections/hero-section'
import { ClientLogosSection } from '@/src/components/sections/client-logos-section'
import { PillarsSection } from '@/src/components/sections/pillars-section'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { ManifestoSection } from '@/src/components/sections/manifesto-section'
import { ServicesPreview } from '@/src/components/sections/services-preview'
import { WhoWeWorkWithSection } from '@/src/components/sections/who-we-work-with-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
// Temporarily unlinked — Field Notes content in progress, restore in a future update
// import { FieldNotesPreview } from '@/src/components/sections/field-notes-preview'
import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      <ClientLogosSection />
      <WhoWeWorkWithSection />
      <PhasesSection
        showPoweredBy
        showAuditLink
        largeHeading
        className='py-12 md:py-16 lg:py-20'
      />
      <ServicesPreview />
      <ManifestoSection />
      <PillarsSection />
      {/* Field Notes section temporarily removed — content in progress, restore in a future update */}

      {/* Homepage rhythm: sections are 96 / 128 / 160px apart (phone / tablet /
          laptop up) and the two edges, under the hero line and above this
          callout's dots, are 72 / 96 / 120px, 3/4 of that.
          CTA Block — blueprint detail callout. The dots' top rule sits one edge
          gap under the section above: that section's bottom padding plus the
          extra here on top of --band-pad. The bottom equals --band-pad. */}
      <AnimatedSection className='pt-24 pb-grid-3 md:pt-32 md:pb-grid-4 lg:pt-34'>
        <div className='dots-band bg-bg-card p-5 md:p-16'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-3 md:gap-4'>
              <Reveal index={0} className='flex flex-col gap-2.25 md:gap-3'>
                <span className='bp-label font-mono'>Next Step</span>
                <h2 className='font-headline text-4xl leading-[0.95] font-bold tracking-tight text-text md:text-5xl'>
                  Find where to start.
                </h2>
              </Reveal>
              <Reveal index={1} className='max-w-md text-base text-text-muted'>
                <p>
                  The free audit pinpoints the phase your business is in and
                  where custom software pays off first. Two minutes, results on
                  screen, no obligation.
                </p>
              </Reveal>
            </div>
            <Reveal
              index={2}
              className='flex w-full shrink-0 flex-col gap-4 sm:w-auto'
            >
              <Button asChild size='lg' className='w-full'>
                <TrackedLink href='/audit' location='home-cta-block'>
                  Start the free audit
                </TrackedLink>
              </Button>
              <div className='flex flex-col gap-2'>
                <Button
                  asChild
                  size='lg'
                  variant='outline'
                  className='w-full border-2'
                >
                  <TrackedLink href='/contact' location='home-cta-block'>
                    Contact Us
                  </TrackedLink>
                </Button>
                <p className='max-w-xs text-sm text-text-muted'>
                  Already know what you want built, or want a bespoke mapping of
                  your systems? Talk to us directly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
