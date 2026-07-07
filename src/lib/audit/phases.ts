import type { PhaseDefinition, PhaseId } from './types'

/**
 * The five business phases the audit can place a respondent in, ordered from
 * least to most mature. Each frames a different entry point for custom software.
 */
export const PHASES: Record<PhaseId, PhaseDefinition> = {
  foundation: {
    id: 'foundation',
    name: 'Foundation',
    tagline: 'Validating the idea',
    description:
      "You're early. The job is proving the concept, not building heavy systems yet.",
    signals: [
      'Pre-revenue or first customers',
      'Running on notes and a few apps',
      'Workflow still taking shape',
    ],
    nextSteps: [
      'Ship a lean MVP to test demand',
      'Keep tooling cheap and disposable',
      'Spot the one thing worth automating later',
    ],
  },
  launch: {
    id: 'launch',
    name: 'Launch & Early Traction',
    tagline: 'Real customers, manual processes',
    description:
      "It works, but it runs on spreadsheets and hustle, and it won't scale.",
    signals: [
      'Revenue, but everything is manual',
      'Spreadsheets and email run the show',
      'Repetitive tasks starting to bite',
    ],
    nextSteps: [
      'Replace your most painful spreadsheet',
      'Automate one error-prone workflow',
      'Standardize how customer data is captured',
    ],
  },
  growth: {
    id: 'growth',
    name: 'Growth & Scaling',
    tagline: 'Volume is breaking your setup',
    description:
      'Disconnected tools and manual work are now capping how fast you can grow.',
    signals: [
      'Headcount and volume climbing fast',
      'Disconnected tools, lots of copy-paste',
      'Manual work eats days, not hours',
    ],
    nextSteps: [
      'Connect your core systems',
      'Automate the high-volume bottlenecks',
      'Add dashboards for real visibility',
    ],
  },
  optimization: {
    id: 'optimization',
    name: 'Optimization & Efficiency',
    tagline: 'Ready to sharpen the engine',
    description:
      "Systems are in place. Now it's about efficiency, data, and experience.",
    signals: [
      'Established revenue, mature team',
      'Systems exist but could work harder',
      'Hungry for better, data-driven decisions',
    ],
    nextSteps: [
      'Build analytics on your existing data',
      'Automate your highest-cost workflows',
      'Add customer portals or self-service',
    ],
  },
  transformation: {
    id: 'transformation',
    name: 'Transformation & Innovation',
    tagline: 'Time to modernize',
    description:
      'Legacy systems or a new bet call for a serious modernization push.',
    signals: [
      'Established business, legacy systems',
      'Constrained by aging software',
      'Chasing a new product or market',
    ],
    nextSteps: [
      'Modernize without a risky rewrite',
      'Re-platform data and integrations',
      'Use AI as a competitive edge',
    ],
  },
}

/** Phases in maturity order, for ordered display and tie-breaking. */
export const PHASE_ORDER: PhaseId[] = [
  'foundation',
  'launch',
  'growth',
  'optimization',
  'transformation',
]
