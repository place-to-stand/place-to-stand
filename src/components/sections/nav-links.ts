export const NAV_LINKS = [
  { href: '/platform' as const, label: 'Platform' },
  { href: '/process' as const, label: 'Process' },
  { href: '/clients' as const, label: 'Clients' },
  { href: '/about' as const, label: 'About' },
  { href: '/blog' as const, label: 'Blog' },
  { href: '/contact' as const, label: 'Contact' },
] as const

export type NavLink = (typeof NAV_LINKS)[number]

/** The footer's link columns. Every page appears once. */
export const FOOTER_GROUPS = [
  {
    label: 'Explore',
    links: NAV_LINKS.filter(link => link.href !== '/contact'),
  },
  {
    label: 'Get started',
    links: [
      { href: '/contact' as const, label: 'Book a call' },
      { href: '/audit' as const, label: 'Free audit' },
      { href: '/contact' as const, label: 'Contact' },
    ],
  },
  {
    label: 'Company',
    links: [{ href: '/referral' as const, label: 'Referral program' }],
  },
] as const

/** Where existing clients log in to see invoices, hours, and tasks. Kept out
 *  of NAV_LINKS: it's a utility link, not a marketing page. Points straight at
 *  the sign-in page because the portal root redirects there, and crawlers flag
 *  every page that links to a redirect. Render it with rel='nofollow'. */
export const CLIENT_PORTAL_URL =
  'https://clients.placetostandagency.com/sign-in'
