/**
 * Home page copy (approved Nov 13). The hero, steps, ownership and closing
 * band keep their copy in their own components and src/lib/offers.ts; this
 * holds the sections built for Home: proof, the "Sound familiar?" groups and
 * who you work with. Referral reuses WHO_YOU_WORK_WITH_HOME.
 */

export const HOME_HERO = {
  sub: 'Our senior engineers build the systems behind your business and the stores in front of it. We keep building after launch, for as long as you want. You own the code and the data, with no per‑user fees.',
  auditLead: 'Not ready to talk?',
} as const

export const HOME_PROOF = {
  label: 'Client Results',
  // A no-break space keeps "Hot Ones" on one line.
  title: 'Building the Hot\u00a0Ones and Heatonist stores since 2023.',
  body: "Online stores and Shopify apps for Heatonist and its long-time partner, Hot Ones. Over 1,400 changes shipped so far, and we're still on the team.",
  links: [
    { label: 'Read the Heatonist case study', href: '/clients/heatonist' },
  ],
} as const

export const SOUND_FAMILIAR = {
  label: 'Sound Familiar?',
  /** Moved here from the hero (Nov 14) while the hero tries the logos. */
  title: 'Stop bending your business to fit your software.',
  intro: 'Most clients start with one of these.',
  groups: [
    {
      name: 'Run your business',
      quotes: [
        "We run this on spreadsheets and it's breaking.",
        "We pay for five tools that don't talk to each other.",
        "I have all this data and still can't answer one simple question about my business.",
      ],
      build:
        'One system for the work behind the scenes, built around how you work, with all your data in one place. We run Place To Stand on it ourselves, and the code is public.',
      link: { label: 'See Run your business', href: '/platform#run' },
    },
    {
      name: 'Sell online',
      quotes: [
        "Our Shopify store can't do the thing we need.",
        'Orders come in by DM, text and phone, and we lose track of them.',
        "Off-the-shelf store tools weren't built to sell what we sell.",
      ],
      build:
        'Custom stores and marketplaces, on Shopify when it fits. Or one order form that sends every request, files and all, to a single queue.',
      link: { label: 'See Sell online', href: '/platform#sell' },
    },
    {
      name: 'Senior help',
      quotes: [
        "We need a developer but can't hire one full-time.",
        'Someone built this for us and disappeared.',
        'We built it with AI and now it keeps breaking.',
      ],
      build:
        "We pick up where others left off, or work beside your developers. When you need advice more than code, that's technical consulting.",
      link: { label: 'See Senior help', href: '/platform#senior-help' },
    },
  ],
} as const

export const WHO_YOU_WORK_WITH_HOME = {
  label: 'Who You Work With',
  title: 'The people on the call build it.',
  body: "No account managers and no handoffs. Humans decide what to build, AI agents write much of the code, and nothing ships until one of us has checked it. That's how we work up to 5x faster than a traditional team.",
  /** Home's one line per founder, matched to src/lib/team.ts by name. */
  founders: {
    'Jason Desiderio':
      'Years of leading engineering teams, including at Squarespace.',
    'Kris Crawford':
      'Designed physical systems meant to last decades before he turned to software, and has run his own businesses for ten years.',
  } as Record<string, string>,
} as const
