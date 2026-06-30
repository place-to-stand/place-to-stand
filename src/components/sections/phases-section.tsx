import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

const phases = [
  {
    number: '01',
    title: 'Launch',
    description:
      "You're proving the model. We replace spreadsheets and manual steps with lean, purpose-built tools so you can move fast.",
  },
  {
    number: '02',
    title: 'Grow',
    description:
      "You're outgrowing your stack. We automate the bottlenecks and connect the systems straining under new demand.",
  },
  {
    number: '03',
    title: 'Scale',
    description:
      "You're running at volume. We integrate platforms, streamline operations, and cut the cost of complexity.",
  },
  {
    number: '04',
    title: 'Reinvent',
    description:
      "You're ready for what's next. We put your data and AI to work to unlock the next opportunity.",
  },
]

export function PhasesSection() {
  return (
    <AnimatedSection>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <span className='bp-label font-mono'>Every Stage</span>
            <h2 className='font-headline text-4xl font-bold leading-[0.95] tracking-tight text-text md:text-5xl'>
              Wherever your business stands
            </h2>
          </div>
          <p className='max-w-xl text-sm text-text-muted'>
            From first prototype to full-scale operation, we build software for
            the phase you&apos;re in.
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
