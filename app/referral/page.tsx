import type { Metadata } from 'next'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'
import { referralContent as c } from '@/src/lib/referral-content'

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  openGraph: {
    title: `${c.meta.title} | Place To Stand`,
    description: c.meta.description,
  },
  twitter: {
    title: `${c.meta.title} | Place To Stand`,
    description: c.meta.description,
  },
}

export default function ReferralPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      {/* Hero */}
      <AnimatedSection priority className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>{c.hero.label}</span>
          <h1 className='max-w-4xl font-headline text-4xl leading-[0.92] font-bold tracking-tight text-balance text-text md:text-6xl'>
            {c.hero.headline}
          </h1>
          <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
            {c.hero.body}
          </p>
        </div>
        <div>
          {/*
            A plain anchor rather than next/link: the target is a route handler
            that streams a file, so client-side navigation (and prefetching)
            would generate the PDF once for the router and again for the
            browser's fallback hard navigation.
          */}
          <Button asChild size='lg' className='w-full sm:w-auto'>
            <a href='/referral/pdf' download>
              {c.hero.downloadLabel}
            </a>
          </Button>
        </div>
      </AnimatedSection>

      {/* Who we are */}
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>{c.whoWeAre.label}</span>
          <h2 className='max-w-3xl font-headline text-3xl leading-[0.95] font-bold tracking-tight text-balance text-text md:text-4xl'>
            {c.whoWeAre.headline}
          </h2>
          <p className='max-w-2xl text-base leading-relaxed text-text-muted'>
            {c.whoWeAre.body}
          </p>
        </div>
        <div className='relative'>
          <BlueprintCorners size={16} />
          <ul className='grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5'>
            {c.whoWeAre.services.map(service => (
              <li
                key={service.name}
                className='flex flex-col gap-2 bg-bg-card p-5 md:p-6'
              >
                <span className='font-headline text-sm font-bold tracking-tight text-accent uppercase'>
                  {service.name}
                </span>
                <p className='text-sm leading-relaxed text-text-muted'>
                  {service.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Who to send us */}
      <AnimatedSection className='flex flex-col gap-12'>
        <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
          {c.whoToSend.label}
        </h2>
        <div className='grid gap-6 md:grid-cols-3'>
          {c.whoToSend.cards.map(card => (
            <div
              key={card.number}
              className='relative flex flex-col gap-4 border border-border bg-bg-card p-5 md:p-8'
            >
              <BlueprintCorners size={12} />
              <span className='inline-flex h-6 w-6 items-center justify-center border border-accent/40 font-mono text-[10px] text-accent'>
                {card.number}
              </span>
              <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                {card.title}
              </h3>
              <p className='text-sm leading-relaxed text-text-muted'>
                {card.body}
              </p>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-6'>
          <p className='text-base leading-relaxed text-text'>
            {c.whoToSend.leadIn}
          </p>
          <ul className='grid gap-x-10 gap-y-4 md:grid-cols-2'>
            {c.whoToSend.quotes.map(quote => (
              <li
                key={quote}
                className='flex items-start gap-3 border-l border-accent/40 pl-4 text-sm leading-relaxed text-text-muted'
              >
                <span className='font-headline text-accent' aria-hidden>
                  &ldquo;
                </span>
                <span>{quote}&rdquo;</span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* How it works */}
      <AnimatedSection className='flex flex-col gap-12'>
        <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
          {c.howItWorks.label}
        </h2>
        <div className='relative'>
          <BlueprintCorners size={16} />
          <ol className='grid gap-px border border-border bg-border md:grid-cols-3'>
            {c.howItWorks.steps.map(step => (
              <li
                key={step.number}
                className='flex flex-col gap-4 bg-bg-card p-5 md:p-8'
              >
                <span className='font-mono text-[10px] tracking-[0.2em] text-accent'>
                  {step.number}
                </span>
                <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                  {step.title}
                </h3>
                <p className='text-sm leading-relaxed text-text-muted'>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection>

      {/* How we work */}
      <AnimatedSection className='flex flex-col gap-12'>
        <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
          {c.howWeWork.label}
        </h2>
        <ul className='grid gap-6 md:grid-cols-3'>
          {c.howWeWork.points.map(point => (
            <li key={point.title} className='flex flex-col gap-2'>
              <h3 className='font-headline text-lg font-semibold tracking-tight text-text'>
                {point.title}
              </h3>
              <p className='text-sm leading-relaxed text-text-muted'>
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      {/* Audit callout */}
      <AnimatedSection>
        <div className='relative border border-border bg-bg-card p-6 md:p-16'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-3'>
              <p className='max-w-md text-base leading-relaxed text-text md:text-lg'>
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
      </AnimatedSection>
    </main>
  )
}
