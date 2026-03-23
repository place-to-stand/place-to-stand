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
  return { title: `${cs.client} Case Study — V2`, description: cs.summary }
}

/**
 * V2 — Magazine Layout
 * Full-bleed dark hero with logo, side-by-side challenge/solution,
 * big pull quotes between sections
 */
export default async function CaseStudyV2({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      {/* Full-bleed dark hero */}
      <section className='relative flex min-h-[80svh] flex-col items-center justify-center bg-ink px-6 pb-20 pt-32 text-center'>
        <div className='mx-auto flex w-full max-w-4xl flex-col items-center gap-6'>
          <a
            href={cs.href}
            target='_blank'
            rel='noopener noreferrer'
            className='transition-opacity hover:opacity-70'
          >
            <Image
              src={cs.logo}
              alt={cs.client}
              width={220}
              height={72}
              className='h-14 w-auto md:h-20'
            />
          </a>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold uppercase tracking-[0.14em] text-white/40'>
              {cs.client}
            </span>
            <span className='text-white/20'>·</span>
            <span className='text-sm font-semibold uppercase tracking-[0.14em] text-white/40'>
              {cs.industry}
            </span>
          </div>
          <h1 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-white md:text-5xl'>
            {cs.title}
          </h1>
          <p className='max-w-3xl text-balance text-lg !leading-snug text-white/70 md:text-xl'>
            {cs.summary}
          </p>

          {/* Stats row on dark bg */}
          <div className='mt-6 flex flex-wrap justify-center gap-6 md:gap-10'>
            {cs.stats.map(stat => (
              <div key={stat.label} className='text-center'>
                <p className='font-headline text-3xl font-semibold uppercase text-white md:text-4xl'>
                  {stat.after}
                </p>
                <p className='mt-1 text-xs font-semibold uppercase tracking-wider text-white/40'>
                  {stat.label}
                </p>
                <p className='text-xs text-white/30'>was {stat.before}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote — full width band */}
      <div className='bg-gradientPrimary px-6 py-10 text-center md:py-14'>
        <blockquote className='mx-auto max-w-3xl'>
          <p className='text-xl font-medium !leading-snug text-white md:text-2xl'>
            &ldquo;{cs.quotes[0].text}&rdquo;
          </p>
          {cs.quotes[0].attribution && (
            <cite className='mt-3 block text-sm font-semibold not-italic text-white/60'>
              — {cs.quotes[0].attribution}
            </cite>
          )}
        </blockquote>
      </div>

      {/* Challenge + What Didn't Work — side by side */}
      <AnimatedSection className='pb-16 pt-16'>
        <div className='mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12'>
          <div>
            <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              The Challenge
            </h2>
            <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.challenge}
            </p>
          </div>
          {cs.failedAlternatives && (
            <div>
              <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
                What Didn&apos;t Work
              </h2>
              <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
                {cs.failedAlternatives}
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Solution — numbered list */}
      <AnimatedSection className='pb-16 pt-0'>
        <div className='mx-auto max-w-5xl'>
          <h2 className='mb-8 text-center font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
            What We Built
          </h2>
          <div className='grid gap-4 md:grid-cols-2'>
            {cs.solution.map((item, i) => {
              const [label, ...rest] = item.split(' — ')
              const description = rest.join(' — ')
              return (
                <div
                  key={i}
                  className='flex gap-4 rounded-xl border border-ink/10 bg-white/50 p-5 backdrop-blur'
                >
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-headline text-sm font-semibold text-white'>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className='font-headline text-lg font-semibold uppercase text-ink'>
                      {label}
                    </h3>
                    {description && (
                      <p className='mt-1 text-sm !leading-snug text-ink/70 md:text-base'>
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Implementation */}
      {cs.implementation && (
        <AnimatedSection className='pb-16 pt-0'>
          <div className='mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white/50 p-8 text-center backdrop-blur'>
            <h2 className='mb-3 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              Implementation
            </h2>
            <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.implementation}
            </p>
          </div>
        </AnimatedSection>
      )}

      {/* Additional quotes */}
      {cs.quotes.length > 1 && (
        <AnimatedSection className='pb-16 pt-0'>
          <div className='mx-auto grid max-w-5xl gap-6 md:grid-cols-2'>
            {cs.quotes.slice(1).map((q, i) => (
              <blockquote
                key={i}
                className='rounded-2xl border border-ink bg-ink p-6 md:p-8'
              >
                {q.context && (
                  <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-white/30'>
                    {q.context}
                  </p>
                )}
                <p className='text-lg font-medium !leading-snug text-white md:text-xl'>
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
        </AnimatedSection>
      )}

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
