export type TeamMember = {
  name: string
  title: string
  bio: string
  image: string
  socials: {
    linkedin?: string
    x?: string
    github?: string
    instagram?: string
  }
}

export const team: TeamMember[] = [
  {
    name: 'Jason Desiderio',
    title: 'Principal Engineer',
    bio: 'Full-stack engineer and technical leader specializing in building scalable systems and AI-powered applications. Focused on turning complex business problems into elegant software solutions.',
    image: '/1652631488914.jpeg',
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
    bio: 'AI engineer specializing in building intelligent automation systems. Expert in LLM integration, agent architectures, and transforming manual workflows into AI-powered pipelines.',
    image: '/1587649018078.jpeg',
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
    bio: 'Software engineer and AI technologist who bridges the gap between cutting-edge technology and practical business applications. Builder of tools that make teams more effective.',
    image: '/259858081_219018533698595_237774923102850579_n.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/kristopher-crawford-1177439a/',
      x: 'https://x.com/kris_craw',
      instagram: 'https://www.instagram.com/kristopher.____/',
      github: 'https://github.com/krismakesstuff',
    },
  },
  {
    name: 'Chris Donahue',
    title: 'Creative Director',
    bio: 'Creative director with a passion for visual storytelling and brand strategy. Translates business goals into compelling design systems and content that drives results.',
    image: '/403081575_325440200226266_2592020462209657049_n.jpg',
    socials: {},
  },
]
