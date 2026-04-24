export type NavLink = {
  label: string
  hash?: string
  path?: string
}

export const NAV_LINKS: NavLink[] = [
  { path: '/services', label: 'Services' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/how-it-works', label: 'How We Work' },
  { path: '/team', label: 'Team' },
  { path: '/faq', label: 'FAQ' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Book a Call' },
]

export const hashHref = (hash: string) => ({ pathname: '/', hash })

export const navLinkHref = (link: NavLink): { pathname: string; hash?: string } =>
  link.path ? { pathname: link.path } : { pathname: '/', hash: link.hash! }
