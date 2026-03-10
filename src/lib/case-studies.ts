export type CaseStudyStat = {
  label: string
  before: string
  after: string
}

export type CaseStudy = {
  slug: string
  client: string
  industry: string
  title: string
  summary: string
  image: string
  challenge: string
  solution: string[]
  stats: CaseStudyStat[]
  quote: string
  quoteAttribution?: string
  whatsNext?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'valise-travel',
    client: 'Valise Travel',
    industry: 'Music Touring & Travel',
    title:
      'How a Touring Music Travel Agency Saved Hours Every Day With Custom AI Automation',
    summary:
      'Valise books hotels for touring bands across North America. In 2026, they have already worked with 57 bands and booked over 7,100 rooms. We built them a custom AI-powered booking platform that turned hours of manual work into minutes.',
    image: '/valise-dashboard-light.webp',
    challenge:
      'Every tour meant hours of the same painful work. An itinerary would come in — 40 days on the road, a dozen cities needing group bookings — and Mitchell would handle it manually. Spreadsheets for each city. RFPs to multiple hotels. Copy-pasting quote details from 150+ emails per hour. Just sending RFPs for one big tour took three to four hours.',
    solution: [
      'Tour Import — Upload an itinerary and the system builds the full tour structure automatically. Every stop, every city, every date.',
      'Automated RFPs — Send quote requests across an entire tour in minutes, not hours.',
      'AI Quote Parsing — When hotels respond, the system reads the emails, pulls pricing and terms, and organizes everything automatically.',
      'Quote Comparison — All quotes land in one structured view. No spreadsheet assembly required.',
    ],
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
    quote:
      'It literally saves me hours every day. It makes my life easier because it saves me time.',
    whatsNext:
      'Automating contract requests so that once an artist approves a hotel, the system immediately reaches out for the contract — closing one more manual loop in the booking cycle.',
  },
]

export const caseStudyMap = Object.fromEntries(
  caseStudies.map(cs => [cs.slug, cs])
)
