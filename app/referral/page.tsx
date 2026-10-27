import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { Section } from '@/src/components/layout/section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'
import { referralContent as c } from '@/src/lib/referral-content'

export const metadata: Metadata = pageMetadata({
  title: c.meta.title,
  description: c.meta.description,
  path: '/referral',
})

export default function ReferralPage() {
  return (
    <main className='flex-1 pt-page-start pb-band'>
      <div className='flex flex-col gap-section pb-edge'>
        {/* Hero */}
        <Section priority>
          <div className='dots-hero flex flex-col gap-grid-1'>
            <div className='flex flex-col gap-intro'>
              <div className='flex flex-col gap-eyebrow'>
                <span className='bp-label font-mono'>{c.hero.label}</span>
                <h1 className='max-w-4xl type-page-title text-balance'>
                  {c.hero.headline}
                  <a
                    href='#referral-terms'
                    aria-label='See referral program terms'
                    className='ml-1 align-super font-mono text-[0.45em] font-normal text-accent transition-colors hover:text-accent/80'
                  >
                    *
                  </a>
                </h1>
              </div>
              <p className='max-w-2xl type-intro'>{c.hero.body}</p>
            </div>
            <div className='flex flex-col gap-grid-half sm:flex-row sm:items-center sm:gap-grid-1'>
              <Button asChild size='lg' className='w-full sm:w-auto'>
                <TrackedLink href={c.join.href} location='referral-hero'>
                  {c.hero.joinLabel}
                </TrackedLink>
              </Button>
              {/*
            A plain anchor rather than next/link: the target is a route handler
            that streams a file, so client-side navigation (and prefetching)
            would generate the PDF once for the router and again for the
            browser's fallback hard navigation.
          */}
              <Button
                asChild
                size='lg'
                variant='outline'
                className='w-full border-2 sm:w-auto'
              >
                <a href='/referral/pdf' download>
                  {c.hero.downloadLabel}
                </a>
              </Button>
            </div>
          </div>
        </Section>

        {/* Who we are */}
        <Section className='flex flex-col gap-stack'>
          <div className='flex flex-col gap-eyebrow'>
            <span className='bp-label font-mono'>{c.whoWeAre.label}</span>
            <h2 className='max-w-3xl type-section-title text-balance'>
              {c.whoWeAre.headline}
            </h2>
            <p className='mt-0.75 max-w-2xl text-base text-text-muted md:mt-1'>
              {c.whoWeAre.body}
            </p>
          </div>
          <div className='relative'>
            <ul className='flex flex-col gap-grid-half'>
              {c.whoWeAre.services.map(service => (
                <li
                  key={service.name}
                  className='grid gap-grid-half bg-bg-card p-grid-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-baseline md:gap-grid-1'
                >
                  <h3 className='type-card-title'>{service.name}</h3>
                  <ul className='flex flex-wrap gap-x-6 gap-y-2'>
                    {service.items.map(item => (
                      <li
                        key={item}
                        className='flex items-center gap-2 text-base text-text-muted'
                      >
                        <span
                          className='h-1.5 w-1.5 shrink-0 bg-accent'
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Who to refer */}
        <Section className='flex flex-col gap-stack'>
          <h2 className='type-section-title'>{c.whoToSend.label}</h2>
          <div className='grid gap-grid-1 md:grid-cols-3'>
            {c.whoToSend.cards.map(card => (
              <div
                key={card.title}
                className='relative flex flex-col gap-grid-half bg-bg-card p-grid-1'
              >
                <h3 className='type-card-title'>{card.title}</h3>
                <p className='text-base text-text-muted'>{card.body}</p>
              </div>
            ))}
          </div>
          <div className='grid gap-grid-1 pt-grid-1 md:grid-cols-12 md:gap-grid-2'>
            <div className='flex flex-col gap-eyebrow md:col-span-4'>
              <span className='bp-label font-mono'>
                {c.whoToSend.quotesLabel}
              </span>
              <h3 className='type-card-title text-balance'>
                {c.whoToSend.leadIn}
              </h3>
            </div>
            <ol className='flex flex-col border-b border-border md:col-span-8'>
              {c.whoToSend.quotes.map((quote, index) => (
                <li
                  key={quote}
                  className='grid grid-cols-[48px_minmax(0,1fr)] items-baseline gap-3 border-t border-border py-3.5'
                >
                  <span className='font-mono text-xs tracking-[0.2em] text-accent'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className='text-[17px] text-text'>&ldquo;{quote}&rdquo;</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* How it works */}
        <Section className='flex flex-col gap-stack'>
          <h2 className='type-section-title'>{c.howItWorks.label}</h2>
          <ol className='grid gap-grid-1 md:grid-cols-3'>
            {c.howItWorks.steps.map(step => (
              <li
                key={step.number}
                className='relative flex flex-col gap-grid-half bg-bg-card p-grid-1'
              >
                <span className='inline-flex h-6 w-6 items-center justify-center border border-accent-subtle font-mono text-xs text-accent'>
                  {step.number}
                </span>
                <h3 className='type-card-title'>{step.title}</h3>
                <p className='text-base text-text-muted'>{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* How we work */}
        <Section className='flex flex-col gap-stack'>
          <h2 className='type-section-title'>{c.howWeWork.label}</h2>
          <ul className='grid gap-grid-1 md:grid-cols-3'>
            {c.howWeWork.points.map(point => (
              <li
                key={point.title}
                className='relative flex flex-col gap-grid-half bg-bg-card p-grid-1'
              >
                <h3 className='type-card-title'>{point.title}</h3>
                <p className='text-base text-text-muted'>{point.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Audit callout */}
        <Section>
          <p
            id='referral-terms'
            className='scroll-mt-grid-4 text-center text-base text-text-muted'
          >
            <span className='font-mono text-accent' aria-hidden>
              *
            </span>{' '}
            {c.join.note}{' '}
            <TrackedLink
              href={c.join.href}
              location='referral-join-footnote'
              className='font-semibold text-accent underline decoration-accent-subtle underline-offset-4 transition-colors hover:text-accent/80'
            >
              {c.join.noteCta}
            </TrackedLink>
          </p>
        </Section>
      </div>
      <Section className='pt-band'>
        <div className='dots-band bg-bg-card p-callout'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-stack md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-intro'>
              <h2 className='type-section-title'>{c.audit.heading}</h2>
              <p className='max-w-md text-base text-text md:text-lg'>
                {c.audit.body}
              </p>
            </div>
            <Button asChild size='lg' className='w-full shrink-0 sm:w-auto'>
              <TrackedLink
                href={c.audit.href}
                location='referral-audit-callout'
              >
                {c.audit.buttonLabel}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
