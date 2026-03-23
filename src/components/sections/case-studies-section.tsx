import Link from 'next/link'
import Image from 'next/image'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { caseStudies } from '@/src/lib/case-studies'

export function CaseStudiesSection() {
  return (
    <AnimatedSection id='case-studies' className='flex flex-col gap-8 md:gap-10'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Case Studies
        </span>
        <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Real results from real businesses
        </h2>
        <p className='max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          See how we help businesses save time, cut costs, and scale with custom
          AI-powered tools.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6'>
        {caseStudies.map(cs => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className='group relative overflow-hidden rounded-xl border border-ink no-underline shadow-sm transition-all duration-300 ease-out hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink/30'
          >
            {/* Full-width image with centered logo */}
            <div className='relative aspect-[21/9] w-full overflow-hidden'>
              <Image
                src={cs.image}
                alt={`${cs.client} platform`}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-ink/60' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <Image
                  src={cs.logo}
                  alt={cs.client}
                  width={360}
                  height={120}
                  className='h-20 w-auto md:h-32'
                />
              </div>
            </div>

            {/* Details bar */}
            <div className='flex flex-col gap-4 bg-white/95 p-6 md:flex-row md:items-center md:justify-between md:p-8'>
              <div className='flex flex-col gap-2 md:max-w-xl'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
                    {cs.client}
                  </span>
                  <span className='text-ink/30'>·</span>
                  <span className='text-xs font-semibold uppercase tracking-wider text-ink/50'>
                    {cs.industry}
                  </span>
                </div>
                <h3 className='font-headline text-xl font-semibold uppercase !leading-[.95] text-ink md:text-2xl'>
                  {cs.title}
                </h3>
              </div>

              <div className='flex flex-wrap gap-3'>
                {cs.stats.map(stat => (
                  <div
                    key={stat.label}
                    className='rounded-lg border border-ink/10 bg-white px-3 py-2'
                  >
                    <p className='text-[10px] font-semibold uppercase tracking-wider text-ink/50'>
                      {stat.label}
                    </p>
                    <p className='text-sm font-semibold text-ink'>
                      <span className='text-ink/40 line-through'>
                        {stat.before}
                      </span>{' '}
                      → {stat.after}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Read more strip */}
            <div className='flex items-center gap-2 border-t border-ink/10 bg-white/95 px-6 py-3 text-sm font-semibold text-ink/70 transition-colors group-hover:text-ink md:px-8'>
              Read the full case study
              <svg
                className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
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
          </Link>
        ))}
      </div>
    </AnimatedSection>
  )
}
