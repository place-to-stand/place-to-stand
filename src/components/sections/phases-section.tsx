import { AnimatedSection } from '@/src/components/layout/animated-section'

const phases = [
  {
    number: '01',
    title: 'Validate',
    description: 'Identify the highest-impact opportunity and ship a focused solution in weeks, not months.',
  },
  {
    number: '02',
    title: 'Scale',
    description: 'Expand what works. Add integrations, automate handoffs, and connect your systems.',
  },
  {
    number: '03',
    title: 'Optimize',
    description: 'Refine performance, reduce costs, and squeeze more value from every workflow.',
  },
  {
    number: '04',
    title: 'Reinvent',
    description: 'Leverage data and AI insights to find the next opportunity. Repeat the cycle.',
  },
]

export function PhasesSection() {
  return (
    <AnimatedSection className='flex flex-col gap-12'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
          Process
        </span>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-text md:text-5xl'>
          The cycle
        </h2>
        <p className='max-w-xl text-balance text-base text-text-muted'>
          A repeatable framework for continuous improvement.
        </p>
      </div>
      <div className='relative'>
        {/* Connection line */}
        <div className='absolute left-0 right-0 top-[28px] hidden h-px border-t border-dashed border-border md:block' aria-hidden />
        <div className='grid gap-6 md:grid-cols-4'>
          {phases.map(phase => (
            <div key={phase.number} className='relative flex flex-col items-center gap-4 text-center md:items-start md:text-left'>
              <div className='relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-bg-card font-mono text-sm text-accent transition-colors hover:border-accent hover:shadow-[0_0_20px_rgba(181,245,66,0.15)]'>
                {phase.number}
              </div>
              <h3 className='font-headline text-xl uppercase text-text'>{phase.title}</h3>
              <p className='text-sm leading-relaxed text-text-muted'>{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
