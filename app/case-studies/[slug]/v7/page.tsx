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
  return { title: `${cs.client} Case Study — V7`, description: cs.summary }
}

/**
 * V7 — Gradient Hero + Bento Grid
 * Gradient background hero, content in a bento-style grid below
 */
export default async function CaseStudyV7({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      {/* Gradient hero */}
      <section className='relative flex min-h-[70svh] flex-col items-center justify-center bg-gradientPrimary px-6 pb-16 pt-32 text-center'>
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
              width={200}
              height={64}
              className='h-12 w-auto md:h-16'
            />
          </a>
          <h1 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-white md:text-5xl'>
            {cs.title}
          </h1>
          <p className='max-w-3xl text-balance text-lg !leading-snug text-white/70 md:text-xl'>
            {cs.summary}
          </p>
          <div className='mt-4 flex flex-wrap justify-center gap-6'>
            {cs.stats.map(stat => (
              <div key={stat.label} className='text-center'>
                <p className='font-headline text-3xl font-semibold uppercase text-white md:text-4xl'>
                  {stat.after}
                </p>
                <p className='mt-1 text-xs font-semibold uppercase tracking-wider text-white/40'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <AnimatedSection className='py-16'>
        <div className='mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]'>
          {/* Challenge — spans 2 cols */}
          <div className='rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:col-span-2 md:p-8'>
            <h2 className='mb-3 font-headline text-2xl font-semibold uppercase text-ink'>
              The Challenge
            </h2>
            <p className='text-base !leading-relaxed text-ink/80'>
              {cs.challenge}
            </p>
          </div>

          {/* Primary quote — tall card */}
          <blockquote className='flex flex-col justify-center rounded-2xl border border-ink bg-ink p-6 md:row-span-2 md:p-8'>
            <p className='text-lg font-medium !leading-snug text-white md:text-xl'>
              &ldquo;{cs.quotes[0].text}&rdquo;
            </p>
            {cs.quotes[0].attribution && (
              <cite className='mt-4 block text-sm font-semibold not-italic text-white/40'>
                — {cs.quotes[0].attribution}
              </cite>
            )}
          </blockquote>

          {/* What didn't work */}
          {cs.failedAlternatives && (
            <div className='rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:col-span-2 md:p-8'>
              <h2 className='mb-3 font-headline text-2xl font-semibold uppercase text-ink'>
                What Didn&apos;t Work
              </h2>
              <p className='text-base !leading-relaxed text-ink/80'>
                {cs.failedAlternatives}
              </p>
            </div>
          )}

          {/* Solution — full width */}
          <div className='rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:col-span-3 md:p-8'>
            <h2 className='mb-5 font-headline text-2xl font-semibold uppercase text-ink'>
              What We Built
            </h2>
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
              {cs.solution.map((item, i) => {
                const [label, ...rest] = item.split(' — ')
                const description = rest.join(' — ')
                return (
                  <div
                    key={i}
                    className='rounded-xl border border-ink/10 bg-white/70 p-4'
                  >
                    <span className='mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white'>
                      {i + 1}
                    </span>
                    <h3 className='mt-2 font-headline text-base font-semibold uppercase text-ink'>
                      {label}
                    </h3>
                    {description && (
                      <p className='mt-1 text-sm text-ink/60'>{description}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Implementation */}
          {cs.implementation && (
            <div className='rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:col-span-2 md:p-8'>
              <h2 className='mb-3 font-headline text-2xl font-semibold uppercase text-ink'>
                Implementation
              </h2>
              <p className='text-base !leading-relaxed text-ink/80'>
                {cs.implementation}
              </p>
            </div>
          )}

          {/* What's next */}
          {cs.whatsNext && (
            <div className='rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:p-8'>
              <h2 className='mb-3 font-headline text-2xl font-semibold uppercase text-ink'>
                What&apos;s Next
              </h2>
              <p className='text-base !leading-relaxed text-ink/80'>
                {cs.whatsNext}
              </p>
            </div>
          )}

          {/* Additional quotes */}
          {cs.quotes.slice(1).map((q, i) => (
            <blockquote
              key={i}
              className={`rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:p-8 ${
                i === 0 && cs.quotes.length > 2 ? 'md:col-span-2' : ''
              }`}
            >
              {q.context && (
                <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-ink/40'>
                  {q.context}
                </p>
              )}
              <p className='text-lg font-medium !leading-snug text-ink'>
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
