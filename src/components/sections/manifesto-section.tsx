import { Section } from '@/src/components/layout/section'
import Link from 'next/link'
import { Reveal } from '@/src/components/layout/animated-section'
import { WHO_YOU_WORK_WITH } from '@/src/lib/offers'
import { Card } from '@/src/components/layout/boxes'
import {
  DraftingGraphic,
  AiNativeGraphic,
  DirectAccessGraphic,
} from '@/src/components/graphics/home-graphics'

const GRAPHICS = [DraftingGraphic, AiNativeGraphic, DirectAccessGraphic]

const facets = WHO_YOU_WORK_WITH.facets.map((facet, index) => ({
  ...facet,
  Graphic: GRAPHICS[index],
}))

export function ManifestoSection() {
  return (
    <Section>
      <div className='flex flex-col gap-stack'>
        {/* Header */}
        <div className='flex flex-col gap-intro'>
          <Reveal index={0} className='flex flex-col gap-eyebrow'>
            <span className='bp-label font-mono'>Who You Work With</span>
            <h2 className='type-section-title text-balance'>
              {WHO_YOU_WORK_WITH.title}
            </h2>
          </Reveal>
          <Reveal index={1} className='max-w-xl text-base text-text-muted'>
            <p>{WHO_YOU_WORK_WITH.intro}</p>
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
              <Card
                key={facet.title}
                className='relative flex flex-col gap-grid-half'
              >
                <div className='flex items-center justify-between gap-grid-half'>
                  <h3 className='type-card-title'>{facet.title}</h3>
                  <facet.Graphic className='h-grid-2 w-grid-2 shrink-0' />
                </div>
                <p className='text-base text-text-muted'>{facet.body}</p>
              </Card>
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
