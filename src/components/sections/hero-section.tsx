import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { hashHref } from '@/src/components/layout/nav-links'

export function HeroSection() {
  return (
    <AnimatedSection
      id='home'
      data-pts-hero
      className='relative isolate flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-6 overflow-hidden px-8 pb-40 pt-28 text-center text-ink'
    >
      <div className='relative z-10 flex w-full flex-col items-center gap-6 text-center'>
        <h1 className='max-w-3xl text-center font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-balance md:text-6xl'>
          You know your business.
          <br className='md:hidden' />
          {' '}We know the tech.
        </h1>
        <p className='text-balance text-base md:text-lg'>
          We build modern systems that save your business time and money.
        </p>
        <p className='text-balance font-headline text-sm font-extrabold uppercase tracking-[0.1em] text-ink md:text-base'>
          Custom use-cases built in weeks • Your private Portal • flat-rate
          pricing
        </p>
        <div className='mt-4 flex flex-col items-center gap-4 sm:flex-row'>
          <Button asChild size='lg'>
            <Link href={hashHref('use-cases')} data-pts-hero-cta>
              See what we can build for you ↓
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  )
}
