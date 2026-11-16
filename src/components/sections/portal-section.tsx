import type { Route } from 'next'
import { Reveal } from '@/src/components/primitives/animated-section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { PortalFlow } from '@/src/components/sections/portal-flow'

const REPO_URL = 'https://github.com/place-to-stand/place-to-stand-portal'

/**
 * "How we build" on Process: how a change moves from plan to production in
 * our portal (approved Nov 13). The heading and links sit in a Reveal; the
 * animated flow itself lives in <PortalFlow>, a plain section so its sticky
 * pin isn't broken by the section's slide-in transform.
 */
export function PortalSection() {
  return (
    <div className='flex flex-col gap-stack'>
      <Section id='portal' className='flex scroll-mt-24 flex-col'>
        <Reveal index={0} className='flex flex-col gap-stack'>
          <SectionHeading
            label='How We Build'
            title='Humans decide. Agents build. We check.'
            intro='We plan each change in our own portal, with AI helping draft the plan and a person deciding. AI agents then write the code in a sealed-off cloud workspace, and nothing ships until one of us has checked it. That’s how we work up to 5x faster than a traditional team. You can sign in any time to see the work, your hours left and your invoices.'
          />
          <div className='flex flex-wrap gap-x-grid-2 gap-y-grid-1'>
            <ArrowLink href={'/platform/portal' as Route}>
              See the portal
            </ArrowLink>
            <TrackedLink
              href={REPO_URL}
              target='_blank'
              rel='noopener noreferrer'
              location='process-how-we-build'
              className='link-action'
            >
              <span className='link-label'>Read the code</span>{' '}
              <span aria-hidden className='link-out'>
                ↗
              </span>
              <span className='sr-only'> (opens in a new tab)</span>
            </TrackedLink>
          </div>
        </Reveal>
      </Section>

      <PortalFlow />
    </div>
  )
}
