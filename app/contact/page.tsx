import type { Metadata } from 'next'
import { ContactSection } from '@/src/components/sections/contact-section'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Place To Stand. Send a message or book a call directly.',
}

export default function ContactPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      <ContactSection />
    </main>
  )
}
