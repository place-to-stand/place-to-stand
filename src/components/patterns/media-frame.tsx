import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/src/lib/utils'

/**
 * The one frame for photos, screenshots and video (Guidelines > Imagery).
 * Four shapes only:
 * - work: 16:10, client work and screenshots.
 * - person: 1:1, people (small).
 * - portrait: 4:5, people shown large (Home's founders).
 * - wide: 21:9, full-width moments.
 * `wideFrom` switches a frame to 21:9 from a breakpoint up (a full-width
 * moment that would be a sliver on a phone stays 16:10 there).
 *
 * The frame crops its media from the center (object-cover); pass
 * className='[&_img]:object-top' to keep the top of a screenshot. Media keep
 * their natural color: no filters.
 */
const SHAPE = {
  work: 'aspect-[16/10]',
  person: 'aspect-square',
  portrait: 'aspect-[4/5]',
  wide: 'aspect-[21/9]',
} as const
const WIDE_FROM = {
  md: 'md:aspect-[21/9]',
  lg: 'lg:aspect-[21/9]',
} as const

export type MediaShape = keyof typeof SHAPE

type Props<T extends ElementType> = {
  as?: T
  shape: MediaShape
  wideFrom?: keyof typeof WIDE_FROM
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function MediaFrame<T extends ElementType = 'div'>({
  as,
  shape,
  wideFrom,
  className,
  children,
  ...props
}: Props<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'relative overflow-hidden bg-bg-card',
        SHAPE[shape],
        wideFrom && WIDE_FROM[wideFrom],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
