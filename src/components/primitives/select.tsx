import * as React from 'react'
import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'
import { Icon, ChevronDown } from '@/src/components/primitives/icon'

/**
 * A native select drawn like Input: the same height, fill and control line,
 * with a 16px chevron on the right. Pass the <option>s as children.
 */
const Select = React.forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className='relative'>
    <select
      ref={ref}
      className={cn(
        'flex h-12 w-full appearance-none border border-control bg-bg-card pr-grid-2 pl-grid-half text-base text-text transition disabled:cursor-not-allowed disabled:border-border disabled:text-text-muted',
        className
      )}
      {...props}
    >
      {children}
    </select>
    <Icon
      icon={ChevronDown}
      className='pointer-events-none absolute top-1/2 right-grid-half -translate-y-1/2 text-text-muted'
    />
  </div>
))
Select.displayName = 'Select'

export { Select }
