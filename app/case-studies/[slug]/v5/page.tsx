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
  return { title: `${cs.client} Case Study — V5`, description: cs.summary }
}

/**
 * V5 — Split Screen
 * Left column stays fixed with logo/stats, right column scrolls with content
 */
export default async function CaseStudyV5({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      <div className='mx-auto max-w-7xl px-6 pb-24 pt-32'>
        <div className='grid gap-12 md:grid-cols-[340px_1fr] lg:grid-cols-[400px_1fr]'>
          {/* Left — sticky sidebar */}
          <div className='md:sticky md:top-32 md:self-start'>
            <a
              href={cs.href}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block transition-opacity hover:opacity-70'
            >
              <Image
                src={cs.logo}
                alt={cs.client}
                width={160}
                height={52}
                className='h-10 w-auto brightness-0 md:h-12'
              />
            </a>
            <div className='mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/40'>
              <span>{cs.client}</span>
              <span>·</span>
              <span>{cs.industry}</span>
            </div>

            {/* Stats cards */}
            <div className='mt-8 flex flex-col gap-3'>
              {cs.stats.map(stat => (
                <div
                  key={stat.label}
                  className='rounded-xl border border-ink bg-ink p-4'
                >
                  <p className='text-xs font-semibold uppercase tracking-wider text-white/40'>
                    {stat.label}
                  </p>
                  <div className='mt-1 flex items-baseline gap-2'>
                    <span className='text-sm text-white/30 line-through'>
                      {stat.before}
                    </span>
                    <span className='text-white/30'>→</span>
                    <span className='font-headline text-2xl font-semibold uppercase text-white'>
                      {stat.after}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary quote */}
            <blockquote className='mt-8 border-l-2 border-ink/20 pl-4'>
              <p className='text-sm italic !leading-snug text-ink/60'>
                &ldquo;{cs.quotes[0].text}&rdquo;
              </p>
              {cs.quotes[0].attribution && (
                <cite className='mt-2 block text-xs font-semibold not-italic text-ink/40'>
                  — {cs.quotes[0].attribution}
                </cite>
              )}
            </blockquote>

            <div className='mt-8'>
              <BookCallLink
                label='Book a strategy call'
                placement='bottom'
                className='w-full'
              />
            </div>
          </div>

          {/* Right — scrolling content */}
          <div>
            <h1 className='font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
              {cs.title}
            </h1>
            <p className='mt-4 max-w-2xl text-lg !leading-snug text-ink/80 md:text-xl'>
              {cs.summary}
            </p>

            <div className='mt-12 flex flex-col gap-12'>
              <section>
                <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink'>
                  The Challenge
                </h2>
                <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
                  {cs.challenge}
                </p>
              </section>

              {cs.failedAlternatives && (
                <section>
                  <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink'>
                    What Didn&apos;t Work
                  </h2>
                  <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
                    {cs.failedAlternatives}
                  </p>
                </section>
              )}

              <section>
                <h2 className='mb-6 font-headline text-2xl font-semibold uppercase text-ink'>
                  The Solution
                </h2>
                <div className='flex flex-col gap-4'>
                  {cs.solution.map((item, i) => {
                    const [label, ...rest] = item.split(' — ')
                    const description = rest.join(' — ')
                    return (
                      <div
                        key={i}
                        className='rounded-xl border border-ink/10 bg-white/50 p-5 backdrop-blur'
                      >
                        <h3 className='font-headline text-lg font-semibold uppercase text-ink'>
                          {label}
                        </h3>
                        {description && (
                          <p className='mt-1 text-sm !leading-snug text-ink/70 md:text-base'>
                            {description}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>

              {cs.implementation && (
                <section>
                  <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink'>
                    Implementation
                  </h2>
                  <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
                    {cs.implementation}
                  </p>
                </section>
              )}

              {cs.quotes.length > 1 && (
                <section className='flex flex-col gap-4'>
                  <h2 className='font-headline text-2xl font-semibold uppercase text-ink'>
                    In His Words
                  </h2>
                  {cs.quotes.slice(1).map((q, i) => (
                    <blockquote
                      key={i}
                      className='rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur'
                    >
                      {q.context && (
                        <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-ink/40'>
                          {q.context}
                        </p>
                      )}
                      <p className='text-lg font-medium !leading-snug text-ink'>
                        &ldquo;{q.text}&rdquo;
                      </p>
                    </blockquote>
                  ))}
                </section>
              )}

              {cs.whatsNext && (
                <section>
                  <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink'>
                    What&apos;s Next
                  </h2>
                  <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
                    {cs.whatsNext}
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
