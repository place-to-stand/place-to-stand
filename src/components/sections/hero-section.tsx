'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { projects } from '@/src/lib/case-studies'

export function HeroSection() {
  const [paused, setPaused] = useState(false)
  const logos = [...projects, ...projects]

  return (
    <AnimatedSection
      id='home'
      data-pts-hero
      className='relative isolate flex min-h-[100svh] max-w-none flex-col items-center justify-end gap-6 overflow-hidden bg-white px-8 pb-16 pt-28 text-center text-ink'
    >
      {/* Main content — vertically centered */}
      <div className='relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-6 text-center'>
        <h1 className='max-w-4xl font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
          <span className='block'>Find where AI fits.</span>
          <span className='block'>Build what matters.</span>
        </h1>
        <p className='max-w-lg text-balance text-base text-ink/60 md:text-lg'>
          AI doesn&apos;t just power what we build — it&apos;s how we build. Bespoke solutions at a pace that wasn&apos;t possible until now.
        </p>
        <div className='mt-4 flex flex-col items-center gap-4 sm:flex-row'>
          <Link
            href='/case-studies'
            data-pts-hero-cta
            className='group inline-flex items-center border border-ink/30 text-sm uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white'
          >
            <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
              See our work
            </span>
            <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan'>
              <ArrowRight
                className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1 group-hover:text-ink'
                strokeWidth={2}
              />
            </span>
          </Link>
        </div>
      </div>

      {/* Trusted by carousel — pinned to bottom */}
      <div className='w-full'>
        <p className='mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-ink/40'>
          Trusted Brands
        </p>
        <div className='relative mx-auto w-full max-w-4xl overflow-hidden'>
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32' />

          <div className='relative border-y border-ink/10'>
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
                  className='group/logo relative flex h-20 w-40 shrink-0 flex-col items-center justify-center gap-1.5 border-r border-ink/10 bg-white px-4 transition-all duration-300 hover:bg-ink/[0.03] md:h-24 md:w-52'
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${new URL(project.href).hostname}&sz=64`}
                    alt=''
                    className='h-8 w-8 shrink-0 md:h-10 md:w-10'
                  />
                  <span className='text-[10px] font-semibold uppercase leading-tight text-ink/50 md:text-xs'>
                    {project.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
