import { Reveal } from '@/src/components/primitives/animated-section'
import { Section } from '@/src/components/patterns/section'
import { Callout, Card, RuledRow } from '@/src/components/boxes'
import {
  CartPiece,
  ChangeLogPiece,
  LineupPiece,
  ProductCardPiece,
} from '@/src/components/patterns/pieces/heatonist'
import { CtaBand } from '@/src/components/sections/cta-band'
import { JsonLd } from '@/src/components/seo/json-ld'
import { heatonistCaseStudy as cs } from '@/src/lib/case-study-heatonist'
import { caseStudyJsonLd } from '@/src/lib/structured-data'
import { Hero } from '@/src/components/sections/hero'

/** A section opener on a blueprint rule: eyebrow and heading on the left
 * third, the body copy across the rest. Stacks below lg. */
function SpecRow({
  label,
  title,
  children,
}: {
  label?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <RuledRow
      as='div'
      className='grid gap-grid-1 pt-grid-1 lg:grid-cols-12 lg:gap-x-grid-1'
    >
      <div className='flex flex-col items-start gap-eyebrow lg:col-span-4'>
        {label && <span className='bp-label font-mono'>{label}</span>}
        <h2 className='type-section-title text-balance'>{title}</h2>
      </div>
      {children && (
        <div className='flex flex-col gap-grid-1 type-intro lg:col-span-7 lg:col-start-6'>
          {children}
        </div>
      )}
    </RuledRow>
  )
}

/** A list of items, one per ruled line: the title over its detail. Each
 * title leads with a short accent dash so every row has a clear start. */
function SpecList({
  items,
}: {
  items: ReadonlyArray<{ title: string; body: string }>
}) {
  return (
    <ul className='flex flex-col'>
      {items.map(item => (
        <RuledRow
          key={item.title}
          className='flex flex-col gap-grid-half py-grid-1'
        >
          <h3 className='flex items-baseline gap-grid-half type-card-title'>
            <span
              aria-hidden
              className='h-0.5 w-3 shrink-0 -translate-y-[0.35em] bg-accent-line'
            />
            {item.title}
          </h3>
          <p className='type-intro'>{item.body}</p>
        </RuledRow>
      ))}
    </ul>
  )
}

/** A case study (Heatonist): the header and numbers, spec rows, the quote,
 * then the work, each part beside the piece of the store it changed (the
 * lifted-out UI pieces, not screenshots), and its own closing band. */
export function CaseStudyTemplate() {
  const [introBefore, introAfter] = cs.intro.split(cs.introLink.text)

  return (
    <main id='main' className='flex-1 pt-page-start'>
      <JsonLd data={caseStudyJsonLd(cs)} />

      {/* The page owns every gap: the section role between blocks. */}
      <div className='flex flex-col gap-section pb-edge'>
        {/* The header, with the three numbers under it set as type */}
        <Hero
          variant='page'
          sectionClassName='flex flex-col gap-header'
          label='Case Study · Heatonist'
          title={cs.headline}
          intro={
            <>
              {introBefore}
              <a
                href={cs.introLink.href}
                target='_blank'
                rel='noopener noreferrer'
                className='link-inline font-semibold'
              >
                {cs.introLink.text}
                <span className='sr-only'> (opens in a new tab)</span>
              </a>
              {introAfter}
            </>
          }
        >
          <div className='flex flex-col items-start gap-label'>
            <span className='bp-label font-mono'>At a glance</span>
            <ul className='grid w-full gap-x-grid-1 gap-y-grid-2 md:grid-cols-3'>
              {cs.stats.map((stat, index) => (
                <li key={stat.value}>
                  <Reveal index={index} className='flex flex-col gap-grid-half'>
                    <span className='type-stat text-text'>{stat.value}</span>
                    <span className='type-intro'>{stat.label}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Hero>

        {/* The problem, how we work together, and Ty's quote */}
        <Section className='flex flex-col gap-stack'>
          <SpecRow label='Before' title='The problem'>
            <p>{cs.problem}</p>
          </SpecRow>
          <SpecRow label='The model' title='How we work together'>
            <p>{cs.howWeWork}</p>
          </SpecRow>
          <Callout as='figure' className='flex flex-col gap-grid-1'>
            <blockquote className='type-quote text-balance'>
              &ldquo;{cs.quote.text}&rdquo;
            </blockquote>
            <figcaption className='bp-label font-mono'>
              {cs.quote.name}, {cs.quote.company}
            </figcaption>
          </Callout>
        </Section>

        {/* What we did, beside a product card (search and filters) and a
            strip of the change log */}
        <Section className='flex flex-col gap-stack'>
          <div className='flex flex-col gap-intro'>
            <SpecRow label='Since April 2023' title='What we did' />
            <p className='type-intro'>{cs.whatWeDidIntro}</p>
          </div>
          <div className='grid gap-stack lg:grid-cols-12 lg:gap-x-grid-1'>
            <div className='lg:col-span-7'>
              <SpecList items={cs.whatWeDid} />
            </div>
            <div className='flex flex-col gap-grid-1 lg:col-span-5'>
              <ProductCardPiece />
              <ChangeLogPiece />
            </div>
          </div>
        </Section>

        {/* Beyond Shopify, beside the cart and its checkout rules */}
        <Section className='flex flex-col gap-stack'>
          <div className='flex flex-col gap-intro'>
            <SpecRow label='Custom builds' title='Beyond what Shopify offers' />
            <p className='type-intro'>{cs.beyondShopifyIntro}</p>
          </div>
          <div className='grid gap-stack lg:grid-cols-12 lg:gap-x-grid-1'>
            <CartPiece className='lg:col-span-5' />
            <ul className='grid gap-grid-1 md:grid-cols-2 lg:col-span-7'>
              {cs.beyondShopify.map(item => (
                <Card
                  as='li'
                  key={item.title}
                  className='flex flex-col gap-grid-half'
                >
                  <h3 className='type-card-title text-balance'>{item.title}</h3>
                  <p className='text-base text-text-muted'>{item.body}</p>
                </Card>
              ))}
            </ul>
          </div>
        </Section>

        {/* hotones.com, beside its lineup, then the result */}
        <Section className='flex flex-col gap-stack'>
          <SpecRow label='Launched May 15, 2025' title='hotones.com'>
            <p>{cs.hotOnes}</p>
            <LineupPiece />
          </SpecRow>
          <SpecRow label='Today' title='The result'>
            <p>{cs.result}</p>
          </SpecRow>
        </Section>
      </div>

      <CtaBand location='heatonist-case-study-cta' />
    </main>
  )
}
