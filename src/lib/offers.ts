/**
 * The site's core story, shared by Home, Platform and Process so each page
 * says the same thing in the same words. Copy comes from the Nov 5 planning
 * doc ("Website direction from the Nov 5 meeting"); change it here, not in
 * the pages.
 */

export type Module = {
  name: string
  job: string
  /** Tools or habits this module stands in for ("Instead of"). */
  insteadOf?: string[]
  /** A client who runs it, for e-commerce modules. */
  /** Clients who run it, as "Built for" tags. */
  example?: string | string[]
}

export type Offer = {
  /** Also the section id on Platform: /platform#run, /platform#sell. */
  slug: 'run' | 'sell'
  name: string
  /** The line under the name: the tools people already know. */
  summary: string
  /** "Instead of" tags on the Home card, picked by hand. */
  cardTags?: string[]
  /** One line of proof under the modules on Platform. */
  proof?: string
  modules: Module[]
}

/** True of every Run your business module; shown once under the grid. */
export const PLATFORM_SHARED =
  'Across all of it: one search, an AI connector that works with any model, and every person and every agent sees only what their role allows.'

/** The built-in MCP connector, as its own block on Platform. */
export const AI_ACCESS = {
  title: 'Your AI can work in it too.',
  body: 'Any AI assistant can read and update your data through a built-in connector (MCP). It follows the same roles as your team, so an agent can never see more than the person using it.',
}

/** Closes the Platform intro. */
export const MOBILE_APPS =
  'We also build mobile apps for either one, for your team or your customers.'

export const OFFERS: Offer[] = [
  {
    slug: 'run',
    name: 'Run your business',
    summary:
      'CRM, projects and workflows in one system you own, instead of HubSpot, Asana and spreadsheets.',
    cardTags: ['HubSpot', 'Asana', 'Monday', 'Harvest', 'Zapier'],
    proof: 'We run Place To Stand on the same platform.',
    modules: [
      {
        name: 'Team workspace',
        job: 'Projects, tasks and time logs in one place.',
        insteadOf: ['Monday', 'Asana', 'ClickUp'],
      },
      {
        name: 'Website',
        job: 'Marketing site design and development, with every form feeding your CRM.',
        insteadOf: ['Webflow', 'Squarespace', 'WordPress'],
      },
      {
        name: 'CRM',
        job: "Leads, companies and people, with your website's forms landing straight in.",
        insteadOf: ['HubSpot', 'Salesforce', 'Pipedrive'],
      },
      {
        name: 'Billing',
        job: 'Invoices and prepaid hour blocks, drawn from the same time logs.',
        insteadOf: ['Harvest', 'FreshBooks'],
      },
      {
        name: 'Reports',
        job: 'The monthly close and live numbers from your own data.',
        insteadOf: ['Exported spreadsheets'],
      },
      {
        name: 'Client portal',
        job: 'Where your customers check progress, approve work and pay.',
        insteadOf: ['Emailed PDFs', 'Status calls'],
      },
      {
        name: 'Workflows and automations',
        job: 'The steps your team repeats, plus syncing with the tools you keep.',
        insteadOf: ['Zapier', 'Make'],
      },
    ],
  },
  {
    slug: 'sell',
    name: 'Sell online',
    summary:
      'Shopify stores or fully custom marketplaces, plus the systems behind them: payments, fulfillment and dropshipping.',
    modules: [
      {
        name: 'Shopify stores',
        job: 'Themes and headless storefronts your team can change without a developer.',
        example: 'hotones.com',
      },
      {
        name: 'Custom marketplaces',
        job: 'Buyers and sellers on one platform you own.',
        example: 'GreenWATT USA',
      },
      {
        name: 'Shopify apps and functions',
        job: 'Checkout rules, order routing and discounts that extend Shopify.',
        example: 'Heatonist',
      },
      {
        name: 'Payments',
        job: 'Checkout, subscriptions and invoices through Stripe.',
        example: ['Heatonist', 'GreenWATT', '9 Point Studios'],
      },
      {
        name: 'Fulfillment and inventory',
        job: 'Each order goes to the right warehouse, and stock stays in step across channels.',
        example: 'Heatonist',
      },
    ],
  },
]

/** Clients shown under "Sell online" on Home. */
export const SELL_ONLINE_CLIENTS = [
  'Hot Ones',
  'Heatonist',
  'Blake Brown Beauty',
]

/** The ownership promise (approved Nov 13). The full six lines live only on
 *  Platform (#own); Home shows the short version and links there. */
export const OWNERSHIP_TITLE = 'You own all of it.'

export const OWNERSHIP = [
  { title: 'Your code.', body: 'Everything we build for you is yours.' },
  {
    title: 'Your data.',
    body: 'We use it only to do the work, and it never trains AI.',
  },
  {
    title: 'Your infrastructure.',
    body: 'It runs on accounts in your name, not ours.',
  },
  { title: 'No seat fees.', body: 'Add people without paying more.' },
  {
    title: 'No paying twice.',
    body: 'Features our portal already has cost nothing; you pay for the hours to install and change them.',
  },
  {
    title: 'No lock-in.',
    body: 'Walk away any time and take it all with you.',
  },
]

