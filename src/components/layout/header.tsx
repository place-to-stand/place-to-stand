'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import { NAV_LINKS } from '@/src/components/layout/nav-links'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-bg/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className='mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-12'>
        {/* Logo */}
        <Link href='/' className='group flex items-center gap-3'>
          {/* Blueprint logo mark */}
          <span className='inline-flex h-6 w-6 items-center justify-center border border-accent/50' aria-hidden>
            <span className='h-2 w-2 bg-accent' />
          </span>
          <span className='font-headline text-xl font-bold tracking-tight text-text transition-colors group-hover:text-accent'>
            Place To Stand
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-1 md:flex'>
          {NAV_LINKS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-300',
                pathname === item.href
                  ? 'border border-accent/30 text-accent'
                  : 'border border-transparent text-text-muted hover:text-text'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className='flex items-center gap-4'>
          <div className='hidden md:inline-flex'>
            <Button asChild size='sm'>
              <Link href='/contact'>Start a Project</Link>
            </Button>
          </div>

          <button
            type='button'
            className='md:hidden'
            onClick={() => setMobileOpen(open => !open)}
            aria-controls='mobile-nav'
            aria-expanded={mobileOpen}
          >
            <span className='sr-only'>Toggle navigation</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='h-7 w-7 text-text'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              {mobileOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 7h16M4 12h16M4 17h16'
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          'absolute left-0 right-0 top-full transition-all duration-300 md:hidden',
          mobileOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        )}
      >
        <div className='mx-4 mt-2'>
          <nav
            id='mobile-nav'
            className='flex flex-col border border-border bg-bg-card/95 p-4 backdrop-blur-lg md:hidden'
          >
            {NAV_LINKS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'border-b border-border/50 px-4 py-3 text-sm tracking-[0.08em] transition-colors last:border-0 hover:text-accent',
                  pathname === item.href ? 'text-accent' : 'text-text-muted'
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className='mt-3 px-4'>
              <Button asChild size='sm' className='w-full'>
                <Link href='/contact' onClick={() => setMobileOpen(false)}>
                  Start a Project
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
