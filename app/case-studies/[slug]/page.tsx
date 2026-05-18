import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BookCallLink } from '@/src/components/book-call-link'
import { caseStudyMap, caseStudies } from '@/src/lib/case-studies'

type CaseStudyParams = {
  slug: string
}

type CaseStudyRouteProps = {
  params: Promise<CaseStudyParams>
}

export async function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: CaseStudyRouteProps): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudyMap[slug]

  if (!cs) {
    return { title: 'Case Study' }
  }

  return {
    title: `${cs.client} Case Study`,
    description: cs.summary,
  }
}

export default async function CaseStudyRoute({
  params,
}: CaseStudyRouteProps) {
  const { slug } = await params
  const cs = caseStudyMap[slug]

  if (!cs) {
    notFound()
  }

  return (
    <main className='flex-1'>
      {/* Hero — redesign shell with case-study-specific logo + meta */}
      <AnimatedSection className='relative isolate flex min-h-[80svh] max-w-none flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Case study
          </span>
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
              className='h-12 w-auto brightness-0 md:h-16'
            />
          </a>
          <div className='flex items-center gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.14em] text-ink/60 md:text-sm'>
              {cs.client}
            </span>
            <span className='text-ink/30'>·</span>
            <span className='text-xs font-semibold uppercase tracking-[0.14em] text-ink/60 md:text-sm'>
              {cs.industry}
            </span>
          </div>
          <h1 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            {cs.title}
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            {cs.summary}
          </p>
        </div>
      </AnimatedSection>

      {/* Results showcase */}
      <AnimatedSection className='px-6 pb-16 pt-0'>
        <div className='mx-auto max-w-4xl overflow-hidden rounded-2xl border border-ink shadow-xl'>
          <div className='flex items-center justify-between bg-ink px-6 py-5 md:px-10 md:py-6'>
            <Image
              src={cs.logo}
              alt={cs.client}
              width={140}
              height={48}
              className='h-7 w-auto md:h-9'
            />
            <span className='text-xs font-semibold uppercase tracking-wider text-white/50'>
              {cs.industry}
            </span>
          </div>

          <div className='grid divide-y divide-ink/10 bg-white md:grid-cols-3 md:divide-x md:divide-y-0'>
            {cs.stats.map(stat => (
              <div key={stat.label} className='flex flex-col gap-3 p-6 md:p-8'>
                <span className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
                  {stat.label}
                </span>
                <div className='flex items-baseline gap-3'>
                  <span className='text-lg text-ink/30 line-through md:text-xl'>
                    {stat.before}
                  </span>
                  <svg
                    className='h-4 w-4 shrink-0 text-ink/30'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </svg>
                  <span className='font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
                    {stat.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className='border-t border-ink/10 bg-white/80 px-6 py-5 md:px-10'>
            <p className='text-center text-base italic text-ink/70 md:text-lg'>
              &ldquo;{cs.quotes[0].text}&rdquo;
            </p>
            {cs.quotes[0].attribution && (
              <p className='mt-1 text-center text-xs font-semibold text-ink/40'>
                — {cs.quotes[0].attribution}
              </p>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Challenge */}
      <AnimatedSection className='pb-16 pt-8'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
            The Challenge
          </h2>
          <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
            {cs.challenge}
          </p>
        </div>
      </AnimatedSection>

      {/* Failed alternatives */}
      {cs.failedAlternatives && (
        <AnimatedSection className='pb-16 pt-0'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              What Didn&apos;t Work
            </h2>
            <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.failedAlternatives}
            </p>
          </div>
        </AnimatedSection>
      )}

      {/* Solution */}
      <AnimatedSection className='pb-16 pt-0'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-6 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
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
                  <h3 className='mb-1 font-headline text-lg font-semibold uppercase text-ink'>
                    {label}
                  </h3>
                  {description && (
                    <p className='text-sm !leading-snug text-ink/70 md:text-base'>
                      {description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Implementation */}
      {cs.implementation && (
        <AnimatedSection className='pb-16 pt-0'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              Implementation
            </h2>
            <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.implementation}
            </p>
          </div>
        </AnimatedSection>
      )}

      {/* Quotes */}
      {cs.quotes.length > 1 && (
        <AnimatedSection className='pb-16 pt-0'>
          <div className='mx-auto flex max-w-3xl flex-col gap-6'>
            <h2 className='font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              In His Words
            </h2>
            {cs.quotes.slice(1).map((q, i) => (
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
              href='/contact'
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
