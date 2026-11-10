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
  example?: string
}

export type Offer = {
  slug: 'run-your-business' | 'sell-online'
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
  'Across all of it: one search, and each person sees only what their role allows.'

/** Shown once below both offers on Platform. */
export const MOBILE_APPS =
  'We also build mobile apps, for your team or your customers.'

export const OFFERS: Offer[] = [
  {
    slug: 'run-your-business',
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
    slug: 'sell-online',
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

export const OWNERSHIP = [
  { title: 'Your code.', body: 'Everything we build for you is yours.' },
  {
    title: 'Your data.',
    body: 'We use it only to do the work, and it never trains AI.',
  },
  {
    title: 'Your accounts.',
    body: 'It runs on hosting in your name, not ours.',
  },
  { title: 'No seat fees.', body: 'Add people without paying more.' },
  {
    title: 'No lock-in.',
    body: 'Walk away any time and take it all with you.',
  },
  {
    title: 'One home for your data,',
    body: 'so AI agents can work with it.',
  },
]

export type Step = {
  number: string
  name: string
  time: string
  summary: string
  detail: string
}

export const STEPS: Step[] = [
  {
    number: '01',
    name: 'Intro call',
    time: '30 min · Free',
    summary:
      "Tell us what you need and roughly how big it is. We'll say plainly if we're the right fit.",
    detail:
      "A free 30-minute call to check fit. Tell us what you need and roughly how big it is, and we'll say plainly if we're the right fit.",
  },
  {
    number: '02',
    name: 'Discovery session',
    time: '1 hour',
    summary:
      'We dig into what slows the business down and ask the questions that shape the plan.',
    detail:
      'You tell us what slows the business down, and we ask the questions that shape the plan.',
  },
  {
    number: '03',
    name: 'Meet your team',
    time: '1 to 2 weeks',
    summary:
      'We sit with the people who live the problem, then send a written plan and estimate.',
    detail:
      'We sit with the people who do the work and feel the problem every day. Then you get a written plan: what we’d build first, how long it takes, and what it costs.',
  },
  {
    number: '04',
    name: 'Solve one problem',
    time: '2 to 6 weeks',
    summary:
      'We build one thing completely and put it into daily use. Not a demo.',
    detail:
      'We build one thing completely, connect it to the tools you keep, and put it into daily use.',
  },
  {
    number: '05',
    name: 'Grow from there',
    time: 'Days, not months',
    summary:
      'Your data already sits in one place, so each next problem goes faster.',
    detail: 'With your data in one place, each next problem takes days.',
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

export const BILLING = {
  title: "You pay for people's time. Nothing else.",
  body: 'We bill only for the hours a person spends on your work, in prepaid blocks. AI tools and agents that run in the background cost you nothing extra. No long-term contract: walk away any time.',
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
