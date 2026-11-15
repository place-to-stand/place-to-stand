import { Card } from '@/src/components/boxes'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { cn } from '@/src/lib/utils'

/**
 * The home hero's proof link (approved Nov 14): a slim card under the audit
 * line, a small crop of the real Hot Ones lineup on the left and one action
 * line on the right. It rests as a card (1px edge) and, on hover or focus,
 * draws the buttons' 2px stroke around itself (btn-draw btn-draw-thin) while
 * the arrow nudges right. It fits its content, left-aligned under the
 * button; on phones it takes the text column's width.
 */
export function CaseStudyCard({
  location,
  className,
}: {
  location: string
  className?: string
}) {
  return (
    <Card
      as={TrackedLink}
      href='/clients/heatonist'
      location={location}
      className={cn(
        'group btn-draw btn-draw-thin flex items-center gap-grid-half p-grid-half pr-grid-1',
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a 5KB static crop */}
      <img
        src='/work/hotones-lineup-thumb.webp'
        alt=''
        width={192}
        height={144}
        decoding='async'
        className='h-12 w-16 shrink-0 object-cover'
      />
      <span className='text-left font-mono text-xs font-medium tracking-[0.1em] text-text uppercase'>
        See what we built for Hot Ones and{' '}
        <span className='whitespace-nowrap'>
          Heatonist{' '}
          <span
            aria-hidden
            className='inline-block transition-transform duration-(--link-dur) ease-(--hover-ease) group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px] motion-reduce:transition-none'
          >
            &rarr;
          </span>
        </span>
      </span>
    </Card>
  )
}
