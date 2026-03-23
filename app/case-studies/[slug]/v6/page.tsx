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
  return { title: `${cs.client} Case Study — V6`, description: cs.summary }
}

/**
 * V6 — Bold Headline
 * Oversized typography hero, full-width stat blocks with
 * alternating bg colors, editorial feel
 */
export default async function CaseStudyV6({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      {/* Hero — oversized type */}
      <AnimatedSection className='relative isolate flex min-h-[90svh] max-w-none flex-col items-center justify-center gap-6 px-6 pb-20 pt-32 text-center'>
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
        <h1 className='max-w-6xl font-headline text-5xl font-semibold uppercase !leading-[.85] text-ink md:text-7xl lg:text-8xl'>
          {cs.title}
        </h1>
        <p className='max-w-2xl text-balance text-base !leading-snug text-ink/60 md:text-lg'>
          {cs.summary}
        </p>
      </AnimatedSection>

      {/* Full-width stat blocks */}
      <div className='grid md:grid-cols-3'>
        {cs.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center gap-2 px-6 py-12 text-center md:py-16 ${
              i % 2 === 0 ? 'bg-ink text-white' : 'bg-white'
            }`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                i % 2 === 0 ? 'text-white/40' : 'text-ink/40'
              }`}
            >
              {stat.label}
            </span>
            <span
              className={`font-headline text-4xl font-semibold uppercase md:text-5xl ${
                i % 2 === 0 ? 'text-white' : 'text-ink'
              }`}
            >
              {stat.after}
            </span>
            <span
              className={`text-sm line-through ${
                i % 2 === 0 ? 'text-white/30' : 'text-ink/30'
              }`}
            >
              previously {stat.before}
            </span>
          </div>
        ))}
      </div>

      {/* Quote — full width dark */}
      <div className='bg-ink px-6 py-14 text-center md:py-20'>
        <blockquote className='mx-auto max-w-3xl'>
          <p className='font-headline text-2xl font-semibold uppercase !leading-[.95] text-white md:text-4xl'>
            &ldquo;{cs.quotes[0].text}&rdquo;
          </p>
          {cs.quotes[0].attribution && (
            <cite className='mt-4 block text-sm font-semibold not-italic text-white/40'>
              — {cs.quotes[0].attribution}
            </cite>
          )}
        </blockquote>
      </div>

      {/* Challenge */}
      <AnimatedSection className='py-16'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-4 font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
            The Challenge
          </h2>
          <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
            {cs.challenge}
          </p>
        </div>
      </AnimatedSection>

      {cs.failedAlternatives && (
        <div className='bg-white/60 px-6 py-16'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='mb-4 font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
              What Didn&apos;t Work
            </h2>
            <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.failedAlternatives}
            </p>
          </div>
        </div>
      )}

      {/* Solution */}
      <AnimatedSection className='py-16'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-8 font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
            What We Built
          </h2>
          {cs.solution.map((item, i) => {
            const [label, ...rest] = item.split(' — ')
            const description = rest.join(' — ')
            return (
              <div
                key={i}
                className='border-b border-ink/10 py-5 last:border-0'
              >
                <h3 className='font-headline text-xl font-semibold uppercase text-ink'>
                  {label}
                </h3>
                {description && (
                  <p className='mt-1 text-base text-ink/70'>{description}</p>
                )}
              </div>
            )
          })}
        </div>
      </AnimatedSection>

      {/* Additional quotes — alternating alignment */}
      {cs.quotes.length > 1 && (
        <AnimatedSection className='pb-16 pt-0'>
          <div className='mx-auto flex max-w-4xl flex-col gap-8'>
            {cs.quotes.slice(1).map((q, i) => (
              <blockquote
                key={i}
                className={`max-w-2xl ${i % 2 === 0 ? 'self-start' : 'self-end text-right'}`}
              >
                {q.context && (
                  <p className='mb-1 text-xs font-semibold uppercase tracking-wider text-ink/40'>
                    {q.context}
                  </p>
                )}
                <p className='text-xl font-medium !leading-snug text-ink md:text-2xl'>
                  &ldquo;{q.text}&rdquo;
                </p>
                {q.attribution && (
                  <cite className='mt-2 block text-sm font-semibold not-italic text-ink/40'>
                    — {q.attribution}
                  </cite>
                )}
              </blockquote>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* What's Next + CTA */}
      <div className='bg-ink px-6 py-16 text-center md:py-20'>
        <div className='mx-auto max-w-3xl'>
          {cs.whatsNext && (
            <div className='mb-12'>
              <h2 className='mb-4 font-headline text-3xl font-semibold uppercase text-white md:text-4xl'>
                What&apos;s Next
              </h2>
              <p className='text-base !leading-relaxed text-white/70 md:text-lg'>
                {cs.whatsNext}
              </p>
            </div>
          )}
          <h2 className='font-headline text-3xl font-semibold uppercase text-white md:text-4xl'>
            Want results like these?
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-balance text-base text-white/60 md:text-lg'>
            We build custom AI-powered tools that fit how you actually work.
          </p>
          <div className='mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
            <BookCallLink
              label='Book a strategy call'
              placement='bottom'
              className='w-full sm:w-auto'
            />
            <Link
              href='/#contact'
              className='text-sm font-semibold text-white/40 transition-colors hover:text-white/70'
            >
              Or ask a question first
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
