import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Card } from '@/src/components/boxes'
import { AFTER_LAUNCH } from '@/src/lib/offers'

/**
 * Managed services, consulting and training. Variants:
 * - cards: the three cards and a link to the detail (Home).
 * - detail: with an intro and the #after-launch anchor (Platform).
 * Tone: light.
 */
export function AfterLaunchSection({
  variant = 'cards',
}: {
  variant?: 'cards' | 'detail'
}) {
  return variant === 'detail' ? <AfterLaunchDetail /> : <AfterLaunchCards />
}
AfterLaunchSection.tone = 'light' as const

/** Managed services, consulting and training, as a short strip on Home. */
function AfterLaunchCards() {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='After Launch'
          title='We stay on after it ships.'
        />
      </Reveal>
      <Reveal index={1}>
        <ul className='grid gap-grid-1 md:grid-cols-3'>
          {AFTER_LAUNCH.map(item => (
            <Card
              as='li'
              key={item.name}
              className='flex flex-col gap-grid-half'
            >
              <h3 className='type-card-title'>{item.name}</h3>
              <p className='text-base text-text-muted'>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Reveal>
      <Reveal index={2}>
        <ArrowLink href='/platform#after-launch'>
          What&apos;s included in managed services
        </ArrowLink>
      </Reveal>
    </Section>
  )
}

function AfterLaunchDetail() {
  return (
    <Section id='after-launch' className='flex scroll-mt-24 flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='After Launch'
          title='We stay on after it ships.'
          intro='Once the first build is live, you choose how much help you want from us.'
        />
      </Reveal>
      <Reveal index={1}>
        <ul className='grid gap-grid-1 md:grid-cols-3'>
          {AFTER_LAUNCH.map(item => (
            <Card
              as='li'
              key={item.name}
              className='flex flex-col gap-grid-half'
            >
              <h3 className='type-card-title'>{item.name}</h3>
              <p className='text-base text-text-muted'>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
