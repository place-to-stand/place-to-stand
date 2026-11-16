import { Hero } from '@/src/components/sections/hero'
import { ClientLogosSection } from '@/src/components/sections/client-logos-section'
import { ProofSection } from '@/src/components/sections/proof'
import { SoundFamiliarSection } from '@/src/components/sections/sound-familiar'
import { WhoYouWorkWithSection } from '@/src/components/sections/who-you-work-with'
import { StepsSection } from '@/src/components/sections/process'
import { OwnershipSection } from '@/src/components/sections/ownership'
import { Band } from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'
import { HOW_IT_WORKS_HOME_INTRO } from '@/src/lib/home'

/** The Home page: hero and logos on dark, then alternating light and dark
 *  bands from the proof on (Nov 14), and the closing band. */
export function HomeTemplate() {
  return (
    <main id='main' className='flex-1'>
      <Hero variant='home' />
      {/* The logos stay on the hero's dark, then the bands alternate from
          the proof on (Jason, Nov 14: no three dark sections in a row):
          light, dark, light, dark, light, and the dark closing band. Bands
          pad themselves by the section role, so content-to-content spacing
          is the same everywhere. */}
      <Band
        tone='dark'
        className='pt-edge pb-[calc(var(--spacing-edge)-var(--spacing-grid-half))]'
      >
        <ClientLogosSection />
      </Band>
      <Band tone='light'>
        <ProofSection />
      </Band>
      <Band tone='dark'>
        <SoundFamiliarSection />
      </Band>
      <Band tone='light'>
        <WhoYouWorkWithSection />
      </Band>
      <Band tone='dark'>
        <StepsSection showBilling intro={HOW_IT_WORKS_HOME_INTRO} />
      </Band>
      <Band tone='light'>
        <OwnershipSection />
      </Band>
      <CtaBand location='home-cta-block' />
    </main>
  )
}
