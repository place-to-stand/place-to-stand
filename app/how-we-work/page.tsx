import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { PortalSection } from '@/src/components/sections/portal-section'
import { vendors } from '@/src/lib/vendors'
import { vendorIcons } from '@/src/components/icons/vendor-icons'
import {
  QuickWinsGraphic,
  OntologyGraphic,
  AutomationGraphic,
  TasteGraphic,
} from '@/src/components/graphics/process-graphics'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Our production cycle, delivery model, and pricing. Flat-rate blocks, direct access, and AI-powered delivery.',
}

const process = [
  {
    title: 'Quick Wins',
    body: 'We ship something real, fast. Early wins build trust and a shared shorthand for the bigger decisions ahead.',
    Graphic: QuickWinsGraphic,
  },
  {
    title: 'Ontology',
    body: 'We map how your business actually works, the entities and rules that define your domain, so the software models reality, not a template.',
    Graphic: OntologyGraphic,
  },
  {
    title: 'Execution & Verification',
    body: 'Execution runs through our portal, and every task is human-verified before it ships.',
    Graphic: AutomationGraphic,
  },
  {
    title: 'Taste',
    body: 'We shape the details and apply hard-won judgment to fit the software to your business context.',
    Graphic: TasteGraphic,
  },
]

// The stack, grouped by role, folded into the process list as a final row.
const stackGroups = [
  { label: 'AI Models', items: vendors.filter(v => v.category === 'ai') },
  { label: 'Infrastructure', items: vendors.filter(v => v.category === 'infra') },
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
           Quick wins to unblock you, a model of how your business actually works, execution through our portal, and hard-won judgment on the details.
          </p>
        </div>
        <div className='relative'>
          <BlueprintCorners size={16} />
          <div className='grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4'>
            {process.map(step => (
              <div
                key={step.title}
                className='relative flex flex-col gap-6 bg-bg-card p-5 md:p-8'
              >
                <step.Graphic className='absolute right-4 top-4 h-10 w-10 md:right-6 md:top-6' aria-hidden />
                <h3 className='max-w-[80%] text-balance font-headline text-sm font-bold uppercase leading-tight tracking-tight text-accent'>
                  {step.title}
                </h3>
                <p className='text-sm leading-relaxed text-text-muted'>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <PortalSection />

      {/* Our Tech Stack — the models and infrastructure powering the portal */}
      <AnimatedSection>
        <div className='relative border border-border p-6 md:p-10'>
          <BlueprintCorners size={16} />
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
              <h3 className='font-headline text-lg font-semibold tracking-tight text-text'>
                Our Tech Stack
              </h3>
              <p className='max-w-2xl text-base leading-relaxed text-text-muted'>
                The frontier AI models and modern infrastructure behind every build.
              </p>
            </div>
            <div className='flex flex-col gap-6'>
              {stackGroups.map(group => (
                <div key={group.label} className='flex flex-col gap-3'>
                  <span className='text-xs font-semibold uppercase tracking-[0.1em] text-text-muted'>
                    {group.label}
                  </span>
                  <div className='grid grid-cols-2 gap-x-4 gap-y-5 md:flex md:flex-wrap md:items-center md:gap-x-8 md:gap-y-4'>
                    {group.items.map(vendor => {
                      const Icon = vendorIcons[vendor.name]
                      return (
                        <div key={vendor.name} className='flex items-center gap-2.5'>
                          {Icon && (
                            <Icon
                              className='h-9 w-9 shrink-0'
                              style={{ color: vendor.color }}
                              aria-hidden
                            />
                          )}
                          <span className='whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-text-muted'>
                            {vendor.name}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <PhasesSection showHowWeWorkLink={false} showLabel={false} />

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
