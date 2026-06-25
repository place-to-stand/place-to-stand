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

export function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatedSection id='how-it-works' className='flex flex-col gap-10'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-text-muted'>
          How it works
        </span>
        <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-text md:text-5xl'>
          Dead-simple process. Zero surprises.
        </h2>
        <p className='max-w-xl text-balance text-lg !leading-snug text-text-muted'>
          We are selling bespoke end-to-end solutions, not just automations.
        </p>
      </div>

      <ol className='flex w-full flex-col gap-5 md:flex-row md:items-stretch md:gap-6 lg:gap-8'>
        {steps.map((step, index) => {
          const isActive = index === activeStep
          return (
            <li
              key={step.number}
              className={cn(
                'flex flex-col gap-2 rounded-xl px-6 py-6 will-change-transform md:w-1/3 md:gap-3 lg:py-8',
                isActive
                  ? 'duration-[2500ms] border border-accent bg-bg-card shadow-lg transition-all ease-out md:-translate-y-1'
                  : 'duration-[2500ms] translate-y-0 border border-transparent bg-bg-card/50 shadow-sm transition-all ease-in hover:bg-bg-card'
              )}
            >
              <span
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.1em] transition-colors md:text-sm',
                  isActive ? 'text-accent' : 'text-text-muted'
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
                  isActive ? 'text-text' : 'text-text-muted'
                )}
              >
                {step.description}
              </p>
            </li>
          )
        })}
      </ol>

      <div className='mx-auto w-full max-w-3xl'>
        <div className='rounded-2xl bg-bg-card p-[1px]'>
          <div className='flex flex-col gap-6 rounded-2xl border border-border p-10 text-center text-text shadow-xl'>
            <p className='text-sm font-extrabold uppercase tracking-[0.1em] text-text-muted'>
              One flat rate • Hour blocks • Start anytime
            </p>
            <h3 className='text-balance font-headline text-3xl font-semibold uppercase !leading-[.9]'>
              Pricing that stays under control
            </h3>
            <div className='flex flex-col items-center gap-2 text-base text-text-muted'>
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
