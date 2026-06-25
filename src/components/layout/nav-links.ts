export const NAV_LINKS = [
  { href: '/services' as const, label: 'Services' },
  { href: '/case-studies' as const, label: 'Case Studies' },
  { href: '/field-notes' as const, label: 'Field Notes' },
  { href: '/team' as const, label: 'Team' },
  { href: '/how-we-work' as const, label: 'How We Work' },
  { href: '/contact' as const, label: 'Contact' },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
