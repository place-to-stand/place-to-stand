import type { Metadata } from 'next'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { AuditApp } from '@/src/components/audit/audit-app'

export const metadata: Metadata = {
  title: 'Free Opportunity Audit',
  description:
    'Take our 2-minute audit to discover where custom software would give your business the most leverage. Built by ex-Squarespace engineers using AI-accelerated development.',
  alternates: { canonical: '/audit' },
  openGraph: {
    title: 'Free Opportunity Audit | Place To Stand',
    description:
      'Take our 2-minute audit to discover where custom software would give your business the most leverage. Built by ex-Squarespace engineers using AI-accelerated development.',
  },
  twitter: {
    title: 'Free Opportunity Audit | Place To Stand',
    description:
      'Take our 2-minute audit to discover where custom software would give your business the most leverage. Built by ex-Squarespace engineers using AI-accelerated development.',
  },
}

export default function AuditPage() {
  return (
    <main className='flex-1 pt-grid-4 pb-32'>
      {/* Phones drop the section's own padding: the page top already clears
          the header, and every extra pixel there pushes answers off screen. */}
      <AnimatedSection priority className='py-0! sm:py-20!'>
        <div className='mx-auto w-full max-w-content'>
          <AuditApp />
        </div>
      </AnimatedSection>
    </main>
  )
}
