'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AuditLink, BookCallButton } from '@/src/components/layout/cta'
import { TrackedLink } from '@/src/components/tracked-link'
import { cn } from '@/src/lib/utils'
import { LogoLockup } from '@/src/components/layout/logo-mark'
import { CLIENT_PORTAL_URL, NAV_LINKS } from '@/src/components/layout/nav-links'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  // Tapping a page in the mobile menu lets the sheet slide shut first, then
  // navigates. Navigating at once ran the page transition with the sheet still
  // open: the sheet and its dimmed overlay vanished in one frame, which read
  // as a flash.
  const navigateFromSheet = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const href = event.currentTarget.getAttribute('href')
    setMobileOpen(false)
    if (!href || href === pathname) return
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    window.setTimeout(
      () => router.push(href as Parameters<typeof router.push>[0]),
      reduced ? 0 : 250
    )
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-200',
        scrolled
          ? 'border-b border-border bg-bg/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className='mx-auto flex max-w-content items-center justify-between px-grid-1 py-grid-half lg:px-grid-2'>
        {/* Logo */}
        <LogoLockup href='/' />

        {/* Desktop nav: plain links. The underline slides in on hover and
            stays on the current page (.link-nav in globals.css). */}
        <nav className='hidden items-center gap-grid-1 lg:flex'>
          {NAV_LINKS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className='link-nav py-1.5 whitespace-nowrap'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className='flex items-center gap-grid-half'>
          <TrackedLink
            href={CLIENT_PORTAL_URL}
            rel='nofollow'
            location='header-portal'
            className='link-nav hidden py-1.5 whitespace-nowrap lg:inline'
          >
            Login
          </TrackedLink>
          {/* Shown beside the menu toggle from ~416px up: logo + CTA + toggle
              need ~360px, so it fits large phones but not a 375px screen. */}
          <div className='hidden min-[26rem]:inline-flex'>
            <BookCallButton
              location='header'
              size='sm'
              className='h-8 px-grid-half text-sm lg:h-9 lg:px-grid-half'
            />
          </div>

          {/* Mobile menu: a sheet that slides in from the right */}
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button type='button' className='lg:hidden'>
                <span className='sr-only'>Open navigation</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='h-7 w-7 text-text'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  aria-hidden
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 7h16M4 12h16M4 17h16'
                  />
                </svg>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className='sheet-overlay fixed inset-0 z-50 bg-bg/70 backdrop-blur-sm lg:hidden' />
              <Dialog.Content
                id='mobile-nav'
                className='sheet-panel fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col border-l border-border bg-bg-card px-grid-1 pt-grid-half pb-grid-1 focus:outline-none lg:hidden'
              >
                <div className='flex items-center justify-between'>
                  <Dialog.Title className='bp-label font-mono'>
                    Menu
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button type='button' className='-mr-1 p-1'>
                      <span className='sr-only'>Close navigation</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        className='h-7 w-7 text-text'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        aria-hidden
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className='sr-only'>
                  Site navigation
                </Dialog.Description>
                <nav className='mt-grid-2 flex flex-col'>
                  {NAV_LINKS.map(item => (
                    // eslint-disable-next-line design/link-role -- the phone menu lists pages in large type for touch
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'border-b border-border py-grid-half type-item-title transition-colors hover:text-accent',
                        pathname === item.href ? 'text-accent' : 'text-text'
                      )}
                      onClick={navigateFromSheet}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <TrackedLink
                    href={CLIENT_PORTAL_URL}
                    rel='nofollow'
                    location='header-mobile-portal'
                    className='link-nav self-start py-grid-half'
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </TrackedLink>
                </nav>
                <div className='mt-auto flex flex-col gap-grid-half'>
                  <BookCallButton
                    location='header-mobile'
                    className='w-full'
                    onClick={navigateFromSheet}
                  />
                  <AuditLink
                    location='header-mobile'
                    className='self-center'
                    onClick={navigateFromSheet}
                  />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}
