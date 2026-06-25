import { HeroSection } from '@/src/components/sections/hero-section'
import { PillarsSection } from '@/src/components/sections/pillars-section'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { ManifestoSection } from '@/src/components/sections/manifesto-section'
import { ServicesPreview } from '@/src/components/sections/services-preview'
import { CaseStudiesPreview } from '@/src/components/sections/case-studies-preview'
import { FieldNotesPreview } from '@/src/components/sections/field-notes-preview'
import { Separator } from '@/src/components/ui/separator'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />
      <Separator className='mx-auto max-w-6xl' />
      <PillarsSection />
      <ManifestoSection />
      <Separator className='mx-auto max-w-6xl' />
      <ServicesPreview />
      <Separator className='mx-auto max-w-6xl' />
      <CaseStudiesPreview />
      <Separator className='mx-auto max-w-6xl' />
      <PhasesSection />
      <Separator className='mx-auto max-w-6xl' />
      <FieldNotesPreview />

      {/* CTA Block */}
      <section className='mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center'>
        <h2 className='font-headline text-3xl uppercase text-text md:text-5xl'>
          Ready to build?
        </h2>
        <p className='max-w-xl text-balance text-base text-text-muted'>
          Tell us about your project. We&apos;ll identify the highest-impact
          opportunity and outline a plan to get there.
        </p>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <Button asChild size='lg'>
            <Link href='/contact'>Start a Project</Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href='/how-we-work'>How We Work</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
