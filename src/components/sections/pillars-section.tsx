import { Building2, Database, Filter } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

const pillars = [
  {
    title: 'No Per-Seat Pricing',
    Icon: Building2,
    description:
      'You own the tech infrastructure. Add as many users as your business needs without watching the bill climb. No per-seat licensing, no penalty for growing your team.',
  },
  {
    title: 'Centralized Business Data',
    Icon: Database,
    description:
      'All your business data lives in one place, structured and transparent. That single source of truth keeps the system modular, so you can extend it without rebuilding from scratch.',
  },
  {
    title: 'No SaaS Feature Bloat',
    Icon: Filter,
    description:
      'You get exactly the features your business runs on, nothing more. No paying for bloated dashboards and modules you will never open.',
  },
]

export function PillarsSection() {
  return (
    <AnimatedSection className='py-16 md:py-32'>
      <div className='grid gap-grid-3 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: sticky heading */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <Reveal index={0} className='flex flex-col gap-4'>
            <span className='bp-label font-mono'>Pillars</span>
            <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-text md:text-4xl'>
              Our Development
              <br />
              Principles
            </h2>
          </Reveal>
          <Reveal index={1} className='max-w-sm text-sm leading-relaxed text-text-muted'>
            <p>We were building software before AI. Adapting to the new AI environemnt is key to our business and yours.</p>
          </Reveal>
          <Reveal index={2}>
            <Link
              href='/how-we-work'
              className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
            >
              How we work
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>

        {/* Right: pillar cards */}
        <Reveal index={3} className='flex flex-col gap-4'>
          {pillars.map(pillar => (
            <div
              key={pillar.title}
              className='relative flex flex-col gap-4 bg-bg-card p-8'
            >
              <BlueprintCorners size={16} />
              <span className='absolute right-8 top-8 inline-flex h-9 w-9 items-center justify-center'>
                <pillar.Icon className='h-4 w-4 text-accent' aria-hidden />
              </span>
              <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                {pillar.title}
              </h3>
              <p className='max-w-xl text-sm !leading-snug text-accent-secondary'>
                {pillar.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
