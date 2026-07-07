import type { ServiceDefinition, ServiceId } from './types'

/**
 * The custom-software opportunity areas the agency can deliver. Each audit
 * result surfaces the handful most relevant to the respondent. We build all of
 * them AI-accelerated, which is what makes purpose-built software viable for
 * teams that could never justify it before. Icons reference lucide-react names.
 */
export const SERVICES: Record<ServiceId, ServiceDefinition> = {
  'workflow-automation': {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    tagline: 'Stop doing by hand what software should do',
    description:
      "Automate the repetitive, error-prone tasks eating your team's time.",
    icon: 'Workflow',
  },
  'internal-tools': {
    id: 'internal-tools',
    name: 'Internal Tools & Dashboards',
    tagline: 'Replace the spreadsheet running your business',
    description: 'Internal apps built around how your team actually works.',
    icon: 'LayoutDashboard',
  },
  'customer-portal': {
    id: 'customer-portal',
    name: 'Customer Portals',
    tagline: 'Let customers help themselves',
    description:
      'Portals to book, track, pay, and self-serve, with less load on you.',
    icon: 'Users',
  },
  'data-integration': {
    id: 'data-integration',
    name: 'Systems Integration & APIs',
    tagline: 'Make your tools talk to each other',
    description:
      'Connect your systems so data flows instead of getting copy-pasted.',
    icon: 'Network',
  },
  'custom-crm': {
    id: 'custom-crm',
    name: 'Custom CRM & Sales Tools',
    tagline: 'A CRM shaped to how you sell',
    description: 'Pipeline and customer management that fits your process.',
    icon: 'Contact',
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'Online Ordering & E-commerce',
    tagline: 'Sell and transact online, your way',
    description:
      'Storefronts and ordering built around your products and pricing.',
    icon: 'ShoppingCart',
  },
  'mobile-app': {
    id: 'mobile-app',
    name: 'Mobile Apps',
    tagline: 'For when work happens on the go',
    description: 'Apps for customers or field teams, not a desk.',
    icon: 'Smartphone',
  },
  'ai-solutions': {
    id: 'ai-solutions',
    name: 'AI & Intelligent Automation',
    tagline: 'Apply AI where it moves the needle',
    description:
      'Document processing, assistants, and prediction inside your workflows.',
    icon: 'Sparkles',
  },
  'analytics-bi': {
    id: 'analytics-bi',
    name: 'Analytics & BI',
    tagline: 'Turn your data into decisions',
    description: "One trustworthy view of what's happening and why.",
    icon: 'BarChart3',
  },
  'legacy-modernization': {
    id: 'legacy-modernization',
    name: 'Legacy Modernization',
    tagline: 'Escape the software holding you back',
    description: 'Re-platform aging systems without a risky big-bang rewrite.',
    icon: 'RefreshCw',
  },
}

/** All services as an array, in declaration order. */
export const SERVICE_LIST: ServiceDefinition[] = Object.values(SERVICES)
