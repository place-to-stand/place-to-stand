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
  /** Clients who run it ("Built for"). */
  builtFor?: string[]
}

/** A visitor's own words: the "Sound familiar?" lines on Platform. */
export type Quote = string

export type Offer = {
  /** Also the section id on Platform: /platform#run, /platform#sell. */
  slug: 'run' | 'sell'
  name: string
  /** The intro under the title on Platform. */
  summary: string
  quotes: Quote[]
  modules: Module[]
}

/** The Platform header (approved Nov 13). */
export const PLATFORM_HEADER = {
  label: 'Platform',
  title: 'Software you own, built around how you work.',
  intro:
    'One team, three kinds of work: systems that run the business, stores that sell, and engineering help for teams that already write code. Each piece works on its own, and they all share one home for your data.',
}

/** "Your data, ready for AI" on Platform (approved Nov 13). */
export const DATA_HOME = {
  label: 'Your Data, Ready for AI',
  title: 'One home for your data.',
  body: "Everything we build shares one source of data, so you can answer questions about your business in one place. Your own AI tools can work with it too, and each person's tools see only what their role allows.",
}

/** "Engineering help for your team" on Platform (#engineering-help, approved Nov 13). */
export const ENGINEERING_HELP = {
  name: 'Engineering help for your team',
  summary:
    'For teams that already have code, and sometimes developers, and need experienced engineers beside them.',
  quotes: [
    'We need a developer but can’t hire one full-time.',
    'Someone built this for us and disappeared.',
    'We built it with AI and now it keeps breaking.',
  ],
  items: [
    {
      name: 'Pick up where others left off',
      job: 'We read what’s there, tell you plainly what state it’s in, and fix what matters first.',
    },
    {
      name: 'Make an AI-built first version solid',
      job: 'Tests, security, hosting and the parts that break under real use.',
    },
    {
      name: 'Work beside your developers',
      job: 'Experienced engineers on your team for as many hours as you need.',
    },
    {
      name: 'Technical consulting',
      job: 'Advice on what to build, buy or hire for, from people who build every day.',
    },
  ],
}

/** The two product offers (approved Nov 13). */
export const OFFERS: Offer[] = [
  {
    slug: 'run',
    name: 'Run your business',
    summary:
      'One system for the work behind the scenes, built around how your team works. It starts as a copy of the portal we run on, trimmed to what you need.',
    quotes: [
      'We run this on spreadsheets and it’s breaking.',
      'We pay for five tools that don’t talk to each other.',
      'Per-seat pricing is killing us. We can’t add people without the software bill doubling.',
      'One admin task eats my week and I can’t grow the business around it.',
      'I have all this data and still can’t answer one simple question about my business.',
    ],
    modules: [
      {
        name: 'Team workspace',
        job: 'Clients, projects, tasks and time in one place.',
        insteadOf: ['Monday', 'Asana', 'ClickUp'],
      },
      {
        name: 'CRM',
        job: 'Every lead, contact and company, with its whole history.',
        insteadOf: ['HubSpot', 'Salesforce', 'Pipedrive'],
      },
      {
        name: 'Workflows',
        job: 'The steps your team repeats, done the same way every time.',
        insteadOf: ['Spreadsheets', 'Checklists'],
      },
      {
        name: 'Automations',
        job: 'Work that runs on its own: reports, reminders, syncing data between tools.',
        insteadOf: ['Zapier', 'Make'],
      },
      {
        name: 'Client portal',
        job: 'Where your customers check progress, see their hours and pay.',
        insteadOf: ['Emailed PDFs', 'Status calls'],
      },
      {
        name: 'Reports',
        job: 'Live numbers from your own data.',
        insteadOf: ['Exported spreadsheets'],
      },
      {
        name: 'Website',
        job: 'Your marketing site, designed and built by us, with every form feeding the CRM. Our own site is the proof.',
      },
    ],
  },
  {
    slug: 'sell',
    name: 'Sell online',
    summary:
      'Custom stores and marketplaces for things standard store tools can’t sell well, on Shopify when it fits.',
    quotes: [
      'Our Shopify store can’t do the thing we need.',
      'Orders come in by DM, text and email, and we lose track of them.',
      'Off-the-shelf store tools weren’t built to sell what we sell.',
    ],
    modules: [
      {
        name: 'Custom marketplaces',
        job: 'Buyers and sellers, or leads and installers, on one platform you own.',
        builtFor: ['GreenWATT USA (solar leads)'],
      },
      {
        name: 'Shopify stores and apps',
        job: 'Themes, headless storefronts and apps for checkout rules and discounts Shopify can’t do alone.',
        builtFor: ['Heatonist', 'Hot Ones', 'Blake Brown Beauty'],
      },
      {
        name: 'Made-to-order and drop-ship',
        job: 'Products made or shipped by someone else, sold as if they were on your shelf.',
        builtFor: ['Up the Wall (print on demand)'],
      },
      {
        name: 'Order intake',
        job: 'One form that sends every order, files and all, to a single queue, instead of hunting through DMs and email threads.',
      },
      {
        name: 'Payments',
        job: 'Checkout, subscriptions and invoices through Stripe.',
      },
      {
        name: 'Order routing',
        job: 'Each order goes to the right warehouse at checkout, so no one sorts them by hand.',
        builtFor: ['Heatonist'],
      },
    ],
  },
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
      title: 'Experienced Builders',
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

/** After launch on Platform (#after-launch, approved Nov 13). */
export const AFTER_LAUNCH_INTRO =
  'Once the first build is live, you choose how much help you want.'

export const AFTER_LAUNCH = [
  {
    name: 'Managed services',
    body: 'We keep it running: security updates, error and speed checks, analytics and SEO reports, data checks, a weekly email, and a shared channel in Slack, Teams, Google Chat or Discord. Ask us for a price.',
  },
  {
    name: 'Training',
    body: 'We teach your team to use AI tools on their own real tasks while we build.',
  },
  {
    name: 'The next fix',
    body: 'When something else starts to hurt, we start on it.',
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
    q: 'How soon will something work?',
    a: 'The first fix is usually in daily use within 2 to 6 weeks.',
  },
  {
    q: 'Do I have to replace my software?',
    a: 'No. We start with what hurts and connect to the tools that work.',
  },
  {
    q: "How much of my team's time does it take?",
    a: 'A few hours in the first two weeks, then a short check-in every week or two.',
  },
  {
    q: 'We built it with AI and now it keeps breaking. Can you help?',
    a: "Yes. We read what you have, tell you plainly what's wrong, then fix it or rebuild the parts that need it.",
  },
  {
    q: 'We have developers. Can you work with them?',
    a: 'Yes. We can join your team, review its code, or advise on what to build, buy or hire for.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do, along with your data and your accounts.',
  },
  { q: 'Does my data train AI?', a: 'No. Never.' },
  {
    q: 'How do you charge?',
    a: "Only for the hours a person works on your project. You buy hours in prepaid blocks. They aren't refunded, but they never expire.",
  },
  {
    q: 'What happens after launch?',
    a: "You choose. If you want, we keep it running for an agreed price, with a shared channel for your team. We can teach your team to change it, and we start the next fix when you're ready. Either way, we're always an email or a message away.",
  },
  {
    q: 'Can I leave?',
    a: "Any time. There's no contract to get out of. Hours you haven't used never expire, so they're there if you come back, and you keep everything we built.",
  },
]
