import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { HeroGraphic } from '@/src/components/graphics/hero-graphic'

export function HeroSection() {
  return (
    <section
      id='home'
      data-pts-hero
      className='relative flex flex-col overflow-hidden'
    >
      <div className='mx-auto flex w-full max-w-content flex-col gap-8 px-6 pb-16 pt-grid-4 md:gap-10 md:pb-24 lg:px-12 lg:pt-grid-6'>
        {/* Blueprint annotation — top label (slides in first) */}
        <div className='hero-slide-in flex items-center gap-4' style={{ animationDelay: '0.3s' }}>
          <span className='bp-label font-mono'>
            The Pitch
          </span>
        </div>

        {/* Main headline block — bottom-aligned */}
        <div className='flex flex-col gap-8 md:gap-10'>
          {/* Headline with blueprint corner marks */}
          <div className='hero-frame relative w-full'>
            <BlueprintCorners size={20} />
            <h1 className='max-w-5xl py-4 pl-3 md:pl-6 font-headline text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.88] tracking-tight text-text'>
              <span className='hero-line block' style={{ animationDelay: '0.9s' }}>
                Off-the-shelf software
              </span>
              <span className='hero-line block' style={{ animationDelay: '1.2s' }}>
                is built for everyone.
              </span>
              <span
                className='hero-line block text-accent'
                style={{ animationDelay: '2s' }}
              >
                We build for you.
              </span>
            </h1>
          </div>

          {/* Supporting subtext + CTA (left) beside the comparison graphic (right) */}
          <div className='flex flex-col gap-grid-2 lg:flex-row lg:items-center lg:gap-grid-3'>
            <div className='flex flex-col gap-8 lg:flex-1'>
              <div className='hero-reveal flex self-start gap-4' style={{ animationDelay: '4s' }}>
                {/* Vertical leader line */}
                <div className='mt-2 hidden w-px self-stretch bg-border-light md:block' aria-hidden />
                <div className='flex max-w-lg flex-col gap-3'>
                  <p className='text-base leading-relaxed text-text md:text-lg'>
                    We build software{' '}
                    <strong className='font-semibold'>
                      shaped to how your business actually runs.
                    </strong>{' '}
                    No more juggling a stack of bloated SaaS dashboards.
                  </p>
                  <p className='text-base leading-relaxed text-text-muted md:text-lg'>
                    Not sure where to start? Take our free{' '}
                    <strong className='font-semibold text-accent/70'>
                      opportunity audit.
                    </strong>
                  </p>
                </div>
              </div>
              <div className='hero-reveal flex shrink-0 flex-col items-start gap-3' style={{ animationDelay: '4.2s' }}>
                <Button asChild size='lg' variant='primaryInvert'>
                  <Link href='/audit' data-pts-hero-cta>
                    Find your opportunities
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero comparison set piece — turn this (clutter) into this (one app).
                On mobile it sits between the headline and the subtext (order-first);
                on desktop it stays in the right column. */}
            <HeroGraphic className='order-first w-full lg:order-none lg:flex-1' />
          </div>
        </div>
      </div>
    </section>
  )
}
