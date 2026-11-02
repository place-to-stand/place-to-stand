export type Service = {
  slug: string
  title: string
  tagline: string
  description: string
  icon: string
  features: string[]
}

export const services: Service[] = [
  {
    slug: 'software-development',
    title: 'Software Development',
    tagline: 'Applications built for scale',
    description:
      'End-to-end software development from architecture to deployment. We build web applications, APIs, and internal tools using modern frameworks and cloud infrastructure.',
    icon: 'Code2',
    features: [
      'Full-stack web, desktop, and mobile applications',
      'API design and development',
      'Database architecture',
      'Cloud infrastructure (AWS, Vercel)',
      'CI/CD pipeline setup',
    ],
  },
  {
    slug: 'mvp-development',
    title: 'MVPs and Shopify Apps',
    tagline: 'From prototype to product',
    description:
      'Built a first version with AI tools or no-code and hit the ceiling? We turn it into production software you own. We also build custom Shopify apps for brands that have outgrown the app store.',
    icon: 'Rocket',
    features: [
      'MVP development from a prototype or a sketch',
      'Rebuilding AI-generated or no-code apps for production',
      'Custom Shopify apps and storefront tools',
      'Launch, hosting and handover',
    ],
  },
  {
    slug: 'workflow-systems',
    title: 'Workflow Systems',
    tagline: 'Systematize operations, eliminate bottlenecks',
    description:
      'Custom workflow systems that connect your tools, automate handoffs, and give you visibility into every process. Built around how your team actually works.',
    icon: 'GitBranch',
    features: [
      'Custom portal development',
      'Task tracking and management systems',
      'Approval and review workflows',
      'Cross-platform integrations',
      'Real-time dashboards and reporting',
    ],
  },
  {
    slug: 'data-intelligence',
    title: 'Data Intelligence',
    tagline: 'Turn raw data into strategic advantage',
    description:
      'We build data pipelines, analytics dashboards, and AI-powered insights that help you make better decisions faster. From data collection to actionable intelligence.',
    icon: 'BarChart3',
    features: [
      'Data pipeline architecture',
      'Analytics dashboard development',
      'Business intelligence reporting',
      'Predictive modeling',
      'Data warehouse design',
    ],
  },
  {
    slug: 'strategic-advisory',
    title: 'Strategic Advisory',
    tagline: 'Expert guidance for digital transformation',
    description:
      'Fractional CTO and strategic advisory services for businesses navigating digital transformation. We help you identify the highest-impact opportunities and build a roadmap to get there.',
    icon: 'Compass',
    features: [
      'Digital transformation roadmapping',
      'Technology stack evaluation',
      'AI readiness assessment',
      'Process optimization consulting',
      'Vendor evaluation and selection',
    ],
  },
  {
    slug: 'managed-services',
    title: 'Managed Services',
    tagline: 'Long-term support for your IT infrastructure',
    description:
      'Ongoing support, monitoring, and maintenance that keeps your software running long after launch. We handle uptime, security, and updates so your team can stay focused on the business instead of babysitting infrastructure.',
    icon: 'ServerCog',
    features: [
      'Uptime guarantees',
      'Security updates & monitoring',
      'Contingency planning',
    ],
  },
]
