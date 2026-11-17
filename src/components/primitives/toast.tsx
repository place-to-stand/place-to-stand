'use client'

import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/src/lib/utils'
import { Icon, X } from '@/src/components/primitives/icon'

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-start gap-grid-half overflow-hidden border border-border bg-bg-card p-grid-1 shadow-lg transition-opacity data-ending-style:opacity-0 data-limited:hidden data-starting-style:opacity-0',
  {
    variants: {
      variant: {
        default: 'text-text',
        destructive: 'border-red-500/30 bg-red-950 text-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type ToastVariant = VariantProps<typeof toastVariants>['variant']

type Part<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  'className'
> & { className?: string }

function ToastViewport({
  className,
  ...props
}: Part<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      className={cn(
        'fixed top-0 right-0 z-(--z-toast) flex max-h-screen w-full flex-col gap-grid-half p-grid-half sm:top-grid-half sm:right-grid-half sm:w-[380px]',
        className
      )}
      {...props}
    />
  )
}

function Toast({
  className,
  variant,
  ...props
}: Part<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>) {
  return (
    <ToastPrimitive.Root
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
}

function ToastTitle({
  className,
  ...props
}: Part<typeof ToastPrimitive.Title>) {
  return (
    // A div, not Base UI's default h2: the site trims headings and
    // paragraphs to their cap height, which would squeeze the toast.
    <ToastPrimitive.Title
      render={<div />}
      className={cn('text-base font-semibold', className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: Part<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      render={<div />}
      className={cn('text-base text-text-muted', className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  ...props
}: Part<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      aria-label='Dismiss'
      className={cn(
        'absolute top-grid-half right-grid-half p-2 text-text-muted transition hover:text-text',
        className
      )}
      {...props}
    >
      <Icon icon={X} />
    </ToastPrimitive.Close>
  )
}

export {
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  toastVariants,
}
