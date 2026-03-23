import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BookCallLink } from '@/src/components/book-call-link'
import { caseStudyMap, caseStudies } from '@/src/lib/case-studies'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) return { title: 'Case Study' }
  return { title: `${cs.client} Case Study — V3`, description: cs.summary }
}

/**
 * V3 — Narrative Timeline
 * Storytelling flow with alternating sections, inline quote callouts,
 * and a vertical timeline feel
 */
export default async function CaseStudyV3({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      {/* Hero — clean minimal */}
      <AnimatedSection className='relative isolate flex min-h-[60svh] max-w-none flex-col items-center justify-center gap-8 px-6 pb-12 pt-32 text-center'>
        <div className='mx-auto flex w-full max-w-4xl flex-col items-center gap-5'>
          <a
            href={cs.href}
            target='_blank'
            rel='noopener noreferrer'
            className='transition-opacity hover:opacity-70'
          >
            <Image
              src={cs.logo}
              alt={cs.client}
              width={180}
              height={60}
              className='h-10 w-auto brightness-0 md:h-14'
            />
          </a>
          <h1 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
            {cs.title}
          </h1>
          <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-ink/50'>
            <span>{cs.client}</span>
            <span>·</span>
            <span>{cs.industry}</span>
            <span>·</span>
            <span>57 bands in 2026</span>
            <span>·</span>
            <span>7,100+ rooms booked</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Timeline narrative */}
      <div className='mx-auto max-w-3xl px-6'>
        {/* Chapter 1: The Problem */}
        <AnimatedSection className='relative border-l-2 border-ink/15 pb-16 pl-8 pt-0 md:pl-12'>
          <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink/30 bg-white' />
          <span className='text-xs font-semibold uppercase tracking-wider text-ink/40'>
            Chapter 1
          </span>
          <h2 className='mt-2 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
            The Problem
          </h2>
          <p className='mt-4 text-base !leading-relaxed text-ink/80 md:text-lg'>
            {cs.challenge}
          </p>

          {/* Inline quote callout */}
          <div className='mt-6 border-l-4 border-ink/20 pl-5'>
            <p className='text-base italic text-ink/60 md:text-lg'>
              &ldquo;It was all painful. It was just a very time-consuming process, copy-pasting, sending emails.&rdquo;
            </p>
          </div>
        </AnimatedSection>

        {/* Chapter 2: Dead Ends */}
        {cs.failedAlternatives && (
          <AnimatedSection className='relative border-l-2 border-ink/15 pb-16 pl-8 pt-0 md:pl-12'>
            <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink/30 bg-white' />
            <span className='text-xs font-semibold uppercase tracking-wider text-ink/40'>
              Chapter 2
            </span>
            <h2 className='mt-2 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              The Dead Ends
            </h2>
            <p className='mt-4 text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.failedAlternatives}
            </p>
          </AnimatedSection>
        )}

        {/* Chapter 3: The Build */}
        <AnimatedSection className='relative border-l-2 border-ink/15 pb-16 pl-8 pt-0 md:pl-12'>
          <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink/30 bg-white' />
          <span className='text-xs font-semibold uppercase tracking-wider text-ink/40'>
            Chapter 3
          </span>
          <h2 className='mt-2 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
            What We Built
          </h2>
          <div className='mt-6 flex flex-col gap-4'>
            {cs.solution.map((item, i) => {
              const [label, ...rest] = item.split(' — ')
              const description = rest.join(' — ')
              return (
                <div key={i} className='flex gap-3'>
                  <span className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/10 text-xs font-semibold text-ink/60'>
                    {i + 1}
                  </span>
                  <div>
                    <span className='font-semibold text-ink'>{label}</span>
                    {description && (
                      <span className='text-ink/70'> — {description}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {cs.implementation && (
            <p className='mt-6 text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.implementation}
            </p>
          )}
        </AnimatedSection>

        {/* Chapter 4: The Results */}
        <AnimatedSection className='relative border-l-2 border-ink/15 pb-16 pl-8 pt-0 md:pl-12'>
          <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink bg-ink' />
          <span className='text-xs font-semibold uppercase tracking-wider text-ink/40'>
            Chapter 4
          </span>
          <h2 className='mt-2 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
            The Results
          </h2>
          <div className='mt-6 grid gap-4 sm:grid-cols-3'>
            {cs.stats.map(stat => (
              <div
                key={stat.label}
                className='rounded-xl border border-ink bg-ink p-5 text-center'
              >
                <p className='font-headline text-2xl font-semibold uppercase text-white md:text-3xl'>
                  {stat.after}
                </p>
                <p className='mt-1 text-xs text-white/50'>
                  was {stat.before}
                </p>
                <p className='mt-2 text-xs font-semibold uppercase tracking-wider text-white/30'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* End of timeline */}
      </div>

      {/* Quotes section */}
      <AnimatedSection className='pb-16 pt-0'>
        <div className='mx-auto flex max-w-3xl flex-col gap-6'>
          {cs.quotes.map((q, i) => (
            <blockquote
              key={i}
              className='rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:p-8'
            >
              {q.context && (
                <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-ink/40'>
                  {q.context}
                </p>
              )}
              <p className='text-lg font-medium !leading-snug text-ink md:text-xl'>
                &ldquo;{q.text}&rdquo;
              </p>
              {q.attribution && (
                <cite className='mt-3 block text-sm font-semibold not-italic text-ink/50'>
                  — {q.attribution}
                </cite>
              )}
            </blockquote>
          ))}
        </div>
      </AnimatedSection>

      {/* What's Next */}
      {cs.whatsNext && (
        <AnimatedSection className='pb-16 pt-0'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              What&apos;s Next
            </h2>
            <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.whatsNext}
            </p>
          </div>
        </AnimatedSection>
      )}

      {/* CTA */}
      <AnimatedSection className='pb-24 pt-0'>
        <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-white/50 p-8 text-center'>
          <h2 className='font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
            Want results like these?
          </h2>
          <p className='max-w-2xl text-balance text-base text-ink/80 md:text-lg'>
            We build custom AI-powered tools that fit how you actually work —
            not the other way around.
          </p>
          <div className='mt-2 flex flex-col items-center gap-3 sm:flex-row'>
            <BookCallLink
              label='Book a strategy call'
              placement='bottom'
              className='w-full sm:w-auto'
            />
            <Link
              href='/#contact'
              className='text-sm font-semibold text-ink/60 transition-colors hover:text-ink'
            >
              Or ask a question first
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
