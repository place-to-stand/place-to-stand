import { AnimatedSection } from '@/src/components/layout/animated-section'
import { FaqAccordion } from '@/src/components/sections/faq-section'

export const metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about working with Place To Stand — pricing, timelines, and what to expect.',
}

export default function FaqPage() {
  return (
    <main className='flex-1'>
      <section className='flex min-h-[60vh] flex-col items-center justify-center px-6 pt-32 text-center md:pt-40'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          FAQ
        </span>
        <h1 className='mt-3 max-w-4xl font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
          The answers you&apos;re looking for
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-balance text-base !leading-snug text-ink/60 md:text-lg'>
          The essentials that most clients ask before we kick off a new
          engagement. Reach out if you have other questions.
        </p>
      </section>

      <section className='mx-auto w-full max-w-5xl px-6 pb-24'>
        <FaqAccordion />
      </section>
    </main>
  )
}
