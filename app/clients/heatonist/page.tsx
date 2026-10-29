import type { Metadata } from 'next'
import Image from 'next/image'
import { pageMetadata } from '@/src/lib/page-metadata'
import { TrackedLink } from '@/src/components/tracked-link'
import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { JsonLd } from '@/src/components/seo/json-ld'
import { heatonistCaseStudy as cs } from '@/src/lib/case-study-heatonist'
import { caseStudyJsonLd } from '@/src/lib/structured-data'

export const metadata: Metadata = pageMetadata({
  title: cs.title,
  description: cs.description,
  path: cs.path,
})

const SECTION = 'flex flex-col gap-grid-2 py-grid-3 md:py-grid-4'

const SECTION_HEADING =
  'font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text uppercase md:text-5xl'

/** An edge-to-edge photo between sections. */
function FullBleedImage({
  src,
  alt,
  priority = false,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <div className='relative aspect-[4/3] w-full overflow-hidden bg-bg-card md:aspect-[21/9]'>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes='100vw'
        className='object-cover'
      />
    </div>
  )
}

/** A section opener on a blueprint rule: eyebrow and heading on the left
 * third, the body copy across the rest. Stacks below lg. */
function SpecRow({
  label,
  title,
  children,
}: {
  label?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className='grid gap-grid-1 border-t border-border pt-grid-1 lg:grid-cols-12 lg:gap-x-grid-1'>
      <div className='flex flex-col gap-3 lg:col-span-4'>
        {label && <span className='bp-label font-mono'>{label}</span>}
        <h2 className={SECTION_HEADING}>{title}</h2>
      </div>
      {children && (
        <div className='flex flex-col gap-4 text-base text-text-muted md:text-lg lg:col-span-7 lg:col-start-6'>
          {children}
        </div>
      )}
    </div>
  )
}

/** A list of items, one per ruled line: title on the left, detail on the
 * right. Each title leads with a short accent dash so every row has a clear
 * start. Replaces the old two-up card grid. */
