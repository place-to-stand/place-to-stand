import Image from 'next/image'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { projects } from '@/src/lib/case-studies'

export function ClientsSection() {
  return (
    <AnimatedSection id='clients' className='flex flex-col gap-8 md:gap-10'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Clients
        </span>
        <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Select projects that moved the needle
        </h2>
        <p className='max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          A look at the product, marketing, and brand experiences we craft with
          our partners.
        </p>
      </div>

      {/* Grid: 1 col on mobile, 2 cols on md+ */}
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6'>
        {projects.map(project => (
          <a
            key={project.title}
            href={project.href}
            target='_blank'
            rel='noreferrer noopener'
            aria-label={`View ${project.title} project (opens in a new tab)`}
            className='group relative overflow-hidden rounded-xl border border-ink no-underline shadow-sm transition-all duration-300 ease-out hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink/30'
          >
            {/* Clean image area */}
            <div className='relative aspect-video w-full overflow-hidden'>
              <Image
                src={project.image}
                alt={`${project.title} project thumbnail`}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </div>
            {/* Caption bar - fixed height with sliding content */}
            <div className='relative h-14 overflow-hidden bg-white/95 md:h-16'>
              {/* Stationary favicon - stays on top */}
              <div className='absolute left-3 top-1/2 z-10 -translate-y-1/2 md:left-4'>
                <img
                  src={`https://www.google.com/s2/favicons?domain=${new URL(project.href).hostname}&sz=64`}
                  alt=''
                  className='h-7 w-7 md:h-8 md:w-8'
                />
              </div>
              {/* Description - slides down from above on hover */}
              <div className='absolute inset-0 flex -translate-y-full items-center gap-5 pl-14 pr-8 transition-transform duration-300 group-hover:translate-y-0 md:gap-6 md:pl-16 md:pr-10'>
                <p className='line-clamp-2 flex-1 text-balance text-left text-xs font-normal !leading-[1.1] text-ink md:text-base'>
                  {project.description}
                </p>
                <svg
                  className='h-4 w-4 shrink-0 text-ink md:h-5 md:w-5'
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
              {/* Title row - slides down out of view on hover */}
              <div className='absolute inset-0 flex items-center pl-14 pr-3 transition-transform duration-300 group-hover:translate-y-full md:pl-16 md:pr-4'>
                <h3 className='flex-1 font-headline text-sm font-semibold uppercase leading-none text-ink md:text-base'>
                  {project.title}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </AnimatedSection>
  )
}
