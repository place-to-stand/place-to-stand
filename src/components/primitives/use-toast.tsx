'use client'

import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import type { ReactNode } from 'react'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
  type ToastVariant,
} from '@/src/components/primitives/toast'

const TOAST_LIMIT = 5

// One manager for the whole site, so `toast()` works from any callback,
// inside React or not. <Toaster /> in the root layout renders what it holds.
const toastManager = ToastPrimitive.createToastManager()

export type ToastData = {
  title?: ReactNode
  description?: ReactNode
  variant?: ToastVariant
}

export function toast({ title, description, variant }: ToastData) {
  const id = toastManager.add({
    title,
    description,
    type: variant ?? 'default',
  })
  return {
    id,
    dismiss: () => toastManager.close(id),
    update: (next: ToastData) =>
      toastManager.update(id, {
        title: next.title,
        description: next.description,
        type: next.variant ?? undefined,
      }),
  }
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()
  // Newest last, so a new toast lands under the ones already showing.
  return [...toasts].reverse().map(item => (
    <Toast
      key={item.id}
      toast={item}
      variant={item.type === 'destructive' ? 'destructive' : 'default'}
    >
      <div className='flex w-full flex-col gap-1'>
        {item.title ? <ToastTitle /> : null}
        {item.description ? <ToastDescription /> : null}
      </div>
      <ToastClose />
    </Toast>
  ))
}

export function Toaster() {
  return (
    <ToastPrimitive.Provider toastManager={toastManager} limit={TOAST_LIMIT}>
      <ToastPrimitive.Portal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  )
}
