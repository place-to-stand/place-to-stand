import Link from 'next/link'
import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { TrackedLink } from '@/src/components/tracked-link'
import { vendors } from '@/src/lib/vendors'
import { vendorIcons } from '@/src/components/icons/vendor-icons'
import {
  PrototypeGraphic,
  RefineGraphic,
  ScaleGraphic,
  RnDGraphic,
} from '@/src/components/graphics/home-graphics'

const phases = [
  {
    title: 'Prototype',
    Graphic: PrototypeGraphic,
    points: [
      'Test new product ideas',
      'Prove product-market fit',
      'Iterate fast',
    ],
  },
  {
    title: 'Refine',
    Graphic: RefineGraphic,
    points: [
      'Streamline existing systems',
      'Automate the manual work',
      'Save time, cut friction',
    ],
  },
  {
    title: 'Scale',
    Graphic: ScaleGraphic,
    points: [
      'Re-architect your stack',
      'Rethink operations for demand',
      'Engineer for peak load',
    ],
  },
  {
    title: 'R&D',
    Graphic: RnDGraphic,
    points: [
      'Analyze your data',
      'Unlock new revenue vectors',
      'Surface your next prototype',
    ],
  },
]

/** One scrolling row of the trust banner. Vendors are duplicated so the loop is
 *  seamless; `reverse` flips the scroll direction. */
function TrustTrack({
  reverse = false,
  className,
}: {
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={`marquee ${className ?? ''}`}>
      <div className={`marquee-track ${reverse ? 'marquee-track-rev' : ''}`}>
        {[...vendors, ...vendors].map((vendor, i) => {
          const Icon = vendorIcons[vendor.name]
          return (
            <div
              key={`${vendor.name}-${i}`}
              className='flex shrink-0 items-center gap-2.5 px-6'
            >
              {Icon && (
                <Icon
                  className='h-7 w-7 shrink-0'
                  style={{ color: vendor.color }}
                  aria-hidden
                />
              )}
              <span className='font-mono text-[10px] tracking-wider whitespace-nowrap text-text-muted uppercase'>
                {vendor.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function PhasesSection({
  showHowWeWorkLink = true,
  showPoweredBy = false,
  showLabel = true,
  showAuditLink = false,
}: {
  showHowWeWorkLink?: boolean
  showPoweredBy?: boolean
  showLabel?: boolean
  /** Prompts the reader into the audit right under the phase cards. The audit's
   *  first output is the phase you are in, so this is where that question lands. */
  showAuditLink?: boolean
}) {
  return (
    <AnimatedSection className='py-20'>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <Reveal index={0} className='flex flex-col gap-2'>
            {showLabel && (
              <span className='bp-label font-mono'>How We Work</span>
            )}
            <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
              We meet you at your stage of business.
            </h2>
          </Reveal>
          <Reveal
            index={1}
            className='max-w-xl text-base leading-relaxed text-text-muted'
          >
            <p>
              Whether you are testing a first idea or re-architecting for scale,
              we plug in where you are and build from there.
            </p>
          </Reveal>
          {/* Mobile-only link: sits with the subtext, above the cards */}
          {showHowWeWorkLink && (
            <Reveal index={2} className='pt-2 md:hidden'>
              <Link
                href='/how-we-work'
                className='inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent uppercase transition-colors hover:text-accent/80'
              >
                See our full process
                <span aria-hidden>&rarr;</span>
              </Link>
            </Reveal>
          )}
        </div>

        {/* Phase grid: 4 cols, blueprint-style with corner marks */}
        <Reveal index={2} className='relative'>
          <BlueprintCorners size={16} />
          <div className='grid gap-px border border-border bg-border md:grid-cols-4'>
            {phases.map(phase => {
              const Graphic = phase.Graphic
              return (
                <div
                  key={phase.title}
                  className='relative flex flex-col gap-4 bg-bg-card p-5 md:p-8'
                >
                  {Graphic && (
                    <Graphic className='absolute top-4 right-4 h-grid-3 w-grid-3 md:top-6 md:right-6 md:h-grid-2 md:w-grid-2' />
                  )}
                  <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                    {phase.title}
                  </h3>
                  <ul className='flex flex-col gap-2 text-sm leading-relaxed text-text-muted'>
                    {phase.points.map(point => (
                      <li key={point} className='flex gap-2'>
                        <span
                          className='mt-2 h-1.5 w-1.5 shrink-0 bg-accent'
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Reveal>

        {showAuditLink && (
          <Reveal index={3}>
            {/* Each clause is an inline-block so a narrow viewport breaks the
                line between them instead of orphaning a word or two. */}
            <p className='text-base leading-relaxed text-balance text-text-muted'>
              <span className='inline-block'>
                Not sure which phase you are in?
              </span>{' '}
              <span className='inline-block'>
                <TrackedLink
                  href='/audit'
                  location='home-phases'
                  className='font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent/80'
                >
                  Find out in 2 minutes
                </TrackedLink>
                , free.
              </span>
            </p>
          </Reveal>
        )}

        {/* Under The Hood — the method behind every stage plus the tools that power
            it. Folds the how-we-work process into the intro, then the vendor logos. */}
        {showPoweredBy && (
          <Reveal index={3} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <h3 className='font-headline text-lg font-semibold tracking-tight text-text'>
                Under the hood
              </h3>
              <p className='max-w-2xl text-base leading-relaxed text-text-muted'>
                Whatever stage you are at, every build relies on a trusted stack
                of frontier AI models and cloud infrastructure, wired into our
                tooling and human-verified for production-grade quality.
              </p>
            </div>
            {/* Auto-scrolling trust banner: one row on desktop, two rows scrolling
                opposite directions on mobile. Full-bleed to the section edges. */}
            <div className='-mx-6 flex flex-col gap-4 lg:-mx-12'>
              <TrustTrack />
              <TrustTrack reverse className='md:hidden' />
            </div>
          </Reveal>
        )}

        {/* Desktop-only link: stays below the cards */}
        {showHowWeWorkLink && (
          <Reveal index={4} className='hidden md:block'>
            <Link
              href='/how-we-work'
              className='inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent uppercase transition-colors hover:text-accent/80'
            >
              See our full process
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        )}
      </div>
    </AnimatedSection>
  )
}
