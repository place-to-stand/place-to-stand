import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { UseCasesSection } from '@/src/components/sections/use-cases-section'
import { ClientsSection } from '@/src/components/sections/clients-section'
import { caseStudies } from '@/src/lib/case-studies'

export default function CaseStudiesPage() {
  return (
    <main className='flex-1'>
      {/* Hero — Our Process pattern, sized so case studies peek above fold */}
      <AnimatedSection className='relative isolate flex min-h-[80svh] max-w-none flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Our work
          </span>
          <h1 className='font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            <span className='block'>Real builds.</span>
            <span className='block'>Real outcomes.</span>
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            Products and projects we&apos;ve shipped for ambitious brands and
            businesses.
          </p>
        </div>
      </AnimatedSection>

      {/* Featured case studies */}
      {caseStudies.length > 0 && (
        <AnimatedSection className='px-6 pb-16 pt-0'>
          <div className='mx-auto flex max-w-6xl flex-col items-center gap-8'>
            <div className='flex flex-col items-center gap-3 text-center'>
              <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
                Case studies
              </span>
              <h2 className='max-w-3xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
                Hours of manual work, gone.
              </h2>
            </div>

            <div className='grid w-full grid-cols-1 gap-6 md:gap-8'>
              {caseStudies.map(cs => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className='group block overflow-hidden rounded-2xl border border-ink bg-white no-underline shadow-sm transition-all duration-300 ease-out hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink/30'
                >
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

                  <div className='flex flex-col gap-6 p-6 md:p-10'>
                    <h3 className='max-w-3xl text-balance font-headline text-2xl font-semibold uppercase !leading-[.95] text-ink md:text-3xl lg:text-4xl'>
                      {cs.title}
                    </h3>
                    <p className='max-w-3xl text-base !leading-snug text-ink/70 md:text-lg'>
                      {cs.summary}
                    </p>

                    <div className='grid grid-cols-1 divide-y divide-ink/10 border-y border-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0'>
                      {cs.stats.map(stat => (
                        <div
                          key={stat.label}
                          className='flex flex-col gap-2 py-4 md:px-6'
                        >
                          <span className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
                            {stat.label}
                          </span>
                          <span className='font-headline text-xl font-semibold uppercase text-ink md:text-2xl'>
                            {stat.after}
                          </span>
                        </div>
                      ))}
                    </div>

                    <span className='inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-transform group-hover:translate-x-1'>
                      Read the case study
                      <svg
                        className='h-4 w-4'
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
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <UseCasesSection />
      <ClientsSection />

      <section className='mx-auto w-full max-w-6xl px-6 py-20 text-center md:py-28'>
        <h2 className='font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Ready to build something great?
        </h2>
        <p className='mx-auto mt-4 max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          Let&apos;s talk about how we can help your business save time and
          money.
        </p>
        <div className='mt-8'>
          <Button asChild size='lg'>
            <Link href='/#contact'>Start a Project</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
