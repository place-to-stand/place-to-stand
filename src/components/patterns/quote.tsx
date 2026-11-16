import type { ReactNode } from 'react'

/**
 * A client's words: a large opening quote mark in the accent line color
 * (lime on dark bands, ink on light), the quote in medium-weight body text,
 * then the credit: a mono name and an optional source link (for example
 * "Read on Google"). The text carries no quote marks of its own; the mark is
 * the only one (no closing mark, as in a pull quote). No box, bar or rule.
 * `rating` adds that many small solid stars beside the name, in the accent
 * line color too, read out once as "N out of 5 stars".
 */
export function Quote({
  text,
  name,
  source,
  rating,
}: {
  text: string
  name: string
  /** Stars out of five, e.g. from a review. */
  rating?: number
  /** Shown after the name, e.g. a link to the original review. */
  source?: ReactNode
}) {
  return (
    <figure className='flex flex-col gap-grid-half'>
      <span
        aria-hidden
        className='-mb-grid-half h-grid-1 type-section-title leading-none text-accent-line'
      >
        &ldquo;
      </span>
      <blockquote className='text-base font-medium text-text'>
        {text}
      </blockquote>
      <figcaption className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
        <span className='type-fine'>{name}</span>
        {rating !== undefined && (
          <span
            role='img'
            aria-label={`${rating} out of 5 stars`}
            className='flex gap-0.5 self-center text-accent-line'
          >
            {Array.from({ length: rating }, (_, i) => (
              <svg
                key={i}
                aria-hidden
                viewBox='0 0 10 10'
                className='size-2.5'
                fill='currentColor'
              >
                <path d='M5 0.4 6.35 3.4 9.6 3.75 7.15 5.95 7.85 9.15 5 7.5 2.15 9.15 2.85 5.95 0.4 3.75 3.65 3.4Z' />
              </svg>
            ))}
          </span>
        )}
        {source && (
          <>
            <span aria-hidden className='type-fine'>
              ·
            </span>
            {source}
          </>
        )}
      </figcaption>
    </figure>
  )
}
