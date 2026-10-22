export type Client = {
  title: string
  href: string
  /** Screenshot for the /clients page; clients without one only appear in
   * the homepage logo grid. */
  image?: string
  description: string
  /** Brand logo on a transparent ground, for the homepage logo grid. Brands
   * that only publish a dark-on-light mark use their reversed lockup so they
   * read against the dark theme. */
  logo: string
  /** Fraction of the logo row height this mark may occupy. Wordmarks fill the
   * row; square or heavy marks are knocked back so every logo carries the same
   * optical weight rather than the same pixel height. Defaults to 1. */
  logoScale?: number
  /** The logo grid shows every mark as a flat white silhouette so client brand
   * colors don't fight the site palette. Marks whose detail lives in their
   * color fills (they'd flatten to a blob) opt into a grey version instead. */
  logoTone?: 'grey'
}

/** Tailwind filter that renders a client mark white (or grey, per `logoTone`)
 * wherever logos appear, so brand colors never fight the site palette. */
export function logoToneClass(client: Client): string {
  return client.logoTone === 'grey'
    ? 'brightness-150 grayscale'
    : 'brightness-0 invert'
}

/** Biggest names first: the homepage logo grid opens on the first ten and
 * swaps the rest in one at a time; the audit page shows the first six. */
export const clients: Client[] = [
  {
    title: 'Hot Ones',
    href: 'https://hotones.com',
    image: '/work-hot-ones.png',
    logo: '/logos/hot-ones.png',
    logoScale: 0.7,
    logoTone: 'grey',
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
    title: 'Florence by Mills Beauty',
    href: 'https://florencebymillsbeauty.com',
    image: '/work-florence-by-mills-beauty.png',
    logo: '/logos/florence-by-mills-beauty.png',
    logoScale: 0.64,
    description:
      'A clean beauty and skincare line founded by Millie Bobby Brown.',
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
    title: 'Betsy & Adam',
    href: 'https://www.betsyandadam.com',
    logo: '/logos/betsy-and-adam.png',
    logoScale: 0.5,
    description: 'Evening and special occasion dresses.',
  },
  {
    title: 'Xscape Evenings',
    href: 'https://xscapeevenings.com',
    logo: '/logos/xscape-evenings.png',
    logoScale: 0.5,
    description: 'Eveningwear and occasion dresses.',
  },
  {
    title: 'Blondie Nites',
    href: 'https://blondienites.com',
    logo: '/logos/blondie-nites.png',
    logoScale: 0.5,
    description: 'Party and prom dresses.',
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
    title: 'GreenWATT USA',
    href: 'https://www.gtbsolarexchange.com',
    image: '/work-greenwatt-usa.png',
    logo: '/logos/greenwatt-usa.png',
    logoScale: 0.7,
    description:
      'A marketplace connecting community solar providers with enrollment-ready small commercial customers.',
  },
  {
    title: 'Jeremy Turner Studio',
    href: 'https://jeremyturnerstudio.com',
    image: '/work-jeremy-turner.png',
    logo: '/logos/jeremy-turner-studio.svg',
    logoScale: 0.3,
    description:
      'A composer, conductor, and multi-instrumentalist creating innovative music for the moving image and the stage.',
  },
  {
    title: 'Up The Wall',
    href: 'https://upthewall.co',
    logo: '/logos/up-the-wall.svg',
    logoScale: 0.7,
    description: 'Print-on-demand order fulfillment for Shopify stores.',
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
    image: '/work-lifepacks.jpg',
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
