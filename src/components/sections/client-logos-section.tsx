import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { clients } from '@/src/lib/clients'

/**
 * Homepage proof bar — the client roster, directly under the hero.
 *
 * Deliberately mute. "Who we work with" is argued one section down, by persona,
 * and a logo row that also makes a case competes with it: the roster skews
 * consumer brand, the personas target mid-market teams without engineers. So
 * this carries a label and nothing else. It registers as "real clients" in
 * passing and hands the argument off.
 *
 * Each cell is a fixed-height row that the mark is fitted into with
 * object-contain, so wide wordmarks and square marks share a baseline instead
 * of a bounding box. Height alone would leave a 1:1 mark towering over an 8:1
 * wordmark, so `logoScale` (see src/lib/clients.ts) knocks the heavy marks back
 * to match optical weight.
 */
export function ClientLogosSection() {
  return (
    // Hugs the hero, then clears properly before the persona section, so the
    // bar reads as attached to the hero rather than as a section of its own.
    <AnimatedSection className='pt-grid-2 pb-grid-4'>
      <div className='flex flex-col gap-grid-1'>
        <Reveal index={0}>
          <span className='bp-label font-mono'>Trusted by</span>
        </Reveal>

        {/* 2 and 5 both divide the 10 clients evenly; a 3- or 4-up step would
            strand a lone logo on the last row.

            Mobile splits the gap axes: at 2-up the 10 logos take 5 rows, and a
            48px row gap as tall as the rows themselves made the bar eat a whole
            phone screen. Columns keep the 48px separation, rows halve to 24px. */}
        <Reveal
          index={1}
          className='grid grid-cols-2 gap-x-grid-2 gap-y-grid-1 md:grid-cols-5 md:gap-grid-2'
        >
          {clients.map(client => (
            <a
              key={client.title}
              href={client.href}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`Visit ${client.title} (opens in a new tab)`}
              className='flex h-grid-2 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/30 md:h-grid-3'
            >
              {/* Plain <img>: these are static, already-optimised local assets,
                  and next/image would need dangerouslyAllowSVG for the four
                  vector marks. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={`${client.title} logo`}
                loading='lazy'
                decoding='async'
                style={{ maxHeight: `${(client.logoScale ?? 1) * 100}%` }}
                className='w-auto max-w-full object-contain'
              />
            </a>
          ))}
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
