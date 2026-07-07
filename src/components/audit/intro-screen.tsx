'use client'

import { ArrowRight, ClipboardCheck, Clock, Compass } from 'lucide-react'
import { Button } from '@/src/components/ui/button'

interface IntroScreenProps {
  onStart: () => void
}

const HIGHLIGHTS = [
  { icon: Compass, label: 'Find your phase' },
  { icon: ClipboardCheck, label: 'Get tailored opportunities' },
  { icon: Clock, label: 'Under 2 minutes' },
]

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className='mx-auto max-w-2xl py-grid-4 sm:py-grid-5'>
      <div className='flex flex-col items-center gap-6 text-center'>
        <span className='bp-label font-mono'>Opportunity Audit</span>
        <h1 className='max-w-2xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text sm:text-5xl'>
          Find your biggest software opportunity
        </h1>
        <p className='mx-auto max-w-md text-balance text-base text-text-muted md:text-lg'>
          A few quick questions to pinpoint your phase and where custom software
          pays off. Built AI-fast, so it stays affordable.
        </p>

        <Button
          type='button'
          size='lg'
          onClick={onStart}
          className='mt-2 px-10'
        >
          Start the audit
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>

        <div className='mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted'>
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <span key={label} className='inline-flex items-center gap-1.5'>
              <Icon className='h-4 w-4 text-accent' />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
