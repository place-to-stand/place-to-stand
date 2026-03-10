'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { bookingLink } from '@/src/lib/landing-pages'

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
    <div className='fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <Button asChild size='lg' className='shadow-xl shadow-ink/30'>
        <a href={bookingLink} target='_blank' rel='noopener noreferrer'>
          Book a Call
        </a>
      </Button>
    </div>
  )
}
