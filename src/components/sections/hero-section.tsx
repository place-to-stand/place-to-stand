import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

export function HeroSection() {
  return (
    <section
      id='home'
      data-pts-hero
      className='relative flex min-h-[100svh] flex-col overflow-hidden border-b border-border'
    >
      <div className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-28 lg:px-10'>
        {/* Blueprint annotation — top label */}
        <div className='mb-auto flex items-center gap-4 pt-8'>
          <span className='bp-label font-mono'>
            Software &middot; Automation &middot; AI
          </span>
        </div>

        {/* Main headline block — bottom-aligned */}
        <div className='flex flex-col gap-10 pb-16 md:pb-20'>
          {/* Headline with blueprint corner marks */}
          <div className='relative inline-block self-start'>
            <BlueprintCorners size={20} />
            <h1 className='max-w-5xl py-4 pl-6 font-headline text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-text'>
              Bureaucracy feeds
              <br />
              on inefficiency.
              <br />
              <span className='text-accent'>We starve it.</span>
            </h1>
          </div>

          {/* Dimension line separator */}
          <div className='bp-dimension-line w-full' aria-hidden />

          <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
            <div className='flex items-start gap-4'>
              {/* Vertical leader line */}
              <div className='mt-2 hidden w-px self-stretch bg-border-light md:block' aria-hidden />
              <p className='max-w-lg text-base leading-relaxed text-text-muted md:text-lg'>
                One builder + AI workflows replaces the traditional agency
                structure. Custom software, automation, and AI solutions —
                delivered directly.
              </p>
            </div>
            <div className='flex shrink-0 gap-3'>
              <Button asChild size='lg'>
                <Link href='/services' data-pts-hero-cta>
                  See Our Work
                </Link>
              </Button>
              <Button asChild size='lg' variant='outline'>
                <Link href='/contact'>Book a Call</Link>
              </Button>
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
