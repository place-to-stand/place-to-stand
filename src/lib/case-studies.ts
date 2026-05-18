export type Project = {
  title: string
  href: string
  image: string
  description: string
}

export type CaseStudyStat = {
  label: string
  before: string
  after: string
}

export type CaseStudyQuote = {
  text: string
  attribution?: string
  context?: string
}

export type CaseStudy = {
  slug: string
  client: string
  industry: string
  logo: string
  href: string
  title: string
  summary: string
  image: string
  challenge: string
  failedAlternatives?: string
  solution: string[]
  implementation?: string
  stats: CaseStudyStat[]
  quotes: CaseStudyQuote[]
  whatsNext?: string
}

export const projects: Project[] = [
  {
    title: 'Hot Ones',
    href: 'https://hotones.com',
    image: '/work-hot-ones.png',
    description:
      'The official online sauce shop for the hit interview show "Hot Ones.',
  },
  {
    title: 'Blake Brown Beauty',
    href: 'https://blakebrownbeauty.com',
    image: '/work-blake-brown-beauty.png',
    description:
      'A direct-to-consumer brand focused on healthy, high-performance haircare founded by Blake Lively.',
  },
  {
    title: 'Heatonist',
    href: 'https://heatonist.com',
    image: '/work-heatonist.png',
    description:
      "A curated marketplace for the world's best small-batch hot sauces.",
  },
  {
    title: 'Florence by Mills Beauty',
    href: 'https://florencebymillsbeauty.com',
    image: '/work-florence-by-mills-beauty.png',
    description:
      'A clean beauty and skincare line founded by Millie Bobby Brown.',
  },
  {
    title: '9 Point Studios',
    href: 'https://9pointstudios.com',
    image: '/work-9-point-studios.png',
    description:
      'A world-class recording and video production facility for creative artists.',
  },
  {
    title: 'Officina del Bere 1397',
    href: 'https://officinadelbere1397.com',
    image: '/work-officina-del-bere-1397.png',
    description:
      'A specialty shop offering elegant, functional wine and bar accessories.',
  },
  {
    title: 'The Good for Nothings Club',
    href: 'https://www.thegoodfornothings.club',
    image: '/work-the-good-for-nothings-club.png',
    description:
      'A creators club from Austin, TX made up of designers, engineers, filmmakers, musicians, and writers.',
  },
  {
    title: 'Lifepacks',
    href: 'https://www.lifepacks.co',
    image:
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80',
    description:
      'Easily create product guides and earn commission, just like the pros at Wirecutter and Consumer Reports.',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    slug: 'valise-travel',
    client: 'Valise Travel',
    industry: 'Music Touring & Travel',
    logo: '/case-study-valise-logo.png',
    href: 'https://www.valise.live',
    title:
      'How a Touring Music Travel Agency Saved Hours Every Day With Custom AI Automation',
    summary:
      'Valise books hotels for touring bands across North America. In 2026, they have already worked with 57 bands and booked over 7,100 rooms. We built them a custom AI-powered booking platform that turned hours of manual work into minutes.',
    image: '/valise-dashboard-light.png',
    challenge:
      'Every tour meant hours of the same painful work. An itinerary would come in — 40 days on the road, a dozen cities needing group bookings — and Mitchell would handle it all manually. Build a spreadsheet for each city. Send RFPs to multiple hotels per city. Wait for responses, then copy-paste quote details from emails into the right spreadsheets. Compile comparisons for the artist team. Get approval. Repeat for every tour, every band, all year. Just sending the RFPs for one big tour took three to four hours. Then the responses would come in — sometimes 150 emails in a single hour.',
    failedAlternatives:
      'Mitchell tried off-the-shelf solutions. Moonrise. Catch. Neither worked. One was built by someone in the touring travel industry and still missed the mark. The other lost him in the first ten minutes. "If I can\'t learn this in 10 minutes, it\'s too complicated. I\'m out."',
    solution: [
      'Tour Import — Upload an itinerary and the system builds the full tour structure automatically. Every stop, every city, every date.',
      'Automated RFPs — Send quote requests across an entire tour in minutes, not hours.',
      'AI Quote Parsing — When hotels respond, the system reads the emails, pulls pricing and terms, and organizes everything automatically.',
      'Quote Comparison — All quotes land in one structured view. No spreadsheet assembly required.',
    ],
    implementation:
      'Mitchell was running real tours through the platform from early on. The team iterated as real issues came up — finding bugs and fixing things in the context of actual work, not test scenarios. The AI accuracy surprised him from the start.',
    stats: [
      {
        label: 'Sending RFPs for a tour',
        before: '3-4 hours',
        after: '10-15 minutes',
      },
      {
        label: 'Processing 150 hotel emails',
        before: 'Hours',
        after: '15-20 minutes',
      },
      {
        label: 'Daily time saved',
        before: 'Underwater',
        after: 'Multiple hours back',
      },
    ],
    quotes: [
      {
        text: 'It literally saves me hours every day. It makes my life easier because it saves me time.',
        attribution: 'Mitchell Levine, Valise Travel',
      },
      {
        text: 'At this point last year, I remember just being incredibly stressed out, thinking "How am I going to get through everything?" Now I\'ve got enough time because I\'m not sending out these quotes manually. I get it all back.',
        attribution: 'Mitchell Levine, Valise Travel',
        context: 'On how his day-to-day has changed',
      },
      {
        text: 'What surprised me most? It just works.',
        attribution: 'Mitchell Levine, Valise Travel',
      },
    ],
    whatsNext:
      'Automating contract requests so that once an artist approves a hotel, the system immediately reaches out for the contract — closing one more manual loop in the booking cycle.',
  },
]

export const caseStudyMap: Record<string, CaseStudy | undefined> =
  Object.fromEntries(caseStudies.map(cs => [cs.slug, cs]))
