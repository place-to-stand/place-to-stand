import { HeroSection } from '@/src/components/sections/hero-section'
import { UseCasesSection } from '@/src/components/sections/use-cases-section'

import { HowWeWorkSection } from '@/src/components/sections/how-we-work-section'
import { WorkSection } from '@/src/components/sections/work-section'
import { ContactSection } from '@/src/components/sections/contact-section'
import { TeamSection } from '@/src/components/sections/team-section'

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      <UseCasesSection />

      <WorkSection />
      <HowWeWorkSection />
      <ContactSection />
      <TeamSection />
    </main>
  )
}
