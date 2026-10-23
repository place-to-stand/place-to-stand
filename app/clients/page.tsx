import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { TrackedLink } from '@/src/components/tracked-link'
import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { ClientsSection } from '@/src/components/sections/clients-section'

export const metadata: Metadata = pageMetadata({
  title: 'Clients',
  description:
    "A selection of the brands we've partnered with to design, build, and ship software that earns its keep.",
  path: '/clients',
})

export default function ClientsPage() {
  return (
    <main className='flex-1 pt-10'>
      {/* Heading, client cards, and CTA tile, one section separated by gaps */}
      <AnimatedSection
        priority
        id='clients'
        className='flex flex-col gap-grid-3 pb-grid-4! md:gap-grid-4 md:pb-grid-6!'
      >
        <div className='dots-hero mb-6 flex flex-col gap-4 md:mb-8'>
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
        <div className='dots-band mt-43 border border-border bg-bg-card p-6 md:mt-49 md:p-16'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-3 md:gap-4'>
              <Reveal index={0} className='flex flex-col gap-2.25 md:gap-3'>
                <span className='bp-label font-mono'>Next Step</span>
                <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
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
                <TrackedLink href='/audit' location='clients-cta-block'>
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
                  <TrackedLink href='/contact' location='clients-cta-block'>
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
