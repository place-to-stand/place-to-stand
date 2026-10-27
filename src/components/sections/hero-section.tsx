import type { CSSProperties } from 'react'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { HeroGraphic } from '@/src/components/graphics/hero-graphic'
import { HeroDrawingSlot } from './hero-drawing-slot'

export function HeroSection() {
  return (
    <section
      id='home'
      data-pts-hero
      className='relative flex flex-col overflow-hidden border-b border-(--dots-rule) [--hero-gap:var(--spacing-grid-2)] [--hero-nav:61px] [--hero-pad:var(--hero-gap)] md:[--hero-gap:calc(var(--spacing-grid-3)-var(--spacing-grid-half))] md:[--hero-nav:65px] md:[--hero-pad:calc(var(--spacing-grid-3)-var(--spacing-grid-half))] lg:[--hero-gap:clamp(4.5rem,9svh,6rem)] lg:[--hero-nav:69px] lg:[--hero-pad:clamp(3.75rem,7.5svh,5rem)]'
    >
      <div className='dots-hero mx-auto flex w-full max-w-content flex-1 flex-col px-6 pt-[calc(var(--hero-nav)+var(--hero-pad))] pb-(--hero-pad) [--dots-top:0px] lg:px-12'>
        {/* One padding (--hero-pad) sets the space under the nav and under the
            database at the bottom of the drawing, so the content always sits
            centred in the hero: 48px on phones, 60px on tablets, and on laptops
            60px on an 800px-tall window up to 80px. --hero-gap, between the
            headline and the row below, matches it on phones and tablets (48px,
            60px) and is 72-96px on laptops. The top
            padding adds the fixed nav's height (--hero-nav), which differs per
            breakpoint. On laptops the drawing
            is sized so the hero fills the screen; once it hits its width limit
            (wide or tall windows) the hero ends early and the next section
            shows, instead of the gaps swelling. */}
        <div className='flex flex-1 flex-col'>
          {/* Headline with blueprint corner marks. Its size follows the window
              width, but short laptop windows (under about 945px tall) cap it by
              height so the drawing below has room. Below 800px tall it stops
              shrinking and the hero runs off the bottom of the screen. Stacked, it centres with
              the text below, inset 12px on both sides. The frame sits 1px in
              from the gutter (mx-px) because the corner marks hang 1px outside
              it; that puts their outer edge flush with the header's logo mark. */}
          <div className='hero-frame relative mx-px'>
            {/* Hero keeps the full-strength accent corners — the muted default
                is for content cards further down the page. */}
            <BlueprintCorners size={20} colorClassName='border-accent' />
            <h1 className='px-3 py-4 text-center font-headline text-[clamp(2.25rem,min(7vw,max(11svh,5.5rem)),6.5rem)] leading-[0.88] font-bold tracking-tight text-text md:pr-0 md:pl-6 md:text-left'>
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
              {/* On phones "everyone." sits right above this line and its
                  "y" tail touched the "W"; a little room keeps them apart. */}
              <span
                className='hero-line mt-[0.1em] block text-accent md:mt-0'
                style={{ '--hero-delay': '0.24s' } as CSSProperties}
              >
                We build for you.
              </span>
            </h1>
          </div>

          <div aria-hidden className='h-(--hero-gap)' />

          {/* Supporting subtext + CTA (left) beside the comparison graphic (right).
              Phones stack the drawing, a one-sentence pitch, then the button
              and fine print (32px under the pitch, as side by side): the text column turns into display: contents so its two
              blocks join the row and can be reordered around the drawing, and
              the rest of the copy is hidden. Side by side, the drawing's ink sits 28px
              in from the corner mark, and so does the text column once the nav
              shows in full (lg; under it, with the menu button, the text is not
              inset), which reads level
              with the headline's 24px once its glyph spacing is counted.
              Stacked, neither is inset, the text centres and the button runs
              full width up to 448px. */}
          <div className='flex flex-col gap-grid-2 md:flex-row md:items-center md:gap-grid-2 lg:items-start lg:gap-grid-3'>
            <div className='contents text-center md:flex md:flex-1 md:flex-col md:gap-8 md:text-left lg:pl-7'>
              <div
                className='hero-reveal flex gap-4 self-center max-md:order-2 md:self-start'
                style={{ animationDelay: '0.85s' }}
              >
                <div className='flex max-w-lg flex-col gap-5 lg:max-w-xl'>
                  <p className='text-base text-balance text-text md:text-lg lg:text-xl'>
                    We build software{' '}
                    <strong className='font-semibold'>
                      shaped to how your business actually runs.
                    </strong>
                    <span className='hidden md:inline'>
                      {' '}
                      No more juggling a stack of bloated SaaS dashboards.
                    </span>
                  </p>
                  <p className='hidden text-base text-balance text-text-muted md:block md:text-lg lg:text-xl'>
                    Take the{' '}
                    <strong className='font-semibold text-text'>
                      free audit
                    </strong>{' '}
                    to see where custom software fits in your business.
                  </p>
                </div>
              </div>
              <div
                className='hero-reveal mx-auto flex w-full max-w-md shrink-0 flex-col items-stretch gap-3 max-md:order-3 max-md:-mt-4 md:mx-0 md:w-auto md:max-w-none md:items-start'
                style={{ animationDelay: '1s' }}
              >
                <Button
                  asChild
                  size='lg'
                  variant='primaryInvert'
                  className='w-full md:w-auto md:min-w-72'
                >
                  <TrackedLink href='/audit' location='hero' data-pts-hero-cta>
                    Start the free audit
                  </TrackedLink>
                </Button>
                <p className='font-mono text-xs tracking-wider text-balance text-text-muted uppercase'>
                  2 minutes, free results, no email required.
                </p>
              </div>
            </div>

            {/* Hero comparison set piece — turn this (clutter) into this (one app).
                Phones: right under the headline, above the button.
                Tablets and up: centred in the right column. At full width its ink
                sits about 28px in from the corner mark, like the text column
                (pr-4.5 plus the drawing's own margin); when the text leaves room
                (short windows shrink the drawing; balanced lines end early), it
                slides left to sit centred between the text and the frame's right
                edge (HeroDrawingSlot). On laptops its width follows the
                window height (minus the headline, which shrinks on short screens, the spacing,
                and one gap kept free below),
                so short screens still show the whole drawing, database included.
                On laptops it also rises by 8% of its own height into the gap above
                so it breaks the line the text sits on. */}
            <HeroDrawingSlot className='max-md:order-1 md:flex md:flex-1 md:justify-center md:pr-4.5 lg:self-end'>
              {/* The wrapper is the drawing's box (cqw = 1% of its width; the
                  274x190 drawing is 69.34cqw tall). Its layout box is trimmed
                  to the ink so the gap under it is measured from the database:
                  the empty strip under the database (2.5cqw) is pulled in, and
                  on laptops the 8% lift (5.55cqw) is a negative margin rather
                  than a transform. On tablets the row centres the drawing and
                  the text on each other; on laptops lg:self-end keeps the database the lowest
                  thing in the hero when the text column runs taller. */}
              <div className='@container mx-auto w-full max-w-md md:mx-0 md:max-w-none lg:max-w-[clamp(20rem,calc((max(100svh,50rem)-6.3125rem-var(--hero-gap)-2*var(--hero-pad)-2.64*min(7vw,max(11svh,5.5rem),6.5rem))*1.632),100%)]'>
                <HeroGraphic className='-mb-[2.5cqw] w-full lg:-mt-[5.55cqw]' />
              </div>
            </HeroDrawingSlot>
          </div>
        </div>
      </div>
    </section>
  )
}
