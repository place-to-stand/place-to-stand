import { Hero } from '@/src/components/sections/hero'
import { ClientLogosSection } from '@/src/components/sections/client-logos-section'
import { ProofSection } from '@/src/components/sections/proof'
import { SoundFamiliarSection } from '@/src/components/sections/sound-familiar'
import { WhoYouWorkWithSection } from '@/src/components/sections/who-you-work-with'
import { StepsSection } from '@/src/components/sections/process'
import { OwnershipSection } from '@/src/components/sections/ownership'
import { Band } from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'

/** The Home page (approved Nov 13): hero, logos and proof, then light and
 *  dark bands of sections and the closing band. */
export function HomeTemplate() {
  return (
    <main id='main' className='flex-1'>
      <Hero variant='home' />
      {/* The logos and the Heatonist proof share the dark under the hero,
          then the bands alternate: light for reading sections, dark for the
          founders and ownership. Bands pad themselves by the section role,
          so content-to-content spacing is the same everywhere. */}
      <Band tone='dark' className='pt-edge'>
        <ClientLogosSection />
        <ProofSection />
      </Band>
      <Band tone='light'>
        <SoundFamiliarSection />
      </Band>
      <Band tone='dark'>
        <WhoYouWorkWithSection />
      </Band>
      <Band tone='light'>
        <StepsSection showBilling />
      </Band>
      <Band tone='dark'>
        <OwnershipSection variant='short' />
      </Band>
      <CtaBand location='home-cta-block' />
    </main>
  )
}
