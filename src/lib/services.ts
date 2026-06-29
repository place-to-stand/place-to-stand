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
    tagline: 'Full-stack applications built for scale',
    description: 'End-to-end software development from architecture to deployment. We build web applications, APIs, and internal tools using modern frameworks and cloud infrastructure.',
    icon: 'Code2',
    features: [
      'Full-stack web applications',
      'API design and development',
      'Database architecture',
      'Cloud infrastructure (AWS, Vercel)',
      'CI/CD pipeline setup',
    ],
  },
  {
    slug: 'workflow-systems',
    title: 'Workflow Systems',
    tagline: 'Systematize operations, eliminate bottlenecks',
    description: 'Custom workflow systems that connect your tools, automate handoffs, and give you visibility into every process. Built around how your team actually works.',
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
    description: 'We build data pipelines, analytics dashboards, and AI-powered insights that help you make better decisions faster. From data collection to actionable intelligence.',
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
    description: 'Fractional CTO and strategic advisory services for businesses navigating digital transformation. We help you identify the highest-impact opportunities and build a roadmap to get there.',
    icon: 'Compass',
    features: [
      'Digital transformation roadmapping',
      'Technology stack evaluation',
      'AI readiness assessment',
      'Process optimization consulting',
      'Vendor evaluation and selection',
    ],
  },
]

export const serviceMap = Object.fromEntries(
  services.map(s => [s.slug, s])
) as Record<string, Service>
