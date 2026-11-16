import type { ElementType, ReactNode } from 'react'
import { cn } from '@/src/lib/utils'

/**
 * A blueprint-style annotation over a group: a short mono caps label in the
 * text color, then a 1px hairline in the structure line color running from
 * the label's end to the group's right edge, centered on the text. It names
 * a group inside a section (for example the quotes in Home's "Who you work
 * with"); it is not a section label (that's the lime `bp-label`).
 */
export function RuledLabel({
  as: Tag = 'h3',
  children,
  className,
}: {
  as?: ElementType
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-grid-half', className)}>
      <Tag className='shrink-0 type-fine text-text'>{children}</Tag>
      <span aria-hidden className='h-px flex-1 bg-border' />
    </div>
  )
}
