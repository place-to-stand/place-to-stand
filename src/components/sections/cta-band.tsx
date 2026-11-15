import type { Route } from 'next'
import { AuditLink, BookCallGroup } from '@/src/components/primitives/cta'
import {
  AnimatedSection,
  Reveal,
} from '@/src/components/primitives/animated-section'
import { Button } from '@/src/components/primitives/button'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { Callout } from '@/src/components/boxes'

/** The closing title on Home, Platform, Process, Clients and About
 *  (approved Nov 13). */
export const CTA_BAND_TITLE = 'Tell us where it hurts most.'

/**
 * The closing callout: a card in a band of blueprint dots that runs down to
 * the footer. Put it last in <main id='main'>, right after a block that ends
 * with pb-edge. Its padding is the band role, so the dots' top rule sits on
 * its top edge: one edge gap under the content above.
 */
export function CtaBand({
  location,
  title = CTA_BAND_TITLE,
  description,
  label = 'Next Step',
  action = 'call',
  secondary,
}: {
  /** Analytics location for the links, e.g. 'home-cta-block'. */
  location: string
  title?: string
  description?: string
  label?: string
  /** 'call': the Book a call button with "or send us a note" under it (every
   *  page). 'audit': the audit link alone. */
  action?: 'call' | 'audit'
  /** A second button beside Book a call, in place of the note line (Portal:
   *  "See the code"). External links open in a new tab. */
  secondary?: { label: string; href: string }
}) {
  const external = secondary?.href.startsWith('http')
  return (
    <AnimatedSection className='py-band'>
      <Callout band>
        <div className='flex flex-col gap-stack md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-intro'>
            <Reveal index={0} className='flex flex-col gap-eyebrow'>
              <span className='bp-label font-mono'>{label}</span>
              <h2 className='type-section-title'>{title}</h2>
            </Reveal>
            {description && (
              <Reveal index={1} className='max-w-md text-base text-text-muted'>
                <p>{description}</p>
              </Reveal>
            )}
          </div>
          <Reveal
            index={2}
            className='flex w-full shrink-0 flex-col items-center gap-grid-1 sm:w-auto sm:flex-row sm:items-start sm:gap-grid-half'
          >
            {action === 'audit' ? (
              <AuditLink location={location} />
            ) : (
              <>
                <BookCallGroup
                  location={location}
                  secondary={secondary ? 'none' : 'note'}
                  className='w-full sm:w-auto'
                  buttonClassName='w-full sm:w-auto'
                />
                {secondary && (
                  <Button
                    asChild
                    size='lg'
                    variant='outline'
                    className='w-full sm:w-auto'
                  >
                    <TrackedLink
                      href={secondary.href as Route}
                      location={location}
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {secondary.label}
                    </TrackedLink>
                  </Button>
                )}
              </>
            )}
          </Reveal>
        </div>
      </Callout>
    </AnimatedSection>
  )
}
