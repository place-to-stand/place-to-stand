import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { StatTile } from '@/src/components/boxes'
import { clients, type Client } from '@/src/lib/clients'
import { heatonistCaseStudy } from '@/src/lib/case-study-heatonist'

const ROW_LINK_CLASS =
  'link-action mt-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-subtle'

/**
 * Proof from the Heatonist case study. Variants:
 * - tiles: the three numbers and a link to the case study (Home).
 * - featured: both storefronts, the case study's intro, the numbers and the
 *   link (top of Clients). The page supplies the section around it.
 * Tone: dark.
 */
export function ResultsSection({
  variant = 'tiles',
}: {
  variant?: 'tiles' | 'featured'
}) {
  return variant === 'featured' ? <FeaturedCaseStudy /> : <ResultsTiles />
}
ResultsSection.tone = 'dark' as const

function ResultsTiles() {
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
            <StatTile
              key={stat.value}
              value={stat.value}
              label={stat.label}
              className='h-full'
            />
          ))}
        </ul>
      </Reveal>
      <Reveal index={2}>
        <ArrowLink href={cs.path as Route}>
          Read the Heatonist case study
        </ArrowLink>
      </Reveal>
    </Section>
  )
}

/**
 * Hot Ones and Heatonist, the clients with a case study, as one featured
 * block at the top of /clients: both storefronts side by side, the case
 * study's own intro and three numbers, and the link to read it. Copy comes
 * from the approved case study (src/lib/case-study-heatonist.ts).
 */
function FeaturedCaseStudy() {
  const cs = heatonistCaseStudy
  const brands = clients.filter(
    (client): client is Client & { image: string } =>
      Boolean(client.caseStudy && client.image)
  )
  return (
    <div className='flex flex-col gap-stack'>
      <SectionHeading
        label='Case Study · Hot Ones & Heatonist'
        title={cs.headline}
        intro={cs.intro}
      />
      <div className='group grid gap-grid-1 md:grid-cols-2'>
        {brands.map((brand, index) => (
          <div key={brand.title} className='flex flex-col gap-grid-half'>
            <Link
              href={cs.path as Route}
              tabIndex={-1}
              aria-hidden
              className='relative block aspect-[16/10] overflow-hidden bg-bg-card'
            >
              <Image
                src={brand.image}
                alt=''
                fill
                loading={index === 0 ? 'eager' : undefined}
                sizes='(min-width: 1440px) 660px, (min-width: 768px) 50vw, 100vw'
                className='object-cover transition-transform duration-700 group-hover:scale-[1.02]'
              />
            </Link>
            <p className='text-base text-text-muted'>
              <span className='text-text'>{brand.title}.</span> {brand.built}
            </p>
          </div>
        ))}
      </div>
      <ul className='grid gap-grid-1 md:grid-cols-3'>
        {cs.stats.map(stat => (
          <StatTile key={stat.value} value={stat.value} label={stat.label} />
        ))}
      </ul>
      <Link href={cs.path as Route} className={ROW_LINK_CLASS}>
        Read the case study <span aria-hidden>→</span>
      </Link>
    </div>
  )
}
