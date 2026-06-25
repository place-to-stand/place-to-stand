export type CaseStudy = {
  slug: string
  title: string
  client: string
  metric: string
  summary: string
  image: string
  tags: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'portal',
    title: 'Portal',
    client: 'Place To Stand',
    metric: '1hr → 10min',
    summary: 'Turn weekly meetings into check-ins. Business activity tracked by AI and summarized for instant insights.',
    image: '/use-case-portal.png',
    tags: ['AI Automation', 'Workflow Systems'],
  },
  {
    slug: 'fulfillment-manager',
    title: 'Fulfillment Manager',
    client: 'Up The Wall',
    metric: '5hr → 1hr',
    summary: 'Streamlined order fulfillment and inventory management for custom made home products.',
    image: '/use-case-up-the-wall-portal.png',
    tags: ['Workflow Systems', 'Software Development'],
  },
  {
    slug: 'agentic-research-tool',
    title: 'Agentic Research Tool',
    client: 'Kendall',
    metric: '10hrs → 1hr',
    summary: 'Artist research agency cut research time from 10 hours to 1 hour with AI-powered research automation.',
    image: '/use-case-kendall-big.webp',
    tags: ['AI Automation', 'Data Intelligence'],
  },
  {
    slug: 'booking-platform',
    title: 'Booking Platform',
    client: 'Valise',
    metric: '20hrs → 2hrs',
    summary: 'Agentic booking platform for hospitality agency. Fully automated flows from email to booking hotels.',
    image: '/valise-dashboard-light.png',
    tags: ['AI Automation', 'Software Development'],
  },
]

export const caseStudyMap = Object.fromEntries(
  caseStudies.map(cs => [cs.slug, cs])
) as Record<string, CaseStudy>
