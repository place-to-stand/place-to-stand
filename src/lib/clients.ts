export type Client = {
  title: string
  href: string
  /** Screenshot for the /clients page; clients without one only appear in
   * the homepage logo grid. */
  image?: string
  /** Shown on the /clients page, so only clients with an `image` need one. */
  description?: string
  /** Brand logo on a transparent ground, for the homepage logo grid. Brands
   * that only publish a dark-on-light mark use their reversed lockup so they
   * read against the dark theme. */
  logo: string
  /** Fraction of the logo row height this mark may occupy, set so every logo
   * covers about the same area of ink rather than the same pixel height: wide
   * wordmarks sit low, square marks tall, and dense marks a little smaller.
   * Derived from each file's aspect ratio and ink coverage; re-derive it the
   * same way for a new logo. Defaults to 1. */
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
    logoScale: 0.65,
    logoTone: 'grey',
    description:
      'The official online sauce shop for the hit interview show "Hot Ones."',
  },
  {
    title: 'Blake Brown Beauty',
    href: 'https://blakebrownbeauty.com',
    image: '/work-blake-brown-beauty.png',
    logo: '/logos/blake-brown-beauty.svg',
    logoScale: 0.53,
    description:
      'A direct-to-consumer brand focused on healthy, high-performance haircare founded by Blake Lively.',
  },
  {
    title: 'Florence by Mills Beauty',
    href: 'https://florencebymillsbeauty.com',
    image: '/work-florence-by-mills-beauty.png',
    logo: '/logos/florence-by-mills-beauty.png',
    logoScale: 0.62,
    description:
      'A clean beauty and skincare line founded by Millie Bobby Brown.',
  },
  {
    title: 'Heatonist',
    href: 'https://heatonist.com',
    image: '/work-heatonist.png',
    logo: '/logos/heatonist.svg',
    logoScale: 0.48,
    description:
      "A curated marketplace for the world's best small-batch hot sauces.",
  },
  {
    title: 'Betsy & Adam',
    href: 'https://www.betsyandadam.com',
    logo: '/logos/betsy-and-adam.png',
    logoScale: 0.53,
  },
  {
    title: 'Xscape Evenings',
    href: 'https://xscapeevenings.com',
    logo: '/logos/xscape-evenings.png',
    logoScale: 0.43,
  },
  {
    title: 'Blondie Nites',
    href: 'https://blondienites.com',
    logo: '/logos/blondie-nites.png',
    logoScale: 0.39,
  },
  {
    title: '9 Point Studios',
    href: 'https://9pointstudios.com',
    image: '/work-9-point-studios.png',
    logo: '/logos/9-point-studios.svg',
    logoScale: 0.6,
    description:
      'A world-class recording and video production facility for creative artists.',
  },
  {
    title: 'GreenWATT USA',
    href: 'https://www.gtbsolarexchange.com',
    image: '/work-greenwatt-usa.png',
    logo: '/logos/greenwatt-usa.png',
    logoScale: 0.65,
    description:
      'A marketplace connecting community solar providers with enrollment-ready small commercial customers.',
  },
  {
    title: 'Safety Knights',
    href: 'https://safetyknights.com',
    logo: '/logos/safety-knights.svg',
    logoScale: 0.68,
  },
  {
    title: 'Jeremy Turner',
    href: 'https://jeremyturnerstudio.com',
    image: '/work-jeremy-turner.png',
    logo: '/logos/jeremy-turner.svg',
    logoScale: 0.35,
    description:
      'A composer, conductor, and multi-instrumentalist creating innovative music for the moving image and the stage.',
  },
  {
    title: 'Up The Wall',
    href: 'https://upthewall.co',
    logo: '/logos/up-the-wall.svg',
    logoScale: 0.91,
  },
  {
    title: 'Officina del Bere 1397',
    href: 'https://officinadelbere1397.com',
    image: '/work-officina-del-bere-1397.png',
    logo: '/logos/officina-del-bere-1397.png',
    logoScale: 0.78,
    description:
      'A specialty shop offering elegant, functional wine and bar accessories.',
  },
  {
    title: 'The Rounds',
    href: 'https://www.theroundsnyc.com',
    logo: '/logos/the-rounds.png',
    logoScale: 0.36,
  },
  {
    title: 'Lifepacks',
    href: 'https://www.lifepacks.co',
    image: '/work-lifepacks.jpg',
    logo: '/logos/lifepacks.png',
    logoScale: 0.38,
    description:
      'Easily create product guides and earn commission, just like the pros at Wirecutter and Consumer Reports.',
  },
  {
    title: 'The Good for Nothings Club',
    href: 'https://www.thegoodfornothings.club',
    image: '/work-the-good-for-nothings-club.png',
    logo: '/logos/the-good-for-nothings-club.svg',
    logoScale: 0.57,
    description:
      'A creators club from Austin, TX made up of designers, engineers, filmmakers, musicians, and writers.',
  },
  {
    title: 'Echo & Wave',
    href: 'https://echoandwave.com',
    logo: '/logos/echo-and-wave.svg',
    logoScale: 0.28,
  },
  {
    title: 'Small Isles',
    href: 'https://smallislesmusic.com',
    logo: '/logos/small-isles.svg',
    logoScale: 0.26,
  },
  {
    title: 'so many cults',
    href: 'https://somanycults.com',
    logo: '/logos/so-many-cults.svg',
    logoScale: 0.3,
  },
]

/** Extract hostname from a client URL for favicon lookups.
 * Strips a leading `www.` since some favicon providers only resolve the
 * bare domain (e.g. gtbsolarexchange.com works, www. does not). */
export function getClientHostname(href: string): string {
  return new URL(href).hostname.replace(/^www\./, '')
}
