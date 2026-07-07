import Link from 'next/link'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

const phases = [
  {
    number: '01',
    title: 'Prototype',
    points: [
      'Test new product ideas',
      'Prove product-market fit',
      'Iterate fast',
    ],
  },
  {
    number: '02',
    title: 'Refine',
    points: [
      'Streamline existing systems',
      'Automate the manual work',
      'Save time, cut friction',
    ],
  },
  {
    number: '03',
    title: 'Scale',
    points: [
      'Re-architect your stack',
      'Rethink operations for demand',
      'Engineer for peak load',
    ],
  },
  {
    number: '04',
    title: 'R&D',
    points: [
      'Analyze your data',
      'Unlock new revenue vectors',
      'Surface your next prototype',
    ],
  },
]

export function PhasesSection({
  showHowWeWorkLink = true,
}: {
  showHowWeWorkLink?: boolean
}) {
  return (
    <AnimatedSection className='py-16 md:py-32'>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <Reveal index={0} className='flex flex-col gap-2'>
            <span className='bp-label font-mono'>Every Stage</span>
            <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-text md:text-4xl'>
              We meet you at your stage of business.
            </h2>
          </Reveal>
          <Reveal index={1} className='max-w-xl text-sm text-text-muted'>
            <p>
              Ontology based design allows us to model your business data to interact with humans and agents more effectively.
            </p>
          </Reveal>
          {/* Mobile-only link: sits with the subtext, above the cards */}
          {showHowWeWorkLink && (
            <Reveal index={2} className='pt-2 md:hidden'>
              <Link
                href='/how-we-work'
                className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
              >
                How we work
                <span aria-hidden>&rarr;</span>
              </Link>
            </Reveal>
          )}
        </div>

        {/* Phase grid — 4 cols, blueprint-style with corner marks */}
        <Reveal index={2} className='relative'>
          <BlueprintCorners size={16} />
          <div className='grid gap-px border border-border bg-border md:grid-cols-4'>
            {phases.map(phase => (
              <div
                key={phase.number}
                className='relative flex flex-col gap-4 bg-bg-card p-6 md:p-8'
              >
                <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                  {phase.title}
                </h3>
                <ul className='flex flex-col gap-2 text-sm leading-relaxed text-text-muted'>
                  {phase.points.map(point => (
                    <li key={point} className='flex gap-2'>
                      <span className='mt-2 h-1.5 w-1.5 shrink-0 bg-accent' aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Desktop-only link: stays below the cards */}
        {showHowWeWorkLink && (
          <Reveal index={3} className='hidden md:block'>
            <Link
              href='/how-we-work'
              className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
            >
              How we work
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        )}
      </div>
    </AnimatedSection>
  )
}
