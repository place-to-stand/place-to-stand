/**
 * FAQ source of truth.
 *
 * The homepage uses `homepageFaqs` (a tight 5) as a teaser section. The
 * standalone /faq page uses `faqCategories`, which is the full set grouped
 * for scanning. Keeping both in one file means edits to the headline answers
 * stay in sync across the site.
 */

export type FAQ = {
  question: string
  answer: string
}

export type FAQCategory = {
  title: string
  description?: string
  items: FAQ[]
}

export const homepageFaqs: FAQ[] = [
  {
    question: 'What types of businesses do you partner with?',
    answer:
      'Businesses of all sizes. We are focused on solving real-world problems. If you are looking for a growth partner to unlock your business, let us know.',
  },
  {
    question: 'What is typically included in an engagement?',
    answer:
      "It depends on what you need, but we usually cover the full picture — research to understand your customers, brand and design work, building the actual product, and helping you launch. We'll work alongside your team to make sure nothing stalls.",
  },
  {
    question: 'How long does a project usually take?',
    answer:
      "Focused sprints like landing pages ship in 2–4 weeks with assets ready. Full-funnel initiatives spanning brand, product, and marketing typically take 8–12 weeks. We set milestones together so you always know what's shipping when.",
  },
  {
    question: 'How do you price your services?',
    answer:
      'We sell flat-rate blocks of capacity instead of hourly or fixed-bid. After an alignment call, you get a clear block recommendation, what it includes, and the cadence we run it on.',
  },
  {
    question: 'Do you stay involved after launch?',
    answer:
      'Yes. Once an app is stable, it enters our long-term support tier — security patches, hosting, code updates, and general IT for what we built. Same team, same blocks.',
  },
]

export const faqCategories: FAQCategory[] = [
  {
    title: 'Engagements',
    description: 'How a project starts and what working together looks like.',
    items: [
      {
        question: 'What types of businesses do you partner with?',
        answer:
          'Owner-led small and mid-sized businesses where a real person can decide quickly. We have shipped for trades, professional services, creative studios, and SaaS teams. If you have a clear problem and a willingness to move, the industry is rarely the blocker.',
      },
      {
        question: 'How does an engagement typically start?',
        answer:
          'We start with a short call to understand the business and the pain. From there we either run an AI Opportunity Audit, scope a specific build, or, occasionally, tell you that off-the-shelf software is the right answer. We will not invent a project to sell you one.',
      },
      {
        question: 'Do you work alongside our existing team?',
        answer:
          'Yes. We are most useful as an extension of an in-house team. We slot into your existing tools — Slack, Linear, GitHub, Notion — and we work the way your team already works. No mandatory PM software, no parallel universe.',
      },
      {
        question: 'Will we be working with senior people?',
        answer:
          'Always. The same senior engineers and designers you meet on the first call are the people building your project. We do not hand projects off to junior contractors after the sale.',
      },
    ],
  },
  {
    title: 'Pricing & Timelines',
    description: 'What it costs, how long it takes, and what you are buying.',
    items: [
      {
        question: 'How do you price your services?',
        answer:
          'Flat-rate blocks of capacity. A block buys a known number of hours at a known price. You decide when to spend them. No hourly billing, no fixed-bid surprises, no surprise invoices.',
      },
      {
        question: 'Why blocks instead of hourly or fixed bid?',
        answer:
          "Hourly punishes us for working efficiently. Fixed bids force us to pad for unknowns you may never hit. Blocks let us move fast, let you control spend, and don't reward either side for dragging the project out.",
      },
      {
        question: 'How long does a project usually take?',
        answer:
          'A focused build like a landing page or a single workflow automation typically ships in 2–4 weeks. Full bespoke applications usually run 8–12 weeks of active build time, depending on scope and how quickly we get feedback on each cycle.',
      },
      {
        question: 'Do unused hours expire?',
        answer:
          'No. If you need to pause for a quarter, your blocks are waiting when you come back. We do not penalize you for breathing.',
      },
    ],
  },
  {
    title: 'Process',
    description: 'How the work actually gets done.',
    items: [
      {
        question: 'What is the four-day production cycle?',
        answer:
          'A continuous rhythm: human review and feedback intake during the day, AI-assisted build work overnight, two passes a week. Your project plugs into the loop instead of sitting in a backlog waiting on a sprint kickoff.',
      },
      {
        question: 'Where do you live in our stack?',
        answer:
          'Wherever you already are. We default to Next.js, TypeScript, Tailwind, Supabase, and Vercel for new builds — but if you have an existing stack we should keep, we keep it. We are not in the business of forcing rewrites.',
      },
      {
        question: 'Do we have to use AI?',
        answer:
          'No. AI is a tool we use to move faster, not the deliverable. If the right answer for a problem is a database migration and a cron job, that is what we build. We will tell you when an AI feature is the wrong answer.',
      },
      {
        question: 'How do we know what is happening week to week?',
        answer:
          'You get a private Portal with active work, upcoming cycles, and approvals waiting on you. We also send a short update email twice a week tied to the production cycle. No status meeting required.',
      },
    ],
  },
  {
    title: 'After Launch',
    description: 'What happens once the app is live.',
    items: [
      {
        question: 'Do you stay involved after launch?',
        answer:
          'Yes. Stable products enter our long-term support tier — security patches, hosting and DNS, dependency upgrades, and small improvements pulled from the same block of hours. Same team, same Portal.',
      },
      {
        question: 'Who owns the code?',
        answer:
          "You do. The repository is yours from day one. We work in your GitHub org (or transfer it to you at handoff if you'd rather we hold it during the build). There is no hostage arrangement.",
      },
      {
        question: 'What if we want to bring it in-house later?',
        answer:
          'Great — that is often the right move. We document as we go and run an explicit handoff so an in-house engineer can take over without a treasure hunt. We have done this with multiple clients and we are happy when it works.',
      },
    ],
  },
]
