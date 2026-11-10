import Link from 'next/link'
import type { Route } from 'next'
import { Reveal } from '@/src/components/layout/animated-section'
import { Section, SectionHeading } from '@/src/components/layout/section'
import { heatonistCaseStudy } from '@/src/lib/case-study-heatonist'
import {
  AFTER_LAUNCH,
  BILLING,
  OFFERS,
  OWNERSHIP,
  SELL_ONLINE_CLIENTS,
  STEPS,
  type Offer,
} from '@/src/lib/offers'
import { cn } from '@/src/lib/utils'

/** A small mono link with an arrow, used under a section's content. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: Route | `/${string}#${string}`
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link href={href as Route} className={cn('link-action', className)}>
      {children}
      <span aria-hidden>&rarr;</span>
    </Link>
  )
}

/** "Instead of HubSpot · Salesforce" or "Built for Hot Ones · …" as a row of tags. */
export function TagRow({ label, tags }: { label: string; tags: string[] }) {
  return (
    <div className='flex flex-wrap items-center gap-x-grid-half gap-y-2'>
      <span className='type-fine'>{label}</span>
      {tags.map(tag => (
        <span
          key={tag}
          className='border border-border px-2 py-1 text-sm text-text-muted'
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export function OfferCard({ offer }: { offer: Offer }) {
  const run = offer.slug === 'run-your-business'
  const insteadOf = run
    ? Array.from(new Set(offer.modules.flatMap(m => m.insteadOf ?? []))).slice(
        0,
        5
      )
    : SELL_ONLINE_CLIENTS
  return (
    <div className='flex h-full flex-col gap-grid-1 border border-border bg-bg-card p-card'>
      <div className='flex flex-col gap-grid-half'>
        <h3 className='type-item-title'>{offer.name}</h3>
        <p className='text-base text-text-muted'>{offer.summary}</p>
      </div>
      <ul className='grid gap-x-grid-1 border-t border-border pt-grid-1 sm:grid-cols-2'>
        {offer.modules.map(module => (
          <li
            key={module.name}
            className='flex items-center gap-2 py-1.5 text-base'
          >
            <span aria-hidden className='h-1.5 w-1.5 shrink-0 bg-accent-line' />
            {module.name}
          </li>
        ))}
      </ul>
      <div className='mt-auto flex flex-col gap-grid-1'>
        <TagRow label={run ? 'Instead of' : 'Built for'} tags={insteadOf} />
        <ArrowLink href={`/platform#${offer.slug}`}>See the platform</ArrowLink>
      </div>
    </div>
  )
}

export function OffersSection() {
  return (
    <Section id='what-we-build' className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='What We Build'
          title='Two kinds of work. One source of data.'
        />
      </Reveal>
      <Reveal index={1} className='grid gap-grid-1 lg:grid-cols-2'>
        {OFFERS.map(offer => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </Reveal>
    </Section>
  )
}

/**
 * The ownership promise as a set piece. It always sits in a dark band: the
 * same treatment on Home, Platform and About.
 */
export function OwnershipSection({
  title = 'You own all of it.',
  items = OWNERSHIP,
}: {
  title?: string
  items?: { title: string; body: string }[]
}) {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading label='What You Own' title={title} />
      </Reveal>
      <Reveal index={1}>
        <ul
          className={cn(
            'grid gap-x-grid-2 gap-y-grid-2 sm:grid-cols-2',
            items.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          )}
        >
          {items.map(item => (
            <li
              key={item.title}
              className='border-t border-accent-subtle pt-grid-1 text-base text-text-muted'
            >
              <strong className='block pb-grid-half type-card-title'>
                {item.title}
              </strong>
              {item.body}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}

/** Managed services, consulting and training, as a short strip on Home. */
export function AfterLaunchSection() {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='After Launch'
          title='We stay on after it ships.'
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
      <Reveal index={2}>
        <ArrowLink href='/platform#after-launch'>See the platform</ArrowLink>
      </Reveal>
    </Section>
  )
}

export function StepsSection({
  showLink = true,
  showBilling = false,
}: {
  showLink?: boolean
  /** Close the steps with the billing promise (Home). */
  showBilling?: boolean
}) {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='How It Works'
          title='One problem at a time, solved all the way.'
        />
      </Reveal>
      <Reveal index={1}>
        <ol className='grid gap-grid-1 md:grid-cols-2 lg:grid-cols-3'>
          {STEPS.map(step => (
            <li
              key={step.number}
              className='flex flex-col gap-grid-1 border border-border bg-bg-card p-card'
            >
              <div className='flex items-baseline justify-between gap-grid-half'>
                <span className='font-mono text-sm text-text-muted'>
                  {step.number}
                </span>
                <span className='bp-label font-mono whitespace-nowrap after:hidden'>
                  {step.time}
                </span>
              </div>
              <h3 className='type-card-title'>{step.name}</h3>
              <p className='text-base text-text-muted'>{step.summary}</p>
            </li>
          ))}
        </ol>
      </Reveal>
      {showBilling && (
        <Reveal
          index={2}
          className='flex flex-col gap-grid-half border-l-4 border-accent pl-grid-1'
        >
          <p className='type-card-title'>{BILLING.title}</p>
          <p className='max-w-3xl text-base text-text-muted'>{BILLING.body}</p>
        </Reveal>
      )}
      {showLink && (
        <Reveal index={3}>
          <ArrowLink href='/process'>How we work</ArrowLink>
        </Reveal>
      )}
    </Section>
  )
}

export function ResultsSection() {
  const cs = heatonistCaseStudy
  return (
    <Section id='results' className='flex scroll-mt-24 flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label='Client Results'
          title='What it looks like in practice.'
          intro='Heatonist and Hot Ones: storefronts, Shopify apps and fulfillment, run by us since 2023.'
        />
      </Reveal>
      <Reveal index={1}>
        <ul className='grid gap-grid-1 md:grid-cols-3'>
          {cs.stats.map(stat => (
            <li key={stat.value}>
              <Link
                href='/clients/heatonist'
                className='group flex h-full flex-col gap-grid-1 border border-border bg-bg-card p-card transition-colors hover:bg-bg-elevated'
              >
                <span className='type-stat text-accent'>{stat.value}</span>
                <span className='text-base text-text-muted'>{stat.label}</span>
                <span className='mt-auto type-fine group-hover:text-text'>
                  Heatonist &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal index={2}>
        <ArrowLink href='/clients'>See all clients</ArrowLink>
      </Reveal>
    </Section>
  )
}
