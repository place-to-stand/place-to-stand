'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'
import { Icon, Loader2 } from '@/src/components/primitives/icon'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-semibold uppercase tracking-wider transition overflow-hidden',
    // Pressed: down 1px, nothing else.
    'active:translate-y-px',
    // Disabled: one look for every variant. Muted text on the muted line, no
    // fill, no shadow, no hover; the cursor says why nothing happens.
    'disabled:cursor-not-allowed disabled:translate-y-0 disabled:border-border disabled:bg-transparent disabled:text-text-muted disabled:shadow-none disabled:before:hidden disabled:after:hidden',
  ],
  {
    variants: {
      variant: {
        primary:
          'btn-draw overflow-visible relative isolate bg-accent text-ink font-bold border-2 border-primary-edge shadow-cta shadow-accent/20 transition-colors duration-(--hover-dur) ease-(--hover-ease) hover:text-accent before:absolute before:inset-0 before:-z-10 before:bg-ink before:origin-left before:scale-x-0 before:transition-transform before:duration-(--hover-dur) before:ease-(--hover-ease) hover:before:scale-x-100',
        primaryInvert:
          'btn-draw overflow-visible relative isolate bg-accent text-ink font-bold border-2 border-primary-edge shadow-cta shadow-accent/10 transition-colors duration-(--hover-dur) ease-(--hover-ease) hover:text-accent before:absolute before:inset-0 before:-z-10 before:bg-ink before:origin-left before:scale-x-0 before:transition-transform before:duration-(--hover-dur) before:ease-(--hover-ease) hover:before:scale-x-100',
        secondary:
          'bg-bg-elevated text-text border border-border hover:bg-bg-card hover:border-border-light',
        ghost: 'bg-transparent text-text-muted hover:text-text',
        outline:
          'btn-draw btn-outline overflow-visible relative isolate bg-transparent border-2 border-button-edge text-text hover:text-accent-line focus-visible:text-accent-line',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Loading (Guidelines > Interaction states): the button turns disabled and
   * shows a 16px spinner with `loadingLabel` ("Sending…") in place of its
   * label, so it keeps its place and size class.
   */
  loading?: boolean
  loadingLabel?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingLabel,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <Icon icon={Loader2} className='mr-2 animate-spin' />
            {loadingLabel ?? children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
