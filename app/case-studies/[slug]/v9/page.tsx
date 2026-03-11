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
  return { title: `${cs.client} Case Study — V9`, description: cs.summary }
}

/**
 * V9 — Minimal Long-form
 * Clean article feel, narrow column, generous whitespace,
 * quotes as full-width color breaks
 */
export default async function CaseStudyV9({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      {/* Minimal hero */}
      <div className='mx-auto max-w-2xl px-6 pb-16 pt-32'>
        <div className='flex items-center gap-4'>
          <a
            href={cs.href}
            target='_blank'
            rel='noopener noreferrer'
            className='transition-opacity hover:opacity-70'
          >
            <Image
              src={cs.logo}
              alt={cs.client}
              width={120}
              height={40}
              className='h-8 w-auto brightness-0'
            />
          </a>
          <div className='h-6 w-px bg-ink/20' />
          <span className='text-sm text-ink/50'>{cs.industry}</span>
        </div>
        <h1 className='mt-8 font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
          {cs.title}
        </h1>
        <p className='mt-4 text-lg !leading-snug text-ink/70'>
          {cs.summary}
        </p>

        {/* Inline stats */}
        <div className='mt-8 flex gap-6 border-y border-ink/10 py-6'>
          {cs.stats.map(stat => (
            <div key={stat.label}>
              <p className='font-headline text-2xl font-semibold uppercase text-ink'>
                {stat.after}
              </p>
              <p className='text-xs text-ink/40'>
                {stat.label} (was {stat.before})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Article body */}
      <article className='mx-auto max-w-2xl px-6'>
        <section className='pb-12'>
          <h2 className='mb-4 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
            The Challenge
          </h2>
          <p className='text-base !leading-[1.8] text-ink/75'>
            {cs.challenge}
          </p>
        </section>

        {cs.failedAlternatives && (
          <section className='pb-12'>
            <h2 className='mb-4 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
              What Didn&apos;t Work
            </h2>
            <p className='text-base !leading-[1.8] text-ink/75'>
              {cs.failedAlternatives}
            </p>
          </section>
        )}

        <section className='pb-12'>
          <h2 className='mb-4 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
            The Solution
          </h2>
          {cs.solution.map((item, i) => {
            const [label, ...rest] = item.split(' — ')
            const description = rest.join(' — ')
            return (
              <p key={i} className='mb-3 text-base !leading-[1.8] text-ink/75'>
                <strong className='font-semibold text-ink'>{label}</strong>
                {description && <> — {description}</>}
              </p>
            )
          })}
        </section>

        {cs.implementation && (
          <section className='pb-12'>
            <h2 className='mb-4 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
              Implementation
            </h2>
            <p className='text-base !leading-[1.8] text-ink/75'>
              {cs.implementation}
            </p>
          </section>
        )}
      </article>

      {/* Full-width quote break */}
      <div className='bg-gradientPrimary px-6 py-12 md:py-16'>
        <blockquote className='mx-auto max-w-2xl text-center'>
          <p className='text-xl font-medium !leading-snug text-white md:text-2xl'>
            &ldquo;{cs.quotes[1]?.text || cs.quotes[0].text}&rdquo;
          </p>
          <cite className='mt-3 block text-sm font-semibold not-italic text-white/50'>
            — {cs.quotes[1]?.attribution || cs.quotes[0].attribution}
          </cite>
        </blockquote>
      </div>

      {/* More quotes inline */}
      <div className='mx-auto max-w-2xl px-6 py-12'>
        {cs.quotes
          .filter((_, i) => i !== 1)
          .map((q, i) => (
            <blockquote
              key={i}
              className='border-l-2 border-ink/15 py-4 pl-6'
            >
              {q.context && (
                <p className='mb-1 text-xs font-semibold uppercase tracking-wider text-ink/30'>
                  {q.context}
                </p>
              )}
              <p className='text-base italic !leading-snug text-ink/60 md:text-lg'>
                &ldquo;{q.text}&rdquo;
              </p>
            </blockquote>
          ))}
      </div>

      {/* What's Next */}
      {cs.whatsNext && (
        <div className='mx-auto max-w-2xl px-6 pb-12'>
          <h2 className='mb-4 font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
            What&apos;s Next
          </h2>
          <p className='text-base !leading-[1.8] text-ink/75'>
            {cs.whatsNext}
          </p>
        </div>
      )}

      {/* CTA */}
      <AnimatedSection className='pb-24 pt-4'>
        <div className='mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-white/50 p-8 text-center'>
          <h2 className='font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
            Want results like these?
          </h2>
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
