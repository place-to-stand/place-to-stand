import Link from 'next/link'
import { NAV_LINKS } from '@/src/components/layout/nav-links'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='border-t border-border bg-bg-card text-text-muted'>
      <div className='mx-auto flex w-full max-w-content flex-col gap-grid-2 px-6 py-grid-2 md:flex-row md:items-start md:justify-between lg:px-12'>
        {/* Brand */}
        <div className='flex max-w-md flex-col gap-grid-half'>
          <div className='flex items-center gap-3'>
            {/* Blueprint logo mark — mirrors the header */}
            <span
              className='inline-flex h-6 w-6 items-center justify-center border border-accent/50'
              aria-hidden
            >
              <span className='h-2 w-2 bg-accent' />
            </span>
            <span className='font-headline text-xl font-bold tracking-tight text-text'>
              Place To Stand
            </span>
          </div>
          <p className='text-sm text-text-muted'>
            Austin, TX &middot; Brooklyn, NY
          </p>
          <p className='mt-grid-half text-sm leading-relaxed text-text-muted'>
            A software agency building custom tools, automation, and AI around
            how your business actually runs. No bloated SaaS stack &mdash; just
            software that fits.
          </p>
        </div>

        {/* Site nav — flush with the container edge, right-aligned so it lines
            up with the legal links below and the header CTA above */}
        <nav
          className='flex flex-col gap-grid-half md:items-end md:text-right'
          aria-label='Footer'
        >
          <span className='bp-label font-mono'>Explore</span>
          <ul className='flex flex-col gap-2 md:items-end'>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='font-mono text-[11px] tracking-[0.1em] text-text-muted uppercase transition-colors hover:text-accent'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-border'>
        <div className='mx-auto flex w-full max-w-content flex-col gap-grid-half px-6 py-grid-1 md:flex-row md:items-center md:justify-between lg:px-12'>
          <span className='text-xs tracking-[0.1em] text-text-muted uppercase'>
            &copy; {year} Place To Stand. All rights reserved.
          </span>
          <nav
            className='flex items-center gap-6 text-xs font-semibold tracking-[0.1em] uppercase'
            aria-label='Legal'
          >
            <Link
              href='/referral'
              className='text-text-muted transition-colors hover:text-accent'
            >
              Referral Program
            </Link>
            <Link
              href='/privacy'
              className='text-text-muted transition-colors hover:text-accent'
            >
              Privacy
            </Link>
            <Link
              href='/terms'
              className='text-text-muted transition-colors hover:text-accent'
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
