import type { Metadata } from 'next'
import {
  Band,
  PageHeader,
  Section,
  SectionHeading,
} from '@/src/components/layout/section'
import { Reveal } from '@/src/components/layout/animated-section'
import { CtaBand } from '@/src/components/layout/cta-band'
import { OwnershipSection, TagRow } from '@/src/components/sections/home-story'
import { pageMetadata } from '@/src/lib/page-metadata'
import { JsonLd } from '@/src/components/seo/json-ld'
import { servicesJsonLd } from '@/src/lib/structured-data'
import { AFTER_LAUNCH, OFFERS, type Offer } from '@/src/lib/offers'

export const metadata: Metadata = pageMetadata({
  title: 'Platform',
  description:
    'Software you own, built around your business: systems that run the business and stores that sell, on one source of data.',
  path: '/platform',
})

const OWNERSHIP_TERMS = [
  { title: 'Your code.', body: 'Everything we make for you is yours.' },
  {
    title: 'Your data.',
    body: 'Yours alone. We use it only to do the work, and it never trains AI.',
  },
  {
    title: 'Our tools.',
    body: 'We keep our own libraries and templates. You get a free, permanent license to any part built into your software.',
  },
  {
    title: 'Your exit.',
    body: 'Walk away any time and take everything with you.',
  },
]

function OfferSection({ offer, index }: { offer: Offer; index: number }) {
  const run = offer.slug === 'run-your-business'
  return (
    <Section id={offer.slug} className='flex scroll-mt-24 flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label={run ? 'Run Your Business' : 'Sell Online'}
          title={offer.name}
          intro={offer.summary}
        />
      </Reveal>
      <Reveal index={1}>
        <ul className='grid gap-grid-1 md:grid-cols-2 lg:grid-cols-3'>
          {offer.modules.map((module, moduleIndex) => (
            <li
              key={module.name}
              className='flex flex-col gap-grid-1 border border-border bg-bg-card p-card'
            >
              <span className='font-mono text-sm text-text-muted'>
                {String(index + 1).padStart(2, '0')}.
                {String(moduleIndex + 1).padStart(2, '0')}
              </span>
              <div className='flex flex-col gap-grid-half'>
                <h3 className='type-card-title'>{module.name}</h3>
                <p className='text-base text-text-muted'>{module.job}</p>
              </div>
              {(module.insteadOf || module.example) && (
                <div className='mt-auto border-t border-border pt-grid-1'>
                  {module.insteadOf ? (
                    <TagRow label='Instead of' tags={module.insteadOf} />
                  ) : (
                    <TagRow label='Built for' tags={[module.example!]} />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}

export default function PlatformPage() {
  return (
    <main className='flex-1 pt-page-start'>
      <JsonLd data={servicesJsonLd} />
      <Section priority className='pb-grid-2'>
        <PageHeader
          label='Platform'
          title='Software you own, built around your business.'
          intro='We build two kinds of systems: ones that run the business and ones that sell. Each piece works on its own, and they all share one source of data.'
        />
      </Section>
      <Band tone='light'>
        {OFFERS.map((offer, index) => (
          <OfferSection key={offer.slug} offer={offer} index={index} />
        ))}
      </Band>
      <Band tone='dark'>
        <OwnershipSection
          title='Built for you, owned by you.'
          items={OWNERSHIP_TERMS}
        />
      </Band>
      <Band tone='light'>
        <Section
          id='after-launch'
          className='flex scroll-mt-24 flex-col gap-stack'
        >
          <Reveal index={0}>
            <SectionHeading
              label='After Launch'
              title='We stay on after it ships.'
              intro='Once the first build is live, you choose how much help you want from us.'
            />
          </Reveal>
          <Reveal index={1}>
            <ul className='grid gap-grid-1 md:grid-cols-3'>
              {AFTER_LAUNCH.map(item => (
                <li
                  key={item.name}
                  className='flex flex-col gap-grid-half border border-border bg-bg-card p-card'
                >
                  <h3 className='type-card-title'>{item.name}</h3>
                  <p className='text-base text-text-muted'>{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      </Band>
      <CtaBand
        location='platform-cta-block'
        title="Tell us what's slowing you down."
      />
    </main>
  )
}
