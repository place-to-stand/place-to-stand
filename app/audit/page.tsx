import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { Section } from '@/src/components/layout/section'
import { AuditApp } from '@/src/components/audit/audit-app'

export const metadata: Metadata = pageMetadata({
  title: 'Free Opportunity Audit',
  description:
    'Take our 2-minute audit to discover where custom software would give your business the most leverage. Built by a team led by a former Squarespace senior engineer.',
  path: '/audit',
})

export default function AuditPage() {
  return (
    <main className='flex-1 pt-page-start pb-band'>
      <Section priority>
        <div className='mx-auto w-full max-w-content'>
          <AuditApp />
        </div>
      </Section>
    </main>
  )
}
