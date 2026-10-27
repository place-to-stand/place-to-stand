import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { AuditApp } from '@/src/components/audit/audit-app'

export const metadata: Metadata = pageMetadata({
  title: 'Free Opportunity Audit',
  description:
    'Take our 2-minute audit to discover where custom software would give your business the most leverage. Built by a team led by a former Squarespace senior engineer.',
  path: '/audit',
})

export default function AuditPage() {
  return (
    <main className='flex-1 pt-grid-4 pb-grid-3 md:pb-grid-4'>
      {/* Phones drop the section's own padding: the page top already clears
          the header, and every extra pixel there pushes answers off screen. */}
      <AnimatedSection priority className='py-0! sm:pt-20! sm:pb-0!'>
        <div className='mx-auto w-full max-w-content'>
          <AuditApp />
        </div>
      </AnimatedSection>
    </main>
  )
}
