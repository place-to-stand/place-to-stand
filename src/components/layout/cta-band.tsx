import { TrackedLink } from '@/src/components/tracked-link'
import { Button } from '@/src/components/ui/button'
import { AnimatedSection, Reveal } from './animated-section'
import { BlueprintCorners } from './dot-grid-background'

const DEFAULT_DESCRIPTION =
  'The free audit pinpoints the phase your business is in and where custom software pays off first. Two minutes, results on screen, no obligation.'

/**
 * The closing "Find where to start" callout: a card in a band of blueprint
 * dots that runs down to the footer. Put it last in <main>, right after a
 * block that ends with pb-edge. Its padding is the band role, so the dots'
 * top rule sits on its top edge: one edge gap under the content above.
 */
export function CtaBand({
  location,
  title = 'Find where to start.',
  description = DEFAULT_DESCRIPTION,
}: {
  /** Analytics location for the two links, e.g. 'home-cta-block'. */
  location: string
  title?: string
  description?: string
}) {
  return (
    <AnimatedSection className='py-band'>
      <div className='dots-band bg-bg-card p-callout'>
        <BlueprintCorners size={20} all colorClassName='border-accent' />
        <div className='flex flex-col gap-stack md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-intro'>
            <Reveal index={0} className='flex flex-col gap-eyebrow'>
              <span className='bp-label font-mono'>Next Step</span>
              <h2 className='type-section-title'>{title}</h2>
            </Reveal>
            <Reveal index={1} className='max-w-md text-base text-text-muted'>
              <p>{description}</p>
            </Reveal>
          </div>
          <Reveal
            index={2}
            className='flex w-full shrink-0 flex-col gap-grid-half sm:w-auto'
          >
            <Button asChild size='lg' className='w-full'>
              <TrackedLink href='/audit' location={location}>
                Start the free audit
              </TrackedLink>
            </Button>
            <div className='flex flex-col gap-grid-half'>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='w-full border-2'
              >
                <TrackedLink href='/contact' location={location}>
                  Contact Us
                </TrackedLink>
              </Button>
              <p className='max-w-xs text-sm text-text-muted'>
                Already know what you want built, or want a bespoke mapping of
                your systems? Talk to us directly.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </AnimatedSection>
  )
}
