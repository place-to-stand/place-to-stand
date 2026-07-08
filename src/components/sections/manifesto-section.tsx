import Link from 'next/link'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import {
  DraftingGraphic,
  AiNativeGraphic,
  DirectAccessGraphic,
} from '@/src/components/graphics/home-graphics'

const facets = [
  {
    title: 'Senior Builders',
    Graphic: DraftingGraphic,
    description:
      'The engineer who architects your solution is the one who builds it. No account managers, no layers of delegation.',
  },
  {
    title: 'AI-Native',
    Graphic: AiNativeGraphic,
    description:
      'Fine-tuned AI systems let us design and ship exactly what you need, at 3-5x the speed of a traditional team.',
  },
  {
    title: 'Direct Access',
    Graphic: DirectAccessGraphic,
    description:
      'You work with the builder directly. No middle management, no handoffs, no telephone game.',
  },
]

export function ManifestoSection() {
  return (
    <AnimatedSection className='py-20'>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <Reveal index={0} className='flex flex-col gap-2'>
            <span className='bp-label font-mono'>Who We Are</span>
            <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-balance text-text md:text-4xl'>
              Experienced engineers with fine-tuned AI.
            </h2>
          </Reveal>
          <Reveal index={1} className='max-w-xl text-sm text-text-muted'>
            <p>
              Building exactly what you need, directly with the people who build it.
            </p>
          </Reveal>
          {/* Mobile-only link: sits with the subtext, above the cards */}
          <Reveal index={2} className='pt-2 md:hidden'>
            <Link
              href='/team'
              className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
            >
              Meet the Team
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>

        {/* Facet cards — blueprint grid */}
        <Reveal index={2} className='relative'>
          <BlueprintCorners size={16} />
          <div className='grid gap-px border border-border bg-border md:grid-cols-3'>
            {facets.map(facet => (
              <div
                key={facet.title}
                className='relative flex flex-col gap-4 bg-bg-card p-5 md:p-8'
              >
                <div className='flex items-center justify-between gap-4'>
                  <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                    {facet.title}
                  </h3>
                  <facet.Graphic className='h-grid-2 w-grid-2 shrink-0' />
                </div>
                <p className='text-sm leading-relaxed text-text-muted'>
                  {facet.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Desktop-only link: stays below the cards */}
        <Reveal index={3} className='hidden md:block'>
          <Link
            href='/team'
            className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
          >
            Meet the Team
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
