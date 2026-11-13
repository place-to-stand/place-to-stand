import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { RuledRow } from '@/src/components/boxes'
import { PORTAL_OWNERSHIP } from '@/src/lib/portal'

/**
 * Portal, "Yours, not a subscription": the five lines about owning your copy,
 * with the ownership block's accent rules. Heading left, lines right on
 * laptops. Tone: dark.
 */
export function PortalOwnershipSection() {
  return (
    <Section className='grid gap-stack lg:grid-cols-2 lg:gap-grid-4'>
      <Reveal index={0}>
        <SectionHeading
          label={PORTAL_OWNERSHIP.label}
          title={PORTAL_OWNERSHIP.title}
        />
      </Reveal>
      <Reveal index={1}>
        <ul className='flex flex-col'>
          {PORTAL_OWNERSHIP.lines.map(line => (
            <RuledRow
              key={line}
              accent
              className='flex gap-grid-half py-grid-1 text-base text-text'
            >
              <span
                aria-hidden
                className='mt-2 h-1.5 w-1.5 shrink-0 bg-accent-line'
              />
              {line}
            </RuledRow>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
PortalOwnershipSection.tone = 'dark' as const
