import { HeroSection } from '@/src/components/sections/hero-section'
import { PillarsSection } from '@/src/components/sections/pillars-section'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { ManifestoSection } from '@/src/components/sections/manifesto-section'
import { ServicesPreview } from '@/src/components/sections/services-preview'
import { WhoWeWorkWithSection } from '@/src/components/sections/who-we-work-with-section'
// Temporarily unlinked — Field Notes content in progress, restore in a future update
// import { FieldNotesPreview } from '@/src/components/sections/field-notes-preview'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      <PhasesSection /> 
      <WhoWeWorkWithSection /> 
      <PillarsSection />
      <ManifestoSection />  
      <ServicesPreview />
      {/* Field Notes section temporarily removed — content in progress, restore in a future update */}

      {/* CTA Block — blueprint detail callout */}
      <AnimatedSection className='py-16 md:py-32'>
        <div className='relative border border-border bg-bg-card p-6 md:p-16'>
            {/* Corner marks */}
            <span className='pointer-events-none absolute -left-px -top-px z-10 h-5 w-5 border-l border-t border-accent' aria-hidden />
            <span className='pointer-events-none absolute -bottom-px -right-px z-10 h-5 w-5 border-b border-r border-accent' aria-hidden />
            <span className='pointer-events-none absolute -right-px -top-px z-10 h-5 w-5 border-r border-t border-accent' aria-hidden />
            <span className='pointer-events-none absolute -bottom-px -left-px z-10 h-5 w-5 border-b border-l border-accent' aria-hidden />
            <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-3'>
                <Reveal index={0} className='flex flex-col gap-3'>
                  <span className='bp-label font-mono'>Next Step</span>
                  <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
                    Ready to build?
                  </h2>
                </Reveal>
                <Reveal index={1} className='max-w-md text-sm leading-relaxed text-text-muted'>
                  <p>
                    Not sure where to start? The Opportunity Audit maps the phase
                    your business is in and pinpoints where custom software would
                    pay off first, in about two minutes.
                  </p>
                </Reveal>
              </div>
              <Reveal index={2} className='flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row'>
                <Button asChild size='lg' className='w-full sm:w-auto'>
                  <Link href='/contact'>Start a Project</Link>
                </Button>
                <Button asChild size='lg' variant='outline' className='w-full sm:w-auto'>
                  <Link href='/audit'>Opportunity Audit</Link>
                </Button>
              </Reveal>
            </div>
          </div>
      </AnimatedSection>
    </main>
  )
}
