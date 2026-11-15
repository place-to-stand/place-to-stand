import type { Route } from 'next'
import Image from 'next/image'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { UiPiece } from '@/src/components/patterns/ui-piece'
import { HOME_PROOF } from '@/src/lib/home'

/**
 * Home's proof: the Heatonist and Hot Ones work (#results, the hero's "See
 * our work"). The copy and links, then two real crops of the live stores side
 * by side from laptop up: Heatonist's search and filters (our build) and the
 * Hot Ones lineup. The
 * columns follow the two crops' proportions, so both stages are the same
 * height. Captured at 2x from heatonist.com and hotones.com (Nov 14).
 * Tone: light (Nov 14).
 */
export function ProofSection() {
  return (
    <Section id='results' className='flex scroll-mt-24 flex-col gap-stack'>
      <Reveal
        index={0}
        className='flex flex-col gap-grid-1 lg:flex-row lg:items-end lg:justify-between lg:gap-grid-2'
      >
        <SectionHeading
          label={HOME_PROOF.label}
          title={HOME_PROOF.title}
          intro={HOME_PROOF.body}
        />
        <div className='flex shrink-0 flex-wrap gap-x-grid-2 gap-y-grid-1'>
          {HOME_PROOF.links.map(link => (
            <ArrowLink key={link.href} href={link.href as Route}>
              {link.label}
            </ArrowLink>
          ))}
        </div>
      </Reveal>
      <Reveal index={1} className='grid gap-grid-1 lg:grid-cols-[1.8fr_1.93fr]'>
        <UiPiece
          screenshot
          compact
          width='full'
          alt='A Heatonist collection page: the filter panel (heat from Mild to Hottest, then availability, type, diet, fruit, garlic and more) beside the Hot Ones 10 pack and trio pack with their prices.'
          caption='Search and filters · heatonist.com'
        >
          <Image
            src='/work/heatonist-search-filters.webp'
            alt=''
            width={1692}
            height={1214}
            sizes='(min-width: 1440px) 640px, (min-width: 1024px) 47vw, (min-width: 768px) 90vw, 75vw'
          />
        </UiPiece>
        <UiPiece
          screenshot
          compact
          width='full'
          alt='The Hot Ones lineup on hotones.com: the first five sauces of the Season 31 pack, numbered by heat.'
          caption='The lineup · hotones.com'
        >
          <Image
            src='/work/hotones-lineup-sauces.webp'
            alt=''
            width={1600}
            height={828}
            sizes='(min-width: 1440px) 680px, (min-width: 1024px) 50vw, (min-width: 768px) 90vw, 75vw'
          />
        </UiPiece>
      </Reveal>
    </Section>
  )
}
ProofSection.tone = 'light' as const
