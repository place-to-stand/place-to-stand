import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

export const metadata: Metadata = {
  title: 'Business Audit',
  description:
    'Find your leverage. A short audit that shows where custom software can target your business directly — instead of bending you around off-the-shelf SaaS.',
}

export default function AuditPage() {
  return (
    <main className='flex-1 pt-grid-4'>
      <AnimatedSection className='flex flex-col items-center gap-8'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='bp-label font-mono'>Business Audit</span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            Find your leverage
          </h1>
          <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
            A short audit that maps your governance, roles, and processes — then
            shows where purpose-built software can target your business directly,
            instead of bending you around off-the-shelf SaaS.
          </p>
        </div>

        <div className='relative w-full max-w-3xl border border-border bg-bg-card p-10 text-center'>
          <BlueprintCorners size={16} all />
          <div className='flex flex-col items-center gap-6'>
            <p className='font-mono text-xs uppercase tracking-[0.15em] text-accent'>
              Coming soon
            </p>
            <h2 className='text-balance font-headline text-2xl font-semibold uppercase !leading-[.9] text-text md:text-3xl'>
              The audit is being built
            </h2>
            <p className='max-w-md text-base text-text-muted'>
              Want your leverage mapped now? Book a call and we&apos;ll walk
              through it with you directly.
            </p>
            <Button asChild size='lg' className='mx-auto px-10'>
              <Link href='/contact'>Book a call</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
