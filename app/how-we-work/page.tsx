import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { PhasesSection } from '@/src/components/sections/phases-section'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Our production cycle, delivery model, and pricing. Flat-rate blocks, direct access, and AI-powered delivery.',
}

export default function HowWeWorkPage() {
  return (
    <main className='flex-1 pt-grid-4'>
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>How We Work</span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            Ontology based design leads to meaningful software. 
          </h1>
          <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
            We aim for quick wins initially to establish trust and establish a short-hand. Once the direction is clear, execution is largely automated for us through our custom portal with frontier models integrated directly. We human-verify the output and apply our expert taste to fit your unique business context. 
          </p>
        </div>
      </AnimatedSection>

      {/* Portal Section */}
      <AnimatedSection className='flex flex-col gap-8'>
        <h2 className='text-center font-headline text-3xl uppercase text-text'>Your Private Portal</h2>
        <div className='grid gap-px border border-border bg-border md:grid-cols-3'>
          <div className='relative bg-bg-card p-6'>
            <BlueprintCorners />
            <span className='mb-2 inline-flex h-5 w-5 items-center justify-center border border-accent/30 font-mono text-[9px] text-accent'>01</span>
            <h3 className='mb-3 font-headline text-lg uppercase text-accent'>Real-Time Visibility</h3>
            <p className='text-sm text-text-muted'>Track every task, approval, and deliverable in one place. AI-generated summaries keep you informed without meetings.</p>
          </div>
          <div className='relative bg-bg-card p-6'>
            <BlueprintCorners />
            <span className='mb-2 inline-flex h-5 w-5 items-center justify-center border border-accent/30 font-mono text-[9px] text-accent'>02</span>
            <h3 className='mb-3 font-headline text-lg uppercase text-accent'>Direct Communication</h3>
            <p className='text-sm text-text-muted'>Message the engineer building your product directly. No account managers, no telephone game.</p>
          </div>
          <div className='relative bg-bg-card p-6'>
            <BlueprintCorners />
            <span className='mb-2 inline-flex h-5 w-5 items-center justify-center border border-accent/30 font-mono text-[9px] text-accent'>03</span>
            <h3 className='mb-3 font-headline text-lg uppercase text-accent'>One-Click Top-Up</h3>
            <p className='text-sm text-text-muted'>Purchase additional hour blocks directly through your Portal. Unused time never expires.</p>
          </div>
        </div>
      </AnimatedSection>

      <PhasesSection />

      {/* CTA Block */}
      <AnimatedSection>
        <div className='relative border border-border bg-bg-card p-6 md:p-16'>
          <BlueprintCorners size={20} all />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-3'>
              <span className='bp-label font-mono'>Next Step</span>
              <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
                Ready to build?
              </h2>
              <p className='max-w-md text-sm leading-relaxed text-text-muted'>
                Not sure where to start? The Opportunity Audit maps the phase
                your business is in and pinpoints where custom software would pay
                off first, in about two minutes.
              </p>
            </div>
            <div className='flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row'>
              <Button asChild size='lg' className='w-full sm:w-auto'>
                <Link href='/contact'>Start a Project</Link>
              </Button>
              <Button asChild size='lg' variant='outline' className='w-full sm:w-auto'>
                <Link href='/audit'>Opportunity Audit</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
