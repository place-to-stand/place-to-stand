import type { Metadata } from 'next'
import Image from 'next/image'
import { pageMetadata } from '@/src/lib/page-metadata'
import { Reveal } from '@/src/components/layout/animated-section'
import { PageHeader, Section } from '@/src/components/layout/section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { FullBleedVideo } from '@/src/components/layout/full-bleed-video'
import { CtaBand } from '@/src/components/layout/cta-band'
import { JsonLd } from '@/src/components/seo/json-ld'
import { heatonistCaseStudy as cs } from '@/src/lib/case-study-heatonist'
import { caseStudyJsonLd } from '@/src/lib/structured-data'

export const metadata: Metadata = pageMetadata({
  title: cs.title,
  description: cs.description,
  path: cs.path,
})

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
      <div className='flex flex-col items-start gap-eyebrow lg:col-span-4'>
        {label && <span className='bp-label font-mono'>{label}</span>}
        <h2 className='type-section-title text-balance'>{title}</h2>
      </div>
      {children && (
        <div className='flex flex-col gap-grid-1 type-intro lg:col-span-7 lg:col-start-6'>
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
          className='grid gap-grid-half border-t border-border py-grid-1 lg:grid-cols-12 lg:gap-x-grid-1'
        >
          <h3 className='flex items-baseline gap-grid-half type-card-title lg:col-span-4'>
            <span
              aria-hidden
              className='h-0.5 w-3 shrink-0 -translate-y-[0.35em] bg-accent-line'
            />
            {item.title}
          </h3>
          <p className='type-intro lg:col-span-7 lg:col-start-6'>{item.body}</p>
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
      <div className='border-t border-border p-grid-1 type-fine'>{host} ↗</div>
    </a>
  )
}

export default function HeatonistCaseStudyPage() {
  const [introBefore, introAfter] = cs.intro.split(cs.introLink.text)

  return (
    <main className='flex-1 pt-page-start'>
      <JsonLd data={caseStudyJsonLd(cs)} />

      {/* The page owns every gap: the section role between all blocks,
          full-bleed media included. */}
      <div className='flex flex-col gap-section pb-section'>
        <Section priority>
          <PageHeader
            label='Case Study · Heatonist'
            title={cs.headline}
            intro={
              <>
                {introBefore}
                <a
                  href={cs.introLink.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link-inline font-semibold'
                >
                  {cs.introLink.text}
                  <span className='sr-only'> (opens in a new tab)</span>
                </a>
                {introAfter}
              </>
            }
          />
        </Section>

        <FullBleedImage
          src='/work-heatonist-photo.jpg'
          alt='Heatonist hot sauces'
          priority
        />

        {/* At a glance: three numbers, set as type rather than a box */}
        <Section className='flex flex-col items-start gap-label'>
          <span className='bp-label font-mono'>At a glance</span>
          <ul className='grid w-full gap-x-grid-1 gap-y-grid-2 md:grid-cols-3'>
            {cs.stats.map((stat, index) => (
              <li key={stat.value}>
                <Reveal index={index} className='flex flex-col gap-grid-half'>
                  <span className='type-stat text-text'>{stat.value}</span>
                  <span className='type-intro'>{stat.label}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>

        {/* The problem and how we work together */}
        <Section className='flex flex-col gap-stack'>
          <SpecRow label='Before' title='The problem'>
            <p>{cs.problem}</p>
          </SpecRow>
          <SpecRow label='The model' title='How we work together'>
            <p>{cs.howWeWork}</p>
          </SpecRow>
        </Section>

        {/* Ty's quote, then the storefront */}
        <Section className='flex flex-col gap-stack'>
          <figure className='relative flex flex-col gap-grid-1 border border-border p-callout'>
            <BlueprintCorners size={16} />
            <blockquote className='type-quote text-balance'>
              &ldquo;{cs.quote.text}&rdquo;
            </blockquote>
            <figcaption className='bp-label font-mono'>
              {cs.quote.name}, {cs.quote.company}
            </figcaption>
          </figure>
          <StorefrontShot
            src='/case-study-heatonist-home.jpg'
            host='heatonist.com'
          />
        </Section>

        {/* What we did */}
        <Section className='flex flex-col gap-stack'>
          <div className='flex flex-col gap-intro'>
            <SpecRow label='Since April 2023' title='What we did' />
            <p className='type-intro'>{cs.whatWeDidIntro}</p>
          </div>
          <SpecList items={cs.whatWeDid} />
        </Section>

        {/* Beyond Shopify, in a framed panel */}
        <Section className='flex flex-col gap-stack'>
          <div className='flex flex-col gap-intro'>
            <SpecRow label='Custom builds' title='Beyond what Shopify offers' />
            <p className='type-intro'>{cs.beyondShopifyIntro}</p>
          </div>
          <div className='relative border border-border bg-bg-card'>
            <BlueprintCorners size={16} all />
            <ul className='grid divide-y divide-border lg:grid-cols-4 lg:divide-x lg:divide-y-0'>
              {cs.beyondShopify.map(item => (
                <li
                  key={item.title}
                  className='flex flex-col gap-grid-half p-card'
                >
                  <h3 className='type-card-title text-balance'>{item.title}</h3>
                  <p className='text-base text-text-muted'>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* hotones.com */}
        <FullBleedVideo
          src='/case-study-hotones-banner.mp4'
          poster='/case-study-hotones-banner.jpg'
          label='Hot Ones hot sauces'
        />
        <Section className='flex flex-col gap-stack'>
          <SpecRow label='Launched May 15, 2025' title='hotones.com'>
            <p>{cs.hotOnes}</p>
          </SpecRow>
          <StorefrontShot
            src='/case-study-hotones-home.jpg'
            host='hotones.com'
          />
          <SpecRow label='Today' title='The result'>
            <p>{cs.result}</p>
          </SpecRow>
        </Section>
      </div>

      <CtaBand
        location='heatonist-case-study-cta'
        title='Want a tech team without the hire?'
      />
    </main>
  )
}
