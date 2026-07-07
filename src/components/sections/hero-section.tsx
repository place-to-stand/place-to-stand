import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

export function HeroSection() {
  return (
    <section
      id='home'
      data-pts-hero
      className='relative flex min-h-[100svh] flex-col justify-end overflow-hidden'
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
              <span className='hero-line block' style={{ animationDelay: '1.2s' }}>
                Off-the-shelf software
              </span>
              <span className='hero-line block' style={{ animationDelay: '1.5s' }}>
                is built for everyone.
              </span>
              <span
                className='hero-line block text-accent'
                style={{ animationDelay: '2.7s' }}
              >
                We build for you.
              </span>
            </h1>
          </div>

          {/* Supporting subtext + audit CTA */}
          <div className='flex flex-col gap-8 md:flex-row md:justify-between'>
            <div className='hero-reveal flex self-start gap-4' style={{ animationDelay: '3.3s' }}>
              {/* Vertical leader line */}
              <div className='mt-2 hidden w-px self-stretch bg-border-light md:block' aria-hidden />
              <p className='max-w-lg text-base leading-relaxed text-text-muted md:text-lg'>
                We build software shaped to how your business actually runs. No
                more juggling a stack of bloated SaaS dashboards.
              </p>
            </div>
            <div className='hero-reveal flex shrink-0 flex-col items-start gap-3 md:max-w-xs md:items-end md:text-right' style={{ animationDelay: '3.6s' }}>
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
    </section>
  )
}
