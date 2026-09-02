export type Client = {
  title: string
  href: string
  image: string
  description: string
  /** Brand logo on a transparent ground, for the homepage logo grid. Brands
   * that only publish a dark-on-light mark use their reversed lockup so they
   * read against the dark theme. */
  logo: string
  /** Fraction of the logo row height this mark may occupy. Wordmarks fill the
   * row; square or heavy marks are knocked back so every logo carries the same
   * optical weight rather than the same pixel height. Defaults to 1. */
  logoScale?: number
}

export const clients: Client[] = [
  {
    title: 'Hot Ones',
    href: 'https://hotones.com',
    image: '/work-hot-ones.png',
    logo: '/logos/hot-ones.png',
    logoScale: 0.7,
    description:
      'The official online sauce shop for the hit interview show "Hot Ones."',
  },
  {
    title: 'Blake Brown Beauty',
    href: 'https://blakebrownbeauty.com',
    image: '/work-blake-brown-beauty.png',
    logo: '/logos/blake-brown-beauty.svg',
    description:
      'A direct-to-consumer brand focused on healthy, high-performance haircare founded by Blake Lively.',
  },
  {
    title: 'GreenWATT USA',
    href: 'https://www.gtbsolarexchange.com',
    image: '/work-greenwatt-usa.png',
    logo: '/logos/greenwatt-usa.png',
    logoScale: 0.7,
    description:
      'A marketplace connecting community solar providers with enrollment-ready small commercial customers.',
  },
  {
    title: 'Jeremy Turner',
    href: 'https://jeremyturnerstudio.com',
    image: '/work-jeremy-turner.png',
    logo: '/logos/jeremy-turner.png',
    logoScale: 0.5,
    description:
      'A composer, conductor, and multi-instrumentalist creating innovative music for the moving image and the stage.',
  },
  {
    title: 'Heatonist',
    href: 'https://heatonist.com',
    image: '/work-heatonist.png',
    logo: '/logos/heatonist.svg',
    description:
      "A curated marketplace for the world's best small-batch hot sauces.",
  },
  {
    title: 'Florence by Mills Beauty',
    href: 'https://florencebymillsbeauty.com',
    image: '/work-florence-by-mills-beauty.png',
    logo: '/logos/florence-by-mills-beauty.png',
    logoScale: 0.64,
    description:
      'A clean beauty and skincare line founded by Millie Bobby Brown.',
  },
  {
    title: '9 Point Studios',
    href: 'https://9pointstudios.com',
    image: '/work-9-point-studios.png',
    logo: '/logos/9-point-studios.svg',
    logoScale: 0.7,
    description:
      'A world-class recording and video production facility for creative artists.',
  },
  {
    title: 'Officina del Bere 1397',
    href: 'https://officinadelbere1397.com',
    image: '/work-officina-del-bere-1397.png',
    logo: '/logos/officina-del-bere-1397.png',
    logoScale: 0.85,
    description:
      'A specialty shop offering elegant, functional wine and bar accessories.',
  },
  {
    title: 'The Good for Nothings Club',
    href: 'https://www.thegoodfornothings.club',
    image: '/work-the-good-for-nothings-club.png',
    logo: '/logos/the-good-for-nothings-club.svg',
    logoScale: 0.6,
    description:
      'A creators club from Austin, TX made up of designers, engineers, filmmakers, musicians, and writers.',
  },
  {
    title: 'Lifepacks',
    href: 'https://www.lifepacks.co',
    image:
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80',
    logo: '/logos/lifepacks.png',
    logoScale: 0.4,
    description:
      'Easily create product guides and earn commission, just like the pros at Wirecutter and Consumer Reports.',
  },
]

/** Extract hostname from a client URL for favicon lookups.
 * Strips a leading `www.` since some favicon providers only resolve the
 * bare domain (e.g. gtbsolarexchange.com works, www. does not). */
export function getClientHostname(href: string): string {
  return new URL(href).hostname.replace(/^www\./, '')
}
