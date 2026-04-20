'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { projects } from '@/src/lib/case-studies'

function Dot({ className = '' }: { className?: string }) {
  return (
    <span
      className={`absolute h-2 w-2 rounded-full bg-ink/15 ${className}`}
      aria-hidden='true'
    />
  )
}

export function ClientsLogoGrid() {
  const [paused, setPaused] = useState(false)
  // Double the list so the scroll animation loops seamlessly
  const logos = [...projects, ...projects]

  return (
    <AnimatedSection
      id='clients'
      className='flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-8 bg-white px-0 md:gap-12'
    >
      {/* Heading */}
      <div className='flex flex-col items-center gap-4 text-center'>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold !leading-tight text-ink md:text-5xl lg:text-6xl'>
          Trusted by Ambitious Brands
        </h2>
        <p className='max-w-xl text-balance text-base !leading-snug text-ink/60 md:text-lg'>
          We work with some of the most exciting brands building their next
          chapter online. Here are a few who trust us with their digital
          presence.
        </p>
      </div>

      {/* Scrolling logo grid */}
      <div className='relative w-full max-w-6xl overflow-hidden'>
        {/* Fade edges */}
        <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32' />
        <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32' />

        {/* Row with border grid */}
        <div className='relative border-y border-ink/10'>
          <Dot className='-top-1 left-0' />
          <Dot className='-top-1 right-0' />
          <Dot className='-bottom-1 left-0' />
          <Dot className='-bottom-1 right-0' />

          <div
            className='flex w-max items-stretch'
            style={{
              animation: 'scroll 90s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {logos.map((project, i) => (
              <a
                key={`${project.title}-${i}`}
                href={project.href}
                target='_blank'
                rel='noreferrer noopener'
                aria-label={`Visit ${project.title}`}
                className='group relative flex h-28 w-48 shrink-0 flex-col items-center justify-center gap-2 border-r border-ink/10 bg-white px-6 transition-all duration-300 hover:bg-ink/[0.03] md:h-36 md:w-60'
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <Dot className='-right-1 -top-1' />
                <Dot className='-bottom-1 -right-1' />

                {/* Arrow indicator on hover */}
                <ArrowUpRight className='absolute right-3 top-3 h-4 w-4 text-ink/0 transition-all duration-300 group-hover:text-ink/40' />

                <img
                  src={`https://www.google.com/s2/favicons?domain=${new URL(project.href).hostname}&sz=64`}
                  alt=''
                  className='h-10 w-10 shrink-0 md:h-12 md:w-12'
                />
                <span className='font-headline text-[11px] font-semibold uppercase leading-tight text-ink/70 md:text-xs'>
                  {project.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
