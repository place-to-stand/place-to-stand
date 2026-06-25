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

      {/* CTA Block */}
      <section className='border-t border-border'>
        <div className='mx-auto flex max-w-7xl flex-col gap-8 px-6 py-24 md:flex-row md:items-center md:justify-between lg:px-10'>
          <div className='flex flex-col gap-3'>
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
      </section>
    </main>
  )
}
