import type { ComponentProps, ReactNode } from 'react'
import { PageHeader, Section } from '@/src/components/patterns/section'
import { HeroSection } from '@/src/components/sections/hero-section'

type PageHeroProps = ComponentProps<typeof PageHeader> & {
  /** Layout of the hero section itself, e.g. 'pb-grid-2' or 'flex flex-col
   *  gap-header' when content follows the header. */
  sectionClassName?: string
  /** Anything that sits under the header inside the hero (Contact's cards). */
  children?: ReactNode
}

/**
 * The top of a page. Variants:
 * - home: the Home hero, its headline, drawing and intro choreography exactly
 *   as built in hero-section.tsx (the reference for motion on the site).
 * - page: an inner page's label, title and intro over the blueprint dots.
 * Tone: dark.
 */
export function Hero(
  props: { variant: 'home' } | ({ variant: 'page' } & PageHeroProps)
) {
  if (props.variant === 'home') return <HeroSection />
  // oxlint-disable-next-line ts-js/no-unused-vars -- variant is consumed above
  const { variant, sectionClassName, children, ...header } = props
  return (
    <Section priority className={sectionClassName}>
      <PageHeader {...header} />
      {children}
    </Section>
  )
}
Hero.tone = 'dark' as const
