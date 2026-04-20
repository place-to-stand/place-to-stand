import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from '@/src/components/sections/hero-section'
import { MissionStatement } from '@/src/components/sections/mission-statement'
import { FaqSection } from '@/src/components/sections/faq-section'
import { AnimatedSection } from '@/src/components/layout/animated-section'

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      <MissionStatement />

      {/* How It Works CTA */}
      <AnimatedSection
        id='how-it-works'
        data-pts-dark
        className='flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-8 bg-[#111827] px-6'
      >
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-white/60'>
          How we work
        </span>
        <h2 className='max-w-4xl text-balance text-center font-headline text-2xl font-semibold uppercase !leading-[.9] text-white md:text-4xl lg:text-5xl'>
          Dead-simple process. Zero surprises.
        </h2>
        <p className='max-w-xl text-balance text-center text-base text-white/60 md:text-lg'>
          Bespoke end-to-end solutions — not just automations. Flat-rate blocks,
          your own Portal, and a team that ships.
        </p>
        <Link
          href='/how-it-works'
          className='group mt-4 inline-flex items-center bg-white text-sm uppercase tracking-[0.1em] text-ink'
        >
          <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
            See how we work
          </span>
          <span className='flex items-center justify-center self-stretch bg-[#94e0e4] px-3'>
            <ArrowRight className='size-4 text-ink transition-all delay-75 duration-200 group-hover:translate-x-1' strokeWidth={2} />
          </span>
        </Link>
      </AnimatedSection>

      {/* Book a Call CTA */}
      <AnimatedSection
        className='flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-8 bg-white px-6'
      >
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Book a Call
        </span>
        <h2 className='max-w-4xl text-balance text-center font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
          Let&apos;s talk about your next project
        </h2>
        <p className='max-w-xl text-balance text-center text-base text-ink/60 md:text-lg'>
          Send a message or book a call directly to our calendars. We respond
          within one business day.
        </p>
        <Link
          href='/contact'
          className='group mt-4 inline-flex items-center bg-ink text-sm uppercase tracking-[0.1em] text-white'
        >
          <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
            Book a call
          </span>
          <span className='flex items-center justify-center self-stretch bg-[#94e0e4] px-3'>
            <ArrowRight className='size-4 text-ink transition-all delay-75 duration-200 group-hover:translate-x-1' strokeWidth={2} />
          </span>
        </Link>
      </AnimatedSection>

      <FaqSection />
    </main>
  )
}
