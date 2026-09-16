import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import {
  SeatsGraphic,
  CentralizedDataGraphic,
  NoBloatGraphic,
} from '@/src/components/graphics/home-graphics'
import { principles } from '@/src/lib/site-copy'

// One graphic per principle, in the order of `principles`.
const principleGraphics = [SeatsGraphic, CentralizedDataGraphic, NoBloatGraphic]
const pillars = principles.map((principle, i) => ({
  ...principle,
  Graphic: principleGraphics[i],
}))

export function PillarsSection() {
  return (
    <AnimatedSection className='py-20'>
      <div className='grid gap-grid-3 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: sticky heading */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <Reveal index={0} className='flex flex-col gap-4'>
            <span className='bp-label font-mono'>Pillars</span>
            <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
              Our Development
              <br />
              Principles
            </h2>
          </Reveal>
          <Reveal
            index={1}
            className='max-w-sm text-sm leading-relaxed text-text-muted'
          >
            <p>
              Own your software instead of renting SaaS, and the economics
              change. No per-seat fees, your data in one place, none of the
              bloat you never asked for.
            </p>
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
              <pillar.Graphic className='absolute top-4 right-4 h-9 w-9 md:top-6 md:right-6' />
              <h3 className='max-w-[calc(100%-3.5rem)] font-headline text-xl font-semibold tracking-tight text-text'>
                {pillar.title}
              </h3>
              <p className='max-w-xl text-sm leading-relaxed text-accent-secondary'>
                {pillar.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
