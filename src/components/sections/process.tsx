import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Card, RuledRow } from '@/src/components/boxes'
import { BILLING, STEPS } from '@/src/lib/offers'

/**
 * The five steps. Variants:
 * - cards: a grid of step cards, optionally with the billing promise and a
 *   link to Process (Home, /design).
 * - rows: one ruled row per step with its full detail (Process).
 * Tone: light on Process, dark on Home (Nov 14).
 */
export function StepsSection({
  variant = 'cards',
  showLink = true,
  showBilling = false,
  intro,
}: {
  variant?: 'cards' | 'rows'
  showLink?: boolean
  /** Close the steps with the billing promise (cards, Home). */
  showBilling?: boolean
  /** A line under the title (cards; Home). */
  intro?: string
}) {
  return variant === 'rows' ? (
    <StepsRows />
  ) : (
    <StepsCards showLink={showLink} showBilling={showBilling} intro={intro} />
  )
}
/** Light on Process; dark on Home (Nov 14). */
StepsSection.tone = 'light' as const

function StepsCards({
  showLink = true,
  showBilling = false,
  intro,
}: {
  showLink?: boolean
  /** Close the steps with the billing promise (Home). */
  showBilling?: boolean
  intro?: string
}) {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='How It Works'
          title='Start where it hurts most.'
          intro={intro}
        />
      </Reveal>
      <Reveal index={1}>
        {/* On laptops the five cards share three rows (number and time,
            title, line) through a subgrid, so titles and lines start at
            the same height in every card. */}
        <ol className='grid gap-grid-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {STEPS.map(step => (
            <Card
              as='li'
              key={step.number}
              className='flex flex-col gap-grid-1 xl:row-span-3 xl:grid xl:grid-rows-subgrid'
            >
              <div className='flex flex-wrap items-baseline gap-x-grid-half gap-y-1'>
                <span className='font-mono text-sm text-text-muted'>
                  {step.number}
                </span>
                <span className='bp-label font-mono whitespace-nowrap after:hidden'>
                  {step.time}
                </span>
              </div>
              <h3 className='type-card-title'>{step.name}</h3>
              <p className='text-base text-balance text-text-muted'>
                {step.summary}
              </p>
            </Card>
          ))}
        </ol>
      </Reveal>
      {showBilling && (
        <Reveal index={2}>
          {/* Plain text, like the notes under Warning signs' chats. */}
          <p className='max-w-3xl text-base text-text'>{BILLING}</p>
        </Reveal>
      )}
      {showLink && (
        <Reveal index={3}>
          <ArrowLink href='/process'>See the full process</ArrowLink>
        </Reveal>
      )}
    </Section>
  )
}

function StepsRows() {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='The Steps'
          title='Five steps, each with a time.'
        />
      </Reveal>
      <Reveal index={1}>
        <ol className='flex flex-col'>
          {STEPS.map(step => (
            <RuledRow
              key={step.number}
              className='grid gap-grid-1 py-grid-2 last:pb-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-grid-3'
            >
              <div className='flex flex-col gap-grid-1'>
                <div className='flex items-center gap-grid-1'>
                  <span className='font-mono text-sm text-text-muted'>
                    {step.number}
                  </span>
                  <span className='bp-label font-mono after:hidden'>
                    {step.time}
                  </span>
                </div>
                <h3 className='type-item-title'>{step.name}</h3>
              </div>
              <p className='max-w-2xl type-intro'>{step.detail}</p>
            </RuledRow>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
