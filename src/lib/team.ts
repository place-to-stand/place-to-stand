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
  },
  {
    name: 'Damon Bodine',
    title: 'Senior AI Engineer',
    bio: 'Graduate of the Gauntlet AI engineering bootcamp with multiple decades of entrepreneurship spanning the music and real-estate industries. Combines hard-won business instinct with hands-on AI engineering to build systems that actually move the needle.',
    image: '/1587649018078.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/damonbodine/',
      x: 'https://x.com/damonbodine',
      instagram: 'https://www.instagram.com/damonbodine/',
      github: 'https://github.com/damonbodine',
    },
  },
  
  // {
  //   name: 'Chris Donahue',
  //   title: 'Creative Director',
  //   bio: 'Creative director with a passion for visual storytelling and brand strategy. Translates business goals into compelling design systems and content that drives results.',
  //   image: '/403081575_325440200226266_2592020462209657049_n.jpg',
  //   socials: {},
  // },
]
