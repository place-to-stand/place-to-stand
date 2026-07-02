import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

const pillars = [
  {
    number: '01',
    title: 'Ownership',
    description:
      'Senior builders own your project end-to-end. No account managers, no layers of delegation. The person who architects your solution is the person who builds it.',
  },
  {
    number: '02',
    title: 'Direct Access',
    description:
      'Talk directly to the engineers building your product. Real-time updates through your private Portal. No telephone game, no status meetings that could have been an email.',
  },
  {
    number: '03',
    title: 'AI Speed',
    description:
      'We use AI workflows internally to move at 3-5x the speed of traditional agencies. The same AI-first approach we build for clients powers how we deliver.',
  },
]

export function PillarsSection() {
  return (
    <AnimatedSection className='py-32'>
      <div className='grid gap-grid-3 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: sticky heading */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <span className='bp-label font-mono'>Pillars</span>
          <h2 className='font-headline text-4xl font-bold leading-[0.95] tracking-tight text-text md:text-5xl'>
            How we&apos;re
            <br />
            different
          </h2>
    <p>We were building software before AI. Adaption is key to our business and yours.</p>
          {/* Blueprint reference annotation */}
          <span className='font-mono text-[10px] tracking-widest text-border-light' aria-hidden>
            PTS-SEC-002
          </span>
        </div>

        {/* Right: pillar items */}
        <div className='flex flex-col'>
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className='relative flex flex-col gap-3 border-b border-border py-10 last:border-b-0'
            >
              {/* Left accent bar connecting item to the grid */}
              <div className='absolute -left-4 top-10 hidden h-px w-4 bg-accent/30 md:block' aria-hidden />
              <div className='flex items-center gap-4'>
                <span className='inline-flex h-6 w-6 items-center justify-center border border-accent/40 font-mono text-[10px] text-accent'>
                  {pillar.number}
                </span>
                <h3 className='font-headline text-2xl font-semibold tracking-tight text-text'>
                  {pillar.title}
                </h3>
              </div>
              <p className='max-w-lg text-sm leading-relaxed text-text-muted'>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
