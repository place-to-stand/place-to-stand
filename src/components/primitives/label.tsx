import * as React from 'react'
import { cn } from '@/src/lib/utils'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-semibold tracking-wide text-text-muted uppercase',
      className
    )}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
