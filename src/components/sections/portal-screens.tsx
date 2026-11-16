import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { PortalScreenPiece } from '@/src/components/patterns/pieces/portal'
import { PortalCarousel } from '@/src/components/sections/portal-carousel'
import { PORTAL_SCREENS } from '@/src/lib/portal'

/**
 * Portal, "See it whole": five full screens in a carousel, built from the
 * same parts as the module pieces, so the pieces read as one app. Tone: dark.
 */
export function PortalScreensSection() {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label={PORTAL_SCREENS.label}
          title={PORTAL_SCREENS.title}
          intro={PORTAL_SCREENS.body}
        />
      </Reveal>
      <Reveal index={1}>
        <PortalCarousel
          label='Portal screens'
          captions={PORTAL_SCREENS.captions}
          slides={PORTAL_SCREENS.captions.map((caption, index) => (
            <PortalScreenPiece key={caption} index={index} />
          ))}
        />
      </Reveal>
    </Section>
  )
}
PortalScreensSection.tone = 'dark' as const
