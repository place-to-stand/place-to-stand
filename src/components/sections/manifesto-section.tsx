import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

const facets = [
  {
    title: 'Senior Builders',
    description:
      'The engineer who architects your solution is the one who builds it. No account managers, no layers of delegation.',
  },
  {
    title: 'AI-Native',
    description:
      'Fine-tuned AI systems let us design and ship exactly what you need, at 3-5x the speed of a traditional team.',
  },
  {
    title: 'Direct Access',
    description:
      'You work with the builder directly. No middle management, no handoffs, no telephone game.',
  },
]

export function ManifestoSection() {
  return (
    <AnimatedSection className='py-16 md:py-32'>
      <div className='flex flex-col gap-12'>
        {/* Eyebrow + framed bold claim (corners only, no background) */}
        <div className='flex flex-col gap-6'>
          <span className='bp-label font-mono'>Who We Are</span>
          <div className='relative w-full'>
            <BlueprintCorners size={20} />
            <h2 className='max-w-4xl py-4 pl-4 font-headline text-4xl font-bold leading-[0.95] tracking-tight text-balance text-text md:pl-6 md:text-5xl'>
              Experienced engineers with{' '}
              <span className='text-accent'>fine-tuned AI</span>, building exactly
              what you need.
            </h2>
          </div>
        </div>

        {/* Supporting sub-text */}
        <div className='grid gap-8 md:grid-cols-3'>
          {facets.map(facet => (
            <div key={facet.title} className='flex flex-col gap-2'>
              <span className='font-mono text-lg text-text'>
                {facet.title}
              </span>
              <p className='text-sm leading-relaxed text-text-muted'>
                {facet.description}
              </p>
            </div>
          ))}
        </div>

        <Link
          href='/team'
          className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
        >
          Meet the Team
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </AnimatedSection>
  )
}
