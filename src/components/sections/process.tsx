import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Card, RuledRow, SideNote } from '@/src/components/boxes'
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
}: {
  variant?: 'cards' | 'rows'
  showLink?: boolean
  /** Close the steps with the billing promise (cards, Home). */
  showBilling?: boolean
}) {
  return variant === 'rows' ? (
    <StepsRows />
  ) : (
    <StepsCards showLink={showLink} showBilling={showBilling} />
  )
}
/** Light on Process; dark on Home (Nov 14). */
StepsSection.tone = 'light' as const

function StepsCards({
  showLink = true,
  showBilling = false,
}: {
  showLink?: boolean
  /** Close the steps with the billing promise (Home). */
  showBilling?: boolean
}) {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='How It Works'
          title='Start where it hurts most.'
        />
      </Reveal>
      <Reveal index={1}>
        <ol className='grid gap-grid-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {STEPS.map(step => (
            <Card
              as='li'
              key={step.number}
              className='flex flex-col gap-grid-1'
            >
              <div className='flex flex-wrap items-baseline justify-between gap-grid-half'>
                <span className='font-mono text-sm text-text-muted'>
                  {step.number}
                </span>
                <span className='bp-label font-mono whitespace-nowrap after:hidden'>
                  {step.time}
                </span>
              </div>
              <h3 className='type-card-title'>{step.name}</h3>
              <p className='text-base text-text-muted'>{step.summary}</p>
            </Card>
          ))}
        </ol>
      </Reveal>
      {showBilling && (
        <Reveal index={2}>
          <SideNote>
            <p className='max-w-3xl text-base text-text-muted'>{BILLING}</p>
          </SideNote>
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
