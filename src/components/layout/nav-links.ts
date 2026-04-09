export type NavLink = {
  label: string
  hash?: string
  path?: string
}

export const NAV_LINKS: NavLink[] = [
  { path: '/case-studies', label: 'Case Studies' },
  { hash: 'how-it-works', label: 'How It Works' },
  { hash: 'contact', label: 'Contact' },
]

export const hashHref = (hash: string) => ({ pathname: '/', hash })

export const navLinkHref = (link: NavLink): { pathname: string; hash?: string } =>
  link.path ? { pathname: link.path } : { pathname: '/', hash: link.hash! }
