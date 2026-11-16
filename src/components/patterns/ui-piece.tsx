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
 * `screenshot`: the piece is a capture of the real screen (a client's store,
 * the portal in dark mode). It keeps its own colors, so it sits straight on
 * the stage with a quiet edge, no light surface around it.
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
  /** Home's Hot Ones lineup: 800/846 of the frame, so it matches the
   *  Heatonist crop's scale beside it. */
  lineup: 'max-w-[94.6%]',
} as const

export function UiPiece({
  alt,
  caption,
  width = 'md',
  compact = false,
  screenshot = false,
  tight = false,
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
  /** A real screen capture, not HTML: no light surface around it. */
  screenshot?: boolean
  /** Less padding on the stage, so a screenshot fills most of it (Home's
   *  proof pair). */
  tight?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <figure className={cn('flex min-w-0 flex-col gap-grid-half', className)}>
      <div
        role='img'
        aria-label={alt}
        className={cn(
          'relative flex flex-1 items-center justify-center bg-bg-card',
          tight
            ? 'p-grid-1'
            : cn(
                'px-card py-grid-2 md:px-grid-2',
                compact ? 'md:py-grid-2' : 'md:py-grid-3'
              )
        )}
      >
        <BlueprintCorners size={20} all />
        <div
          aria-hidden
          className={cn('relative w-full min-w-0', WIDTH[width])}
        >
          <div className='absolute inset-0 translate-x-grid-half translate-y-grid-half border border-dashed border-line' />
          <div
            className={cn(
              'relative border',
              screenshot
                ? 'overflow-hidden border-border [&_img]:block [&_img]:h-auto [&_img]:w-full'
                : 'theme-light border-border-light'
            )}
          >
            {children}
          </div>
        </div>
      </div>
      {caption && <figcaption className='type-fine'>{caption}</figcaption>}
    </figure>
  )
}
