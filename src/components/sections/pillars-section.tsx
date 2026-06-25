import { AnimatedSection } from '@/src/components/layout/animated-section'

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
    <AnimatedSection className='max-w-7xl lg:px-10'>
      <div className='grid gap-16 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: sticky heading */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-accent'>
            Pillars
          </span>
          <h2 className='font-headline text-4xl font-bold leading-[0.95] tracking-tight text-text md:text-5xl'>
            How we&apos;re
            <br />
            different
          </h2>
        </div>

        {/* Right: pillar items */}
        <div className='flex flex-col'>
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className={`flex flex-col gap-3 py-10 ${i < pillars.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className='flex items-center gap-4'>
                <span className='font-mono text-xs text-accent'>
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
