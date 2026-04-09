import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { projects } from '@/src/lib/case-studies'

export function ClientsLogoGrid() {
  return (
    <AnimatedSection id='clients' className='flex flex-col gap-8 md:gap-10'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Clients
        </span>
        <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Trusted by ambitious brands
        </h2>
        <p className='max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          A look at the partners we craft product, marketing, and brand
          experiences with.
        </p>
      </div>

      <div className='grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
        {projects.map(project => (
          <a
            key={project.title}
            href={project.href}
            target='_blank'
            rel='noreferrer noopener'
            aria-label={`Visit ${project.title} (opens in a new tab)`}
            className='flex items-center gap-3 rounded-xl border border-ink/10 bg-white/60 px-4 py-4 no-underline transition-all duration-300 hover:border-ink/30 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/30'
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${new URL(project.href).hostname}&sz=64`}
              alt=''
              className='h-7 w-7 shrink-0 md:h-8 md:w-8'
            />
            <span className='font-headline text-sm font-semibold uppercase leading-tight text-ink md:text-base'>
              {project.title}
            </span>
          </a>
        ))}
      </div>

      <div className='flex justify-center'>
        <Link
          href='/case-studies'
          className='inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-2.5 font-headline text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
        >
          View all case studies
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
        </Link>
      </div>
    </AnimatedSection>
  )
}
