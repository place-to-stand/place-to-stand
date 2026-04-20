export type TeamMember = {
  name: string
  title: string
  image: string
  shortBio: string
  longBio: string
  socials?: {
    linkedin?: string
    x?: string
    instagram?: string
    github?: string
  }
}

export const team: TeamMember[] = [
  {
    name: 'Jason Desiderio',
    title: 'Principal Engineer',
    image: '/1652631488914.jpeg',
    shortBio:
      'Principal Engineer with a decade of experience building production systems at scale. Leads architecture and engineering direction across client projects.',
    longBio:
      'Jason is the Principal Engineer at Place to Stand. He has over a decade of experience leading engineering teams, shipping production software, and turning business problems into modern, maintainable systems. He sets the technical direction across engagements and partners directly with founders and leadership teams to align engineering effort with business outcomes.\n\n(Full bio coming soon — placeholder text.)',
    socials: {
      linkedin: 'https://www.linkedin.com/in/jmdesiderio/',
      x: 'https://x.com/JasonDesiderio',
      instagram: 'https://www.instagram.com/jmdesiderio/',
      github: 'https://github.com/jmdesiderio',
    },
  },
  {
    name: 'Damon Bodine',
    title: 'Senior AI Engineer',
    image: '/1587649018078.jpeg',
    shortBio:
      'Senior AI Engineer focused on agentic systems, retrieval, and practical LLM deployments. Turns new AI capabilities into shipped, reliable product.',
    longBio:
      'Damon is a Senior AI Engineer at Place to Stand. He specializes in applied AI — agentic workflows, retrieval pipelines, and integrating LLMs into real business processes without the hand-waving. He bridges the gap between research-grade AI capability and product that clients can actually put in front of their customers.\n\n(Full bio coming soon — placeholder text.)',
    socials: {
      linkedin: 'https://www.linkedin.com/in/damonbodine/',
      x: 'https://x.com/damonbodine',
      instagram: 'https://www.instagram.com/damonbodine/',
      github: 'https://github.com/damonbodine',
    },
  },
  {
    name: 'Kris Crawford',
    title: 'Software Engineer & AI Technologist',
    image: '/259858081_219018533698595_237774923102850579_n.jpg',
    shortBio:
      'Software Engineer and AI Technologist building the tools, Portal, and automations that keep client engagements moving end-to-end.',
    longBio:
      'Kris is a Software Engineer and AI Technologist at Place to Stand. He focuses on the product side — the Portal, internal tooling, and client-facing applications — and on weaving AI into workflows so teams can move faster without adding headcount. He works across the stack and treats engineering as a tool for leverage, not just for delivery.\n\n(Full bio coming soon — placeholder text.)',
    socials: {
      linkedin: 'https://www.linkedin.com/in/kristopher-crawford-1177439a/',
      x: 'https://x.com/kris_craw',
      instagram: 'https://www.instagram.com/kristopher.____/',
      github: 'https://github.com/krismakesstuff',
    },
  },
]
