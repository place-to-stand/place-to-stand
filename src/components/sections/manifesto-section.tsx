import Link from 'next/link'
import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import {
  DraftingGraphic,
  AiNativeGraphic,
  DirectAccessGraphic,
} from '@/src/components/graphics/home-graphics'
import { facets as facetCopy } from '@/src/lib/site-copy'

// One graphic per facet, in the order of `facetCopy`.
const facetGraphics = [DraftingGraphic, AiNativeGraphic, DirectAccessGraphic]
const facets = facetCopy.map((facet, i) => ({
  ...facet,
  Graphic: facetGraphics[i],
}))

export function ManifestoSection() {
  return (
    <AnimatedSection className='py-20'>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <Reveal index={0} className='flex flex-col gap-2'>
            <span className='bp-label font-mono'>Who We Are</span>
            <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-balance text-text md:text-4xl'>
              Experienced engineers with fine-tuned AI.
            </h2>
          </Reveal>
          <Reveal index={1} className='max-w-xl text-sm text-text-muted'>
            <p>
              Building exactly what you need, directly with the people who build
              it.
            </p>
          </Reveal>
          {/* Mobile-only link: sits with the subtext, above the cards */}
          <Reveal index={2} className='pt-2 md:hidden'>
            <Link
              href='/team'
              className='inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent uppercase transition-colors hover:text-accent/80'
            >
              Meet the Team
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>

        {/* Facet cards — blueprint grid */}
        <Reveal index={2} className='relative'>
          <BlueprintCorners size={16} />
          <div className='grid gap-px border border-border bg-border md:grid-cols-3'>
            {facets.map(facet => (
              <div
                key={facet.title}
                className='relative flex flex-col gap-4 bg-bg-card p-5 md:p-8'
              >
                <div className='flex items-center justify-between gap-4'>
                  <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                    {facet.title}
                  </h3>
                  <facet.Graphic className='h-grid-2 w-grid-2 shrink-0' />
                </div>
                <p className='text-sm leading-relaxed text-text-muted'>
                  {facet.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Desktop-only link: stays below the cards */}
        <Reveal index={3} className='hidden md:block'>
          <Link
            href='/team'
            className='inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent uppercase transition-colors hover:text-accent/80'
          >
            Meet the Team
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
