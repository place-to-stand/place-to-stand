export type TeamMember = {
  name: string
  title: string
  /** Where they work from, e.g. 'Austin, TX'. */
  city: { name: string; region: string }
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
    title: 'Co-founder, engineer',
    city: { name: 'Austin', region: 'TX' },
    bio: 'Jason spent almost six years at Squarespace, rising to group engineering manager over three teams and 25 engineers. With AI, he now ships as much as one of those seven-person teams did.',
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
    title: 'Co-founder, engineer',
    city: { name: 'Brooklyn', region: 'NY' },
    bio: 'Software engineer with five years of building applications, grounded in a prior career designing physical systems meant to last decades. He brings that rigor to every line of code, along with a decade of running his own businesses.',
    image: '/259858081_219018533698595_237774923102850579_n.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/kristopher-crawford-1177439a/',
      x: 'https://x.com/kris_craw',
      instagram: 'https://www.instagram.com/kristopher.____/',
      github: 'https://github.com/krismakesstuff',
    },
  },
]
