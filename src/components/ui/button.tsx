'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 overflow-hidden',
  {
    variants: {
      variant: {
      primary:
          'relative isolate bg-ink text-white shadow-md shadow-primary/40 border border-ink/40 transition-all duration-400 ease-in-out hover:border-ink/90 hover:shadow-lg hover:text-white before:absolute before:inset-0 before:-z-10 before:bg-gradientPrimary before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        secondary:
          'bg-ink/80 text-ink-light hover:bg-ink/100 focus-visible:ring-ink hover:text-ink-light',
        ghost:
          'bg-transparent text-ink/70 hover:text-ink/100 focus-visible:ring-ink/40',
        outline:
          'relative isolate bg-transparent border border-ink/30 text-ink/80 focus-visible:ring-ink/40 transition-all duration-300 hover:border-ink/90 hover:text-white before:absolute before:inset-0 before:-z-10 before:bg-gradientPrimary before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
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
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
