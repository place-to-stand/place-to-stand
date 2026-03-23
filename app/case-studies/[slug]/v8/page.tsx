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
  return { title: `${cs.client} Case Study — V8`, description: cs.summary }
}

/**
 * V8 — Before/After Focus
 * The transformation is the hero. Big before→after visual,
 * then the story unfolds below
 */
export default async function CaseStudyV8({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  return (
    <main className='flex-1'>
      {/* Logo + title */}
      <AnimatedSection className='flex max-w-none flex-col items-center gap-4 px-6 pb-8 pt-32 text-center'>
        <a
          href={cs.href}
          target='_blank'
          rel='noopener noreferrer'
          className='transition-opacity hover:opacity-70'
        >
          <Image
            src={cs.logo}
            alt={cs.client}
            width={160}
            height={52}
            className='h-9 w-auto brightness-0 md:h-12'
          />
        </a>
        <h1 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          {cs.title}
        </h1>
      </AnimatedSection>

      {/* Big before/after hero */}
      <AnimatedSection className='px-6 pb-16 pt-4'>
        <div className='mx-auto max-w-4xl'>
          {cs.stats.map(stat => (
            <div
              key={stat.label}
              className='border-b border-ink/10 py-8 last:border-0 md:py-10'
            >
              <p className='mb-3 text-center text-xs font-semibold uppercase tracking-wider text-ink/40'>
                {stat.label}
              </p>
              <div className='flex items-center justify-center gap-4 md:gap-8'>
                <div className='flex-1 text-right'>
                  <span className='font-headline text-3xl font-semibold uppercase text-ink/25 line-through md:text-5xl'>
                    {stat.before}
                  </span>
                </div>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink'>
                  <svg
                    className='h-5 w-5 text-white'
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
                </div>
                <div className='flex-1 text-left'>
                  <span className='font-headline text-3xl font-semibold uppercase text-ink md:text-5xl'>
                    {stat.after}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Summary */}
      <AnimatedSection className='pb-16 pt-0'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-lg !leading-snug text-ink/80 md:text-xl'>
            {cs.summary}
          </p>
        </div>
      </AnimatedSection>

      {/* Story sections with quote breaks */}
      <AnimatedSection className='pb-12 pt-0'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
            The Challenge
          </h2>
          <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
            {cs.challenge}
          </p>
        </div>
      </AnimatedSection>

      {/* Quote break */}
      <div className='mx-auto mb-12 max-w-3xl px-6'>
        <div className='h-px bg-ink/10' />
        <blockquote className='py-8 text-center'>
          <p className='text-xl italic text-ink/60 md:text-2xl'>
            &ldquo;{cs.quotes[2]?.text || cs.quotes[0].text}&rdquo;
          </p>
        </blockquote>
        <div className='h-px bg-ink/10' />
      </div>

      {cs.failedAlternatives && (
        <AnimatedSection className='pb-12 pt-0'>
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

      <AnimatedSection className='pb-12 pt-0'>
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
        </div>
      </AnimatedSection>

      {/* Big quote */}
      <div className='bg-ink px-6 py-14 text-center md:py-20'>
        <blockquote className='mx-auto max-w-3xl'>
          <p className='text-xl font-medium !leading-snug text-white md:text-2xl'>
            &ldquo;{cs.quotes[1]?.text || cs.quotes[0].text}&rdquo;
          </p>
          {(cs.quotes[1]?.attribution || cs.quotes[0].attribution) && (
            <cite className='mt-4 block text-sm font-semibold not-italic text-white/40'>
              — {cs.quotes[1]?.attribution || cs.quotes[0].attribution}
            </cite>
          )}
        </blockquote>
      </div>

      {/* What's Next + CTA */}
      <AnimatedSection className='py-16'>
        <div className='mx-auto flex max-w-3xl flex-col items-center gap-8'>
          {cs.whatsNext && (
            <div className='text-center'>
              <h2 className='mb-4 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
                What&apos;s Next
              </h2>
              <p className='text-base !leading-relaxed text-ink/80 md:text-lg'>
                {cs.whatsNext}
              </p>
            </div>
          )}

          <div className='flex w-full flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-white/50 p-8 text-center'>
            <h2 className='font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
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
        </div>
      </AnimatedSection>
    </main>
  )
}
