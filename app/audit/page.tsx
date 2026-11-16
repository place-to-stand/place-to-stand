import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { Section } from '@/src/components/patterns/section'
import { AuditApp } from '@/src/components/sections/audit/audit-app'

export const metadata: Metadata = pageMetadata({
  title: 'Free Opportunity Audit',
  description:
    'Take our 2-minute audit to discover where custom software would give your business the most leverage. Built by senior engineers, including a former Squarespace group engineering manager.',
  path: '/audit',
})

export default function AuditPage() {
  return (
    <main id='main' className='flex-1 pt-page-start pb-band'>
      <Section priority>
        <div className='mx-auto w-full max-w-content'>
          <AuditApp />
        </div>
      </Section>
    </main>
  )
}
