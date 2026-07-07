import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { TechStackSection } from '@/src/components/sections/tech-stack-section'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Our production cycle, delivery model, and pricing. Flat-rate blocks, direct access, and AI-powered delivery.',
}

const process = [
  {
    title: 'Quick Wins',
    body: 'We start by shipping something real, fast. Early, tangible wins build trust and give us a shared shorthand for the larger decisions ahead.',
  },
  {
    title: 'Ontology',
    body: 'Before scaling up, we map how your business actually works. This ontology, the entities, rules, and relationships that define your domain, becomes the backbone the software is built on, so what we ship models reality instead of a template.',
  },
  {
    title: 'Automated Execution & Human Verification',
    body: 'Once the direction is clear, execution is largely automated. Frontier models are integrated directly into our own custom tools. Every task is human-verified at the input and the output level where we verify code changes with pre-AI programming knowledge.',
  },
  {
    title: 'Taste',
    body: 'This is where our expertise in building apps shows. We shape the details, iterate tightly with your stakeholders, and apply hard-won judgment to fit the software to your specific business context.',
  },
]

export default function HowWeWorkPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      {/* How We Work — intro + two-column process narrative */}
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>How We Work</span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            Our Process
          </h1>
          <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
           We focus on quick wins first to unblock your immediate needs. We design your database structure and then we use our own custom solution to automate the manual task of coding. Lastly, we human-verify all production code with pre-AI programming knowledge.
          </p>
        </div>
        <div className='flex flex-col'>
          {process.map(step => (
            <div
              key={step.title}
              className='flex gap-6 border-t border-border py-grid-2'
            >
              <span className='w-1 shrink-0 self-stretch bg-accent' aria-hidden />
              <div className='flex flex-col gap-3'>
                <h3 className='text-balance font-headline text-lg font-bold uppercase tracking-tight text-accent'>
                  {step.title}
                </h3>
                <p className='max-w-2xl text-base leading-relaxed text-text-muted'>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <TechStackSection heading='The tools behind our process.' subtitle='Every phase is powered by frontier AI models and modern cloud infrastructure — chosen for reliability, speed, and developer experience.' />

      <PhasesSection showHowWeWorkLink={false} />

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
                Tell us what you are trying to build. We will scope the work,
                timeline, and cost, with no obligation.
              </p>
            </div>
            <div className='flex w-full shrink-0 flex-col gap-4 sm:w-auto'>
              <Button asChild size='lg' className='w-full'>
                <Link href='/contact'>Start a Project</Link>
              </Button>
              <div className='flex flex-col gap-2'>
                <Button asChild size='lg' variant='outline' className='w-full border-2'>
                  <Link href='/audit'>Opportunity Audit</Link>
                </Button>
                <p className='max-w-xs text-xs leading-relaxed text-text-muted'>
                  Not sure where to start? This two-minute audit pinpoints
                  where custom software pays off first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
