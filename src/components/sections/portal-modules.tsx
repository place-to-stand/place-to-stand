import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { PortalModulePiece } from '@/src/components/patterns/pieces/portal'
import { PORTAL_MODULES } from '@/src/lib/portal'

/**
 * Portal, "What's inside": the twelve modules, each with one lifted-out piece
 * of its screen and two lines under it. A dense grid (three across from
 * 1280px, where each piece still has room) keeps twelve pieces to a few
 * screens. Tone: light.
 */
export function PortalModulesSection() {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading label='Modules' title="What's inside." />
      </Reveal>
      <Reveal index={1}>
        <ul className='grid grid-cols-1 gap-x-grid-1 gap-y-grid-3 md:grid-cols-2 xl:grid-cols-3'>
          {PORTAL_MODULES.map(module => (
            <li key={module.id} className='flex min-w-0 flex-col gap-grid-1'>
              <PortalModulePiece id={module.id} />
              <div className='flex flex-col gap-grid-half'>
                <h3 className='type-card-title'>{module.title}</h3>
                <p className='text-base text-text-muted'>{module.body}</p>
                {module.insteadOf && (
                  <p className='type-fine'>Instead of: {module.insteadOf}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
PortalModulesSection.tone = 'light' as const
