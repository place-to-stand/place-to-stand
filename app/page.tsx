import { HeroSection } from '@/src/components/sections/hero-section'
import { PillarsSection } from '@/src/components/sections/pillars-section'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { ManifestoSection } from '@/src/components/sections/manifesto-section'
import { ServicesPreview } from '@/src/components/sections/services-preview'
import { CaseStudiesPreview } from '@/src/components/sections/case-studies-preview'
import { FieldNotesPreview } from '@/src/components/sections/field-notes-preview'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      <PillarsSection />
      <ManifestoSection />
      <ServicesPreview />
      <CaseStudiesPreview />
      <PhasesSection />
      <FieldNotesPreview />

      {/* CTA Block — blueprint detail callout */}
      <section className='border-t border-border'>
        <div className='mx-auto max-w-7xl px-6 py-24 lg:px-10'>
          <div className='relative border border-border bg-bg-card p-10 md:p-16'>
            {/* Corner marks */}
            <span className='pointer-events-none absolute -left-px -top-px z-10 h-5 w-5 border-l border-t border-accent' aria-hidden />
            <span className='pointer-events-none absolute -bottom-px -right-px z-10 h-5 w-5 border-b border-r border-accent' aria-hidden />
            <span className='pointer-events-none absolute -right-px -top-px z-10 h-5 w-5 border-r border-t border-accent' aria-hidden />
            <span className='pointer-events-none absolute -bottom-px -left-px z-10 h-5 w-5 border-b border-l border-accent' aria-hidden />
            <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-3'>
                <span className='bp-label font-mono'>Next Step</span>
                <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-5xl'>
                  Ready to build?
                </h2>
                <p className='max-w-md text-sm leading-relaxed text-text-muted'>
                  Tell us about your project. We&apos;ll identify the highest-impact
                  opportunity and outline a plan to get there.
                </p>
              </div>
              <div className='flex shrink-0 gap-3'>
                <Button asChild size='lg'>
                  <Link href='/contact'>Start a Project</Link>
                </Button>
                <Button asChild size='lg' variant='outline'>
                  <Link href='/how-we-work'>How We Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
