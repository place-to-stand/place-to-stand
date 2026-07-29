import * as React from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

/**
 * Native checkbox styled as a blueprint tick box. Uses `appearance-none` plus
 * a CSS-drawn check so it inherits the site's border and accent tokens rather
 * than the platform default, while staying a real input for forms and a11y.
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type='checkbox'
        ref={ref}
        className={cn(
          'relative mt-0.5 h-5 w-5 shrink-0 appearance-none border border-border bg-bg-card transition-colors',
          'checked:border-accent checked:bg-accent',
          'focus-visible:ring-1 focus-visible:ring-accent/40 focus-visible:outline-hidden',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Check mark: a rotated L drawn with borders, shown only when checked.
          "after:absolute after:top-[2px] after:left-[6px] after:hidden after:h-[10px] after:w-[5px] after:rotate-45 after:border-r-2 after:border-b-2 after:border-ink after:content-['']",
          'checked:after:block',
          className
        )}
        {...props}
      />
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
