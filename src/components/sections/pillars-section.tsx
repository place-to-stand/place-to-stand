import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

const pillars = [
  {
    title: 'Ownership',
    description:
      'Senior builders own your project end-to-end. No account managers, no layers of delegation. The person who architects your solution is the person who builds it.',
  },
  {
    title: 'Direct Access',
    description:
      'Talk directly to the engineers building your product. Real-time updates through your private Portal. No telephone game, no status meetings that could have been an email.',
  },
  {
    title: 'AI Speed',
    description:
      'We use AI workflows internally to move at 3-5x the speed of traditional agencies. The same AI-first approach we build for clients powers how we deliver.',
  },
]

export function PillarsSection() {
  return (
    <AnimatedSection className='py-16 md:py-32'>
      <div className='grid gap-grid-3 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: sticky heading */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <span className='bp-label font-mono'>Pillars</span>
          <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-text md:text-4xl'>
            How we&apos;re
            <br />
            different
          </h2>
          <p>We were building software before AI. Adapting to the new AI environemnt is key to our business and yours.</p>
        </div>

        {/* Right: pillar cards */}
        <div className='flex flex-col gap-6'>
          {pillars.map(pillar => (
            <div
              key={pillar.title}
              className='relative flex flex-col gap-4 bg-bg-card p-8'
            >
              <BlueprintCorners size={16} />
              <h3 className='font-headline text-2xl font-semibold tracking-tight text-text'>
                {pillar.title}
              </h3>
              <p className='max-w-xl text-base !leading-snug text-accent-secondary md:text-lg'>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
