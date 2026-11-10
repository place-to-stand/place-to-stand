import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { cn } from '@/src/lib/utils'
import { BlueprintCorners } from './dot-grid-background'

/**
 * The site's six box types. Each one owns its stroke, so a page never sets a
 * border itself (design/no-raw-border). The stroke rule:
 *
 * - Card: always a 1px border and the card fill. A link card changes only its
 *   fill on hover.
 * - Callout: the page's one ask (or a quote). No border; corner marks set it
 *   apart, with the dot band when it closes a page.
 * - Panel: holds a form or a tool. No border; its fill sets it apart.
 * - Ruled row: a 1px top rule, one color per tone (`rule`). The ownership
 *   block alone uses the accent rule.
 * - Side note: a 4px accent-line bar on the left (ink on light, lime on dark).
 * - Chip: a 1px border around a short tag.
 *
 * 2px strokes are only for selected and focus states.
 */

type BoxProps<T extends ElementType> = {
  as?: T
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export const CARD = 'border border-border bg-bg-card p-card'

export function Card<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: BoxProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag className={cn(CARD, className)} {...props}>
      {children}
    </Tag>
  )
}

/** A whole card that is one link. Hover changes the fill, not the stroke. */
export function LinkCard({
  href,
  className,
  children,
  ...props
}: {
  href: Route | `/${string}#${string}` | `#${string}`
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>) {
  return (
    <Link
      href={href as Route}
      className={cn(
        CARD,
        'group transition-colors hover:bg-bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

/** A number and what it counts: one style everywhere (Home, Clients). */
export function StatTile({
  value,
  label,
  className,
}: {
  value: ReactNode
  label: ReactNode
  className?: string
}) {
  return (
    <Card as='li' className={cn('flex flex-col gap-grid-1', className)}>
      <span className='type-stat text-accent'>{value}</span>
      <span className='text-base text-text-muted'>{label}</span>
    </Card>
  )
}

/**
 * The page's one ask, or a quote: no stroke, 20px corner marks. `band` adds
 * the dot band that runs from its rule to the footer (closing callouts).
 */
export function Callout<T extends ElementType = 'div'>({
  as,
  band = false,
  className,
  children,
  ...props
}: BoxProps<T> & { band?: boolean }) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'relative bg-bg-card p-callout',
        band && 'dots-band',
        className
      )}
      {...props}
    >
      <BlueprintCorners size={20} all colorClassName='border-accent' />
      {children}
    </Tag>
  )
}

/** Holds a form or a tool: fill only, no stroke. */
export function Panel<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: BoxProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag className={cn('relative bg-bg-panel p-card', className)} {...props}>
      {children}
    </Tag>
  )
}

/** One row in a ruled list: a 1px top rule in the tone's rule color. */
export function RuledRow<T extends ElementType = 'li'>({
  as,
  accent = false,
  className,
  children,
  ...props
}: BoxProps<T> & {
  /** The ownership block's signature rule. Nowhere else. */
  accent?: boolean
}) {
  const Tag = (as ?? 'li') as ElementType
  return (
    <Tag
      className={cn(
        'border-t',
        accent ? 'border-accent-subtle' : 'border-rule',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** A list of RuledRows closed off by a rule under the last row (and over
 * the first, with `top`, when its items don't draw their own rules). */
export function RuledList<T extends ElementType = 'ul'>({
  as,
  top = false,
  className,
  children,
  ...props
}: BoxProps<T> & { top?: boolean }) {
  const Tag = (as ?? 'ul') as ElementType
  return (
    <Tag
      className={cn(top ? 'border-y' : 'border-b', 'border-rule', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** A short aside set off by a thick accent-line bar on the left. */
export function SideNote<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: BoxProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn('border-l-4 border-accent-line pl-grid-1', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** A short tag: tools, clients, a score. */
export function Chip({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'border border-border px-2 py-1 text-sm text-text-muted',
        className
      )}
    >
      {children}
    </span>
  )
}
