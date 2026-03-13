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
  return { title: `${cs.client} Case Study — V11`, description: cs.summary }
}

/**
 * V11 — Composite (Jason's picks + Kris's feedback)
 * Light hero (no gradient bg), V3 narrative timeline with Chapter 4,
 * Q&A quote section, streamlined bento grid, bigger strikethrough
 */
export default async function CaseStudyV11({ params }: Props) {
  const { slug } = await params
  const cs = caseStudyMap[slug]
  if (!cs) notFound()

  // Only show first 2 stats (Kris: 3rd doesn't convey unique info)
  const displayStats = cs.stats.slice(0, 2)

  return (
    <main className='flex-1'>
      {/* ── Section 1: Hero with Stats (light bg, no gradient) ── */}
      <section className='flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center'>
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
              className='h-14 w-auto brightness-0 md:h-20'
            />
          </a>
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
          <p className='max-w-3xl text-balance text-lg !leading-snug text-ink/70 md:text-xl'>
            {cs.summary}
          </p>

          {/* Stats — bigger strikethrough with more contrast */}
          <div className='mt-8 flex flex-wrap justify-center gap-10 md:gap-16'>
            {displayStats.map(stat => (
              <div key={stat.label} className='text-center'>
                <p className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
                  {stat.label}
                </p>
                <div className='mt-3 flex items-baseline justify-center gap-3'>
                  <span className='text-xl font-semibold text-ink/50 line-through decoration-ink/60 decoration-2 md:text-2xl'>
                    {stat.before}
                  </span>
                  <svg
                    className='h-5 w-5 shrink-0 text-ink/30'
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
                  <span className='font-headline text-4xl font-semibold uppercase text-ink md:text-5xl'>
                    {stat.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Narrative Timeline ── */}
      <section className='px-6 py-16 md:py-24'>
        <div className='mx-auto max-w-3xl'>
          {/* Chapter 1: The Challenge */}
          <AnimatedSection className='relative border-l-2 border-ink/20 pb-16 pl-8 pt-0 md:pl-12'>
            <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink/40 bg-white' />
            <span className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
              Chapter 1
            </span>
            <h2 className='mt-2 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              The Challenge
            </h2>
            <p className='mt-4 text-base !leading-relaxed text-ink/80 md:text-lg'>
              {cs.challenge}
            </p>
          </AnimatedSection>

          {/* Chapter 2: The Dead Ends */}
          {cs.failedAlternatives && (
            <AnimatedSection className='relative border-l-2 border-ink/20 pb-16 pl-8 pt-0 md:pl-12'>
              <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink/40 bg-white' />
              <span className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
                Chapter 2
              </span>
              <h2 className='mt-2 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
                The Dead Ends
              </h2>
              <p className='mt-4 text-base !leading-relaxed text-ink/80 md:text-lg'>
                {cs.failedAlternatives}
              </p>
            </AnimatedSection>
          )}

          {/* Chapter 3: What We Built */}
          <AnimatedSection className='relative border-l-2 border-ink/20 pb-16 pl-8 pt-0 md:pl-12'>
            <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink/40 bg-white' />
            <span className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
              Chapter 3
            </span>
            <h2 className='mt-2 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
              What We Built
            </h2>
            <div className='mt-6 flex flex-col gap-4'>
              {cs.solution.map((item, i) => {
                const [label, ...rest] = item.split(' — ')
                const description = rest.join(' — ')
                return (
                  <div key={i} className='flex gap-3'>
                    <span className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/10 text-xs font-semibold text-ink/70'>
                      {i + 1}
                    </span>
                    <div>
                      <span className='font-semibold text-ink'>{label}</span>
                      {description && (
                        <span className='text-ink/70'> — {description}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {cs.implementation && (
              <p className='mt-6 text-base !leading-relaxed text-ink/80 md:text-lg'>
                {cs.implementation}
              </p>
            )}
          </AnimatedSection>

          {/* Chapter 4: What's Next */}
          {cs.whatsNext && (
            <AnimatedSection className='relative border-l-2 border-ink/20 pb-16 pl-8 pt-0 md:pl-12'>
              <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink/40 bg-white' />
              <span className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
                Chapter 4
              </span>
              <h2 className='mt-2 font-headline text-2xl font-semibold uppercase text-ink md:text-3xl'>
                What&apos;s Next
              </h2>
              <p className='mt-4 text-base !leading-relaxed text-ink/80 md:text-lg'>
                {cs.whatsNext}
              </p>
            </AnimatedSection>
          )}

          {/* End marker */}
          <div className='relative pl-8 md:pl-12'>
            <div className='absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink bg-ink' />
          </div>
        </div>
      </section>

      {/* ── Section 3: Q&A Quote Section (gradient accent) ── */}
      <section className='bg-gradientPrimary px-6 py-16 md:py-20'>
        <div className='mx-auto flex max-w-3xl flex-col gap-10'>
          {cs.quotes.slice(0, 2).map((q, i) => (
            <div key={i} className='text-center'>
              {q.context ? (
                <p className='mb-3 text-sm font-semibold uppercase tracking-wider text-white/50'>
                  Q: {q.context}?
                </p>
              ) : (
                i === 0 && (
                  <p className='mb-3 text-sm font-semibold uppercase tracking-wider text-white/50'>
                    Q: What impact has this had?
                  </p>
                )
              )}
              <blockquote>
                <p className='font-headline text-xl font-semibold uppercase !leading-[.95] text-white md:text-3xl'>
                  &ldquo;{q.text}&rdquo;
                </p>
                {q.attribution && (
                  <cite className='mt-4 block text-sm font-semibold not-italic text-white/50'>
                    — {q.attribution}
                  </cite>
                )}
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: CTA ── */}
      <AnimatedSection className='px-6 py-16 md:py-24'>
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
              target='_blank'
              rel='noopener noreferrer'
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
