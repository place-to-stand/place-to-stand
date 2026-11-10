import { Section } from '@/src/components/layout/section'
import Link from 'next/link'
import { Reveal } from '@/src/components/layout/animated-section'
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
    <Section>
      <div className='flex flex-col gap-stack'>
        {/* Header */}
        <div className='flex flex-col gap-intro'>
          <Reveal index={0} className='flex flex-col gap-eyebrow'>
            <span className='bp-label font-mono'>Who You Work With</span>
            <h2 className='type-section-title text-balance'>
              You work with the people who build it.
            </h2>
          </Reveal>
          <Reveal index={1} className='max-w-xl text-base text-text-muted'>
            <p>
              Senior engineers who use AI to move fast, with no account managers
              in between.
            </p>
          </Reveal>
          {/* Mobile-only link: sits with the subtext, above the cards */}
          <Reveal index={2} className='pt-2 md:hidden'>
            <Link href='/about' className='link-action'>
              Meet the Team
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>

        {/* Facet cards — blueprint grid */}
        <Reveal index={2} className='relative'>
          <div className='grid gap-grid-1 md:grid-cols-3'>
            {facets.map(facet => (
              <div
                key={facet.title}
                className='relative flex flex-col gap-grid-half bg-bg-card p-card'
              >
                <div className='flex items-center justify-between gap-grid-half'>
                  <h3 className='type-card-title'>{facet.title}</h3>
                  <facet.Graphic className='h-grid-2 w-grid-2 shrink-0' />
                </div>
                <p className='text-base text-text-muted'>{facet.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Desktop-only link: stays below the cards */}
        <Reveal index={3} className='hidden md:flex'>
          <Link href='/about' className='link-action'>
            Meet the Team
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </Section>
  )
}
