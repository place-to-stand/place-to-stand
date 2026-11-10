import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { RuledRow } from '@/src/components/boxes'
import { OWNERSHIP, OWNERSHIP_TITLE } from '@/src/lib/offers'
import { cn } from '@/src/lib/utils'

/**
 * The ownership promise as a set piece. It always sits in a dark band: the
 * same treatment on Home, Platform and About.
 */
export function OwnershipSection({
  title = OWNERSHIP_TITLE,
  items = OWNERSHIP,
}: {
  title?: string
  items?: { title: string; body: string }[]
}) {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading label='What You Own' title={title} />
      </Reveal>
      <Reveal index={1}>
        <ul
          className={cn(
            'grid gap-x-grid-2 gap-y-grid-2 sm:grid-cols-2',
            items.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          )}
        >
          {items.map(item => (
            <RuledRow
              key={item.title}
              accent
              className='pt-grid-1 text-base text-text-muted'
            >
              <strong className='block pb-grid-half type-card-title'>
                {item.title}
              </strong>
              {item.body}
            </RuledRow>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
OwnershipSection.tone = 'dark' as const
