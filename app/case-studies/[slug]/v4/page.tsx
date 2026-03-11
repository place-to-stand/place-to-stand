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
  return { title: `${cs.client} Case Study — V4`, description: cs.summary }
}

/**
 * V4 — Dashboard / At-a-Glance
 * Compact, scannable layout. Stats-forward hero, content in cards,
 * designed for quick consumption
 */
export default async function CaseStudyV4({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      {/* Hero — logo + title + stats all in one view */}
      <AnimatedSection className='relative isolate flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-0 px-6 pb-20 pt-32'>
        <div className='mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-ink shadow-xl'>
          {/* Top bar */}
          <div className='flex flex-col items-center gap-4 bg-ink px-6 py-10 text-center md:px-12 md:py-14'>
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
            <h1 className='max-w-3xl text-balance font-headline text-2xl font-semibold uppercase !leading-[.9] text-white md:text-4xl'>
              {cs.title}
            </h1>
            <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40'>
              <span>{cs.client}</span>
              <span>·</span>
              <span>{cs.industry}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className='grid divide-y divide-ink/10 bg-white md:grid-cols-3 md:divide-x md:divide-y-0'>
            {cs.stats.map(stat => (
              <div
                key={stat.label}
                className='flex flex-col items-center gap-1 p-6 text-center md:p-8'
              >
                <span className='text-xs font-semibold uppercase tracking-wider text-ink/40'>
                  {stat.label}
                </span>
                <div className='flex items-baseline gap-2'>
                  <span className='text-base text-ink/30 line-through'>
                    {stat.before}
                  </span>
                  <span className='text-ink/30'>→</span>
                  <span className='font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
                    {stat.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className='border-t border-ink/10 bg-white/80 px-6 py-5 text-center md:px-10'>
            <p className='text-base italic text-ink/60 md:text-lg'>
              &ldquo;{cs.quotes[0].text}&rdquo;
            </p>
            {cs.quotes[0].attribution && (
              <p className='mt-1 text-xs font-semibold text-ink/30'>
                — {cs.quotes[0].attribution}
              </p>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Content cards — 2x2 grid */}
      <AnimatedSection className='pb-16 pt-0'>
        <div className='mx-auto grid max-w-5xl gap-6 md:grid-cols-2'>
          {/* Challenge */}
          <div className='rounded-xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:p-8'>
            <h2 className='mb-3 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
              The Challenge
            </h2>
            <p className='text-sm !leading-relaxed text-ink/70 md:text-base'>
              {cs.challenge}
            </p>
          </div>

          {/* What Didn't Work */}
          {cs.failedAlternatives && (
            <div className='rounded-xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:p-8'>
              <h2 className='mb-3 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
                What Didn&apos;t Work
              </h2>
              <p className='text-sm !leading-relaxed text-ink/70 md:text-base'>
                {cs.failedAlternatives}
              </p>
            </div>
          )}

          {/* Solution — spans full width */}
          <div className='rounded-xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:col-span-2 md:p-8'>
            <h2 className='mb-4 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
              What We Built
            </h2>
            <div className='grid gap-3 sm:grid-cols-2'>
              {cs.solution.map((item, i) => {
                const [label, ...rest] = item.split(' — ')
                const description = rest.join(' — ')
                return (
                  <div
                    key={i}
                    className='rounded-lg border border-ink/10 bg-white/70 p-4'
                  >
                    <h3 className='font-headline text-base font-semibold uppercase text-ink'>
                      {label}
                    </h3>
                    {description && (
                      <p className='mt-1 text-sm !leading-snug text-ink/60'>
                        {description}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Implementation */}
          {cs.implementation && (
            <div className='rounded-xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:p-8'>
              <h2 className='mb-3 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
                Implementation
              </h2>
              <p className='text-sm !leading-relaxed text-ink/70 md:text-base'>
                {cs.implementation}
              </p>
            </div>
          )}

          {/* What's Next */}
          {cs.whatsNext && (
            <div className='rounded-xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:p-8'>
              <h2 className='mb-3 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
                What&apos;s Next
              </h2>
              <p className='text-sm !leading-relaxed text-ink/70 md:text-base'>
                {cs.whatsNext}
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Quotes row */}
      {cs.quotes.length > 1 && (
        <AnimatedSection className='pb-16 pt-0'>
          <div className='mx-auto grid max-w-5xl gap-6 md:grid-cols-2'>
            {cs.quotes.slice(1).map((q, i) => (
              <blockquote
                key={i}
                className='rounded-xl border border-ink/10 bg-white/50 p-6 backdrop-blur md:p-8'
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
