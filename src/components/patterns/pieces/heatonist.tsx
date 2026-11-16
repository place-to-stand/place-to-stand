import { UiPiece } from '@/src/components/patterns/ui-piece'
import { cn } from '@/src/lib/utils'

/**
 * Three pieces of the Heatonist and Hot Ones stores, lifted out for UiPiece
 * (the case study, Clients, /design): a product card, the Hot Ones lineup and
 * a strip of the change log. No cart: Heatonist's cart is a third-party app
 * (Rebuy), not our work. Facts come from the approved case study
 * (src/lib/case-study-heatonist.ts); no prices, order counts or traffic.
 *
 * Bottles are drawn as line work, the site's drawing language, not photos.
 */

type PieceProps = { className?: string; compact?: boolean }

/** A hot sauce bottle in line work. `level` fills the label in steps. */
function Bottle({
  className,
  accent = false,
}: {
  className?: string
  accent?: boolean
}) {
  return (
    <svg
      viewBox='0 0 40 120'
      fill='none'
      className={cn('text-line', className)}
      strokeWidth='var(--stroke-structure)'
      stroke='currentColor'
      strokeLinecap='round'
    >
      <rect x='15' y='2' width='10' height='12' />
      <path d='M16 14 V34 Q16 40 8 46 V114 H32 V46 Q24 40 24 34 V14' />
      <rect
        x='11'
        y='62'
        width='18'
        height='36'
        className={accent ? 'fill-accent stroke-text' : undefined}
        strokeWidth={accent ? 'var(--stroke-emphasis)' : undefined}
      />
    </svg>
  )
}

/** A row of heat pips, `of` long with `level` filled. */
function Heat({ level, of = 10 }: { level: number; of?: number }) {
  return (
    <span className='flex gap-1'>
      {Array.from({ length: of }, (_, i) => (
        <span
          key={i}
          className={cn(
            'size-2 border border-text',
            i < level ? 'bg-text' : 'bg-transparent'
          )}
        />
      ))}
    </span>
  )
}

export function ProductCardPiece({ className, compact }: PieceProps) {
  return (
    <UiPiece
      alt='A product card from the Heatonist store: a hot sauce bottle, its name, heat level 10 of 10 and an Add to cart button.'
      caption='Product card · heatonist.com'
      width='sm'
      compact={compact}
      className={className}
    >
      <div className='flex flex-col'>
        <div className='flex justify-center border-b border-border bg-bg-card py-grid-1'>
          <Bottle accent className='h-36 w-auto' />
        </div>
        <div className='flex flex-col gap-grid-half p-grid-1'>
          <span className='type-fine'>Hot Ones</span>
          <span className='type-card-title'>The Last Dab: Apollo</span>
          <span className='flex items-center justify-between gap-grid-half'>
            <span className='type-fine'>Heat 10 / 10</span>
            <Heat level={10} />
          </span>
          <span className='mt-grid-half bg-accent py-grid-half text-center font-mono text-xs tracking-[0.1em] text-text uppercase'>
            Add to cart
          </span>
        </div>
      </div>
    </UiPiece>
  )
}

export function LineupPiece({ className, compact }: PieceProps) {
  return (
    <UiPiece
      alt='The Hot Ones lineup on hotones.com: ten sauces in a row, numbered 1 to 10 by heat.'
      caption='The lineup · hotones.com'
      width='lg'
      compact={compact}
      className={className}
    >
      <div className='flex flex-col gap-grid-half p-grid-1'>
        <span className='flex items-baseline justify-between gap-grid-half'>
          <span className='type-card-title'>The lineup</span>
          <span className='type-fine'>Season 31</span>
        </span>
        <ol className='grid grid-cols-10 items-end gap-1 border-t border-border pt-grid-half'>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i} className='flex flex-col items-center gap-1'>
              <Bottle accent={i === 9} className='h-16 w-auto sm:h-20' />
              <span className='font-mono text-xs text-text-muted'>{i + 1}</span>
            </li>
          ))}
        </ol>
      </div>
    </UiPiece>
  )
}

/** Real kinds of change from the case study, in the order we shipped them. */
const CHANGES = [
  { tag: 'Search', text: 'Filters on every collection and search page' },
  { tag: 'Checkout', text: 'Heat Week purchase limits' },
  { tag: 'Routing', text: 'Wholesale orders to their own warehouse' },
  { tag: 'Promo', text: 'Banner, hero and prices, no developer needed' },
]

export function ChangeLogPiece({ className, compact }: PieceProps) {
  return (
    <UiPiece
      alt='A strip of the Heatonist change log: search filters, Heat Week limits, order routing and promotions, part of more than 1,400 changes.'
      caption='Change log · 1,400+ changes since April 2023'
      width='lg'
      compact={compact}
      className={className}
    >
      <ul className='flex flex-col'>
        {CHANGES.map((change, index) => (
          <li
            key={change.text}
            className='flex items-start gap-grid-half border-b border-border px-grid-1 py-grid-half last:border-b-0'
          >
            <span
              className={cn(
                'size-2 shrink-0',
                index === 0 ? 'border border-text bg-accent' : 'bg-line'
              )}
            />
            <span className='w-20 shrink-0 font-mono text-xs text-text-muted uppercase'>
              {change.tag}
            </span>
            <span className='min-w-0 flex-1 text-sm'>{change.text}</span>
          </li>
        ))}
      </ul>
    </UiPiece>
  )
}
