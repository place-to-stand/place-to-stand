import { HeroSection } from '@/src/components/sections/hero-section'
import { UseCasesSection } from '@/src/components/sections/use-cases-section'

import { HowWeWorkSection } from '@/src/components/sections/how-we-work-section'
import { ClientsSection } from '@/src/components/sections/clients-section'
import { ContactSection } from '@/src/components/sections/contact-section'
import { FaqSection } from '@/src/components/sections/faq-section'

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      <UseCasesSection />

      <ClientsSection />
      <HowWeWorkSection />
      <ContactSection />
      <FaqSection />
    </main>
  )
}
