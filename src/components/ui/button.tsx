'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/src/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60 overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-bg font-bold shadow-md shadow-accent/20 border border-accent/40 transition-all duration-300 ease-in-out hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30',
        secondary:
          'bg-bg-elevated text-text border border-border hover:bg-bg-card hover:border-border-light focus-visible:ring-accent/40',
        ghost:
          'bg-transparent text-text-muted hover:text-text focus-visible:ring-accent/40',
        outline:
          'bg-transparent border border-border text-text transition-all duration-300 hover:border-accent hover:text-accent focus-visible:ring-accent/40',
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
