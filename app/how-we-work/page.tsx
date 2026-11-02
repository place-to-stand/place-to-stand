import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { PageHeader, Section } from '@/src/components/layout/section'
import { CtaBand } from '@/src/components/layout/cta-band'
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
    <main className='flex-1 pt-page-start'>
      <div className='flex flex-col gap-section pb-edge'>
        {/* How We Work — intro + two-column process narrative */}
        <Section priority className='flex flex-col gap-header'>
          <PageHeader
            label='How We Work'
            title='Our process'
            intro='Quick wins to unblock you, a model of how your business actually works, execution through our portal, and hard-won judgment on the details.'
          />
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
                <h2 className='type-card-title text-balance uppercase'>
                  {step.title}
                </h2>
                <p className='max-w-xl text-base text-text-muted'>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <PortalSection />

        {/* Our Tech Stack — the models and infrastructure powering the portal */}
        <Section>
          <div>
            <div className='flex flex-col gap-stack'>
              <div className='flex flex-col gap-intro'>
                <h2 className='type-section-title'>Our Tech Stack</h2>
                <p className='max-w-2xl text-base text-text-muted'>
                  The frontier AI models and modern infrastructure behind every
                  build.
                </p>
              </div>
              <div className='flex flex-col gap-6'>
                {stackGroups.map(group => (
                  <div
                    key={group.label}
                    className='flex flex-col gap-grid-half'
                  >
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
                            <span className='type-fine whitespace-nowrap'>
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
        </Section>

        <PhasesSection showHowWeWorkLink={false} showLabel={false} />
      </div>

      <CtaBand location='how-we-work-cta-block' title='Find your phase.' />
    </main>
  )
}
