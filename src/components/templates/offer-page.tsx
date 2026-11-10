import { Band } from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'
import { OffersSection } from '@/src/components/sections/offers'
import { OwnershipSection } from '@/src/components/sections/ownership'
import { AfterLaunchSection } from '@/src/components/sections/after-launch'
import { JsonLd } from '@/src/components/seo/json-ld'
import { servicesJsonLd } from '@/src/lib/structured-data'
import { MOBILE_APPS } from '@/src/lib/offers'
import { Hero } from '@/src/components/sections/hero'

/** An offer page (Platform): page hero, the offers in detail, ownership, after launch, closing band. */
export function OfferPageTemplate() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <JsonLd data={servicesJsonLd} />
      <Hero
        variant='page'
        sectionClassName='pb-grid-2'
        label='Platform'
        title='Software you own, built around your business.'
        intro={`We build two kinds of systems: ones that run the business and ones that sell. Each piece works on its own, and they all share one source of data. ${MOBILE_APPS}`}
      />
      <Band tone='light'>
        <OffersSection variant='detail' />
      </Band>
      <Band tone='dark'>
        <OwnershipSection />
      </Band>
      <Band tone='light'>
        <AfterLaunchSection variant='detail' />
      </Band>
      <CtaBand
        location='platform-cta-block'
        title="Tell us what's slowing you down."
      />
    </main>
  )
}
