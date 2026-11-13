import type { Route } from 'next'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import {
  CartPiece,
  ChangeLogPiece,
  LineupPiece,
  ProductCardPiece,
} from '@/src/components/patterns/pieces/heatonist'
import { HOME_PROOF } from '@/src/lib/home'

/**
 * Home's proof: the Heatonist and Hot Ones work (#results, the hero's "See
 * our work"). From xl up the copy sits left with the Hot Ones lineup under
 * it; on the right the product card and cart sit side by side, the cart set
 * one step lower so the pieces read as a layered spread rather than a row of
 * tiles, with the change log under them. Under xl the pieces are too
 * squeezed beside the copy, so they pair up under it, two to a row. Phones
 * keep the product card and the change log.
 * Tone: dark.
 */
export function ProofSection() {
  return (
    <Section
      id='results'
      className='grid scroll-mt-24 gap-grid-1 md:grid-cols-2 xl:grid-cols-[5fr_3.5fr_3.5fr]'
    >
      <Reveal
        index={0}
        className='flex flex-col gap-stack pb-grid-1 md:col-span-2 lg:pb-grid-2 xl:col-span-1 xl:pr-grid-2 xl:pb-0'
      >
        <SectionHeading
          label={HOME_PROOF.label}
          title={HOME_PROOF.title}
          intro={HOME_PROOF.body}
        />
        <div className='flex flex-wrap gap-x-grid-2 gap-y-grid-1'>
          {HOME_PROOF.links.map(link => (
            <ArrowLink key={link.href} href={link.href as Route}>
              {link.label}
            </ArrowLink>
          ))}
        </div>
      </Reveal>
      <Reveal index={1}>
        <ProductCardPiece compact />
      </Reveal>
      <Reveal index={2} className='max-md:hidden md:mt-grid-3'>
        <CartPiece compact />
      </Reveal>
      <Reveal index={3} className='max-md:hidden xl:pr-grid-2'>
        <LineupPiece compact />
      </Reveal>
      <Reveal index={4} className='xl:col-span-2'>
        <ChangeLogPiece compact />
      </Reveal>
    </Section>
  )
}
ProofSection.tone = 'dark' as const
