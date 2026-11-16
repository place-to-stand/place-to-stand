import type { ReactNode } from 'react'

/**
 * A form error (Guidelines > Interaction states): one plain sentence right
 * under its field, in the danger color, announced as it appears (role=alert).
 */
export function FieldError({ children }: { children: ReactNode }) {
  return (
    <p role='alert' className='text-sm text-danger'>
      {children}
    </p>
  )
}
