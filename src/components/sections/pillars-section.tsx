import { AnimatedSection } from '@/src/components/layout/animated-section'

const pillars = [
  {
    number: '01',
    title: 'Ownership',
    description: 'Senior builders own your project end-to-end. No account managers, no layers of delegation. The person who architects your solution is the person who builds it.',
  },
  {
    number: '02',
    title: 'Direct Access',
    description: 'Talk directly to the engineers building your product. Real-time updates through your private Portal. No telephone game, no status meetings that could have been an email.',
  },
  {
    number: '03',
    title: 'AI Speed',
    description: 'We use AI workflows internally to move at 3-5x the speed of traditional agencies. The same AI-first approach we build for clients powers how we deliver.',
  },
]

export function PillarsSection() {
  return (
    <AnimatedSection className='flex flex-col gap-12'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
          Pillars
        </span>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-text md:text-5xl'>
          How we're different
        </h2>
      </div>
      <div className='grid gap-6 md:grid-cols-3'>
        {pillars.map(pillar => (
          <div
            key={pillar.number}
            className='group flex flex-col gap-4 rounded-xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-accent/40'
          >
            <span className='font-mono text-xs text-accent'>{pillar.number}</span>
            <h3 className='font-headline text-2xl uppercase text-text'>{pillar.title}</h3>
            <p className='text-sm leading-relaxed text-text-muted'>{pillar.description}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  )
}
