import type { Route } from 'next'
import type { ReactNode } from 'react'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { TagRow } from '@/src/components/patterns/tag-row'
import {
  CodeReviewPiece,
  CrmPiece,
  OrderIntakePiece,
} from '@/src/components/patterns/pieces/platform'
import { Card, RuledList, RuledRow } from '@/src/components/boxes'
import {
  DATA_HOME,
  SENIOR_HELP,
  type Module,
  type Offer,
} from '@/src/lib/offers'
import { cn } from '@/src/lib/utils'

/**
 * What we build, on Platform: three kinds of work, each its own section
 * (#run, #sell, #senior-help), then "One home for your data". Tone: whatever
 * band the page puts each one in; the Platform template composes them.
 */

/** A Platform section's title and intro, with no label: the title is the
 *  label's job here. */
function KindHeading({ title, intro }: { title: string; intro: string }) {
  return (
    <div className='flex flex-col gap-intro'>
      <h2 className='max-w-3xl type-section-title text-balance'>{title}</h2>
      <p className='max-w-2xl type-intro text-balance'>{intro}</p>
    </div>
  )
}

/** "Sound familiar?": visitors' own words, one per ruled row, the same in
 *  all three sections. */
function SoundFamiliar({ quotes }: { quotes: string[] }) {
  return (
    <div className='flex flex-col gap-grid-1'>
      <h3 className='type-card-title'>Sound familiar?</h3>
      <RuledList>
        {quotes.map(quote => (
          <RuledRow key={quote} className='py-grid-half'>
            <q className='type-lead'>{quote}</q>
          </RuledRow>
        ))}
      </RuledList>
    </div>
  )
}

/** One module or service as a card, with its "Instead of" or "Built for" tags. */
function ModuleCard({ module }: { module: Module }) {
  const tags = module.insteadOf ?? module.builtFor
  return (
    <Card as='li' className='flex flex-col gap-grid-1'>
      <div className='flex flex-col gap-grid-half'>
        <h3 className='type-card-title'>{module.name}</h3>
        <p className='text-base text-text-muted'>{module.job}</p>
      </div>
      {tags && (
        <RuledRow as='div' className='mt-auto pt-grid-1'>
          <TagRow
            label={module.insteadOf ? 'Instead of' : 'Built for'}
            tags={tags}
          />
        </RuledRow>
      )}
    </Card>
  )
}

/** The shared layout of the three kinds of work: heading and quotes beside
 *  a lifted-out piece, then the modules. */
function KindSection({
  id,
  title,
  intro,
  quotes,
  piece,
  modules,
  columns,
  after,
}: {
  id: string
  title: string
  intro: string
  quotes: string[]
  piece: ReactNode
  modules: Module[]
  columns: 3 | 4
  after?: ReactNode
}) {
  return (
    <Section id={id} className='flex scroll-mt-24 flex-col gap-stack'>
      <div className='grid gap-stack lg:grid-cols-12 lg:gap-x-grid-2'>
        <Reveal index={0} className='flex flex-col gap-stack lg:col-span-6'>
          <KindHeading title={title} intro={intro} />
          <SoundFamiliar quotes={quotes} />
        </Reveal>
        <Reveal index={1} className='lg:col-span-6 lg:self-center'>
          {piece}
        </Reveal>
      </div>
      <Reveal index={2}>
        <ul
          className={cn(
            'grid gap-grid-1 md:grid-cols-2',
            columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
          )}
        >
          {modules.map(module => (
            <ModuleCard key={module.name} module={module} />
          ))}
          {after && <li className='flex items-center p-card'>{after}</li>}
        </ul>
      </Reveal>
    </Section>
  )
}

/** Run your business (#run) or Sell online (#sell). */
export function OfferDetail({ offer }: { offer: Offer }) {
  const run = offer.slug === 'run'
  return (
    <KindSection
      id={offer.slug}
      title={offer.name}
      intro={offer.summary}
      quotes={offer.quotes}
      piece={run ? <CrmPiece /> : <OrderIntakePiece />}
      modules={offer.modules}
      columns={run ? 4 : 3}
      after={
        run ? (
          <ArrowLink href={'/platform/portal' as Route}>
            See the portal it starts from
          </ArrowLink>
        ) : undefined
      }
    />
  )
}

/** Senior help for your team (#senior-help). */
export function SeniorHelpSection() {
  return (
    <KindSection
      id='senior-help'
      title={SENIOR_HELP.name}
      intro={SENIOR_HELP.summary}
      quotes={SENIOR_HELP.quotes}
      piece={<CodeReviewPiece />}
      modules={SENIOR_HELP.items}
      columns={4}
    />
  )
}

/** One home for your data: the shared source under all three. */
export function DataHomeSection() {
  return (
    <Section id='data' className='scroll-mt-24'>
      <Reveal index={0}>
        <SectionHeading
          label={DATA_HOME.label}
          title={DATA_HOME.title}
          intro={DATA_HOME.body}
        />
      </Reveal>
    </Section>
  )
}
