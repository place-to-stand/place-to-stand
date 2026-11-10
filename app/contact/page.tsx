import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { ContactTemplate } from '@/src/components/templates/contact'

export const metadata: Metadata = pageMetadata({
  title: 'Book a call',
  description:
    'Book a free 30-minute intro call with the engineers who would build your software, take the free audit, or send a message.',
  path: '/contact',
})

export default function ContactPage() {
  return <ContactTemplate />
}
