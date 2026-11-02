'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'
import { cn } from '@/src/lib/utils'
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
      <div className='mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-12'>
        {/* Logo */}
        <Link href='/' className='group flex items-center gap-3'>
          {/* Blueprint logo mark */}
          <span
            className='inline-flex h-6 w-6 items-center justify-center border border-accent-subtle'
            aria-hidden
          >
            <span className='h-2 w-2 bg-accent' />
          </span>
          <span className='font-headline text-xl font-bold tracking-tight text-text transition-colors group-hover:text-accent'>
            Place To Stand
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-1 lg:flex'>
          {NAV_LINKS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-1.5 font-mono text-xs tracking-[0.1em] whitespace-nowrap uppercase transition-colors duration-300',
                pathname === item.href
                  ? 'border border-accent-subtle text-accent'
                  : 'border border-transparent text-text-muted hover:text-text'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className='flex items-center gap-4'>
          <TrackedLink
            href={CLIENT_PORTAL_URL}
            rel='nofollow'
            location='header-portal'
            className='hidden font-mono text-xs tracking-[0.1em] text-text-muted uppercase transition-colors duration-300 hover:text-text lg:inline'
          >
            Client Login
          </TrackedLink>
          {/* Shown beside the menu toggle from ~416px up: logo + CTA + toggle
              need ~360px, so it fits large phones but not a 375px screen. */}
          <div className='hidden min-[26rem]:inline-flex'>
            <Button
              asChild
              size='sm'
              className='h-8 px-3 text-sm lg:h-9 lg:px-4'
            >
              <TrackedLink href='/audit' location='header'>
                Free Audit
              </TrackedLink>
            </Button>
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
                className='sheet-panel fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col border-l border-border bg-bg-card px-6 pt-4 pb-grid-1 focus:outline-none lg:hidden'
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
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'border-b border-border py-4 font-headline text-2xl font-semibold tracking-tight transition-colors hover:text-accent',
                        pathname === item.href ? 'text-accent' : 'text-text'
                      )}
                      onClick={navigateFromSheet}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className='mt-auto flex flex-col gap-4'>
                  <Button asChild size='lg' className='w-full'>
                    <TrackedLink
                      href='/audit'
                      location='header-mobile'
                      onClick={navigateFromSheet}
                    >
                      Free Audit
                    </TrackedLink>
                  </Button>
                  <TrackedLink
                    href={CLIENT_PORTAL_URL}
                    rel='nofollow'
                    location='header-mobile-portal'
                    className='text-center font-mono text-xs tracking-[0.1em] text-text-muted uppercase transition-colors hover:text-text'
                    onClick={() => setMobileOpen(false)}
                  >
                    Client Login
                  </TrackedLink>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}
