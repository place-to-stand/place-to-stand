/**
 * Copy that more than one renderer shows: the HTML sections, the markdown
 * renditions served to agents (src/lib/markdown/pages.ts), and in some cases
 * the audit landing. Each list holds text only; the component that draws it
 * pairs each entry with its graphic or icon by position, so edit an entry here
 * and every surface changes together. Add or remove an entry and the pairing
 * arrays in the components need the same change.
 */

export type CopyItem = { title: string; description: string }

/** Who we build for (homepage). */
export const audiences: CopyItem[] = [
  {
    title: 'The Lean Mid-Market',
    description:
      "You're established with real processes in place, but not big enough to justify a full-time dev team. You need senior engineering to optimize and extend your systems without the cost of hiring one.",
  },
  {
    title: 'The Technical Founder',
    description:
      "You're technical enough to prototype in AI tools and ship a scrappy v1. But you've hit the ceiling where vibe-coded solutions break, and you need real engineering to make it production-grade.",
  },
  {
    title: 'The Design-Led Team',
    description:
      'You have the vision, the designers, maybe some technical staff, but no engineering team to execute. You know exactly what you want built. You just need the builders to make it real.',
  },
]

/** The stages of business we meet clients at (homepage, how-we-work). */
export const businessPhases: { title: string; points: string[] }[] = [
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

/** Who we are (homepage manifesto, audit landing). */
export const facets: CopyItem[] = [
  {
    title: 'Senior Builders',
    description:
      'The engineer who architects your solution is the one who builds it. No account managers, no layers of delegation.',
  },
  {
    title: 'AI-Native',
    description:
      'Fine-tuned AI systems let us design and ship exactly what you need, at 3-5x the speed of a traditional team.',
  },
  {
    title: 'Direct Access',
    description:
      'You work with the builder directly. No middle management, no handoffs, no telephone game.',
  },
]

/** Our development principles (homepage pillars). */
export const principles: CopyItem[] = [
  {
    title: 'No Per-Seat Pricing',
    description:
      'You own the tech infrastructure. Add as many users as your business needs without watching the bill climb. No per-seat licensing, no penalty for growing your team.',
  },
  {
    title: 'Centralized Business Data',
    description:
      'All your business data lives in one place, structured and transparent. That single source of truth keeps the system modular, so you can extend it without rebuilding from scratch.',
  },
  {
    title: 'No SaaS Feature Bloat',
    description:
      'You get exactly the features your business runs on, nothing more. No paying for bloated dashboards and modules you will never open.',
  },
]

/** The four steps of an engagement (how-we-work). */
export const processSteps: CopyItem[] = [
  {
    title: 'Quick Wins',
    description:
      'We ship something real, fast. Early wins build trust and a shared shorthand for the bigger decisions ahead.',
  },
  {
    title: 'Ontology',
    description:
      'We map how your business actually works, the entities and rules that define your domain, so the software models reality, not a template.',
  },
  {
    title: 'Execution & Verification',
    description:
      'Execution runs through our portal, and every task is human-verified before it ships.',
  },
  {
    title: 'Taste',
    description:
      'We shape the details and apply hard-won judgment to fit the software to your business context.',
  },
]

/** What the Opportunity Audit reports on (audit landing). */
export const auditCovers: CopyItem[] = [
  {
    title: 'Your business phase',
    description: 'Where you are on the journey from idea to scaled operation.',
  },
  {
    title: 'Top software opportunities',
    description: 'The highest-leverage places custom software could help.',
  },
  {
    title: 'Where to start first',
    description: 'A prioritized shortlist so you know what to build next.',
  },
  {
    title: 'Tailored recommendations',
    description:
      'Specific services matched to your answers, not a generic pitch.',
  },
]

/** What we believe (about page). */
export const beliefs: CopyItem[] = [
  {
    title: 'Own it, do not rent it',
    description:
      'Off-the-shelf software is built for everyone, which means it fits no one exactly. When you own software built around how your business runs, the economics change: no per-seat fees, your data in one place, and none of the features you never asked for.',
  },
  {
    title: 'The builder is the contact',
    description:
      'The engineer who scopes your project is the one who builds it. No account managers, no handoffs, no telephone game.',
  },
  {
    title: 'Clear pricing',
    description:
      'Work starts with a $1k minimum that buys a five-hour block. Hours belong to you, never expire, and can be spent across any project. You see hours, tasks, and invoices live in your portal.',
  },
]
