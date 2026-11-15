/** A client in the logo wall (Home) and the audit page's logo strip. The
 * rows on /clients are in `CLIENT_GROUPS` below. */
export type Client = {
  title: string
  href: string
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
  /** Vertical nudge, as a percent of the logo's own height (negative moves it
   * up), so the mark's visual center sits on the row's center line. Measured
   * from the file's ink: the shift that would put the ink's center of mass in
   * the middle, taken at 75% so text-heavy marks don't overshoot. A small
   * superscript, like Hot Ones' "First We Feast presents" and flame, otherwise
   * drags the box up and leaves the heavy part sitting low (Hot Ones is set by
   * its letters: their center is 18.5% of the image below the box's). */
  logoNudge?: number
  /** The logo grid shows every mark as a flat white silhouette so client brand
   * colors don't fight the site palette. Marks whose detail lives in their
   * color fills (they'd flatten to a blob) opt into 'gray': white by
   * brightness, so a black outline drops out (#logo-lum, logo-filters.tsx). */
  logoTone?: 'gray'
}

/** Tailwind filter that renders a client mark white (or gray, per `logoTone`)
 * wherever logos appear, so brand colors never fight the site palette. */
export function logoToneClass(client: Client): string {
  return client.logoTone === 'gray'
    ? '[filter:url(#logo-lum)]'
    : 'brightness-0 invert'
}

/** Biggest names first: the homepage logo grid opens on the first ten and
 * swaps the rest in one at a time; the audit page shows the first six. */
export const clients: Client[] = [
  {
    title: 'Hot Ones',
    href: 'https://hotones.com',
    logo: '/logos/hot-ones.png',
    logoScale: 0.72,
    logoNudge: -18,
    logoTone: 'gray',
  },
  {
    title: 'Heatonist',
    href: 'https://heatonist.com',
    logo: '/logos/heatonist.svg',
    logoScale: 0.45,
  },
  {
    title: 'Blake Brown Beauty',
    href: 'https://blakebrownbeauty.com',
    logo: '/logos/blake-brown-beauty.svg',
    logoScale: 0.58,
  },
  {
    title: 'Florence by Mills Beauty',
    href: 'https://florencebymillsbeauty.com',
    logo: '/logos/florence-by-mills-beauty.png',
    logoScale: 0.56,
    logoNudge: 8,
  },
  {
    title: 'Betsy & Adam',
    href: 'https://www.betsyandadam.com',
    logo: '/logos/betsy-and-adam.png',
    logoScale: 0.42,
  },
  {
    title: 'Xscape Evenings',
    href: 'https://xscapeevenings.com',
    logo: '/logos/xscape-evenings.png',
    logoScale: 0.33,
  },
  {
    title: 'Blondie Nites',
    href: 'https://blondienites.com',
    logo: '/logos/blondie-nites.png',
    logoScale: 0.34,
    logoNudge: -5,
  },
  {
    title: '9 Point Studios',
    href: 'https://9pointstudios.com',
    logo: '/logos/9-point-studios.svg',
    logoScale: 0.64,
    logoNudge: -2,
  },
  {
    title: 'GreenWATT USA',
    href: 'https://www.gtbsolarexchange.com',
    logo: '/logos/greenwatt-usa.png',
    logoScale: 0.56,
    logoNudge: 2,
  },
  {
    title: 'Officina del Bere 1397',
    href: 'https://officinadelbere1397.com',
    logo: '/logos/officina-del-bere-1397.png',
    logoScale: 0.62,
    logoNudge: 2.5,
  },
  {
    title: 'Safety Knights',
    href: 'https://safetyknights.com',
    logo: '/logos/safety-knights.svg',
    logoScale: 0.68,
    logoNudge: 3,
  },
  {
    title: 'Jeremy Turner',
    href: 'https://jeremyturnerstudio.com',
    logo: '/logos/jeremy-turner.svg',
    logoScale: 0.35,
    logoNudge: 5,
  },
  {
    title: 'The Good for Nothings Club',
    href: 'https://www.thegoodfornothings.club',
    logo: '/logos/the-good-for-nothings-club.svg',
    logoScale: 0.58,
  },
  {
    title: 'Up the Wall',
    href: 'https://upthewall.co',
    logo: '/logos/up-the-wall.svg',
    logoScale: 0.66,
  },
  {
    title: 'The Rounds',
    href: 'https://www.theroundsnyc.com',
    logo: '/logos/the-rounds.png',
    logoScale: 0.33,
    logoNudge: -6,
  },
  {
    title: 'Echo & Wave',
    href: 'https://echoandwave.com',
    logo: '/logos/echo-and-wave.svg',
    logoScale: 0.28,
    logoNudge: -4,
  },
  {
    title: 'so many cults',
    href: 'https://somanycults.com',
    logo: '/logos/so-many-cults.svg',
    logoScale: 0.3,
  },
  {
    title: 'Small Isles',
    href: 'https://smallislesmusic.com',
    logo: '/logos/small-isles.svg',
    logoScale: 0.28,
    logoNudge: -2,
  },
  {
    title: 'Lifepacks',
    href: 'https://www.lifepacks.co',
    logo: '/logos/lifepacks.png',
    logoScale: 0.38,
    logoNudge: -3.5,
  },
]

