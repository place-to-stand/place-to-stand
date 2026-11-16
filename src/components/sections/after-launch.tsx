import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { Card } from '@/src/components/boxes'
import { AFTER_LAUNCH, AFTER_LAUNCH_INTRO } from '@/src/lib/offers'

/**
 * Managed services, training and the next fix, with an intro and the
 * #after-launch anchor (Platform). Tone: light.
 */
export function AfterLaunchSection() {
  return (
    <Section id='after-launch' className='flex scroll-mt-24 flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='After Launch'
          title='We stay on after it ships.'
          intro={AFTER_LAUNCH_INTRO}
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
AfterLaunchSection.tone = 'light' as const
