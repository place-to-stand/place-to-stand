'use client'

import { useState, useEffect } from 'react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { hashHref } from '@/src/components/layout/nav-links'
import { FaqAccordion } from '@/src/components/sections/faq-section'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'A focused call to understand your time-suck and what success looks like.',
  },
  {
    number: '02',
    title: 'Transparent Estimate',
    description:
      'Clear scope, clear milestones, and a realistic timeline. No surprise invoices.',
  },
  {
    number: '03',
    title: 'Buy Hour Blocks',
    description:
      'One flat rate. Start anytime. Keep control of spend as you scale.',
  },
  {
    number: '04',
    title: 'Watch It Happen Live',
    description:
      'Everything ships through your private Portal so progress stays visible and concrete.',
  },
  {
    number: '05',
    title: 'Top Up Anytime',
    description: 'Add more hours with one click. Unused time never expires.',
  },
]

export function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatedSection id='how-it-works' className='flex flex-col gap-20'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          How it works + pricing
        </span>
        <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Dead-simple process. Zero surprises.
        </h2>
        {/* <p className='max-w-xl text-balance text-lg !leading-snug text-ink/60'>
          Buy time in blocks, watch progress in your Portal, and scale up only
          when it’s working.
        </p> */}
      </div>

      <ol className='grid gap-6 md:grid-cols-5'>
        {steps.map((step, index) => {
          const isActive = index === activeStep
          return (
            <li
              key={step.number}
              className={cn(
                'relative flex flex-col gap-4 overflow-hidden rounded-xl p-5 text-ink transition-all duration-500 ease-in-out',
                isActive
                  ? 'z-10 scale-105 bg-white shadow-xl ring-1 ring-black/5'
                  : 'bg-white/50 shadow-sm backdrop-blur hover:bg-white/80'
              )}
            >
              <span
                className={cn(
                  'text-sm font-semibold uppercase tracking-[0.1em] transition-colors',
                  isActive ? 'text-ink' : 'text-ink/60'
                )}
              >
                {step.number}
              </span>
              <h3 className='font-headline text-2xl uppercase leading-none'>
                {step.title}
              </h3>
              <p className={cn('text-base !leading-snug transition-colors', isActive ? 'text-ink/90' : 'text-ink/70')}>
                {step.description}
              </p>
            </li>
          )
        })}
      </ol>

      <div className='mx-auto w-full max-w-3xl'>
        <div className='rounded-2xl bg-gradientPrimary p-[1px]'>
          <div className='flex flex-col gap-6 rounded-2xl border border-ink/40 bg-ink/70 p-10 text-center text-ink-light shadow-xl backdrop-blur'>
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
              <Link href={hashHref('contact')}>Book a call now</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-10'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            FAQ
          </span>
          <h3 className='max-w-4xl text-balance font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
            The answers you’re looking for
          </h3>
        </div>
        <FaqAccordion />
      </div>
    </AnimatedSection>
  )
}