function SpecList({
  items,
}: {
  items: ReadonlyArray<{ title: string; body: string }>
}) {
  return (
    <ul className='flex flex-col'>
      {items.map(item => (
        <li
          key={item.title}
          className='grid gap-2 border-t border-border py-grid-1 lg:grid-cols-12 lg:gap-x-grid-1'
        >
          <h3 className='flex items-baseline gap-3 font-headline text-xl leading-tight font-bold tracking-tight text-text uppercase md:text-2xl lg:col-span-4'>
            <span
              aria-hidden
              className='h-0.5 w-3 shrink-0 -translate-y-[0.35em] bg-accent'
            />
            {item.title}
          </h3>
          <p className='text-base text-text-muted md:text-lg lg:col-span-7 lg:col-start-6'>
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  )
}

/** A storefront screenshot in the site's blueprint frame, linked to the
 * live store. */
function StorefrontShot({ src, host }: { src: string; host: string }) {
  return (
    <a
      href={`https://${host}`}
      target='_blank'
      rel='noreferrer noopener'
      aria-label={`Visit ${host} (opens in a new tab)`}
      className='group relative block border border-border bg-bg-card no-underline transition-colors hover:border-accent/30'
    >
      <BlueprintCorners size={16} all />
      <div className='relative aspect-[16/9] w-full overflow-hidden'>
        <Image
          src={src}
          alt={`The ${host} home page`}
          fill
          sizes='(min-width: 1440px) 1344px, 100vw'
          // Screenshots are mostly text, which blurs at the default 75.
          quality={90}
          className='object-cover object-top'
        />
      </div>
      <div className='border-t border-border p-4 font-mono text-sm tracking-wider text-text-muted uppercase'>
        {host} ↗
      </div>
    </a>
  )
}

export default function HeatonistCaseStudyPage() {
  const [introBefore, introAfter] = cs.intro.split(cs.introLink.text)

  return (
    <main className='flex-1 pt-10'>
      <JsonLd data={caseStudyJsonLd(cs)} />

      {/* Intro */}
      <AnimatedSection priority className='pb-grid-3! md:pb-grid-4!'>
        <div className='dots-hero flex flex-col gap-4'>
          <span className='bp-label font-mono'>Case Study · Heatonist</span>
          <h1 className='max-w-5xl font-headline text-5xl leading-[.9]! font-bold text-balance text-text uppercase md:text-8xl'>
            {cs.headline}
          </h1>
          <p className='max-w-2xl text-base text-balance text-text-muted md:text-lg'>
            {introBefore}
            <a
              href={cs.introLink.href}
              target='_blank'
              rel='noopener noreferrer'
              className='font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent/80'
            >
              {cs.introLink.text}
              <span className='sr-only'> (opens in a new tab)</span>
            </a>
            {introAfter}
          </p>
        </div>
      </AnimatedSection>

      <FullBleedImage
        src='/work-heatonist-photo.jpg'
        alt='Heatonist hot sauces'
        priority
      />

      {/* At a glance: three numbers, set as type rather than a box */}
      <AnimatedSection className='py-grid-3 md:py-grid-4'>
        <div className='flex flex-col gap-grid-1'>
          <span className='bp-label font-mono'>At a glance</span>
          {/* Columns wrap to a new row before a number would break: each needs
              22rem, enough for the widest value at text-8xl. */}
          <ul className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] gap-x-grid-1 gap-y-grid-2'>
            {cs.stats.map((stat, index) => (
              <li key={stat.value}>
                <Reveal index={index} className='flex flex-col gap-2'>
                  <span className='font-headline text-6xl leading-none font-bold tracking-tight whitespace-nowrap text-text md:text-8xl'>
                    {stat.value}
                  </span>
                  <span className='text-base text-text-muted md:text-lg'>
                    {stat.label}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* The problem and how we work together */}
      <AnimatedSection className={SECTION}>
        <SpecRow label='Before' title='The problem'>
          <p>{cs.problem}</p>
        </SpecRow>
        <SpecRow label='The model' title='How we work together'>
          <p>{cs.howWeWork}</p>
        </SpecRow>
      </AnimatedSection>

      {/* Ty's quote, framed with blueprint corners on the page background */}
      <AnimatedSection className='py-grid-2'>
        <figure className='relative flex flex-col gap-6 border border-border p-6 md:p-grid-3'>
          <BlueprintCorners size={16} />
          <blockquote className='font-headline text-3xl leading-tight font-semibold text-balance text-text md:text-6xl'>
            &ldquo;{cs.quote.text}&rdquo;
          </blockquote>
          <figcaption className='font-mono text-sm tracking-wider text-accent uppercase'>
            {cs.quote.name}, {cs.quote.company}
          </figcaption>
        </figure>
      </AnimatedSection>

      {/* The storefront, framed in the site's blueprint style */}
      <AnimatedSection className='py-grid-2'>
        <StorefrontShot
          src='/case-study-heatonist-home.jpg'
          host='heatonist.com'
        />
      </AnimatedSection>

      {/* What we did */}
      <AnimatedSection className={SECTION}>
        <div className='flex flex-col gap-grid-1'>
          <SpecRow label='Since April 2023' title='What we did' />
          <p className='text-lg text-text md:text-xl'>{cs.whatWeDidIntro}</p>
        </div>
        <SpecList items={cs.whatWeDid} />
      </AnimatedSection>

      {/* Beyond Shopify, in a framed panel */}
      <AnimatedSection className={SECTION}>
        <div className='flex flex-col gap-grid-1'>
          <SpecRow label='Custom builds' title='Beyond what Shopify offers' />
          <p className='text-lg text-text md:text-xl'>
            {cs.beyondShopifyIntro}
          </p>
        </div>
        <div className='relative border border-border bg-bg-card'>
          <BlueprintCorners size={16} all />
          <ul className='grid divide-y divide-border lg:grid-cols-4 lg:divide-x lg:divide-y-0'>
            {cs.beyondShopify.map(item => (
              <li key={item.title} className='flex flex-col gap-4 p-grid-1'>
                <h3 className='font-headline text-2xl leading-tight font-bold tracking-tight text-balance text-text uppercase'>
                  {item.title}
                </h3>
                <p className='text-base text-text-muted'>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* hotones.com */}
      <AnimatedSection className='flex flex-col gap-grid-3 py-grid-3 md:py-grid-4'>
        <SpecRow label='Launched May 15, 2025' title='hotones.com'>
          <p>{cs.hotOnes}</p>
        </SpecRow>
        <StorefrontShot src='/case-study-hotones-home.jpg' host='hotones.com' />
        <SpecRow label='Today' title='The result'>
          <p className='text-lg text-text md:text-2xl'>{cs.result}</p>
        </SpecRow>
      </AnimatedSection>

      {/* CTA Block, the closing callout shared with /clients */}
      {/* 192px above on desktop (this top padding plus the section above's
          bottom padding), 144px below. The gap below runs into the solid
          footer and reads larger, so it's set one step smaller to look even. */}
      <AnimatedSection className='pt-grid-1! pb-grid-3! md:pt-grid-4! md:pb-grid-6!'>
        <div className='dots-band bg-bg-card p-6 md:p-16'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <Reveal index={0} className='flex flex-col gap-2.25 md:gap-3'>
              <span className='bp-label font-mono'>Next Step</span>
              <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
                Want a tech team without the hire?
              </h2>
            </Reveal>
            <Reveal
              index={1}
              className='flex w-full shrink-0 flex-col gap-4 sm:w-auto'
            >
              <Button asChild size='lg' className='w-full'>
                <TrackedLink
                  href='/contact'
                  location='heatonist-case-study-cta'
                >
                  Book a call
                </TrackedLink>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='w-full border-2'
              >
                <TrackedLink
                  href='/clients'
                  location='heatonist-case-study-cta'
                >
                  See more clients
                </TrackedLink>
              </Button>
            </Reveal>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
