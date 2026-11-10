export type Service = {
  slug: string
  title: string
  tagline: string
  description: string
  icon: string
  features: string[]
}

/**
 * The services list used by the audit page and the Services structured data.
 * It mirrors the two offers and the after-launch services in
 * src/lib/offers.ts; keep the two in step.
 */
export const services: Service[] = [
  {
    slug: 'run-your-business',
    title: 'Run your business',
    tagline: 'CRM, projects and workflows in one system you own',
    description:
      'CRM, projects and workflows in one system you own, instead of HubSpot, Asana and spreadsheets. Every person and every AI agent sees only what their role allows.',
    icon: 'GitBranch',
    features: [
      'Team workspace: projects, tasks and time logs',
      'Website: marketing site design and development, with every form feeding your CRM',
      'CRM: leads, companies and people',
      'Billing: invoices and prepaid hour blocks',
      'Reports: the monthly close and live numbers',
      'Client portal',
      'Workflows and automations',
    ],
  },
  {
    slug: 'sell-online',
    title: 'Sell online',
    tagline: 'Shopify stores and fully custom marketplaces',
    description:
      'Shopify stores or fully custom marketplaces, plus the systems behind them: payments, fulfillment and dropshipping. Built for brands like Hot Ones and Heatonist.',
    icon: 'Code2',
    features: [
      'Shopify stores',
      'Custom marketplaces',
      'Shopify apps and functions',
      'Payments',
      'Fulfillment and inventory',
    ],
  },
  {
    slug: 'managed-services',
    title: 'Managed services',
    tagline: 'We keep it running after launch',
    description:
      'Security updates, error and speed monitoring, analytics and SEO reports, data checks and a weekly email, with a shared channel in Slack, Teams, Google Chat or Discord.',
    icon: 'ServerCog',
    features: [
      'Security updates and monitoring',
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
