import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { RuledRow } from '@/src/components/boxes'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { OWNERSHIP, OWNERSHIP_SHORT, OWNERSHIP_TITLE } from '@/src/lib/offers'
import { cn } from '@/src/lib/utils'

/**
 * The ownership promise as a set piece, in a dark band. Variants:
 * - full: the six lines (Platform, #own). The only full ownership block.
 * - short: the title, one line and a link to the full list (Home).
 */
export function OwnershipSection({
  variant = 'full',
  title = OWNERSHIP_TITLE,
  items = OWNERSHIP,
}: {
  variant?: 'full' | 'short'
  title?: string
  items?: { title: string; body: string }[]
}) {
  if (variant === 'short')
    return (
      <Section className='flex flex-col gap-stack'>
        <Reveal index={0}>
          <SectionHeading
            label='What You Own'
            title={title}
            intro={OWNERSHIP_SHORT}
          />
        </Reveal>
        <Reveal index={1}>
          <ArrowLink href='/platform#own'>What you own, in full</ArrowLink>
        </Reveal>
      </Section>
    )
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
