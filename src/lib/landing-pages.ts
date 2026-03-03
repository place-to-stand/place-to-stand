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
]

export const landingVariantMap = Object.fromEntries(
  landingVariants.map(variant => [variant.slug, variant])
)
