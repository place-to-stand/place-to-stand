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

const screenshots = [
  {
    src: '/case-study-heatonist-home.jpg',
    alt: 'The heatonist.com home page',
    label: 'heatonist.com',
    href: 'https://heatonist.com',
  },
  {
    src: '/case-study-hotones-home.jpg',
    alt: 'The hotones.com home page',
    label: 'hotones.com',
    href: 'https://hotones.com',
  },
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='font-headline text-2xl font-bold tracking-tight text-text uppercase md:text-3xl'>
      {children}
    </h2>
  )
}

function ItemGrid({
  items,
}: {
  items: ReadonlyArray<{ title: string; body: string }>
}) {
  return (
    <div className='grid gap-px border border-border bg-border sm:grid-cols-2'>
      {items.map(item => (
        <div
          key={item.title}
          // An odd last item spans both columns so the grid has no empty cell.
          className='flex flex-col gap-3 bg-bg-card p-6 last:odd:sm:col-span-2'
        >
          <h3 className='font-headline text-base leading-tight font-bold tracking-tight text-text uppercase'>
            {item.title}
          </h3>
          <p className='text-base text-text-muted'>{item.body}</p>
        </div>
      ))}
    </div>
  )
}

export default function HeatonistCaseStudyPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      <JsonLd data={caseStudyJsonLd(cs)} />

      {/* Intro, at a glance, and the two storefronts */}
      <AnimatedSection
        priority
        className='flex flex-col gap-grid-2 md:gap-grid-3'
      >
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>Case Study · Heatonist</span>
          <h1 className='max-w-4xl font-headline text-4xl leading-[.9]! font-semibold text-balance text-text uppercase md:text-6xl'>
            {cs.headline}
          </h1>
          <p className='max-w-2xl text-base text-text-muted md:text-lg'>
            {cs.intro}
          </p>
        </div>

        <div className='relative border border-border bg-bg-card p-6 md:p-grid-2'>
          <BlueprintCorners size={16} />
          <div className='flex flex-col gap-6'>
            <span className='bp-label font-mono'>At a glance</span>
            <ul className='grid gap-x-grid-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-3'>
              {cs.stats.map(stat => (
                <li
                  key={stat}
                  className='border-l-2 border-accent pl-4 text-base text-text'
                >
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6'>
          {screenshots.map(shot => (
            <a
              key={shot.label}
              href={shot.href}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`Visit ${shot.label} (opens in a new tab)`}
              className='group relative border border-border bg-bg-card no-underline transition-colors hover:border-accent/30'
            >
              <BlueprintCorners />
              <div className='relative aspect-video w-full overflow-hidden'>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes='(min-width: 1248px) 540px, (min-width: 768px) 50vw, 100vw'
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                />
              </div>
              <div className='border-t border-border p-3 font-mono text-xs tracking-wider text-text-muted uppercase md:p-4'>
                {shot.label} ↗
              </div>
            </a>
          ))}
        </div>
      </AnimatedSection>

      {/* The problem and how we work together */}
      <AnimatedSection className='py-grid-2'>
        <div className='grid gap-grid-2 md:grid-cols-2'>
          <div className='flex flex-col gap-4'>
            <SectionHeading>The problem</SectionHeading>
            <p className='text-base text-text-muted'>{cs.problem}</p>
          </div>
          <div className='flex flex-col gap-4'>
            <SectionHeading>How we work together</SectionHeading>
            <p className='text-base text-text-muted'>{cs.howWeWork}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className='flex flex-col gap-6 py-grid-2'>
        <div className='flex flex-col gap-4'>
          <SectionHeading>What we did</SectionHeading>
          <p className='max-w-2xl text-base text-text-muted'>
            {cs.whatWeDidIntro}
          </p>
        </div>
        <ItemGrid items={cs.whatWeDid} />
      </AnimatedSection>

      <AnimatedSection className='flex flex-col gap-6 py-grid-2'>
        <div className='flex flex-col gap-4'>
          <SectionHeading>Beyond what Shopify offers</SectionHeading>
          <p className='max-w-2xl text-base text-text-muted'>
            {cs.beyondShopifyIntro}
          </p>
        </div>
        <ItemGrid items={cs.beyondShopify} />
      </AnimatedSection>

      {/* hotones.com, the result, and Ty's quote */}
      <AnimatedSection className='py-grid-2'>
        <div className='grid gap-grid-2 md:grid-cols-2'>
          <div className='flex flex-col gap-4'>
            <SectionHeading>hotones.com</SectionHeading>
            <p className='text-base text-text-muted'>{cs.hotOnes}</p>
          </div>
          <div className='flex flex-col gap-4'>
            <SectionHeading>The result</SectionHeading>
            <p className='text-base text-text-muted'>{cs.result}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className='py-grid-2'>
        <figure className='relative flex flex-col gap-6 border border-border bg-bg-card p-6 md:p-grid-2'>
          <BlueprintCorners size={16} />
          <blockquote className='font-headline text-2xl leading-tight font-semibold text-balance text-text md:text-4xl'>
            &ldquo;{cs.quote.text}&rdquo;
          </blockquote>
          <figcaption className='font-mono text-xs tracking-wider text-text-muted uppercase'>
            {cs.quote.name}, {cs.quote.company}
          </figcaption>
        </figure>
      </AnimatedSection>

      {/* CTA Block */}
      <AnimatedSection>
        <div className='relative border border-border bg-bg-card p-6 md:p-16'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <Reveal index={0} className='flex flex-col gap-3'>
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
