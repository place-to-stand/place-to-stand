import { Reveal } from '@/src/components/primitives/animated-section'
import { Section } from '@/src/components/patterns/section'
import { Button } from '@/src/components/primitives/button'
import { vendorIcons } from '@/src/components/primitives/vendor-icons'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { PortalFlow } from '@/src/components/sections/portal-flow'

const GitHubIcon = vendorIcons.GitHub
const REPO_URL = 'https://github.com/place-to-stand/place-to-stand-portal'

/**
 * "Our secret weapon" — the portal, told as one continuous, scroll-scrubbed
 * flow from task to production. The heading (architecture-first, open-source
 * link top-right) sits in an AnimatedSection; the animated flow itself lives in
 * <PortalFlow>, a plain section so its sticky pin isn't broken by the section's
 * slide-in transform.
 */
export function PortalSection() {
  return (
    <div className='flex flex-col gap-stack'>
      <Section id='portal' className='flex scroll-mt-24 flex-col gap-grid-1'>
        <Reveal
          index={0}
          className='flex flex-col gap-grid-1 md:flex-row md:items-start md:justify-between'
        >
          <div className='flex flex-col gap-intro'>
            <div className='flex flex-col gap-eyebrow'>
              <span className='bp-label font-mono'>Our Portal</span>
              <h2 className='max-w-3xl type-section-title text-balance'>
                Humans and agents, building together.
              </h2>
            </div>
            <p className='max-w-2xl type-intro'>
              We decide what to build and how it should look and feel. AI agents
              write the code in a walled-off workspace. Nothing ships until one
              of us has checked it.
            </p>
          </div>
          <Button
            asChild
            variant='outline'
            size='sm'
            className='h-8 shrink-0 gap-1.5 self-start px-grid-half text-sm md:h-9 md:gap-2 md:px-grid-half'
          >
            <TrackedLink
              href={REPO_URL}
              target='_blank'
              rel='noopener noreferrer'
              location='portal-open-source'
            >
              <GitHubIcon className='h-3.5 w-3.5 md:h-4 md:w-4' aria-hidden />
              Open Source
            </TrackedLink>
          </Button>
        </Reveal>
      </Section>

      <PortalFlow />
    </div>
  )
}
