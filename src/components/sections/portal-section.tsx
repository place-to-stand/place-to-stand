import { Reveal } from '@/src/components/layout/animated-section'
import { Section } from '@/src/components/layout/section'
import { Button } from '@/src/components/ui/button'
import { vendorIcons } from '@/src/components/icons/vendor-icons'
import { TrackedLink } from '@/src/components/tracked-link'
import { PortalFlow } from './portal-flow'

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
      <Section className='flex flex-col gap-6'>
        <Reveal
          index={0}
          className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'
        >
          <div className='flex flex-col gap-intro'>
            <h2 className='max-w-3xl type-section-title text-balance uppercase'>
              Our Portal
            </h2>
            <p className='max-w-2xl type-intro'>
              Humans and agents, building together. We built our own delivery
              pipeline. Humans set direction and keep the taste; agents do the
              heavy building in an isolated cloud. Nothing ships until
              we&apos;ve verified it.
            </p>
          </div>
          <Button
            asChild
            variant='outline'
            size='sm'
            className='h-8 shrink-0 gap-1.5 self-start px-3 text-sm md:h-9 md:gap-2 md:px-4'
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
