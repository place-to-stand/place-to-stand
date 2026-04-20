'use client'

import { useState, useEffect } from 'react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      "What's holding your business back? We'll propose a custom solution.",
  },
  {
    number: '02',
    title: 'Build',
    description:
      'Buy flat-rate blocks, track progress and approve builds in your task tracking Portal.',
  },
  {
    number: '03',
    title: 'Iterate',
    description:
      'Refine and adapt your unique system. Unused blocks never expire.',
  },
]

const tools = [
  { name: 'Claude', domain: 'anthropic.com' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Next.js', domain: 'nextjs.org' },
  { name: 'React', domain: 'react.dev' },
  { name: 'Tailwind', domain: 'tailwindcss.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Zapier', domain: 'zapier.com' },
  { name: 'Node.js', domain: 'nodejs.org' },
  { name: 'TypeScript', domain: 'typescriptlang.org' },
]

export function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const logos = [...tools, ...tools]

  return (
    <AnimatedSection
      id='how-it-works'
      data-pts-dark
      className='flex min-h-[100svh] max-w-none flex-col justify-center gap-10 bg-[#111827] px-6 py-24'
    >
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-white/60'>
          How we work
        </span>
        <h2 className='max-w-5xl text-balance font-headline text-2xl font-semibold uppercase !leading-[.9] text-white md:text-4xl'>
          Dead-simple process. Zero surprises.
        </h2>
        <p className='max-w-xl text-balance text-lg !leading-snug text-white/70'>
          We are selling bespoke end-to-end solutions, not just automations.
        </p>
      </div>

      <ol className='mx-auto flex w-full max-w-6xl flex-col gap-5 md:flex-row md:items-stretch md:gap-6 lg:gap-8'>
        {steps.map((step, index) => {
          const isActive = index === activeStep
          return (
            <li
              key={step.number}
              className={cn(
                'flex flex-col gap-2 rounded-xl px-6 py-6 will-change-transform md:w-1/3 md:gap-3 lg:py-8',
                isActive
                  ? 'duration-[2500ms] border border-ink bg-white shadow-lg transition-all ease-out md:-translate-y-1'
                  : 'duration-[2500ms] translate-y-0 border border-transparent bg-white/40 shadow-sm backdrop-blur transition-all ease-in hover:bg-white/80'
              )}
            >
              <span
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.1em] transition-colors md:text-sm',
                  isActive ? 'text-ink' : 'text-ink/60'
                )}
              >
                {step.number}
              </span>
              <h3 className='text-balance font-headline text-lg uppercase leading-none md:text-2xl'>
                {step.title}
              </h3>
              <p
                className={cn(
                  'text-xs !leading-snug transition-colors md:text-base',
                  isActive ? 'text-ink/90' : 'text-ink/70'
                )}
              >
                {step.description}
              </p>
            </li>
          )
        })}
      </ol>

      {/* Tool stack carousel */}
      <div className='flex flex-col items-center gap-6'>
        <p className='text-sm font-semibold uppercase tracking-[0.1em] text-white/40'>
          Powered by best-in-class, vendor-independent tools
        </p>

        <div className='relative w-full max-w-6xl overflow-hidden'>
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#111827] to-transparent md:w-32' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#111827] to-transparent md:w-32' />

          <div className='relative border-y border-white/10'>
            <div
              className='flex w-max items-stretch'
              style={{
                animation: 'scroll 60s linear infinite',
                animationPlayState: paused ? 'paused' : 'running',
              }}
            >
              {logos.map((tool, i) => (
                <div
                  key={`${tool.name}-${i}`}
                  className='flex h-20 w-40 shrink-0 flex-col items-center justify-center gap-1.5 border-r border-white/10 px-4 md:h-24 md:w-48'
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                    alt=''
                    className='h-8 w-8 shrink-0 md:h-10 md:w-10'
                  />
                  <span className='text-[10px] font-semibold uppercase tracking-wider text-white/50 md:text-xs'>
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing card */}
      <div className='mx-auto w-full max-w-3xl'>
        <div className='rounded-2xl bg-ink/80 p-[1px]'>
          <div className='flex flex-col gap-6 rounded-2xl border border-ink/40 p-10 text-center text-ink-light shadow-xl'>
            <p className='text-sm font-extrabold uppercase tracking-[0.1em] text-ink-light/70'>
              One flat rate • Hour blocks • Start anytime
            </p>
            <h3 className='text-balance font-headline text-3xl font-semibold uppercase !leading-[.9]'>
              Pricing that stays under control
            </h3>
            <div className='flex flex-col items-center gap-2 text-base text-ink-light/70'>
              <p>Unused time never expires.</p>
              <p>Top up with one click inside your Portal.</p>
            </div>

            <Button asChild size='lg' className='mx-auto px-10'>
              <Link href='/contact'>Book a call now</Link>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
