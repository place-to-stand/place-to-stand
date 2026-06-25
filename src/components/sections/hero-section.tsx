import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AnimatedSection } from '@/src/components/layout/animated-section'

export function HeroSection() {
  return (
    <AnimatedSection
      id='home'
      data-pts-hero
      className='relative isolate flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-8 overflow-hidden px-8 pb-40 pt-28 text-center'
    >
      {/* Schematic decoration — crosshair marks */}
      <div className='pointer-events-none absolute left-8 top-32 font-mono text-[10px] tracking-widest text-text-muted/30' aria-hidden>
        [0,0]
      </div>
      <div className='pointer-events-none absolute right-8 bottom-32 font-mono text-[10px] tracking-widest text-text-muted/30' aria-hidden>
        [1,1]
      </div>
      <div className='pointer-events-none absolute left-1/2 top-24 h-8 w-px bg-border' aria-hidden />
      <div className='pointer-events-none absolute bottom-24 left-1/2 h-8 w-px bg-border' aria-hidden />

      <div className='relative z-10 flex w-full flex-col items-center gap-6 text-center'>
        <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
          Place To Stand
        </span>
        <h1 className='max-w-4xl text-center font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-balance md:text-6xl lg:text-7xl'>
          Bureaucracy feeds on inefficiency.
          <br />
          <span className='text-accent'>We starve it.</span>
        </h1>
        <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
          One builder + AI workflows replaces the traditional agency structure.
          Custom software, automation, and AI solutions — delivered directly.
        </p>
        <div className='mt-2 flex items-center gap-6'>
          <div className='h-px w-8 bg-border' />
          <p className='font-mono text-xs uppercase tracking-[0.15em] text-text-muted'>
            Ownership &middot; Direct Access &middot; AI Speed
          </p>
          <div className='h-px w-8 bg-border' />
        </div>
        <div className='mt-4 flex flex-col items-center gap-4 sm:flex-row'>
          <Button asChild size='lg'>
            <Link href='/services' data-pts-hero-cta>
              Explore Our Services
            </Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href='/contact'>Start a Project</Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  )
}
