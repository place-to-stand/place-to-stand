import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

export function HeroSection() {
  return (
    <section
      id='home'
      data-pts-hero
      className='relative flex min-h-[100svh] flex-col overflow-hidden'
    >
      <div className='mx-auto flex w-full max-w-content flex-1 flex-col px-6 pt-grid-4 lg:px-12'>
        {/* Blueprint annotation — top label */}
        <div className='mb-auto flex items-center gap-4 pt-8'>
          <span className='bp-label font-mono'>
            Software &middot; Automation &middot; AI
          </span>
        </div>

        {/* Main headline block — bottom-aligned */}
        <div className='flex flex-col gap-10 pb-32 md:pb-48'>
          {/* Headline with blueprint corner marks */}
          <div className='hero-frame relative w-full'>
            <BlueprintCorners size={20} />
            <h1 className='max-w-5xl py-4 pl-6 font-headline text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-text'>
              <span className='hero-line block' style={{ animationDelay: '0.2s' }}>
                Off-the-shelf software
              </span>
              <span className='hero-line block' style={{ animationDelay: '0.45s' }}>
                is built for everyone.
              </span>
              <span
                className='hero-line block text-accent'
                style={{ animationDelay: '0.7s' }}
              >
                We build for you.
              </span>
            </h1>
          </div>

          {/* Supporting subtext + audit CTA */}
          <div
            className='hero-reveal flex flex-col gap-8 md:flex-row md:items-end md:justify-between'
            style={{ animationDelay: '1.7s' }}
          >
            <div className='flex items-start gap-4'>
              {/* Vertical leader line */}
              <div className='mt-2 hidden w-px self-stretch bg-border-light md:block' aria-hidden />
              <p className='max-w-lg text-base leading-relaxed text-text-muted md:text-lg'>
                Your governance, roles, and processes aren&apos;t a constraint, they
                are your business ontology. Your ontology guides us to build the right software to 
                solve your problems directly at the application layer. No more dealing with 10 different bloated SAAS
                dashboards.
              </p>
            </div>
            <div className='flex shrink-0 flex-col gap-3 md:max-w-xs md:items-end md:text-right'>
              <Button asChild size='lg' variant='primaryInvert'>
                <Link href='/audit' data-pts-hero-cta>
                  Find your leverage
                </Link>
              </Button>
              <p className='text-sm leading-relaxed text-text-muted'>
                Take our free business audit to see where you can leverage custom
                software.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint coordinates annotation */}
      <div className='absolute bottom-4 right-6 font-mono text-[10px] tracking-widest text-border-light lg:right-10' aria-hidden>
        PTS-001 &middot; REV.3
      </div>
    </section>
  )
}
