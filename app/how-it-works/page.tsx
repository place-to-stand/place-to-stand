import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HowWeWorkSection } from '@/src/components/sections/how-we-work-section'
import { AnimatedSection } from '@/src/components/layout/animated-section'

export default function HowItWorksPage() {
  return (
    <main className='flex-1'>
      <HowWeWorkSection />

      {/* CTA */}
      <AnimatedSection className='flex max-w-none flex-col items-center justify-center gap-8 bg-[#c4cae0] px-6 py-24'>
        <h2 className='max-w-3xl text-balance text-center font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
          Like how we think? Let&apos;s talk.
        </h2>
        <Link
          href='/contact'
          className='group inline-flex items-center bg-ink text-sm uppercase tracking-[0.1em] text-white'
        >
          <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
            Book a call
          </span>
          <span className='flex items-center justify-center self-stretch bg-[#94e0e4] px-3'>
            <ArrowRight
              className='size-4 text-ink transition-all delay-75 duration-200 group-hover:translate-x-1'
              strokeWidth={2}
            />
          </span>
        </Link>
      </AnimatedSection>
    </main>
  )
}