/** The site of a client in the list above, so the rows below reuse its URL.
 * Throws on a typo so a row never ships without its link. */
function site(title: string): string {
  const client = clients.find(c => c.title === title)
  if (!client) throw new Error(`No client named ${title}`)
  return client.href
}

/** One row on /clients: who they are, what we built, and their sites (or,
 * for us, a page on this site). */
export type ClientRow = {
  name: string
  who: string
  built: string
  /** Their own sites, opened in a new tab. */
  sites?: readonly string[]
  /** A page on this site instead (our own row). */
  page?: { href: string; label: string }
}

/** The rows on /clients, grouped like the Platform page so a visitor finds
 * proof for the offer they came for (approved Nov 13). Safety Knights is a
 * logo only, with no row. */
export const CLIENT_GROUPS: ReadonlyArray<{
  title: string
  rows: readonly ClientRow[]
}> = [
  {
    title: 'Sell online',
    rows: [
      {
        name: 'Blake Brown Beauty',
        who: 'Haircare founded by Blake Lively.',
        built: 'We build and run its Shopify store.',
        sites: [site('Blake Brown Beauty')],
      },
      {
        name: 'Florence by Mills',
        who: 'Clean beauty and skincare founded by Millie Bobby Brown.',
        built: 'We built and ran its Shopify store.',
        sites: [site('Florence by Mills Beauty')],
      },
      {
        name: 'Betsy & Adam, Blondie Nites and Xscape Evenings',
        who: 'Three eveningwear brands under one owner.',
        built: 'We run all three Shopify stores.',
        sites: [
          site('Betsy & Adam'),
          site('Blondie Nites'),
          site('Xscape Evenings'),
        ],
      },
      {
        name: 'GreenWATT USA',
        who: 'A marketplace that connects community solar providers with business customers ready to sign up.',
        built: 'We built the marketplace and the way customers apply.',
        sites: [site('GreenWATT USA')],
      },
      {
        name: 'Up the Wall',
        who: 'Print on demand for the highest-quality prints: “Design it, publish it, sell it. We’ll print it, pack it, and ship it.”',
        built:
          'We built the Shopify app behind it and their own copy of our portal.',
        sites: [site('Up the Wall')],
      },
      {
        // Only officinadelbere1397.com is on file; add the Officina 1397
        // store's address here once we have it.
        name: 'Officina del Bere 1397',
        who: 'Wine and bar accessories.',
        built:
          'We built both of its Shopify stores, Officina 1397 and Officina del Bere 1397.',
        sites: [site('Officina del Bere 1397')],
      },
      {
        name: 'The Rounds',
        who: 'A bakery in Brooklyn.',
        built: 'We look after its Shopify store and keep adding to it.',
        sites: [site('The Rounds')],
      },
    ],
  },
  {
    title: 'Run your business',
    rows: [
      {
        name: 'Place To Stand',
        who: 'Us.',
        built:
          'We run our whole company on our portal: leads, projects, hours and invoices. The code is public.',
        page: { href: '/platform/portal', label: 'See the portal' },
      },
      {
        name: '9 Point Studios',
        who: 'A recording and video studio for artists.',
        built: 'They run on their own copy of our portal.',
        sites: [site('9 Point Studios')],
      },
      {
        name: 'The Good for Nothings Club',
        who: 'A creators club in Austin.',
        built: 'We built its website and member portal.',
        sites: [site('The Good for Nothings Club')],
      },
    ],
  },
  {
    title: 'Websites and products',
    rows: [
      {
        name: 'Jeremy Turner',
        who: 'A composer for film and stage.',
        built:
          "We built his studio's site and sites for two of his projects, Echo & Wave and Small Isles.",
        sites: [site('Jeremy Turner')],
      },
      {
        name: 'Lifepacks',
        who: 'Product guides that earn their writers a commission.',
        built: 'We built all of it.',
        sites: [site('Lifepacks')],
      },
      {
        name: 'so many cults',
        who: 'A band.',
        built: 'We built its website.',
        sites: [site('so many cults')],
      },
    ],
  },
]

/** Extract hostname from a client URL for favicon lookups.
 * Strips a leading `www.` since some favicon providers only resolve the
 * bare domain (e.g. gtbsolarexchange.com works, www. does not). */
export function getClientHostname(href: string): string {
  return new URL(href).hostname.replace(/^www\./, '')
}
