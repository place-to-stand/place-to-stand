export const NAV_LINKS = [
  { href: '/services' as const, label: 'Services' },
  { href: '/clients' as const, label: 'Clients' },
  { href: '/how-we-work' as const, label: 'How We Work' },
  { href: '/team' as const, label: 'Team' },
  { href: '/field-notes' as const, label: 'Field Notes' },
  { href: '/contact' as const, label: 'Contact' },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
