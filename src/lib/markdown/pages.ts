import { clients } from '@/src/lib/clients'
import { referralContent as referral } from '@/src/lib/referral-content'
import { services } from '@/src/lib/services'
import { team } from '@/src/lib/team'
import { vendors } from '@/src/lib/vendors'
import {
  CONTACT_EMAIL,
  LOCATIONS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/src/lib/site'
import { privacyMarkdown, termsMarkdown } from './legal'

/**
 * One markdown rendition per HTML page, served when a client sends
 * `Accept: text/markdown` (see proxy.ts) and stitched together for
 * /llms-full.txt. Wherever the HTML page reads from a data module (services,
 * team, clients, referral copy, vendors) the markdown reads the same module,
 * so the two cannot drift. Hand-written prose mirrors the page copy.
 */
export type MarkdownPage = {
  /** Site path, always starting with `/` and without a trailing slash. */
  path: string
  /** Short page name for indexes and link text (llms.txt, the 404 map). */
  label: string
  /** Page title as an H1. */
  title: string
  /** One-line summary, used in llms.txt and under the H1. */
  description: string
  /** Which llms.txt section the page is listed under. */
  section: 'Company' | 'Services and process' | 'Get in touch' | 'Legal'
  /** Markdown body, without the H1. */
  body: () => string
}

const locationLine = LOCATIONS.map(l => `${l.locality}, ${l.region}`).join(
  ' and '
)

const phases = [
  {
    title: 'Prototype',
    points: [
      'Test new product ideas',
      'Prove product-market fit',
      'Iterate fast',
    ],
  },
  {
    title: 'Refine',
    points: [
      'Streamline existing systems',
      'Automate the manual work',
      'Save time, cut friction',
    ],
  },
  {
    title: 'Scale',
    points: [
      'Re-architect your stack',
      'Rethink operations for demand',
      'Engineer for peak load',
    ],
  },
  {
    title: 'R&D',
    points: [
      'Analyze your data',
      'Unlock new revenue vectors',
      'Surface your next prototype',
    ],
  },
]

const audiences = [
  {
    title: 'The Lean Mid-Market',
    body: "You're established with real processes in place, but not big enough to justify a full-time dev team. You need senior engineering to optimize and extend your systems without the cost of hiring one.",
  },
  {
    title: 'The Technical Founder',
    body: "You're technical enough to prototype in AI tools and ship a scrappy v1. But you've hit the ceiling where vibe-coded solutions break, and you need real engineering to make it production-grade.",
  },
  {
    title: 'The Design-Led Team',
    body: 'You have the vision, the designers, maybe some technical staff, but no engineering team to execute. You know exactly what you want built. You just need the builders to make it real.',
  },
]

const pillars = [
  {
    title: 'Senior Builders',
    body: 'The engineer who architects your solution is the one who builds it. No account managers, no layers of delegation.',
  },
  {
    title: 'AI-Native',
    body: 'Fine-tuned AI systems let us design and ship exactly what you need, at 3-5x the speed of a traditional team.',
  },
  {
    title: 'Direct Access',
    body: 'You work with the builder directly. No middle management, no handoffs, no telephone game.',
  },
]

const principles = [
  {
    title: 'No Per-Seat Pricing',
    body: 'You own the tech infrastructure. Add as many users as your business needs without watching the bill climb. No per-seat licensing, no penalty for growing your team.',
  },
  {
    title: 'Centralized Business Data',
    body: 'All your business data lives in one place, structured and transparent. That single source of truth keeps the system modular, so you can extend it without rebuilding from scratch.',
  },
  {
    title: 'No SaaS Feature Bloat',
    body: 'You get exactly the features your business runs on, nothing more. No paying for bloated dashboards and modules you will never open.',
  },
]

const process = [
  {
    title: 'Quick Wins',
    body: 'We ship something real, fast. Early wins build trust and a shared shorthand for the bigger decisions ahead.',
  },
  {
    title: 'Ontology',
    body: 'We map how your business actually works, the entities and rules that define your domain, so the software models reality, not a template.',
  },
  {
    title: 'Execution & Verification',
    body: 'Execution runs through our portal, and every task is human-verified before it ships.',
  },
  {
    title: 'Taste',
    body: 'We shape the details and apply hard-won judgment to fit the software to your business context.',
  },
]

const auditCovers = [
  {
    title: 'Your business phase',
    body: 'Where you are on the journey from idea to scaled operation.',
  },
  {
    title: 'Top software opportunities',
    body: 'The highest-leverage places custom software could help.',
  },
  {
    title: 'Where to start first',
    body: 'A prioritized shortlist so you know what to build next.',
  },
  {
    title: 'Tailored recommendations',
    body: 'Specific services matched to your answers, not a generic pitch.',
  },
]

function servicesMarkdown(level: '##' | '###'): string {
  return services
    .map(service =>
      [
        `${level} ${service.title}`,
        '',
        `*${service.tagline}.* ${service.description}`,
        '',
        ...service.features.map(feature => `- ${feature}`),
      ].join('\n')
    )
    .join('\n\n')
}

function phasesMarkdown(): string {
  return phases
    .map(phase =>
      [`### ${phase.title}`, '', ...phase.points.map(p => `- ${p}`)].join('\n')
    )
    .join('\n\n')
}

function titledList(items: { title: string; body: string }[]): string {
  return items.map(item => `- **${item.title}.** ${item.body}`).join('\n')
}

const ctaMarkdown = [
  '## Next step',
  '',
  `- [Start the free audit](${absoluteUrl('/audit')}): two minutes, results on screen, no email required.`,
  `- [Contact us](${absoluteUrl('/contact')}) or email ${CONTACT_EMAIL} if you already know what you want built.`,
].join('\n')

export const markdownPages: MarkdownPage[] = [
  {
    path: '/',
    label: 'Home',
    title: 'Off-the-shelf software is built for everyone. We build for you.',
    description: SITE_DESCRIPTION,
    section: 'Company',
    body: () =>
      [
        `${SITE_NAME} is a custom software, automation, and AI development agency based in ${locationLine}. We build software shaped to how your business actually runs, so you stop juggling a stack of bloated SaaS dashboards.`,
        '',
        '## Who we build for',
        '',
        "Established companies with real processes and a technical mindset, but no engineering team to build what's next.",
        '',
        titledList(audiences),
        '',
        '## We meet you at your stage of business',
        '',
        'Whether you are testing a first idea or re-architecting for scale, we plug in where you are and build from there.',
        '',
        phasesMarkdown(),
        '',
        '## What we build',
        '',
        'End-to-end capabilities, from strategy to deployment.',
        '',
        servicesMarkdown('###'),
        '',
        '## Experienced engineers with fine-tuned AI',
        '',
        titledList(pillars),
        '',
        '## Our development principles',
        '',
        'Own your software instead of renting SaaS, and the economics change.',
        '',
        titledList(principles),
        '',
        ctaMarkdown,
      ].join('\n'),
  },
  {
    path: '/about',
    label: 'About',
    title: `About ${SITE_NAME}`,
    description: `Who ${SITE_NAME} is, where we work from, who builds the software, and how to reach us.`,
    section: 'Company',
    body: () =>
      [
        `${SITE_NAME} is a software agency operating from ${locationLine}. We build custom software, workflow systems, automation, and AI for businesses that have real processes but no in-house engineering team.`,
        '',
        'Our name comes from Archimedes: "Give me a place to stand and a lever and I will move the world." Businesses do not need to be huge to make big moves. They need the right tools and a solid foundation.',
        '',
        '## What we believe',
        '',
        'Off-the-shelf software is built for everyone, which means it fits no one exactly. When you own software built around how your business runs, the economics change: no per-seat fees, your data in one place, and none of the features you never asked for.',
        '',
        '## Who builds your software',
        '',
        'The engineer who scopes your project is the one who builds it. No account managers, no handoffs.',
        '',
        team
          .map(member => `- **${member.name}**, ${member.title}. ${member.bio}`)
          .join('\n'),
        '',
        '## How we work',
        '',
        'Work starts with a $1k minimum that buys a five-hour block. Hours belong to the client, never expire, and can be spent across any project. Clients prepay blocks and see hours, tasks, and invoices live in their portal. When the work is paid for, the client owns the software.',
        '',
        '## Contact',
        '',
        `- Email: ${CONTACT_EMAIL}`,
        `- Web: ${SITE_URL}`,
        `- Locations: ${locationLine}`,
        '',
        ctaMarkdown,
      ].join('\n'),
  },
  {
    path: '/services',
    label: 'Services',
    title: 'What we build',
    description:
      'AI automation, software development, workflow systems, data intelligence, strategic advisory, and managed services.',
    section: 'Services and process',
    body: () =>
      [
        'End-to-end capabilities from strategy to deployment.',
        '',
        servicesMarkdown('##'),
        '',
        ctaMarkdown,
      ].join('\n'),
  },
  {
    path: '/how-we-work',
    label: 'How we work',
    title: 'Our process',
    description:
      'Our production cycle, delivery model, and pricing. Flat-rate blocks, direct access, and AI-powered delivery.',
    section: 'Services and process',
    body: () =>
      [
        'Quick wins to unblock you, a model of how your business actually works, execution through our portal, and hard-won judgment on the details.',
        '',
        '## The four steps',
        '',
        titledList(process),
        '',
        '## Our portal',
        '',
        "Humans and agents, building together. We built our own delivery pipeline. Humans set direction and keep the taste; agents do the heavy building in an isolated cloud. Nothing ships until we've verified it. A conversation, an email, or a meeting becomes a card on the board, ready to hand off.",
        '',
        '## Our tech stack',
        '',
        'The frontier AI models and modern infrastructure behind every build.',
        '',
        ...['ai', 'infra'].map(category =>
          [
            `### ${category === 'ai' ? 'AI models' : 'Infrastructure'}`,
            '',
            ...vendors
              .filter(v => v.category === category)
              .map(v => `- [${v.name}](${v.url}): ${v.description}`),
            '',
          ].join('\n')
        ),
        '## Pricing',
        '',
        titledList(
          referral.howWeWork.points.map(p => ({ title: p.title, body: p.body }))
        ),
        '',
        '## We meet you at your stage of business',
        '',
        phasesMarkdown(),
        '',
        ctaMarkdown,
      ].join('\n'),
  },
  {
    path: '/audit',
    label: 'Free Opportunity Audit',
    title: 'Free Opportunity Audit',
    description:
      'A free two-minute audit that shows where custom software would give your business the most leverage. No email required.',
    section: 'Services and process',
    body: () =>
      [
        `${SITE_NAME} builds custom software for businesses ready to stop duct-taping tools together. The audit is an interactive questionnaire; take it in a browser at ${absoluteUrl('/audit')}. Results appear on screen, and you only give an email if you want them sent to you.`,
        '',
        '## What the audit covers',
        '',
        titledList(auditCovers),
        '',
        '## What we can build for you',
        '',
        services.map(s => `- **${s.title}.** ${s.description}`).join('\n'),
        '',
        `Prefer to talk first? [Contact us](${absoluteUrl('/contact')}).`,
      ].join('\n'),
  },
  {
    path: '/clients',
    label: 'Clients',
    title: 'Who we build for',
    description:
      "A selection of the brands we've partnered with to design, build, and ship software that earns its keep.",
    section: 'Company',
    body: () =>
      [
        clients
          .map(c => `- [${c.title}](${c.href}): ${c.description}`)
          .join('\n'),
        '',
        ctaMarkdown,
      ].join('\n'),
  },
  {
    path: '/team',
    label: 'Team',
    title: 'The builders',
    description: 'Senior engineers who own your project end-to-end.',
    section: 'Company',
    body: () =>
      team
        .map(member =>
          [
            `## ${member.name}`,
            '',
            `*${member.title}.* ${member.bio}`,
            '',
            ...Object.entries(member.socials).map(
              ([network, url]) => `- ${network}: ${url}`
            ),
          ].join('\n')
        )
        .join('\n\n'),
  },
  {
    path: '/contact',
    label: 'Contact',
    title: "Let's talk",
    description: `Get in touch with ${SITE_NAME}. Send a message or book a call directly.`,
    section: 'Get in touch',
    body: () =>
      [
        "Send a message and we'll get back to you within one business day.",
        '',
        `- Email: ${CONTACT_EMAIL}`,
        `- Contact form: ${absoluteUrl('/contact')} (name, email, subject, message; company and website optional)`,
        `- Locations: ${locationLine}`,
        '',
        `Not sure what you need yet? [Start the free audit](${absoluteUrl('/audit')}).`,
      ].join('\n'),
  },
  {
    path: '/referral',
    label: 'Referral program',
    title: referral.hero.headline,
    description: referral.meta.description,
    section: 'Get in touch',
    body: () =>
      [
        referral.hero.body,
        '',
        `## ${referral.whoWeAre.label}`,
        '',
        referral.whoWeAre.body,
        '',
        referral.whoWeAre.services
          .map(s => `- **${s.name}:** ${s.items.join(', ')}`)
          .join('\n'),
        '',
        `## ${referral.whoToSend.label}`,
        '',
        titledList(
          referral.whoToSend.cards.map(c => ({ title: c.title, body: c.body }))
        ),
        '',
        referral.whoToSend.leadIn,
        '',
        referral.whoToSend.quotes.map(q => `- "${q}"`).join('\n'),
        '',
        `## ${referral.howItWorks.label}`,
        '',
        referral.howItWorks.steps
          .map(s => `${s.number}. **${s.title}** ${s.body}`)
          .join('\n'),
        '',
        `## ${referral.howWeWork.label}`,
        '',
        titledList(
          referral.howWeWork.points.map(p => ({ title: p.title, body: p.body }))
        ),
        '',
        `${referral.join.note} ${referral.join.noteCta} ${referral.join.url}`,
        '',
        `${referral.audit.heading} ${referral.audit.body} ${referral.audit.url}`,
      ].join('\n'),
  },
  {
    path: '/privacy',
    label: 'Privacy policy',
    title: 'Privacy Policy',
    description:
      'How Place To Stand collects, uses, shares, and protects personal information from our website, contact form, and opportunity audit.',
    section: 'Legal',
    body: () => privacyMarkdown.trim(),
  },
  {
    path: '/terms',
    label: 'Terms of service',
    title: 'Terms of Service',
    description:
      'The terms that govern use of the Place To Stand website and the Opportunity Audit, and the general conditions under which we deliver client work.',
    section: 'Legal',
    body: () => termsMarkdown.trim(),
  },
]

/** Strip a trailing slash and query so `/services/` matches `/services`. */
export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

export function getMarkdownPage(pathname: string): MarkdownPage | undefined {
  const path = normalizePath(pathname)
  return markdownPages.find(page => page.path === path)
}

/** The full document for one page: H1, summary, body, and a footer of links. */
export function renderMarkdownPage(page: MarkdownPage): string {
  return [
    `# ${page.title}`,
    '',
    `> ${page.description}`,
    '',
    page.body(),
    '',
    '---',
    '',
    `Canonical HTML: ${absoluteUrl(page.path)}`,
    `Site index for agents: ${absoluteUrl('/llms.txt')} · Full text: ${absoluteUrl('/llms-full.txt')}`,
    '',
  ].join('\n')
}

/** Markdown body for a 404, pointing agents at where to look next. */
export function renderNotFoundMarkdown(pathname: string): string {
  const path = normalizePath(pathname)
  return [
    '# 404: Page not found',
    '',
    `> There is no page at \`${path}\` on ${SITE_URL}.`,
    '',
    'Where to look next:',
    '',
    `- [Site index for agents](${absoluteUrl('/llms.txt')}): every page with a one-line summary`,
    `- [Full site text](${absoluteUrl('/llms-full.txt')}): all pages as one markdown file`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    '',
    '## Pages',
    '',
    ...markdownPages.map(
      page =>
        `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`
    ),
    '',
    `Any page returns markdown when requested with \`Accept: text/markdown\`. Contact: ${CONTACT_EMAIL}`,
    '',
  ].join('\n')
}
