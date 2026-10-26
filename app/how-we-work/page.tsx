import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { TrackedLink } from '@/src/components/tracked-link'
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

export const metadata: Metadata = pageMetadata({
  title: 'How We Work',
  description:
    'Our production cycle, delivery model, and pricing. Flat-rate blocks, direct access, and AI-powered delivery.',
  path: '/how-we-work',
})

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
  {
    label: 'Infrastructure',
    items: vendors.filter(v => v.category === 'infra'),
  },
]

export default function HowWeWorkPage() {
  return (
    <main className='flex-1 pt-10'>
      {/* How We Work — intro + two-column process narrative */}
      <AnimatedSection priority className='flex flex-col gap-12'>
        <div className='dots-hero mb-12 flex flex-col gap-4 md:mb-20'>
          <span className='bp-label font-mono'>How We Work</span>
          <h1 className='max-w-4xl font-headline text-4xl !leading-[.9] font-semibold text-balance text-text uppercase md:text-6xl'>
            Our Process
          </h1>
          <p className='max-w-2xl text-base text-text-muted md:text-lg'>
            Quick wins to unblock you, a model of how your business actually
            works, execution through our portal, and hard-won judgment on the
            details.
          </p>
        </div>
        {/* Four open steps: rows split by a rule on small screens, four
            columns on large ones. No boxes. */}
        <ol className='grid divide-y divide-border lg:grid-cols-4 lg:gap-x-grid-2 lg:divide-y-0'>
          {process.map((step, index) => (
            <li
              key={step.title}
              className='flex flex-col gap-4 py-grid-2 first:pt-0 last:pb-0 lg:py-0'
            >
              <div className='flex items-start justify-between gap-grid-1'>
                <span className='font-mono text-sm text-text-muted tabular-nums'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <step.Graphic className='h-12 w-12 shrink-0' aria-hidden />
              </div>
              <h2 className='font-headline text-2xl leading-[0.95] font-bold tracking-tight text-balance text-text uppercase md:text-3xl'>
                {step.title}
              </h2>
              <p className='max-w-xl text-base text-text-muted'>{step.body}</p>
            </li>
          ))}
        </ol>
      </AnimatedSection>

      <PortalSection />

      {/* Our Tech Stack — the models and infrastructure powering the portal */}
      <AnimatedSection>
        <div>
          <div className='flex flex-col gap-grid-2'>
            <div className='flex flex-col gap-3'>
              <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
                Our Tech Stack
              </h2>
              <p className='max-w-2xl text-base text-text-muted'>
                The frontier AI models and modern infrastructure behind every
                build.
              </p>
            </div>
            <div className='flex flex-col gap-6'>
              {stackGroups.map(group => (
                <div key={group.label} className='flex flex-col gap-3'>
                  <span className='font-mono text-sm font-medium tracking-[0.1em] text-text-muted uppercase'>
                    {group.label}
                  </span>
                  <div className='grid grid-cols-2 gap-x-4 gap-y-5 md:flex md:flex-wrap md:items-center md:gap-x-8 md:gap-y-4'>
                    {group.items.map(vendor => {
                      const Icon = vendorIcons[vendor.name]
                      return (
                        <div
                          key={vendor.name}
                          className='flex flex-col items-center gap-3 md:w-24'
                        >
                          {Icon && (
                            <Icon
                              className='h-9 w-9 shrink-0 text-text'
                              aria-hidden
                            />
                          )}
                          <span className='font-mono text-xs tracking-wider whitespace-nowrap text-text-muted uppercase'>
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
      <AnimatedSection className='pt-[129px] pb-grid-4 md:pt-[217px] md:pb-grid-6'>
        <div className='dots-band bg-bg-card p-6 md:p-16'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-2.25 md:gap-3'>
              <span className='bp-label font-mono'>Next Step</span>
              <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
                Find your phase.
              </h2>
              <p className='mt-0.75 max-w-md text-base text-text-muted md:mt-1'>
                The free audit pinpoints the phase your business is in and where
                custom software pays off first. Two minutes, results on screen,
                no obligation.
              </p>
            </div>
            <div className='flex w-full shrink-0 flex-col gap-4 sm:w-auto'>
              <Button asChild size='lg' className='w-full'>
                <TrackedLink href='/audit' location='how-we-work-cta-block'>
                  Start the free audit
                </TrackedLink>
              </Button>
              <div className='flex flex-col gap-2'>
                <Button
                  asChild
                  size='lg'
                  variant='outline'
                  className='w-full border-2'
                >
                  <TrackedLink href='/contact' location='how-we-work-cta-block'>
                    Contact Us
                  </TrackedLink>
                </Button>
                <p className='max-w-xs text-sm text-text-muted'>
                  Already know what you want built, or want a bespoke mapping of
                  your systems? Talk to us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
