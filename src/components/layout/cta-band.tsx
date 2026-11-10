import { AuditLink, BookCallGroup } from './cta'
import { AnimatedSection, Reveal } from './animated-section'
import { BlueprintCorners } from './dot-grid-background'

const DEFAULT_DESCRIPTION =
  "Book a free 30-minute intro call. Tell us what you need, and we'll say plainly whether we can help."

/**
 * The closing "Find where to start" callout: a card in a band of blueprint
 * dots that runs down to the footer. Put it last in <main>, right after a
 * block that ends with pb-edge. Its padding is the band role, so the dots'
 * top rule sits on its top edge: one edge gap under the content above.
 */
export function CtaBand({
  location,
  title = 'Find where to start.',
  description = DEFAULT_DESCRIPTION,
  label = 'Next Step',
  action = 'call',
}: {
  /** Analytics location for the two links, e.g. 'home-cta-block'. */
  location: string
  title?: string
  description?: string
  label?: string
  /** 'call': the Book a call button with the audit link under it (every
   *  page). 'audit': the audit link alone, for the Contact page, which
   *  already offers the call above. */
  action?: 'call' | 'audit'
}) {
  return (
    <AnimatedSection className='py-band'>
      <div className='dots-band bg-bg-card p-callout'>
        <BlueprintCorners size={20} all colorClassName='border-accent' />
        <div className='flex flex-col gap-stack md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-intro'>
            <Reveal index={0} className='flex flex-col gap-eyebrow'>
              <span className='bp-label font-mono'>{label}</span>
              <h2 className='type-section-title'>{title}</h2>
            </Reveal>
            <Reveal index={1} className='max-w-md text-base text-text-muted'>
              <p>{description}</p>
            </Reveal>
          </div>
          <Reveal
            index={2}
            className='flex w-full shrink-0 flex-col items-center gap-grid-1 sm:w-auto sm:items-start'
          >
            {action === 'call' ? (
              <BookCallGroup
                location={location}
                className='w-full sm:w-auto'
                buttonClassName='w-full sm:min-w-60'
              />
            ) : (
              <AuditLink location={location} />
            )}
          </Reveal>
        </div>
      </div>
    </AnimatedSection>
  )
}
