export type FieldNote = {
  slug: string
  title: string
  description: string
  tags: string[]
  url: string
  repo?: string
  date: string
}

export const fieldNotes: FieldNote[] = [
  {
    slug: 'ai-playbook-smbs',
    title: 'The Emerging AI Playbook for SMBs',
    description:
      'A practical guide for small and medium businesses to identify, implement, and measure AI initiatives that create real business value.',
    tags: ['AI', 'Strategy', 'SMB'],
    url: '#',
    date: '2025-11-05',
  },
  {
    slug: 'portal-open-source',
    title: 'Portal: Open-Source Client Dashboard',
    description:
      'Our internal client management portal — built with Next.js, AI-powered activity tracking, and real-time project visibility.',
    tags: ['Open Source', 'Next.js', 'AI'],
    url: 'https://github.com/placetostand',
    repo: 'https://github.com/placetostand',
    date: '2025-06-01',
  },
  {
    slug: 'automation-roi-calculator',
    title: 'Automation ROI Calculator',
    description:
      'A framework for calculating the true return on investment of workflow automation, including hidden costs and compounding efficiency gains.',
    tags: ['Automation', 'ROI', 'Framework'],
    url: '#',
    date: '2025-08-15',
  },
]
