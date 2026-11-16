import { Reveal } from '@/src/components/primitives/animated-section'
import { Section } from '@/src/components/patterns/section'
import { PORTAL_BUILD } from '@/src/lib/portal'

/**
 * Portal, "How we build with it": the short version. Process keeps the
 * scroll animation; here it is the title and one paragraph, side by side on
 * laptops. Tone: light.
 */
export function PortalBuildSection() {
  return (
    <Section className='grid gap-intro lg:grid-cols-2 lg:gap-grid-4'>
      <Reveal index={0} className='flex flex-col items-start gap-eyebrow'>
        <span className='bp-label font-mono'>{PORTAL_BUILD.label}</span>
        <h2 className='type-section-title text-balance'>
          {PORTAL_BUILD.title}
        </h2>
      </Reveal>
      <Reveal index={1} className='lg:pt-grid-3'>
        <p className='max-w-2xl type-lead'>{PORTAL_BUILD.body}</p>
      </Reveal>
    </Section>
  )
}
PortalBuildSection.tone = 'light' as const
