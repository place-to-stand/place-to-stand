import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { ContactSection } from '@/src/components/sections/contact-section'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Place To Stand. Send a message or book a call directly.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main className='flex-1 pt-page-start pb-section'>
      <ContactSection />
    </main>
  )
}
