import type { CSSProperties } from 'react'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { HeroGraphic } from '@/src/components/graphics/hero-graphic'

export function HeroSection() {
  return (
    <section
      id='home'
      data-pts-hero
      className='relative flex min-h-[min(100svh,67.5rem)] flex-col overflow-hidden'
    >
      <div className='mx-auto flex w-full max-w-content flex-1 flex-col gap-8 px-6 pt-grid-4 pb-16 md:gap-10 md:pb-24 lg:px-12 lg:pt-grid-5'>
        {/* When the screen is taller than the content, spare space first opens
            the gap under the headline (the spacer below, up to 160px). The hero
            stops growing at 1080px, just past a 16" MacBook Pro window, so tall
            screens show the next section instead of empty space. */}
        <div className='flex flex-1 flex-col justify-center'>
          {/* Headline with blueprint corner marks */}
          <div className='hero-frame relative w-full'>
            {/* Hero keeps the full-strength accent corners — the muted default
                is for content cards further down the page. */}
            <BlueprintCorners size={20} colorClassName='border-accent' />
            <h1 className='py-4 pl-3 font-headline text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.88] font-bold tracking-tight text-text md:pl-6'>
              <span
                className='hero-line block'
                style={{ '--hero-delay': '0s' } as CSSProperties}
              >
                Off-the-shelf software
              </span>
              <span
                className='hero-line block'
                style={{ '--hero-delay': '0.12s' } as CSSProperties}
              >
                is built for everyone.
              </span>
              <span
                className='hero-line block text-accent'
                style={{ '--hero-delay': '0.24s' } as CSSProperties}
              >
                We build for you.
              </span>
            </h1>
          </div>

          <div
            aria-hidden
            className='max-h-40 min-h-8 flex-1 md:min-h-10 lg:min-h-grid-4'
          />

          {/* Supporting subtext + CTA (left) beside the comparison graphic (right) */}
          <div className='flex flex-col gap-grid-2 lg:flex-row lg:items-start lg:gap-grid-3'>
            <div className='flex flex-col gap-8 lg:flex-1'>
              <div
                className='hero-reveal flex gap-4 self-start'
                style={{ animationDelay: '0.85s' }}
              >
                <div className='flex max-w-lg flex-col gap-3 lg:max-w-xl'>
                  <p className='text-base leading-relaxed text-text md:text-lg lg:text-xl'>
                    We build software{' '}
                    <strong className='font-semibold'>
                      shaped to how your business actually runs.
                    </strong>{' '}
                    No more juggling a stack of bloated SaaS dashboards.
                  </p>
                  <p className='text-base leading-relaxed text-text-muted md:text-lg lg:text-xl'>
                    Take the{' '}
                    <strong className='font-semibold text-text'>
                      free audit
                    </strong>{' '}
                    to see where custom software fits for your business.
                  </p>
                </div>
              </div>
              <div
                className='hero-reveal flex shrink-0 flex-col items-start gap-3'
                style={{ animationDelay: '1s' }}
              >
                <Button asChild size='lg' variant='primaryInvert'>
                  <TrackedLink href='/audit' location='hero' data-pts-hero-cta>
                    Start the free audit
                  </TrackedLink>
                </Button>
                <p className='font-mono text-sm tracking-[0.08em] text-text-muted'>
                  2 minutes, free results, no email required.
                </p>
              </div>
            </div>

            {/* Hero comparison set piece — turn this (clutter) into this (one app).
                On mobile it sits between the headline and the subtext (order-first);
                on desktop it stays in the right column. Capped in width below lg
                so tablets don't get a full-width drawing. */}
            <HeroGraphic className='order-first mx-auto w-full max-w-md lg:order-none lg:max-w-none lg:flex-1' />
          </div>
        </div>
      </div>
    </section>
  )
}
