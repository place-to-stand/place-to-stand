import Link from 'next/link'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { TagRow } from '@/src/components/patterns/tag-row'
import { Card, RuledRow, SideNote } from '@/src/components/boxes'
import {
  AI_ACCESS,
  OFFERS,
  PLATFORM_SHARED,
  SELL_ONLINE_CLIENTS,
  type Offer,
} from '@/src/lib/offers'

/**
 * The two offers. Variants:
 * - summary: both offers as cards with their modules and tags (Home).
 * - detail: each offer as its own section of module cards, then the AI
 *   connector (Platform). Sections #run and #sell are the link targets.
 * Tone: light.
 */
export function OffersSection({
  variant = 'summary',
}: {
  variant?: 'summary' | 'detail'
}) {
  return variant === 'detail' ? <OffersDetail /> : <OffersSummary />
}
OffersSection.tone = 'light' as const

export function OfferCard({ offer }: { offer: Offer }) {
  const run = offer.slug === 'run'
  const tags = run ? (offer.cardTags ?? []) : SELL_ONLINE_CLIENTS
  return (
    <Card className='flex h-full flex-col gap-grid-1'>
      <div className='flex flex-col gap-grid-half'>
        <h3 className='type-item-title'>{offer.name}</h3>
        <p className='text-base text-text-muted'>{offer.summary}</p>
      </div>
      <RuledRow as='ul' className='grid gap-x-grid-1 pt-grid-1 sm:grid-cols-2'>
        {offer.modules.map(module => (
          <li
            key={module.name}
            className='flex items-center gap-2 py-1.5 text-base'
          >
            <span aria-hidden className='h-1.5 w-1.5 shrink-0 bg-accent-line' />
            {module.name}
          </li>
        ))}
      </RuledRow>
      <div className='mt-auto flex flex-col gap-grid-1'>
        <TagRow label={run ? 'Instead of' : 'Built for'} tags={tags} />
        <ArrowLink href={`/platform#${offer.slug}`}>See the platform</ArrowLink>
      </div>
    </Card>
  )
}

function OffersSummary() {
  return (
    <Section id='what-we-build' className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='What We Build'
          title='Two kinds of work. One source of data.'
        />
      </Reveal>
      <Reveal index={1} className='grid gap-grid-1 lg:grid-cols-2'>
        {OFFERS.map(offer => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </Reveal>
    </Section>
  )
}

function OfferDetail({ offer, index }: { offer: Offer; index: number }) {
  const run = offer.slug === 'run'
  return (
    <Section id={offer.slug} className='flex scroll-mt-24 flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label={run ? 'Run Your Business' : 'Sell Online'}
          title={offer.name}
          intro={offer.summary}
        />
      </Reveal>
      <Reveal index={1}>
        <ul className='grid gap-grid-1 md:grid-cols-2 lg:grid-cols-3'>
          {offer.modules.map((module, moduleIndex) => (
            <Card
              as='li'
              key={module.name}
              className='flex flex-col gap-grid-1'
            >
              <span className='font-mono text-sm text-text-muted'>
                {String(index + 1).padStart(2, '0')}.
                {String(moduleIndex + 1).padStart(2, '0')}
              </span>
              <div className='flex flex-col gap-grid-half'>
                <h3 className='type-card-title'>{module.name}</h3>
                <p className='text-base text-text-muted'>{module.job}</p>
              </div>
              {(module.insteadOf || module.example) && (
                <RuledRow as='div' className='mt-auto pt-grid-1'>
                  {module.insteadOf ? (
                    <TagRow label='Instead of' tags={module.insteadOf} />
                  ) : (
                    <TagRow
                      label='Built for'
                      tags={([] as string[]).concat(module.example ?? [])}
                    />
                  )}
                </RuledRow>
              )}
            </Card>
          ))}
          {offer.proof && (
            <SideNote
              as='li'
              className='flex flex-col justify-center gap-grid-half py-grid-1 lg:col-span-2'
            >
              <p className='type-card-title'>{offer.proof}</p>
              <p className='max-w-xl text-base text-text-muted'>
                {PLATFORM_SHARED}{' '}
                <Link href='/process#portal' className='link-inline'>
                  See our portal
                </Link>
                .
              </p>
              <TagRow
                label='Built for'
                tags={['Place To Stand', '9 Point Studios', 'Up The Wall']}
              />
            </SideNote>
          )}
        </ul>
      </Reveal>
    </Section>
  )
}

function OffersDetail() {
  return (
    <>
      {OFFERS.map((offer, index) => (
        <OfferDetail key={offer.slug} offer={offer} index={index} />
      ))}
      <Section id='ai-access' className='flex scroll-mt-24 flex-col gap-stack'>
        <Reveal index={0}>
          <SectionHeading
            label='AI Access'
            title={AI_ACCESS.title}
            intro={AI_ACCESS.body}
          />
        </Reveal>
      </Section>
    </>
  )
}
