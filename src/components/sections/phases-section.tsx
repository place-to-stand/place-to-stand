import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

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
            <span className='bp-label font-mono'>Process</span>
            <h2 className='font-headline text-4xl font-bold leading-[0.95] tracking-tight text-text md:text-5xl'>
              The cycle
            </h2>
          </div>
          <p className='max-w-sm text-sm text-text-muted'>
            A repeatable framework for continuous improvement.
          </p>
        </div>

        {/* Phase grid — 4 cols, blueprint-style with corner marks */}
        <div className='relative'>
          <BlueprintCorners size={16} />
          {/* Dashed connector line across the top */}
          <div
            className='absolute left-4 right-4 top-8 hidden border-t border-dashed border-accent/20 md:block'
            aria-hidden
          />
          <div className='grid gap-px border border-border bg-border md:grid-cols-4'>
            {phases.map(phase => (
              <div
                key={phase.number}
                className='relative flex flex-col gap-4 bg-bg-card p-8'
              >
                <span className='inline-flex h-6 w-6 items-center justify-center border border-accent/40 font-mono text-[10px] text-accent'>
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
