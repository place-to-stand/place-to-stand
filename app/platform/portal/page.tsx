import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { Band } from '@/src/components/patterns/section'
import { BookCallButton } from '@/src/components/primitives/cta'
import { Button } from '@/src/components/primitives/button'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { Hero } from '@/src/components/sections/hero'
import { PortalModulesSection } from '@/src/components/sections/portal-modules'
import { PortalScreensSection } from '@/src/components/sections/portal-screens'
import { PortalBuildSection } from '@/src/components/sections/portal-build'
import { PortalOwnershipSection } from '@/src/components/sections/portal-ownership'
import { CtaBand } from '@/src/components/sections/cta-band'
import {
  PORTAL_CTA_TITLE,
  PORTAL_HEADER,
  PORTAL_REPO_URL,
} from '@/src/lib/portal'

// Draft title and description (checklist C8), waiting on Jason.
export const metadata: Metadata = pageMetadata({
  title: 'Open-Source Client Portal and CRM',
  description:
    'An open-source client portal and CRM: leads, projects, time, invoices and client updates in one place. Your own copy, on your infrastructure, with no seat fees.',
  path: '/platform/portal',
})

/** The Portal page: the system we run on, module by module, then whole. */
export default function PortalPage() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <Hero
        variant='page'
        sectionClassName='flex flex-col gap-stack pb-grid-2'
        label={PORTAL_HEADER.label}
        title={PORTAL_HEADER.title}
        intro={PORTAL_HEADER.intro}
      >
        <div className='flex flex-col gap-grid-1 sm:flex-row sm:items-start sm:gap-grid-half'>
          <BookCallButton location='portal-hero' className='w-full sm:w-auto' />
          {/* Matches the Home hero's "See our work" button. */}
          <Button
            asChild
            size='lg'
            variant='outline'
            className='w-full sm:w-auto'
          >
            <TrackedLink
              href={PORTAL_REPO_URL}
              location='portal-hero'
              target='_blank'
              rel='noopener noreferrer'
            >
              {PORTAL_HEADER.codeLabel}
            </TrackedLink>
          </Button>
        </div>
      </Hero>

      <Band tone='light'>
        <PortalModulesSection />
      </Band>
      <Band tone='dark'>
        <PortalScreensSection />
      </Band>
      <Band tone='light'>
        <PortalBuildSection />
      </Band>
      <Band tone='dark'>
        <PortalOwnershipSection />
      </Band>
      <CtaBand
        location='portal-cta-block'
        title={PORTAL_CTA_TITLE}
        secondary={{ label: PORTAL_HEADER.codeLabel, href: PORTAL_REPO_URL }}
      />
    </main>
  )
}
