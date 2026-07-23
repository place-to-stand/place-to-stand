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
    bio: 'Spent over a decade as a Senior Engineer at Squarespace, shipping systems that served millions of users. Brings that large-scale platform discipline to every project, architecting apps built to perform under real-world load.',
    image: '/1652631488914.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/jmdesiderio/',
      x: 'https://x.com/JasonDesiderio',
      instagram: 'https://www.instagram.com/jmdesiderio/',
      github: 'https://github.com/jmdesiderio',
    },
  },
    {
    name: 'Kris Crawford',
    title: 'Software Engineer & AI Technologist',
    bio: 'Software engineer with five years of building applications, grounded in a prior career designing physical systems meant to last decades. That same rigor, measure twice and build once, carries into every line of code. He also has a decade of entrepreneurship under his belt.',
    image: '/259858081_219018533698595_237774923102850579_n.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/kristopher-crawford-1177439a/',
      x: 'https://x.com/kris_craw',
      instagram: 'https://www.instagram.com/kristopher.____/',
      github: 'https://github.com/krismakesstuff',
    },
  },]
