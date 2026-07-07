import { HeroSection } from '@/src/components/sections/hero-section'
import { PillarsSection } from '@/src/components/sections/pillars-section'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { ManifestoSection } from '@/src/components/sections/manifesto-section'
import { ServicesPreview } from '@/src/components/sections/services-preview'
import { WhoWeWorkWithSection } from '@/src/components/sections/who-we-work-with-section'
import { ClientsPreview } from '@/src/components/sections/clients-preview'
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
      <ClientsPreview />
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
                    Tell us what you are trying to build. We will scope the work,
                    timeline, and cost, with no obligation.
                  </p>
                </Reveal>
              </div>
              <Reveal index={2} className='flex w-full shrink-0 flex-col gap-4 sm:w-auto'>
                <Button asChild size='lg' className='w-full'>
                  <Link href='/contact'>Start a Project</Link>
                </Button>
                <div className='flex flex-col gap-2'>
                  <Button asChild size='lg' variant='outline' className='w-full border-2'>
                    <Link href='/audit'>Opportunity Audit</Link>
                  </Button>
                  <p className='max-w-xs text-xs leading-relaxed text-text-muted'>
                    Not sure where to start? This two-minute audit pinpoints
                    where custom software pays off first.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
      </AnimatedSection>
    </main>
  )
}
