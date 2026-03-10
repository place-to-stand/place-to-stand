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
      {/* Hero */}
      <AnimatedSection className='relative isolate flex min-h-[70svh] max-w-none flex-col items-center justify-center gap-8 px-6 pb-16 pt-32 text-center'>
        <div className='mx-auto flex w-full max-w-4xl flex-col items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold uppercase tracking-[0.14em] text-ink/60'>
              {cs.client}
            </span>
            <span className='text-ink/30'>·</span>
            <span className='text-sm font-semibold uppercase tracking-[0.14em] text-ink/60'>
              {cs.industry}
            </span>
          </div>
          <h1 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
            {cs.title}
          </h1>
          <p className='max-w-3xl text-balance text-lg !leading-snug text-ink/80 md:text-xl'>
            {cs.summary}
          </p>
        </div>
      </AnimatedSection>

      {/* Image */}
      <AnimatedSection className='max-w-none px-6 pb-16 pt-0 md:px-12'>
        <div className='relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-2xl border border-ink shadow-xl'>
          <Image
            src={cs.image}
            alt={`${cs.client} platform`}
            fill
            className='object-cover'
            priority
          />
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

      {/* Results */}
      <AnimatedSection className='pb-16 pt-0'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-6 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
            The Results
          </h2>
          <div className='overflow-hidden rounded-xl border border-ink'>
            <table className='w-full'>
              <thead>
                <tr className='bg-ink text-left text-white'>
                  <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wider md:px-6 md:text-sm'>
                    Activity
                  </th>
                  <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wider md:px-6 md:text-sm'>
                    Before
                  </th>
                  <th className='px-4 py-3 text-xs font-semibold uppercase tracking-wider md:px-6 md:text-sm'>
                    After
                  </th>
                </tr>
              </thead>
              <tbody>
                {cs.stats.map((stat, i) => (
                  <tr
                    key={stat.label}
                    className={i % 2 === 0 ? 'bg-white/80' : 'bg-white/50'}
                  >
                    <td className='px-4 py-3 text-sm font-medium text-ink md:px-6 md:text-base'>
                      {stat.label}
                    </td>
                    <td className='px-4 py-3 text-sm text-ink/50 line-through md:px-6 md:text-base'>
                      {stat.before}
                    </td>
                    <td className='px-4 py-3 text-sm font-semibold text-ink md:px-6 md:text-base'>
                      {stat.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* Quote */}
      <AnimatedSection className='pb-16 pt-0'>
        <div className='mx-auto max-w-3xl'>
          <blockquote className='rounded-2xl border border-ink/10 bg-white/50 p-8 backdrop-blur'>
            <p className='text-xl font-medium !leading-snug text-ink md:text-2xl'>
              &ldquo;{cs.quote}&rdquo;
            </p>
            {cs.quoteAttribution && (
              <cite className='mt-4 block text-sm font-semibold not-italic text-ink/60'>
                — {cs.quoteAttribution}
              </cite>
            )}
          </blockquote>
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