/** Home's short version of the ownership promise. */
export const OWNERSHIP_SHORT =
  'Your code, your data and your accounts, running on your own infrastructure. No seat fees, no lock-in, and your data never trains AI.'

/** "Who you work with": Home, About's intro and the audit landing. */
export const WHO_YOU_WORK_WITH = {
  title: 'You work with the people who build it.',
  intro:
    'The people you meet on the first call are the people who build your software.',
  facets: [
    {
      title: 'Senior Builders',
      body: 'The people on the call build it. Nobody passes your notes along.',
    },
    {
      title: 'AI-Native',
      body: 'We tuned our AI setup, our stack and our own delivery system for one job: shipping fast. We build up to 5x faster than a traditional team.',
    },
    {
      title: 'Direct Access',
      body: 'Talk to us in a shared channel in your own Slack, Teams, Google Chat or Discord, and get answers from the people writing the code.',
    },
  ],
}

/** Where clients reach us, in this order everywhere. */
export const CHANNELS = 'Slack, Teams, Google Chat or Discord'

export type Step = {
  number: string
  name: string
  time: string
  summary: string
  detail: string
}

/** The five steps (approved Nov 13): `summary` is Home's wording, `detail`
 *  Process's longer wording. */
export const STEPS: Step[] = [
  {
    number: '01',
    name: 'Intro call',
    time: '30 min, free',
    summary:
      "Tell us what's wrong and we'll say plainly if we're the right fit.",
    detail:
      "Tell us what's wrong and roughly how big it is. We'll say plainly if we're the right fit.",
  },
  {
    number: '02',
    name: 'Discovery',
    time: '1 hour',
    summary: 'We dig into what slows the business down.',
    detail:
      'You walk us through what slows the business down, and we ask the questions that shape the plan.',
  },
  {
    number: '03',
    name: 'Meet your team',
    time: '1 to 2 weeks',
    summary:
      'We sit with the people who feel the problem, then send a written plan and estimate.',
    detail:
      'We sit with the people who do the work and feel the problem every day. Then you get a written plan: what we’d fix first, how long it takes and how many hours it needs.',
  },
  {
    number: '04',
    name: 'Fix the biggest pain',
    time: '2 to 6 weeks',
    summary: 'Built all the way and in daily use, not a demo.',
    detail:
      'We build it all the way, connect it to the tools you keep, and put it into daily use. Not a demo.',
  },
  {
    number: '05',
    name: 'Then the next one',
    time: 'Days, not months',
    summary: 'Your data is already in one place, so each fix goes faster.',
    detail:
      'Your data already sits in one place, so each next fix goes faster.',
  },
]

export const AFTER_LAUNCH = [
  {
    name: 'Managed services',
    body: 'We keep it running: security updates, error and speed monitoring, analytics and SEO reports, data checks, a weekly email, and a shared channel in Slack, Teams, Google Chat or Discord. Ask us for a price.',
  },
  {
    name: 'Technical consulting',
    body: 'Advice on what to build, buy or hire for, from people who build every day.',
  },
  {
    name: 'Training',
    body: 'We teach your team to use AI tools on their own real tasks while we build.',
  },
]

/** The billing promise under the steps on Home (approved Nov 13). */
export const BILLING =
  "You pay for people's time, nothing else. Hours come in prepaid blocks, five to start, and they never expire. AI costs nothing extra, and neither do features our portal already has. Walk away any time."

/** "How you pay" on Process (approved Nov 13). */
export const PAYMENT = {
  title: "You pay for people's time. Nothing else.",
  body: 'We bill only for the hours a person spends on your work. Hours come in prepaid blocks, five to start, and they never expire. AI tools and agents cost nothing extra, and neither do features our portal already has: you pay only for the time to set them up and shape them. No contract. Walk away any time.',
}

export const FAQ = [
  {
    q: 'How do we start?',
    a: 'With a block of at least five prepaid hours. You see every hour in your portal.',
  },
  {
    q: 'How soon will something work?',
    a: 'The first problem is usually solved in 2 to 6 weeks.',
  },
  {
    q: 'Do I have to replace my software?',
    a: 'No. We start with what hurts and connect to the tools that work.',
  },
  {
    q: "How much of my team's time does it take?",
    a: 'A few hours in the first two weeks, then a short weekly check-in.',
  },
  { q: 'Who owns the code?', a: 'You do, along with your data.' },
  {
    q: 'What happens after launch?',
    a: "We keep it running and answer in a shared channel, we teach your team to change it, and we start the next problem when you're ready.",
  },
  {
    q: 'How do you charge?',
    a: 'Only for the hours a person works on your project.',
  },
  { q: 'Can I leave?', a: 'Any time.' },
]
