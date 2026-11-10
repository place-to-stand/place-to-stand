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
    title: 'Run Your Business',
    tagline: 'One system for the work behind the scenes',
    description:
      'A shared workspace for your team, CRM, workflows and automations, on one source of data you own. It stands in for the stack of subscriptions and spreadsheets you juggle today.',
    icon: 'GitBranch',
    features: [
      'Team workspace: clients, projects, tasks and time',
      'CRM with every lead, contact and company',
      'Workflows your team repeats, done the same way',
      'Automations for reports, reminders and syncing tools',
      'Client portal and live reports',
    ],
  },
  {
    slug: 'sell-online',
    title: 'Sell Online',
    tagline: "Stores that do what Shopify alone can't",
    description:
      'Shopify and headless storefronts, custom marketplaces, Shopify apps, payments, fulfillment and inventory, built for brands like Hot Ones and Heatonist.',
    icon: 'Code2',
    features: [
      'Shopify stores and headless storefronts',
      'Custom marketplaces you own',
      'Shopify apps and functions',
      'Payments through Stripe',
      'Fulfillment and inventory across channels',
    ],
  },
  {
    slug: 'managed-services',
    title: 'Managed Services',
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
    title: 'Technical Consulting',
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
