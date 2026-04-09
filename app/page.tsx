import { HeroSection } from '@/src/components/sections/hero-section'
import { ClientsLogoGrid } from '@/src/components/sections/clients-logo-grid'
import { HowWeWorkSection } from '@/src/components/sections/how-we-work-section'
import { ContactSection } from '@/src/components/sections/contact-section'
import { FaqSection } from '@/src/components/sections/faq-section'

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      <ClientsLogoGrid />
      <HowWeWorkSection />
      <ContactSection />
      <FaqSection />
    </main>
  )
}
