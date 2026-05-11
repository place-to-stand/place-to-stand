import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { FaqAccordion } from '@/src/components/sections/faq-section'
import { faqCategories } from '@/src/lib/faqs'

export const metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about working with Place To Stand — engagements, pricing, timelines, process, and what happens after launch.',
}

export default function FaqPage() {
  return (
    <main className='flex-1'>
      {/* Hero — sized to let the next section peek above the fold */}
      <AnimatedSection className='relative isolate flex min-h-[80svh] max-w-none flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Frequently asked questions
          </span>
          <h1 className='font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            <span className='block'>The answers</span>
            <span className='block'>you&apos;re looking for.</span>
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            The essentials clients ask before we kick off a new engagement.
            Anything else? Send a note and we&apos;ll answer it personally.
          </p>
        </div>
      </AnimatedSection>

      {/* Category sections */}
      <div className='mx-auto w-full max-w-5xl px-6 pb-16'>
        {faqCategories.map((category, i) => (
          <AnimatedSection
            key={category.title}
            className={
              i === 0
                ? 'max-w-none border-t border-ink/15 px-0 py-16 md:py-20'
                : 'max-w-none border-t border-ink/15 px-0 py-16 md:py-20'
            }
          >
            <div className='grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16'>
              <div className='flex flex-col gap-3'>
                <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className='font-headline text-2xl font-semibold uppercase !leading-[.95] text-ink md:text-3xl'>
                  {category.title}
                </h2>
                {category.description && (
                  <p className='text-base text-ink/60'>
                    {category.description}
                  </p>
                )}
              </div>
              <div>
                <FaqAccordion items={category.items} defaultOpenIndex={null} />
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Final CTA — inspiration's "opportunities are here" voice */}
      <section className='flex flex-col items-center gap-6 bg-cyan px-6 py-20 text-center md:py-28'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/70'>
          Still have a question?
        </span>
        <h2 className='max-w-3xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          The opportunities are here. So why wait?
        </h2>
        <p className='max-w-xl text-balance text-base text-ink/80 md:text-lg'>
          Our team is always happy to discuss your challenge. Reach out and we
          will connect you with the person who can answer it best.
        </p>
        <Link
          href='/book-a-call'
          className='group mt-2 inline-flex items-center border border-ink/30 bg-white text-sm uppercase tracking-[0.1em] text-ink no-underline transition-colors duration-300 hover:bg-ink hover:text-white'
        >
          <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
            Book a call
          </span>
          <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-white/30'>
            <ArrowRight
              className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1'
              strokeWidth={2}
            />
          </span>
        </Link>
      </section>
    </main>
  )
}
