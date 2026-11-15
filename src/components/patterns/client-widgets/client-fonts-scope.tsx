'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CLIENT_FONTS } from './client-fonts'

/**
 * Applies the clients' fonts to its children only once they come near the
 * screen (600px ahead), so a page that opens above them never downloads
 * them: the panel sits below the fold and the fonts aren't needed until it
 * scrolls in.
 */
export function ClientFontsScope({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setNear(true)
      },
      { rootMargin: '600px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`${className ?? ''} ${near ? CLIENT_FONTS : ''}`}>
      {children}
    </div>
  )
}
