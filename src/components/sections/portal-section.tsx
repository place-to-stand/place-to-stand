import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { vendorIcons } from '@/src/components/icons/vendor-icons'
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
    <>
      <AnimatedSection className='flex flex-col gap-6'>
        <Reveal
          index={0}
          className='flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between'
        >
          <div className='flex flex-col gap-4'>
            <h2 className='max-w-3xl text-balance font-headline text-3xl font-bold uppercase !leading-[.95] tracking-tight text-text md:text-4xl'>
              Our Portal
            </h2>
            <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
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
            className='shrink-0 gap-2 self-start'
          >
            <a href={REPO_URL} target='_blank' rel='noopener noreferrer'>
              <GitHubIcon className='h-4 w-4' aria-hidden />
              Open Source
            </a>
          </Button>
        </Reveal>
      </AnimatedSection>

      <PortalFlow />
    </>
  )
}
