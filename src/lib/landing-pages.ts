export type LandingVariant = {
  slug: string
  audience: string
  eyebrow: string
  headline: string
  subheadline: string
  outcomeBullets: string[]
  painPoints: string[]
  differentiators: string[]
  ctaLabel: string
}

export const bookingLink = 'https://calendar.app.google/sKeXakpFVXRJkRjH7'

export const landingVariants: LandingVariant[] = [
  {
    slug: 'fast-start',
    audience: 'For busy local business owners',
    eyebrow: 'Variant A · Speed-first message',
    headline: 'Get your next growth system live in weeks, not months.',
    subheadline:
      'Skip bloated agency timelines. We build the exact systems your team needs to save time, capture leads, and close more business.',
    outcomeBullets: [
      'Book a call and leave with a practical action plan',
      'Launch with a clear scope and flat-rate pricing',
      'Start seeing operational wins in your day-to-day workflow',
    ],
    painPoints: [
      'Manual work is eating up your best people',
      'Leads slip through because tools do not talk to each other',
      'You need momentum without hiring a full in-house team',
    ],
    differentiators: [
      'Built for small business realities and budgets',
      'Direct access to builders, not account-manager layers',
      'Private client portal for visibility from day one',
    ],
    ctaLabel: 'Book a call and get a fast-start plan',
  },
  {
    slug: 'profit-focus',
    audience: 'For owners focused on margin and ROI',
    eyebrow: 'Variant B · ROI-first message',
    headline: 'Turn tech spend into measurable profit leverage.',
    subheadline:
      'Every project is anchored to business outcomes: better conversion, lower admin overhead, and stronger retention from cleaner client experiences.',
    outcomeBullets: [
      'Identify the highest-value bottleneck in your funnel',
      'Prioritize systems that improve margin first',
      'Map simple KPIs you can track after launch',
    ],
    painPoints: [
      'Current tools cost money but do not move the needle',
      'You are unsure what to automate vs what to keep human',
      'Growth feels expensive because operations are fragmented',
    ],
    differentiators: [
      'Outcome-led strategy before implementation',
      'No vanity dashboards or unnecessary complexity',
      'Practical recommendations your team can actually use',
    ],
    ctaLabel: 'Book a call and map ROI opportunities',
  },
  {
    slug: 'done-for-you',
    audience: 'For owners who need execution, not more advice',
    eyebrow: 'Variant C · Done-for-you message',
    headline: 'You run the business. We build the engine behind it.',
    subheadline:
      'From lead capture to follow-up workflows, we design and ship production-ready systems so your team can stay focused on customers.',
    outcomeBullets: [
      'Leave the call with a clear implementation path',
      'Get hands-on build support from our core team',
      'Launch with clean handoff documentation for your staff',
    ],
    painPoints: [
      'Internal teams are already stretched thin',
      'Past vendors left unfinished or hard-to-maintain setups',
      'You need dependable execution with clear ownership',
    ],
    differentiators: [
      'Senior builders involved from discovery through delivery',
      'Structured implementation process with weekly visibility',
      'Clean, maintainable systems tailored to your operation',
    ],
    ctaLabel: 'Book a call and get execution support',
  },
  {
    slug: 'stress-free-growth',
    audience: 'For owners who want calm, sustainable growth',
    eyebrow: 'Variant D · Simplicity-first message',
    headline: 'Build a calmer business that still grows.',
    subheadline:
      'We simplify your stack, remove bottlenecks, and create repeatable workflows so growth does not rely on constant fire drills.',
    outcomeBullets: [
      'Create a more predictable client acquisition flow',
      'Reduce team context-switching and admin chaos',
      'Build systems that scale without adding unnecessary complexity',
    ],
    painPoints: [
      'Every week feels reactive and rushed',
      'Processes live in people, not systems',
      'Growth currently increases stress instead of stability',
    ],
    differentiators: [
      'Small-business-first architecture and implementation',
      'Clear operating rhythm for project delivery',
      'Future-ready systems that remain easy to manage',
    ],
    ctaLabel: 'Book a call to simplify and scale',
  },
  {
    slug: 'ai-coworker',
    audience: 'For owners who need another operator without another payroll line',
    eyebrow: 'Variant E · AI co-worker message',
    headline: 'Add an AI co-worker that handles repetitive work every day.',
    subheadline:
      'We build an AI-enabled workflow layer that helps your team respond faster, follow up consistently, and keep projects moving without constant manual effort.',
    outcomeBullets: [
      'Pinpoint the top 2 to 3 tasks your AI co-worker should own first',
      'Define handoff rules so people stay in control of final decisions',
      'Launch practical automations your team can trust and use daily',
    ],
    painPoints: [
      'Your team spends hours on repetitive admin and follow-up',
      'Important requests stall when owners are pulled into operations',
      'You need more output without adding immediate headcount',
    ],
    differentiators: [
      'Human-first implementation with clear review checkpoints',
      'Automations mapped to your current tools and workflows',
      'Fast rollout focused on immediate operational relief',
    ],
    ctaLabel: 'Book a call to design your AI co-worker',
  },
  {
    slug: 'automation-pipeline',
    audience: 'For service businesses losing momentum between lead and close',
    eyebrow: 'Variant F · Workflow automation message',
    headline: 'Automate your lead-to-booking workflow from first click to follow-up.',
    subheadline:
      'We connect forms, CRM, messaging, and scheduling so your pipeline keeps moving automatically while your team focuses on high-value conversations.',
    outcomeBullets: [
      'Map your current funnel and identify where leads drop off',
      'Set up trigger-based follow-up flows across your key channels',
      'Improve speed-to-lead without creating more admin work',
    ],
    painPoints: [
      'Leads go cold because follow-up is inconsistent',
      'Manual handoffs cause delays and missed opportunities',
      'Different tools create disconnected customer experiences',
    ],
    differentiators: [
      'End-to-end workflow mapping before implementation',
      'Simple, visible automations your team can monitor easily',
      'Conversion-focused setup designed around booking calls',
    ],
    ctaLabel: 'Book a call to automate your pipeline',
  },
  {
    slug: 'ops-systemization',
    audience: 'For owners whose business is stuck in tribal knowledge',
    eyebrow: 'Variant G · Systemization message',
    headline: 'Turn ad-hoc tasks into repeatable workflows your team can run.',
    subheadline:
      'We document, standardize, and automate core processes so results are consistent, onboarding is faster, and operations are less dependent on any one person.',
    outcomeBullets: [
      'Identify high-friction processes worth systemizing first',
      'Create clear SOP-backed workflows with automation support',
      'Reduce bottlenecks when key people are unavailable',
    ],
    painPoints: [
      'Processes exist in DMs, memory, and scattered docs',
      'Delivery quality depends too much on who is available that day',
      'Scaling output currently means owner oversight on everything',
    ],
    differentiators: [
      'Operational design grounded in real small-business constraints',
      'Clear ownership model for every workflow step',
      'Build-first approach that balances speed and maintainability',
    ],
    ctaLabel: 'Book a call to systemize operations',
  },
  {
    slug: 'automation-roi',
    audience: 'For owners who want measurable return from AI and automation',
    eyebrow: 'Variant H · Automation ROI message',
    headline: 'Use automation to increase margin without burning out your team.',
    subheadline:
      'We prioritize workflow changes that reduce admin drag, improve conversion, and create capacity so your business can grow with less operational strain.',
    outcomeBullets: [
      'Estimate time and cost savings for top automation opportunities',
      'Prioritize quick wins that impact revenue operations first',
      'Set practical success metrics to track after launch',
    ],
    painPoints: [
      'You are spending on tools but cannot tie them to business outcomes',
      'Admin load keeps growing faster than revenue',
      'Your team is busy, but not always focused on highest-value work',
    ],
    differentiators: [
      'ROI-led planning from discovery through implementation',
      'No over-engineered stack or enterprise-only complexity',
      'Focused execution designed for owner-led businesses',
    ],
    ctaLabel: 'Book a call and uncover automation ROI',
  },
]

export const landingVariantMap = Object.fromEntries(
  landingVariants.map(variant => [variant.slug, variant])
)
