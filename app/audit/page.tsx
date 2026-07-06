import type { Metadata } from 'next'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { AuditApp } from '@/src/components/audit/audit-app'

export const metadata: Metadata = {
  title: 'Opportunity Audit',
  description:
    'A short opportunity audit that shows the phase your business is in and where purpose-built software would give you the most leverage. We build it AI-accelerated, so it stays fast and affordable.',
}

export default function AuditPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      <AnimatedSection>
        <div className='mx-auto w-full max-w-content px-6 lg:px-12'>
          <AuditApp />
        </div>
      </AnimatedSection>
    </main>
  )
}
