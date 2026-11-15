import { Band } from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'
import {
  DataHomeSection,
  OfferDetail,
  EngineeringHelpSection,
} from '@/src/components/sections/offers'
import { OwnershipSection } from '@/src/components/sections/ownership'
import { AfterLaunchSection } from '@/src/components/sections/after-launch'
import { JsonLd } from '@/src/components/seo/json-ld'
import { servicesJsonLd } from '@/src/lib/structured-data'
import { OFFERS, PLATFORM_HEADER } from '@/src/lib/offers'
import { Hero } from '@/src/components/sections/hero'

/**
 * The Platform page (approved Nov 13): header, the three kinds of work (#run,
 * #sell, #engineering-help), one home for your data, the full ownership block
 * (#own), after launch (#after-launch) and the closing band.
 */
export function OfferPageTemplate() {
  const [run, sell] = OFFERS
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <JsonLd data={servicesJsonLd} />
      <Hero
        variant='page'
        sectionClassName='pb-grid-2'
        label={PLATFORM_HEADER.label}
        title={PLATFORM_HEADER.title}
        intro={PLATFORM_HEADER.intro}
      />
      <Band tone='light'>
        <OfferDetail offer={run} />
      </Band>
      <Band tone='dark'>
        <OfferDetail offer={sell} />
      </Band>
      <Band tone='light'>
        <EngineeringHelpSection />
      </Band>
      <Band tone='dark'>
        <DataHomeSection />
        <div id='own' className='scroll-mt-24'>
          <OwnershipSection variant='full' />
        </div>
      </Band>
      <Band tone='light'>
        <AfterLaunchSection />
      </Band>
      <CtaBand location='platform-cta-block' />
    </main>
  )
}
