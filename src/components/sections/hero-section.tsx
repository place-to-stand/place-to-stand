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
      className='relative flex flex-col overflow-hidden lg:[--hero-gap:clamp(4.5rem,9svh,6rem)]'
    >
      <div className='mx-auto flex w-full max-w-content flex-1 flex-col px-6 pt-grid-4 pb-grid-2 md:pb-grid-3 lg:px-12 lg:pt-[4.3125rem] lg:pb-0'>
        {/* On laptops one gap (--hero-gap, 72px on an 800px-tall window up to
            96px) sets the space under the nav, between the headline and the row
            below, and under the drawing, so all three grow together with the
            window. lg:pt clears the 69px nav. The drawing is sized so the hero
            fills the screen; once it hits its width limit (wide or tall windows)
            the hero ends early and the next section shows, instead of the gaps
            swelling.
            Below lg the hero does not fill the screen: headline, the text and
            drawing row, and the bottom edge sit one even step apart (48px on
            phones, 72px on tablets). */}
        <div className='flex flex-1 flex-col'>
          <div aria-hidden className='hidden lg:block lg:h-(--hero-gap)' />
          {/* Headline with blueprint corner marks. Its size follows the window
              width, but short laptop windows (under about 945px tall) cap it by
              height so the drawing below has room. Below 800px tall it stops
              shrinking and the hero runs off the bottom of the screen. */}
          <div className='hero-frame relative w-full'>
            {/* Hero keeps the full-strength accent corners — the muted default
                is for content cards further down the page. */}
            <BlueprintCorners size={20} colorClassName='border-accent' />
            <h1 className='py-4 pl-3 font-headline text-[clamp(2.25rem,min(7vw,max(11svh,5.5rem)),6.5rem)] leading-[0.88] font-bold tracking-tight text-text md:pl-6'>
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

          <div aria-hidden className='h-grid-2 md:h-grid-3 lg:h-(--hero-gap)' />

          {/* Supporting subtext + CTA (left) beside the comparison graphic (right);
              stacked text-first on phones. Side by side, the text column and the
              drawing's ink sit 28px in from the corner marks, which reads level
              with the headline's 24px once its glyph spacing is counted.
              Stacked, neither is inset. */}
          <div className='flex flex-col gap-grid-2 md:flex-row md:items-start md:gap-grid-2 lg:gap-grid-3'>
            <div className='flex flex-col gap-8 md:flex-1 md:pl-7'>
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
                <p className='font-mono text-xs tracking-wider text-text-muted uppercase'>
                  2 minutes, free results, no email required.
                </p>
              </div>
            </div>

            {/* Hero comparison set piece — turn this (clutter) into this (one app).
                Phones: below the button, so the button stays near the top.
                Tablets and up: pinned right, its ink inset from the corner mark by
                about 28px, like the text column (pr-4.5 plus the drawing's own
                margin). On laptops its width follows the
                window height (minus the headline, which shrinks on short screens, the spacing,
                and one gap kept free below),
                so short screens still show the whole drawing, database included.
                On laptops it also rises by 8% of its own height into the gap above
                so it breaks the line the text sits on. */}
            <div className='md:flex md:flex-1 md:justify-end md:pr-4.5'>
              <HeroGraphic className='mx-auto w-full max-w-md md:mx-0 md:max-w-none lg:max-w-[clamp(20rem,calc((max(100svh,50rem)-6.3125rem-2.6*var(--hero-gap)-2.64*min(7vw,max(11svh,5.5rem),6.5rem))*1.565),100%)] lg:-translate-y-[8%]' />
            </div>
          </div>

          {/* The space under the drawing is 60% of the gap; its 8% lift already
              leaves about 28px of that. */}
          <div
            aria-hidden
            className='hidden lg:block lg:h-[calc(0.6*var(--hero-gap)-1.75rem)]'
          />
        </div>
      </div>
    </section>
  )
}
