import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { TrackedLink } from '@/src/components/tracked-link'
import {
  CLIENT_PORTAL_URL,
  FOOTER_GROUPS,
} from '@/src/components/layout/nav-links'
import { SocialIcon } from '@/src/components/layout/social-icon'
import { LogoLockup } from '@/src/components/layout/logo-mark'
import { FooterSubscribe } from '@/src/components/layout/footer-subscribe'
import { FOUNDING_YEAR } from '@/src/lib/site'

// Cached rather than read per render so every page can stay static; a daily
// refresh rolls the copyright year over without needing a redeploy.
async function currentYear() {
  'use cache'
  cacheLife('days')
  return new Date().getFullYear()
}

const LINK = 'link-nav'
const FINE_LINK = 'link-nav'

const LEGAL = [
  { href: '/privacy' as const, label: 'Privacy' },
  { href: '/terms' as const, label: 'Terms' },
]
// The company's own public profiles (see SAME_AS in src/lib/site.ts).
const PROFILES = [
  {
    network: 'linkedin' as const,
    href: 'https://www.linkedin.com/company/placetostandagency/',
    name: 'LinkedIn',
  },
  {
    network: 'github' as const,
    href: 'https://github.com/place-to-stand',
    name: 'GitHub',
  },
  {
    network: 'clutch' as const,
    href: 'https://clutch.co/profile/place-stand-agency',
    name: 'Clutch',
  },
]

/**
 * Footer on the 12-column grid, every column left-aligned and built the same
 * way: a lime label, then links or a short form, with the same gaps. From
 * 1280px: brand (3 columns), three link columns (2 each) and the newsletter
 * (3). From 1024px: brand (6) and the link columns on one row, the
 * newsletter on a full row of its own with the button beside the input.
 * Tablets: two link columns per row, newsletter full width. Phones: one
 * column. A rule and one line of fine print close it.
 */
export async function Footer() {
  const year = await currentYear()
  return (
    <footer className='bg-bg-card text-text-muted'>
      <div className='mx-auto grid w-full max-w-content gap-x-grid-1 gap-y-stack px-grid-1 py-band sm:grid-cols-2 lg:grid-cols-12 lg:px-grid-2'>
        {/* Brand */}
        <div className='flex flex-col gap-grid-1 sm:col-span-2 lg:col-span-6 xl:col-span-3 xl:pr-grid-1'>
          <LogoLockup className='w-fit' />
          <p className='max-w-sm text-base text-text-muted'>
            Systems that run your business and stores that sell, for teams
            without engineers of their own.
          </p>
          <p className='type-fine'>Austin, TX &middot; Brooklyn, NY</p>
        </div>

        {/* Link columns */}
        {FOOTER_GROUPS.map(group => (
          <nav
            key={group.label}
            aria-label={group.label}
            className='flex flex-col gap-grid-1 lg:col-span-2'
          >
            <span className='bp-label font-mono'>{group.label}</span>
            <ul className='flex flex-col gap-grid-half'>
              {group.links.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {group.label === 'Company' && (
                <li>
                  <TrackedLink
                    href={CLIENT_PORTAL_URL}
                    rel='nofollow'
                    location='footer-portal'
                    className={LINK}
                  >
                    Login
                  </TrackedLink>
                </li>
              )}
            </ul>
          </nav>
        ))}

        {/* Newsletter */}
        <div className='sm:col-span-2 lg:col-span-12 xl:col-span-3'>
          <FooterSubscribe />
        </div>
      </div>

      {/* Fine print: copyright, legal and company profiles on one line */}
      <div className='border-t border-border'>
        <div className='mx-auto flex w-full max-w-content flex-col gap-grid-half px-grid-1 py-grid-1 md:flex-row md:items-baseline md:justify-between lg:px-grid-2'>
          <p className='type-fine'>
            &copy; {FOUNDING_YEAR}&ndash;{year} Place To Stand Agency LLC
          </p>
          <ul className='flex flex-wrap items-center gap-x-grid-1 gap-y-grid-half'>
            {LEGAL.map(link => (
              <li key={link.label}>
                <Link href={link.href} className={FINE_LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
            {PROFILES.map(profile => (
              <li key={profile.name} className='self-center'>
                <SocialIcon
                  network={profile.network}
                  href={profile.href}
                  label={`Place To Stand on ${profile.name}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
