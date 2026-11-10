/**
 * Referral program copy — the single source of truth for both the /referral
 * page and the downloadable PDF (/referral/pdf). Edit strings here; never
 * duplicate them in either renderer.
 */
import { OFFERS } from './offers'
import { services } from './services'
export const referralContent = {
  meta: {
    title: 'Referral Program',
    description:
      'Refer a client to Place To Stand and earn 10% of their lifetime billing, for as long as they stay a client. No cap, no expiration.',
  },

  hero: {
    label: 'Referral Program',
    headline: 'Send us a client. Earn 10% of everything they ever pay us.',
    body: 'Not 10% of the first project. Ten percent of their lifetime billing, for as long as they stay a client.',
    downloadLabel: 'Download PDF One-pager',
    joinLabel: 'Join the referral program',
  },

  whoWeAre: {
    label: 'Who we are',
    headline: 'Off-the-shelf software is built for everyone. We build for you.',
    body: 'Place To Stand builds custom software shaped to how a business actually runs, for companies that have real processes but no engineering team. The engineer who scopes the work is the one who builds it. No account managers, no handoffs.',
    // The same lists as Platform: the two offers' modules, then the
    // after-launch services.
    services: [
      ...OFFERS.map(offer => ({
        name: offer.name,
        items: offer.modules.map(module => module.name),
      })),
      ...services
        .filter(service =>
          ['managed-services', 'technical-consulting', 'training'].includes(
            service.slug
          )
        )
        .map(service => ({ name: service.title, items: service.features })),
    ],
  },

  whoToSend: {
    label: 'Who to refer',
    cards: [
      {
        title: 'The lean mid-market company',
        body: 'Established, real processes, too small to hire a dev team.',
      },
      {
        title: 'The technical founder',
        body: 'Prototyped in AI tools, shipped a scrappy v1, hit the ceiling where it breaks.',
      },
      {
        title: 'The design-led team',
        body: 'Has the vision and the designers, needs builders.',
      },
    ],
    quotesLabel: 'Signals',
    leadIn: "You'll know one when you hear them say:",
    quotes: [
      "We run this on spreadsheets and it's breaking.",
      "We pay for five tools that don't talk to each other.",
      "Per-seat pricing is killing us. We can't add people without the software bill doubling.",
      "One admin task eats my week and I can't grow the business around it.",
      "I have all this data and still can't answer one simple question about my business.",
      "Our Shopify store can't do the thing we need.",
      "We need a developer but can't hire one full-time.",
      'Someone built this for us and disappeared.',
    ],
  },

  howItWorks: {
    label: 'How it works',
    steps: [
      {
        number: '01',
        title: 'Intro us by email.',
        body: 'One line is enough: "You two should talk." Copy hello@placetostandagency.com.',
      },
      {
        number: '02',
        title: 'We take it from there.',
        body: "A 30-minute intro call, then discovery, scope and a proposal. You don't manage anything.",
      },
      {
        number: '03',
        title: 'They sign, you get paid.',
        body: 'On the 15th of each month we pay you 10% of everything they paid us the month before. No cap, no expiration.',
      },
    ],
  },

  howWeWork: {
    label: 'How we work',
    points: [
      {
        title: 'Five-hour minimum to start.',
        body: 'Hours belong to the client, never expire, and can be spent on any project.',
      },
      {
        title: 'No surprise bills.',
        body: 'Clients prepay blocks and see hours, tasks, and invoices live in their portal.',
      },
      {
        title: 'They own the software.',
        body: 'No per-seat fees, no subscription fees to us, no feature bloat, all their data in one place.',
      },
    ],
  },

  join: {
    note: 'Payouts require referrers to be accepted into the program and set up as 1099 contractors.',
    noteCta: 'Contact us to join.',
    pdfCta: 'Join at placetostandagency.com/contact.',
    href: '/contact?subject=Referral%20program',
    url: 'https://placetostandagency.com/contact?subject=Referral%20program',
  },

  audit: {
    heading: "Not sure if someone's a fit?",
    body: 'Send them the free two-minute audit: a preview on screen, the full results by email.',
    buttonLabel: 'Start the free audit',
    href: '/audit',
    url: 'https://placetostandagency.com/audit',
  },

  footer: {
    company: 'Place To Stand Agency',
    locations: 'Austin, TX · Brooklyn, NY',
    site: 'placetostandagency.com',
    siteUrl: 'https://placetostandagency.com',
    contacts: [
      { name: 'Jason Desiderio', email: 'jason@placetostandagency.com' },
      { name: 'Kris Crawford', email: 'kris@placetostandagency.com' },
    ],
  },
} as const

export type ReferralContent = typeof referralContent
