import type { ReactNode } from 'react'
import { BlueprintCorners } from '@/src/components/boxes/corners'
import { cn } from '@/src/lib/utils'

/**
 * One piece of real UI, lifted out of a screen, enlarged and layered on the
 * blueprint (Guidelines > Imagery, approved Nov 13): the picture style for
 * client work and the portal, in place of full-page screenshots.
 *
 * The stage is the card fill with the corner marks. On it the piece sits on a
 * light "screen" (the app's own colors, so it reads as someone's software, not
 * ours), over a dashed outline offset half a cell down and right: the layer
 * it was lifted from. A mono caption under the stage names what it is.
 *
 * Pieces are drawings for the eye. The stage is one image to assistive tech,
 * described by `alt`; the parts inside are hidden from it and hold no links,
 * buttons or headings.
 */
const WIDTH = {
  sm: 'max-w-xs',
  md: 'max-w-sm',
  lg: 'max-w-md',
  full: 'max-w-none',
} as const

export function UiPiece({
  alt,
  caption,
  width = 'md',
  compact = false,
  className,
  children,
}: {
  /** What the piece shows, for screen readers. */
  alt: string
  /** The mono line under the stage, e.g. "Product card · heatonist.com". */
  caption?: ReactNode
  /** The piece's widest size on the stage. */
  width?: keyof typeof WIDTH
  /** A shallower stage, where several pieces share a section (Home). */
  compact?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <figure className={cn('flex min-w-0 flex-col gap-grid-half', className)}>
      <div
        role='img'
        aria-label={alt}
        className={cn(
          'relative flex items-center justify-center bg-bg-card px-card py-grid-2 md:px-grid-2',
          compact ? 'md:py-grid-2' : 'md:py-grid-3'
        )}
      >
        <BlueprintCorners size={20} all />
        <div
          aria-hidden
          className={cn('relative w-full min-w-0', WIDTH[width])}
        >
          <div className='absolute inset-0 translate-x-grid-half translate-y-grid-half border border-dashed border-line' />
          <div className='theme-light relative border border-border-light'>
            {children}
          </div>
        </div>
      </div>
      {caption && <figcaption className='type-fine'>{caption}</figcaption>}
    </figure>
  )
}
