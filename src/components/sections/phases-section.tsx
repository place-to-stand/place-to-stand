import { AnimatedSection } from '@/src/components/layout/animated-section'

const phases = [
  {
    number: '01',
    title: 'Validate',
    description:
      'Identify the highest-impact opportunity and ship a focused solution in weeks, not months.',
  },
  {
    number: '02',
    title: 'Scale',
    description:
      'Expand what works. Add integrations, automate handoffs, and connect your systems.',
  },
  {
    number: '03',
    title: 'Optimize',
    description:
      'Refine performance, reduce costs, and squeeze more value from every workflow.',
  },
  {
    number: '04',
    title: 'Reinvent',
    description:
      'Leverage data and AI insights to find the next opportunity. Repeat the cycle.',
  },
]

export function PhasesSection() {
  return (
    <AnimatedSection className='max-w-7xl lg:px-10'>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div className='flex flex-col gap-2'>
            <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-accent'>
              Process
            </span>
            <h2 className='font-headline text-4xl font-bold leading-[0.95] tracking-tight text-text md:text-5xl'>
              The cycle
            </h2>
          </div>
          <p className='max-w-sm text-sm text-text-muted'>
            A repeatable framework for continuous improvement.
          </p>
        </div>

        {/* Phase grid — 4 cols with connecting line */}
        <div className='relative'>
          <div
            className='absolute left-0 right-0 top-7 hidden h-px border-t border-dashed border-border md:block'
            aria-hidden
          />
          <div className='grid gap-px border border-border bg-border md:grid-cols-4'>
            {phases.map(phase => (
              <div
                key={phase.number}
                className='flex flex-col gap-4 bg-bg-card p-8'
              >
                <span className='font-mono text-[11px] text-accent'>
                  {phase.number}
                </span>
                <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                  {phase.title}
                </h3>
                <p className='text-sm leading-relaxed text-text-muted'>
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
