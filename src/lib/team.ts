export type TeamMember = {
  name: string
  title: string
  /** Where they work from, e.g. 'Austin, TX'. */
  city: { name: string; region: string }
  /** The About page bio, word for word as approved (Nov 13). */
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
    // The Squarespace job title in this bio stays until Jason decides (Nov 14).
    bio: 'Spent almost six years at Squarespace, rising from senior engineer to group engineering manager, on systems used by millions of people. Outside client work he runs The Good for Nothings Club, a creators club in Austin, and plays and records music.', // voice-ok
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
    bio: 'Designed physical systems meant to last decades before he turned to software. He has also run his own businesses for ten years, so he builds the way an owner thinks.',
    image: '/259858081_219018533698595_237774923102850579_n.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/kristopher-crawford-1177439a/',
      x: 'https://x.com/kris_craw',
      instagram: 'https://www.instagram.com/kristopher.____/',
      github: 'https://github.com/krismakesstuff',
    },
  },
]
