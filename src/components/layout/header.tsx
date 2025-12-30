'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion, type Transition } from 'framer-motion'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import { NAV_LINKS, hashHref } from '@/src/components/layout/nav-links'

export function Header() {
  const shouldReduceMotion = useReducedMotion()
  const [pastHero, setPastHero] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const heroCtaElement = document.querySelector(
      '[data-pts-hero-cta]'
    ) as HTMLElement | null
    const heroElement = document.querySelector(
      '[data-pts-hero]'
    ) as HTMLElement | null

    let rafId = 0
    let ticking = false

    const switchOffsetPx = 160

    const update = () => {
      ticking = false

      if (!heroElement) {
        setPastHero(window.scrollY > 60)
        return
      }

      if (heroCtaElement) {
        const ctaBottom = heroCtaElement.getBoundingClientRect().bottom
        setPastHero(ctaBottom <= switchOffsetPx)
        return
      }

      const heroBottom = heroElement.getBoundingClientRect().bottom
      setPastHero(heroBottom <= switchOffsetPx)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = window.requestAnimationFrame(update)
    }

    rafId = window.requestAnimationFrame(update)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const layoutTransition = (
    shouldReduceMotion
      ? { duration: 0 }
      : { type: 'spring', stiffness: 100, damping: 20, mass: 0.2 }
  ) satisfies Transition

  const colorTransition = (
    shouldReduceMotion ? { duration: 0 } : { duration: 0.9, ease: 'easeOut' }
  ) satisfies Transition

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <motion.div
        layout
        transition={layoutTransition}
        className={cn('relative', pastHero ? 'px-3 pt-3' : 'px-0 pt-0')}
      >
        <motion.div
          layout
          transition={{
            layout: layoutTransition,
            backgroundColor: colorTransition,
            borderColor: colorTransition,
          }}
          className={cn(
            'border backdrop-blur-xl',
            pastHero
              ? 'mx-auto max-w-6xl border border-ink bg-white shadow-sm'
              : 'w-full border-transparent bg-transparent'
          )}
          animate={{
            borderRadius: pastHero ? 9999 : 0,
            backgroundColor: pastHero
              ? 'rgba(255, 255, 255, 0.75)'
              : 'rgba(255, 255, 255, 0)',
            borderColor: pastHero
              ? 'rgba(17, 24, 39, 1)'
              : 'rgba(17, 24, 39, 0)',
            y: pastHero ? 0 : 0,
          }}
        >
          <motion.div
            layout
            transition={layoutTransition}
            className={cn(
              'mx-auto flex max-w-6xl items-center justify-between px-6 py-3'
            )}
          >
            <Link href={hashHref('home')} className='flex items-center gap-3'>
              <span
                className={cn(
                  'font-logo text-2xl font-semibold uppercase tracking-[0.025em] transition-colors duration-700',
                  'text-ink'
                )}
              >
                Place To Stand
              </span>
            </Link>

            <nav className='hidden items-center gap-5 md:flex'>
              {NAV_LINKS.map(item => (
                <Link
                  key={item.hash}
                  href={hashHref(item.hash)}
                  className={cn(
                    'font-semibold uppercase tracking-[0.1em] transition-all duration-500',
                    'text-ink/70 border-transparent border-b-2 hover:text-ink hover:border-ink'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className='flex items-center gap-3'>
              <div className='relative hidden md:inline-flex'>
                <motion.div
                  transition={layoutTransition}
                  animate={{ opacity: pastHero ? 0 : 1 }}
                  className={cn(
                    pastHero ? 'pointer-events-none' : 'pointer-events-auto'
                  )}
                >
                  <Button
                    asChild
                    size='sm'
                    variant='outline'
                    className='border-ink/60 px-11'
                  >
                    <Link
                      href={hashHref('contact')}
                      aria-hidden={pastHero}
                      tabIndex={pastHero ? -1 : 0}
                    >
                      Start a Project
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  transition={layoutTransition}
                  animate={{ opacity: pastHero ? 1 : 0 }}
                  className={cn(
                    'absolute inset-0 flex items-center justify-center',
                    pastHero ? 'pointer-events-auto' : 'pointer-events-none'
                  )}
                >
                  <Button asChild size='sm' className='px-11'>
                    <Link
                      href={hashHref('contact')}
                      aria-hidden={!pastHero}
                      tabIndex={pastHero ? 0 : -1}
                    >
                      Start a Project
                    </Link>
                  </Button>
                </motion.div>
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
                  className='h-8 w-8 text-ink transition-colors duration-700'
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
          </motion.div>
        </motion.div>

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
                  key={item.hash}
                  href={hashHref(item.hash)}
                  className='rounded-full px-6 py-3 text-base font-semibold uppercase tracking-[0.2em] text-ink-light/80 transition hover:bg-white/10 hover:text-ink-light'
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
