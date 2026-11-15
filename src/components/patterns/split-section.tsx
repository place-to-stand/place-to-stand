import type { ReactNode } from 'react'
import { cn } from '@/src/lib/utils'
import { Section } from '@/src/components/patterns/section'

/**
 * The asymmetric split: a narrow column that holds the section's heading
 * still while a wide column of content scrolls past it. On the 12-column
 * grid, the aside takes columns 1-5 and the content columns 7-12, with
 * column 6 left empty as air (at 1440: 546px, a 138px gap, 636px, about 45
 * characters of type-voice per line). Below lg the two stack and nothing
 * sticks.
 *
 * Use it when a section is one statement plus a long run of content, not a
 * set of equal pieces (that's a grid of Cards).
 */
export function SplitSection({
  aside,
  children,
  className,
}: {
  /** Usually a SectionHeading; it sticks under the nav on laptops. */
  aside: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <Section
      className={cn(
        'grid gap-stack lg:grid-cols-12 lg:gap-x-grid-1',
        className
      )}
    >
      <div className='lg:col-span-5'>
        <div className='lg:sticky lg:top-[calc(var(--nav-height)+var(--spacing-grid-2))]'>
          {aside}
        </div>
      </div>
      <div className='lg:col-span-6 lg:col-start-7'>{children}</div>
    </Section>
  )
}
