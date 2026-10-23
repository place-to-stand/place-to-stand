import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { ClientLogoWall } from './client-logo-wall'

/**
 * Homepage proof bar — the client roster, directly under the hero.
 *
 * Deliberately mute. "Who we work with" is argued one section down, by persona,
 * and a logo row that also makes a case competes with it: the roster skews
 * consumer brand, the personas target mid-market teams without engineers. So
 * this carries a label and nothing else. It registers as "real clients" in
 * passing and hands the argument off.
 *
 * The grid shows ten cells and swaps in the rest of the roster one at a time
 * (see client-logo-wall.tsx). Each cell is a fixed-height row that the mark is fitted into with
 * object-contain, so wide wordmarks and square marks share a baseline instead
 * of a bounding box. Height alone would leave a 1:1 mark towering over an 8:1
 * wordmark, so `logoScale` (see src/lib/clients.ts) knocks the heavy marks back
 * to match optical weight. Marks render as white silhouettes (or grey, per
 * `logoTone`) so client brand colors don't fight the site's muted palette.
 */
export function ClientLogosSection() {
  return (
    // Top and bottom padding differ on purpose: the logos sit centred in
    // their rows, so the bottom row's ink ends well above the grid's edge.
    // These values make the gap from the hero drawing and the gap down to
    // the persona section look the same.
    <AnimatedSection className='pt-grid-4 pb-grid-4'>
      <div className='flex flex-col gap-9'>
        <Reveal index={0}>
          <span className='bp-label font-mono'>Trusted by</span>
        </Reveal>

        <Reveal index={1}>
          <ClientLogoWall />
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
