import type { Route } from 'next'
import { Reveal } from '@/src/components/primitives/animated-section'
import { SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { StatTile } from '@/src/components/boxes'
import { heatonistCaseStudy } from '@/src/lib/case-study-heatonist'
import { LineupPiece } from '@/src/components/patterns/pieces/heatonist'

/**
 * The Heatonist case study as one band at the top of /clients: the heading
 * and intro beside the Hot Ones lineup, the three numbers, and the link to
 * the story. The page supplies the section around it. Copy comes from
 * src/lib/case-study-heatonist.ts, so it always matches the case study
 * itself. Tone: dark.
 */
export function ResultsSection() {
  const cs = heatonistCaseStudy
  return (
    <div className='flex flex-col gap-stack'>
      <div className='grid items-center gap-stack lg:grid-cols-12 lg:gap-x-grid-1'>
        <Reveal index={0} className='flex flex-col gap-stack lg:col-span-6'>
          <SectionHeading
            label='Case Study · Hot Ones & Heatonist'
            title={cs.headline}
            intro={cs.intro}
          />
          <ArrowLink href={cs.path as Route}>
            Read the Heatonist story
          </ArrowLink>
        </Reveal>
        <Reveal index={1} className='lg:col-span-6'>
          <LineupPiece />
        </Reveal>
      </div>
      <Reveal index={2}>
        <ul className='grid gap-grid-1 md:grid-cols-3'>
          {cs.stats.map(stat => (
            <StatTile
              key={stat.value}
              value={stat.value}
              label={stat.label}
              className='h-full'
            />
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
ResultsSection.tone = 'dark' as const
