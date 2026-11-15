export type Service = {
  slug: string
  title: string
  tagline: string
  description: string
  icon: string
  features: string[]
}

/**
 * The services list used by the audit page, Referral and the Services
 * structured data. It mirrors Platform (src/lib/offers.ts): the three kinds
 * of work, then the after-launch services. Keep the two in step, and keep
 * the slugs: stored audit results refer to them.
 */
export const services: Service[] = [
  {
    slug: 'run-your-business',
    title: 'Run your business',
    tagline: 'One system for the work behind the scenes',
    description:
      'One system for the work behind the scenes, built around how your team works. It starts as a copy of the portal we run on, trimmed to what you need. Every person and every AI tool sees only what their role allows.',
    icon: 'GitBranch',
    features: [
      'Team workspace: clients, projects, tasks and time',
      'CRM: every lead, contact and company, with its whole history',
      'Workflows: the steps your team repeats, done the same way every time',
      'Automations: reports, reminders and syncing data between tools',
      'Client portal: progress, hours and payments for your customers',
      'Reports: live numbers from your own data',
      'Website: your marketing site, with every form feeding the CRM',
    ],
  },
  {
    slug: 'sell-online',
    title: 'Sell online',
    tagline: 'Custom stores and marketplaces, on Shopify when it fits',
    description:
      "Custom stores and marketplaces for things standard store tools can't sell well, on Shopify when it fits. Built for brands like Hot Ones and Heatonist.",
    icon: 'Code2',
    features: [
      'Custom marketplaces',
      'Shopify stores and apps',
      'Made-to-order and drop-ship',
      'Order intake',
      'Payments',
      'Order routing',
    ],
  },
  {
    // The slug stays: stored audit results refer to it.
    slug: 'senior-help', // voice-ok
    title: 'Engineering help for your team',
    tagline: 'Experienced engineers beside the team you have',
    description:
      'For teams that already have code, and sometimes developers, and need experienced engineers beside them.',
    icon: 'Users',
    features: [
      'Pick up where others left off',
      'Make an AI-built first version solid',
      'Work beside your developers',
      'Technical consulting',
    ],
  },
  {
    slug: 'managed-services',
    title: 'Managed services',
    tagline: 'We keep it running after launch',
    description:
      'Security updates, error and speed checks, analytics and SEO reports, data checks and a weekly email, with a shared channel in Slack, Teams, Google Chat or Discord.',
    icon: 'ServerCog',
    features: [
      'Security updates, error and speed checks',
      'Analytics and SEO reports',
      'Data checks and a weekly email',
      'A shared channel where your team already works',
    ],
  },
  {
    slug: 'technical-consulting',
    title: 'Technical consulting',
    tagline: 'What to build, buy or hire for',
    description:
      'Advice from people who build every day: which tools to keep, what to build, and who to hire.',
    icon: 'Compass',
    features: [
      'Stack and vendor reviews',
      'Build, buy or hire decisions',
      'Roadmaps sized to your stage',
    ],
  },
  {
    slug: 'training',
    title: 'Training',
    tagline: 'Your team on AI tools, on real work',
    description:
      'We teach your team to use AI tools on their own real tasks while we build, so they move faster from day one.',
    icon: 'BarChart3',
    features: [
      'Small groups, real tasks from their own jobs',
      'Starts while the build happens',
    ],
  },
]
