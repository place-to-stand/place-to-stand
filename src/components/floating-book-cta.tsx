'use client'

import { useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { BookCallLink } from '@/src/components/book-call-link'

// sessionStorage never notifies same-document writes, but the flag is only set
// on landing pages (where this CTA is hidden), so the re-render caused by the
// pathname change on navigation is enough to pick up a fresh snapshot.
const subscribe = () => () => {}
const getSnapshot = () => !!sessionStorage.getItem('pts-landing-session')
const getServerSnapshot = () => false

export function FloatingBookCta() {
  const pathname = usePathname()
  const hasLandingSession = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const isLandingPage = pathname.startsWith('/book-a-call/')

  if (isLandingPage || !hasLandingSession) return null

  return (
    <div className='fixed right-6 bottom-6 z-50 duration-500 animate-in fade-in slide-in-from-bottom-4'>
      <BookCallLink
        label='Book a Call'
        placement='floating'
        className='shadow-xl shadow-ink/30'
      />
    </div>
  )
}
