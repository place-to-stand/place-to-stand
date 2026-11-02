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
      className='relative flex flex-col overflow-hidden border-b border-(--dots-rule) [--hero-gap:var(--spacing-grid-2)] [--hero-pad:var(--spacing-grid-2)] md:[--hero-gap:var(--space-page-top)] md:[--hero-pad:var(--space-page-top)] lg:[--hero-gap:clamp(3rem,calc(3rem+(100svh-50rem)*0.24),4.5rem)] lg:[--hero-pad:clamp(4.5rem,calc(4.5rem+(100svh-50rem)*0.24),6rem)]'
    >
      <div className='dots-hero mx-auto flex w-full max-w-content flex-1 flex-col px-6 pt-[calc(var(--nav-height)+var(--hero-top,var(--hero-pad)))] pb-(--hero-pad) [--dots-top:0px] max-md:[--hero-top:var(--space-page-top)] lg:px-12'>
        {/* The hero's gaps: under the nav, between the headline and the
            row below, and under the content. Phones and tablets use 48px for
            all three. On laptops and up the top and bottom are 72px on
            windows up to 800px tall, growing smoothly to 96px at 900px tall
            and over, and the headline-to-content gap is one step less (48
            growing to 72). They grow slowly enough that the drawing (sized to
            fill the rest of the screen) keeps growing as the window gets
            taller instead of jumping. On phones
            only the space under the nav follows the page-top role (36px, like
            every page's title); the other two stay 48px. On laptops the drawing is
            sized so the hero fills the screen; once it hits its width limit
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
              Phones put the drawing first (order-1), then the text column: a
              one-sentence pitch, then the button and fine print, 36px apart
              (48px on laptops); the rest of the copy is hidden. Side by side, the drawing's ink sits 28px
              in from the corner mark, and so does the text column once the nav
              shows in full (lg; under it, with the menu button, the text is not
              inset), which reads level
              with the headline's 24px once its glyph spacing is counted.
              Stacked, neither is inset, the text centres and the button runs
              full width up to 448px. */}
          <div className='flex flex-col gap-grid-2 md:flex-row md:items-center md:gap-grid-2 lg:gap-grid-3'>
            {/* Side by side, the text column stretches to the row's height and
                splits the free space 1:3 above and below its content, so the
                text sits a touch above centre but never higher than the
                drawing's top or lower than its bottom (the spacers shrink to
                nothing when the text is the taller one). */}
            <div className="flex flex-col max-md:order-2 md:flex-1 md:self-stretch md:before:flex-[1] md:before:content-[''] md:after:flex-[3] md:after:content-[''] lg:pl-7">
              <div className='flex flex-col gap-9 text-center md:text-left lg:gap-grid-2'>
                <div
                  className='hero-reveal flex gap-4 self-center md:self-start'
                  style={{ animationDelay: '0.85s' }}
                >
                  <div className='flex max-w-lg flex-col gap-grid-1 lg:max-w-xl lg:gap-9'>
                    <p className='text-base text-balance text-text lg:text-xl'>
                      We build software{' '}
                      <strong className='font-semibold'>
                        shaped to how your business actually runs.
                      </strong>
                      <span className='hidden md:inline'>
                        {' '}
                        No more juggling a stack of bloated SaaS dashboards.
                      </span>
                    </p>
                    <p className='hidden text-base text-balance text-text-muted md:block lg:text-xl'>
                      Take the{' '}
                      <strong className='font-semibold text-text'>
                        free audit
                      </strong>{' '}
                      to see where custom software fits in your business.
                    </p>
                  </div>
                </div>
                <div
                  className='hero-reveal mx-auto flex w-full max-w-md shrink-0 flex-col items-stretch gap-3 md:mx-0 md:w-auto md:max-w-none md:items-start'
                  style={{ animationDelay: '1s' }}
                >
                  <Button
                    asChild
                    size='lg'
                    variant='primaryInvert'
                    className='w-full md:w-auto md:min-w-72'
                  >
                    <TrackedLink
                      href='/audit'
                      location='hero'
                      data-pts-hero-cta
                    >
                      Start the free audit
                    </TrackedLink>
                  </Button>
                  <p className='type-fine text-balance'>
                    2 minutes, free results, no email required.
                  </p>
                </div>
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
                window height (minus the nav, the headline, which shrinks on
                short screens, and the hero's gaps), so short screens still
                show the whole drawing, database included. */}
            <HeroDrawingSlot className='max-md:order-1 md:flex md:flex-1 md:justify-center md:pr-4.5'>
              {/* The drawing's viewBox ends at the database, so its box is its
                  ink. Side by side, the row centres the drawing and the text
                  column on each other at every width. On laptops the
                  max-width sizes the drawing so the hero fills the screen: the
                  space left after the nav, headline and gaps, times the
                  drawing's width-to-height ratio (274 / 183.3). */}
              <div className='mx-auto w-full max-w-md md:mx-0 md:max-w-none lg:max-w-[clamp(20rem,calc((max(100svh,50rem)-6.3125rem-var(--hero-gap)-2*var(--hero-pad)-2.64*min(7vw,max(11svh,5.5rem),6.5rem))*1.4948),100%)]'>
                <HeroGraphic className='w-full' />
              </div>
            </HeroDrawingSlot>
          </div>
        </div>
      </div>
    </section>
  )
}
