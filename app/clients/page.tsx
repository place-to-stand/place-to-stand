import type { Metadata } from 'next'
import { TrackedLink } from '@/src/components/tracked-link'
import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { ClientsSection } from '@/src/components/sections/clients-section'

export const metadata: Metadata = {
  title: 'Clients',
  description:
    "A selection of the brands we've partnered with to design, build, and ship software that earns its keep.",
}

export default function ClientsPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      {/* Heading, client cards, and CTA tile, one section separated by gaps */}
      <AnimatedSection
        id='clients'
        className='flex flex-col gap-grid-3 md:gap-grid-4'
      >
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>Selected Clients</span>
          <h1 className='max-w-4xl font-headline text-4xl leading-[.9]! font-semibold text-balance text-text uppercase md:text-6xl'>
            Who We Build For
          </h1>
          <p className='max-w-2xl text-base text-balance text-text-muted md:text-lg'>
            A selection of the brands we&apos;ve partnered with to design,
            build, and ship software that earns its keep.
          </p>
        </div>

        <ClientsSection />

        {/* CTA Block */}
        <div className='relative border border-border bg-bg-card p-6 md:p-16'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-3'>
              <Reveal index={0} className='flex flex-col gap-3'>
                <span className='bp-label font-mono'>Next Step</span>
                <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
                  Ready to build?
                </h2>
              </Reveal>
              <Reveal
                index={1}
                className='max-w-md text-sm leading-relaxed text-text-muted'
              >
                <p>
                  Tell us what you are trying to build. We will scope the work,
                  timeline, and cost, with no obligation.
                </p>
              </Reveal>
            </div>
            <Reveal
              index={2}
              className='flex w-full shrink-0 flex-col gap-4 sm:w-auto'
            >
              <Button asChild size='lg' className='w-full'>
                <TrackedLink href='/contact' location='clients-cta-block'>
                  Start a Project
                </TrackedLink>
              </Button>
              <div className='flex flex-col gap-2'>
                <Button
                  asChild
                  size='lg'
                  variant='outline'
                  className='w-full border-2'
                >
                  <TrackedLink href='/audit' location='clients-cta-block'>
                    Opportunity Audit
                  </TrackedLink>
                </Button>
                <p className='max-w-xs text-xs leading-relaxed text-text-muted'>
                  Not sure where to start? This two-minute audit pinpoints where
                  custom software pays off first.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
