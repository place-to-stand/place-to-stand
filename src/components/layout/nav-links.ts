export const NAV_LINKS = [
  { href: '/services' as const, label: 'Services' },
  { href: '/how-we-work' as const, label: 'How We Work' },
  { href: '/team' as const, label: 'Team' },
  // Temporarily unlinked — Field Notes content in progress, restore in a future update
  // { href: '/field-notes' as const, label: 'Field Notes' },
  { href: '/contact' as const, label: 'Contact' },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
