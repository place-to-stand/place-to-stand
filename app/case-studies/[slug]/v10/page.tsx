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
  return { title: `${cs.client} Case Study — V10`, description: cs.summary }
}

/**
 * V10 — Horizontal Scroll Sections
 * Each section is a full-height card, with horizontal visual breaks.
 * Dark/light alternating sections for clear separation.
 */
export default async function CaseStudyV10({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      {/* Section 1: Hero — dark */}
      <section className='flex min-h-[100svh] flex-col items-center justify-center bg-ink px-6 py-20 text-center'>
        <a
          href={cs.href}
          target='_blank'
          rel='noopener noreferrer'
          className='transition-opacity hover:opacity-70'
        >
          <Image
            src={cs.logo}
            alt={cs.client}
            width={240}
            height={80}
            className='h-16 w-auto md:h-24'
          />
        </a>
        <h1 className='mt-8 max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-white md:text-5xl'>
          {cs.title}
        </h1>
        <p className='mt-4 max-w-2xl text-balance text-lg !leading-snug text-white/60 md:text-xl'>
          {cs.summary}
        </p>
        <div className='mt-10 flex flex-wrap justify-center gap-8 md:gap-12'>
          {cs.stats.map(stat => (
            <div key={stat.label} className='text-center'>
              <p className='font-headline text-4xl font-semibold uppercase text-white md:text-5xl'>
                {stat.after}
              </p>
              <p className='mt-1 text-sm text-white/30 line-through'>
                {stat.before}
              </p>
              <p className='mt-1 text-xs font-semibold uppercase tracking-wider text-white/40'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Challenge — light */}
      <section className='flex min-h-[60svh] items-center px-6 py-20'>
        <div className='mx-auto max-w-3xl'>
          <span className='text-xs font-semibold uppercase tracking-wider text-ink/40'>
            The Problem
          </span>
          <h2 className='mt-2 font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
            The Challenge
          </h2>
          <p className='mt-6 text-lg !leading-relaxed text-ink/80'>
            {cs.challenge}
          </p>
          {cs.failedAlternatives && (
            <>
              <div className='my-8 h-px bg-ink/10' />
              <h3 className='font-headline text-xl font-semibold uppercase text-ink'>
                What Didn&apos;t Work
              </h3>
              <p className='mt-3 text-lg !leading-relaxed text-ink/80'>
                {cs.failedAlternatives}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Section 3: Quote — gradient */}
      <section className='flex min-h-[50svh] items-center bg-gradientPrimary px-6 py-20 text-center'>
        <blockquote className='mx-auto max-w-3xl'>
          <p className='font-headline text-3xl font-semibold uppercase !leading-[.9] text-white md:text-5xl'>
            &ldquo;{cs.quotes[1]?.text || cs.quotes[0].text}&rdquo;
          </p>
          <cite className='mt-6 block text-sm font-semibold not-italic text-white/50'>
            — {cs.quotes[1]?.attribution || cs.quotes[0].attribution}
          </cite>
        </blockquote>
      </section>

      {/* Section 4: Solution — light */}
      <section className='flex min-h-[60svh] items-center px-6 py-20'>
        <div className='mx-auto w-full max-w-4xl'>
          <span className='text-xs font-semibold uppercase tracking-wider text-ink/40'>
            The Build
          </span>
          <h2 className='mt-2 font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
            What We Built
          </h2>
          <div className='mt-8 grid gap-4 sm:grid-cols-2'>
            {cs.solution.map((item, i) => {
              const [label, ...rest] = item.split(' — ')
              const description = rest.join(' — ')
              return (
                <div
                  key={i}
                  className='rounded-xl border border-ink/10 bg-white/50 p-6 backdrop-blur'
                >
                  <div className='mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink font-headline text-sm font-semibold text-white'>
                    {i + 1}
                  </div>
                  <h3 className='font-headline text-lg font-semibold uppercase text-ink'>
                    {label}
                  </h3>
                  {description && (
                    <p className='mt-2 text-sm !leading-snug text-ink/70'>
                      {description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {cs.implementation && (
            <p className='mt-8 text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.implementation}
            </p>
          )}
        </div>
      </section>

      {/* Section 5: More quotes — dark */}
      <section className='bg-ink px-6 py-20'>
        <div className='mx-auto grid max-w-4xl gap-6 md:grid-cols-2'>
          {cs.quotes.map((q, i) => (
            <blockquote
              key={i}
              className={`rounded-2xl border border-white/10 p-6 md:p-8 ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              {q.context && (
                <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-white/30'>
                  {q.context}
                </p>
              )}
              <p
                className={`font-medium !leading-snug text-white ${
                  i === 0 ? 'text-xl md:text-2xl' : 'text-lg'
                }`}
              >
                &ldquo;{q.text}&rdquo;
              </p>
              {q.attribution && (
                <cite className='mt-3 block text-sm font-semibold not-italic text-white/40'>
                  — {q.attribution}
                </cite>
              )}
            </blockquote>
          ))}
        </div>
      </section>

      {/* Section 6: What's Next + CTA — light */}
      <section className='flex min-h-[60svh] items-center px-6 py-20'>
        <div className='mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center'>
          {cs.whatsNext && (
            <div>
              <h2 className='mb-4 font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
                What&apos;s Next
              </h2>
              <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
                {cs.whatsNext}
              </p>
            </div>
          )}
          <div className='flex w-full flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-white/50 p-8'>
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
        </div>
      </section>
    </main>
  )
}
