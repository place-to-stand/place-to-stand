import type { AuditQuestion, AuditSection } from './types'

/**
 * The audit worksheet.
 *
 * Kept intentionally short (two questions per step) to respect busy people's
 * time. Questions are grouped into sections, and the wizard renders one per
 * step. Each selectable option carries scoring weights that nudge the result
 * toward a business phase and/or a set of opportunity recommendations. The
 * weights are deliberately simple (roughly 1 to 3) and live next to the answer
 * they describe so the scoring stays transparent and easy to tune.
 */

export const SECTIONS: AuditSection[] = [
  {
    id: 'business',
    title: 'Your Business',
    subtitle: 'A few basics so we understand your context.',
  },
  {
    id: 'operations',
    title: 'How You Operate',
    subtitle: 'How work actually gets done today.',
  },
  {
    id: 'challenges',
    title: 'Challenges & Goals',
    subtitle: "Where it hurts, and where you're headed.",
  },
  {
    id: 'readiness',
    title: 'Readiness',
    subtitle: 'Where you are on the build-vs-buy journey.',
  },
]

export const QUESTIONS: AuditQuestion[] = [
  // Section 1: Your Business
  {
    id: 'industry',
    sectionId: 'business',
    type: 'single',
    prompt: 'What industry are you in?',
    required: true,
    options: [
      {
        id: 'professional-services',
        label: 'Professional Services',
        description: 'Agencies, consultancies, legal, accounting',
        serviceWeights: { 'custom-crm': 1, 'internal-tools': 1 },
      },
      {
        id: 'retail-ecommerce',
        label: 'Retail & E-commerce',
        serviceWeights: { ecommerce: 2, 'analytics-bi': 1 },
      },
      {
        id: 'healthcare',
        label: 'Healthcare & Wellness',
        serviceWeights: {
          'customer-portal': 1,
          'data-integration': 1,
          'workflow-automation': 1,
        },
      },
      {
        id: 'manufacturing',
        label: 'Manufacturing & Logistics',
        serviceWeights: {
          'data-integration': 1,
          'internal-tools': 1,
          'analytics-bi': 1,
        },
      },
      {
        id: 'hospitality-food',
        label: 'Hospitality & Food',
        serviceWeights: {
          ecommerce: 1,
          'mobile-app': 1,
          'workflow-automation': 1,
        },
      },
      {
        id: 'construction-trades',
        label: 'Construction & Trades',
        serviceWeights: {
          'mobile-app': 1,
          'internal-tools': 1,
          'workflow-automation': 1,
        },
      },
      {
        id: 'tech-saas',
        label: 'Tech & SaaS',
        serviceWeights: {
          'data-integration': 1,
          'ai-solutions': 1,
          'analytics-bi': 1,
        },
      },
      {
        id: 'other',
        label: 'Something else',
      },
    ],
  },
  {
    id: 'revenue',
    sectionId: 'business',
    type: 'single',
    prompt: 'What stage is your business at?',
    helper: 'Annual revenue, ballpark is fine.',
    required: true,
    options: [
      {
        id: 'pre-revenue',
        label: 'Pre-revenue',
        phaseWeights: { foundation: 3 },
      },
      {
        id: 'under-100k',
        label: 'Under $100K',
        phaseWeights: { foundation: 1, launch: 2 },
      },
      {
        id: '100k-1m',
        label: '$100K to $1M',
        phaseWeights: { launch: 1, growth: 2 },
      },
      {
        id: '1m-10m',
        label: '$1M to $10M',
        phaseWeights: { growth: 1, optimization: 2 },
      },
      {
        id: '10m-plus',
        label: '$10M+',
        phaseWeights: { optimization: 1, transformation: 2 },
      },
    ],
  },

  // Section 2: How You Operate
  {
    id: 'ops-management',
    sectionId: 'operations',
    type: 'single',
    prompt: 'How do you run day-to-day operations today?',
    required: true,
    options: [
      {
        id: 'pen-paper',
        label: 'Pen, paper, and memory',
        phaseWeights: { foundation: 2, launch: 1 },
        serviceWeights: { 'workflow-automation': 2, 'internal-tools': 2 },
      },
      {
        id: 'spreadsheets-email',
        label: 'Spreadsheets and email',
        phaseWeights: { launch: 2, growth: 1 },
        serviceWeights: {
          'workflow-automation': 2,
          'internal-tools': 1,
          'data-integration': 1,
        },
      },
      {
        id: 'offtheshelf-saas',
        label: 'A patchwork of off-the-shelf SaaS tools',
        phaseWeights: { growth: 2, optimization: 1 },
        serviceWeights: { 'data-integration': 2, 'internal-tools': 1 },
      },
      {
        id: 'some-custom',
        label: 'Some custom software, plus SaaS',
        phaseWeights: { optimization: 2 },
        serviceWeights: { 'data-integration': 1, 'analytics-bi': 1 },
      },
      {
        id: 'integrated-custom',
        label: 'Mostly integrated custom systems',
        phaseWeights: { optimization: 1, transformation: 2 },
        serviceWeights: { 'ai-solutions': 1, 'analytics-bi': 1 },
      },
    ],
  },
  {
    id: 'tools-integration',
    sectionId: 'operations',
    type: 'single',
    prompt: 'Do your software tools talk to each other?',
    required: true,
    options: [
      {
        id: 'na-no-tools',
        label: 'We barely use software',
        phaseWeights: { foundation: 1, launch: 1 },
        serviceWeights: { 'internal-tools': 1 },
      },
      {
        id: 'no-copy-paste',
        label: 'No, lots of copy-paste between them',
        phaseWeights: { growth: 1 },
        serviceWeights: { 'data-integration': 3, 'workflow-automation': 1 },
      },
      {
        id: 'some-integrations',
        label: 'A few integrations, but gaps remain',
        phaseWeights: { growth: 1, optimization: 1 },
        serviceWeights: { 'data-integration': 2 },
      },
      {
        id: 'mostly-integrated',
        label: 'Mostly connected',
        phaseWeights: { optimization: 1 },
        serviceWeights: { 'data-integration': 1, 'analytics-bi': 1 },
      },
      {
        id: 'fully-integrated',
        label: 'Fully integrated and automated',
        phaseWeights: { optimization: 1, transformation: 1 },
        serviceWeights: { 'ai-solutions': 1, 'analytics-bi': 1 },
      },
    ],
  },

  // Section 3: Challenges & Goals
  {
    id: 'bottlenecks',
    sectionId: 'challenges',
    type: 'multi',
    prompt: 'Where are your biggest operational bottlenecks?',
    helper: 'Select all that apply.',
    required: true,
    options: [
      {
        id: 'manual-data-entry',
        label: 'Manual data entry',
        phaseWeights: { growth: 1 },
        serviceWeights: { 'workflow-automation': 3, 'ai-solutions': 1 },
      },
      {
        id: 'repetitive-admin',
        label: 'Repetitive admin tasks',
        phaseWeights: { growth: 1 },
        serviceWeights: { 'workflow-automation': 3, 'internal-tools': 1 },
      },
      {
        id: 'data-silos',
        label: 'Disconnected tools / data silos',
        phaseWeights: { growth: 1, optimization: 1 },
        serviceWeights: { 'data-integration': 3, 'analytics-bi': 1 },
      },
      {
        id: 'customer-comms',
        label: 'Customer communication & follow-up',
        serviceWeights: { 'customer-portal': 2, 'custom-crm': 2 },
      },
      {
        id: 'scheduling-dispatch',
        label: 'Scheduling, dispatching, or coordination',
        serviceWeights: {
          'workflow-automation': 2,
          'mobile-app': 1,
          'internal-tools': 1,
        },
      },
      {
        id: 'reporting-visibility',
        label: 'Reporting & visibility into the business',
        phaseWeights: { optimization: 1 },
        serviceWeights: { 'analytics-bi': 3, 'data-integration': 1 },
      },
      {
        id: 'inventory-resource',
        label: 'Inventory or resource tracking',
        serviceWeights: { 'internal-tools': 2, 'data-integration': 1 },
      },
      {
        id: 'onboarding-training',
        label: 'Onboarding customers or staff',
        serviceWeights: { 'internal-tools': 1, 'customer-portal': 1 },
      },
      {
        id: 'none-major',
        label: 'Nothing major right now',
        phaseWeights: { optimization: 1 },
      },
    ],
  },
  {
    id: 'goals',
    sectionId: 'challenges',
    type: 'multi',
    prompt: 'What are your top goals for the next 12 months?',
    helper: 'Select all that apply.',
    required: true,
    options: [
      {
        id: 'save-time-cost',
        label: 'Save time and reduce costs',
        serviceWeights: { 'workflow-automation': 2, 'internal-tools': 1 },
      },
      {
        id: 'scale-operations',
        label: 'Scale operations',
        phaseWeights: { growth: 2 },
        serviceWeights: {
          'data-integration': 1,
          'internal-tools': 1,
          'workflow-automation': 1,
        },
      },
      {
        id: 'improve-cx',
        label: 'Improve the customer experience',
        serviceWeights: {
          'customer-portal': 2,
          'mobile-app': 1,
          'custom-crm': 1,
        },
      },
      {
        id: 'data-driven',
        label: 'Make better data-driven decisions',
        phaseWeights: { optimization: 2 },
        serviceWeights: { 'analytics-bi': 3, 'data-integration': 1 },
      },
      {
        id: 'launch-new-product',
        label: 'Launch a new product or service',
        phaseWeights: { foundation: 1, transformation: 1 },
        serviceWeights: { ecommerce: 1, 'mobile-app': 1, 'ai-solutions': 1 },
      },
      {
        id: 'reduce-errors',
        label: 'Reduce errors and rework',
        serviceWeights: { 'workflow-automation': 2, 'data-integration': 1 },
      },
      {
        id: 'modernize-systems',
        label: 'Modernize aging systems',
        phaseWeights: { transformation: 2 },
        serviceWeights: { 'legacy-modernization': 3, 'data-integration': 1 },
      },
    ],
  },

  // Section 4: Readiness
  {
    id: 'offtheshelf-fit',
    sectionId: 'readiness',
    type: 'single',
    prompt: 'How well does off-the-shelf software fit your needs?',
    required: true,
    options: [
      {
        id: 'havent-tried',
        label: "Haven't really tried it yet",
        phaseWeights: { foundation: 1 },
      },
      {
        id: 'works-fine',
        label: 'It works fine for us',
        phaseWeights: { optimization: 1 },
      },
      {
        id: 'partially-fits',
        label: 'It partially fits, with workarounds',
        phaseWeights: { growth: 1 },
        serviceWeights: { 'data-integration': 1, 'internal-tools': 1 },
      },
      {
        id: 'doesnt-fit',
        label: "It doesn't fit how we work",
        phaseWeights: { growth: 1 },
        serviceWeights: { 'internal-tools': 2, 'workflow-automation': 1 },
      },
      {
        id: 'outgrown',
        label: "We've outgrown it",
        phaseWeights: { optimization: 1, transformation: 2 },
        serviceWeights: {
          'legacy-modernization': 2,
          'data-integration': 1,
          'internal-tools': 1,
        },
      },
    ],
  },
  {
    id: 'budget',
    sectionId: 'readiness',
    type: 'single',
    prompt: "What's your appetite for investing in custom software?",
    required: true,
    options: [
      {
        id: 'exploring',
        label: 'Just exploring for now',
        phaseWeights: { foundation: 1 },
      },
      {
        id: 'small-pilot',
        label: 'Open to a small pilot project',
        phaseWeights: { launch: 1, growth: 1 },
      },
      {
        id: 'dedicated-budget',
        label: 'We have budget set aside',
        phaseWeights: { growth: 1, optimization: 1 },
      },
      {
        id: 'significant-investment',
        label: 'Planning a significant investment',
        phaseWeights: { optimization: 1, transformation: 1 },
      },
    ],
  },
]

/** Questions belonging to a given section, in worksheet order. */
export function questionsForSection(sectionId: string): AuditQuestion[] {
  return QUESTIONS.filter((q) => q.sectionId === sectionId)
}
