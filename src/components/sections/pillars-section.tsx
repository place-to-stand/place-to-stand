import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import {
  SeatsGraphic,
  CentralizedDataGraphic,
  NoBloatGraphic,
} from '@/src/components/graphics/home-graphics'

const pillars = [
  {
    title: 'No Per-Seat Pricing',
    Graphic: SeatsGraphic,
    description:
      'You own the tech infrastructure. Add as many users as your business needs without watching the bill climb. No per-seat licensing, no penalty for growing your team.',
  },
  {
    title: 'Centralized Business Data',
    Graphic: CentralizedDataGraphic,
    description:
      'All your business data lives in one place, structured and transparent. That single source of truth keeps the system modular, so you can extend it without rebuilding from scratch.',
  },
  {
    title: 'No SaaS Feature Bloat',
    Graphic: NoBloatGraphic,
    description:
      'You get exactly the features your business runs on, nothing more. No paying for bloated dashboards and modules you will never open.',
  },
]

export function PillarsSection() {
  return (
    <AnimatedSection className='py-20'>
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
            <p>Own your software instead of renting SaaS, and the economics change. No per-seat fees, your data in one place, none of the bloat you never asked for.</p>
          </Reveal>
        </div>

        {/* Right: pillar cards */}
        <Reveal index={3} className='flex flex-col gap-4'>
          {pillars.map(pillar => (
            <div
              key={pillar.title}
              className='relative flex flex-col gap-4 bg-bg-card p-5 md:p-8'
            >
              <BlueprintCorners size={16} />
              <pillar.Graphic className='absolute right-4 top-4 h-grid-2 w-grid-2 md:right-6 md:top-6' />
              <h3 className='max-w-[calc(100%-3.5rem)] font-headline text-xl font-semibold tracking-tight text-text'>
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
