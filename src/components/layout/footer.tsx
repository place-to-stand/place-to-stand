import Link from 'next/link'
import { NAV_LINKS } from '@/src/components/layout/nav-links'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='border-t border-border bg-bg-card text-text-muted'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 md:flex-row md:items-start md:justify-between'>
        <div className='flex flex-col gap-3'>
          <span className='font-logo text-lg font-semibold uppercase tracking-[0.025em] text-text'>
            Place To Stand
          </span>
          <p className='max-w-md text-sm text-text-muted'>
            Austion, TX - Brooklyn, NY
          </p>
          <span className='mt-2 font-mono text-md tracking-widest text-border-light' aria-hidden>
            PTS &middot; placetostandagency.com
          </span>
        </div>
        <nav className='flex flex-col gap-3'>
          <span className='text-left text-sm font-semibold uppercase tracking-[0.1em] text-text'>
            Explore
          </span>
          <div className='flex flex-col gap-2 text-left'>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className='text-xs font-semibold tracking-[0.1em] text-text-muted transition hover:text-accent'
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-12 md:flex-row md:items-start md:justify-between'>
        <div className='flex flex-col gap-2 text-xs uppercase tracking-[0.1em] text-text-muted md:flex-row md:items-center md:gap-3'>
          <span className='order-last md:order-first'>
            &copy; {year} Place To Stand. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
