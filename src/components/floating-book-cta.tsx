'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { BookCallLink } from '@/src/components/book-call-link'

export function FloatingBookCta() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  const isLandingPage = pathname.startsWith('/book-a-call/')

  useEffect(() => {
    if (isLandingPage) {
      setVisible(false)
      return
    }

    const hasLandingSession = sessionStorage.getItem('pts-landing-session')
    setVisible(!!hasLandingSession)
  }, [isLandingPage])

  if (!visible) return null

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
