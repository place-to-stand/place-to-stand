'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { NAV_LINKS, navLinkHref } from '@/src/components/layout/nav-links'

const navLinks = NAV_LINKS.filter(l => l.label !== 'Book a Call')
const ctaLink = NAV_LINKS.find(l => l.label === 'Book a Call')!

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <header className='fixed inset-x-0 top-0 z-50 w-full bg-[#111827]'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 pb-5 pt-7'>
        <button
          type='button'
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
              router.push('/')
            }
          }}
          className='flex items-center gap-3'
        >
          <span className='font-logo font-semibold uppercase tracking-[0.025em] text-white md:text-base lg:text-xl'>
            Place To Stand
          </span>
        </button>

        <nav className='hidden items-center gap-4 md:flex md:text-[10px] lg:gap-7 lg:text-xs'>
          {navLinks.map(item => {
            const isActive = item.path ? pathname === item.path : false
            return (
              <Link
                key={item.label}
                href={navLinkHref(item)}
                className={cn(
                  'border-b-2 pb-0.5 font-semibold uppercase tracking-[0.1em] transition-all duration-300',
                  isActive
                    ? 'border-white text-white'
                    : 'border-transparent text-white/70 hover:border-white hover:text-white'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='flex items-center gap-3'>
          <Link
            href={navLinkHref(ctaLink)}
            className='group hidden items-center bg-white text-xs uppercase tracking-[0.1em] text-ink md:inline-flex lg:text-sm'
          >
            <span className='px-3 py-1.5 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
              Book a Call
            </span>
            <span className='flex items-center justify-center self-stretch bg-[#94e0e4] px-3'>
              <ArrowRight className='size-4 text-ink transition-transform delay-75 duration-200 group-hover:translate-x-1' />
            </span>
          </Link>

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
              className='h-8 w-8 text-white'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 7h16M4 12h16M4 17h16'
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          'absolute left-0 right-0 top-full transition duration-300 md:hidden',
          mobileOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0'
        )}
      >
        <div className='mx-auto max-w-6xl px-4'>
          <nav
            id='mobile-nav'
            className='flex w-full flex-col gap-2 rounded-[28px] border border-ink-light/10 bg-ink/85 p-6 text-center text-ink-light shadow-xl backdrop-blur transition md:hidden'
          >
            {NAV_LINKS.map(item => (
              <Link
                key={item.label}
                href={navLinkHref(item)}
                className='rounded-full px-6 py-3 text-base font-semibold uppercase tracking-[0.2em] text-ink-light/80 transition hover:bg-white/10 hover:text-ink-light'
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
