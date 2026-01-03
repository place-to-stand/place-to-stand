import Image from 'next/image'
import { AnimatedSection } from '@/src/components/layout/animated-section'

type Project = {
  title: string
  href: string
  image: string
  description: string
}

const projects: Project[] = [
  {
    title: 'Hot Ones',
    href: 'https://hotones.com',
    image: '/work-hot-ones.png',
    description:
      'The official online sauce shop for the hit interview show "Hot Ones.',
  },
  {
    title: 'Blake Brown Beauty',
    href: 'https://blakebrownbeauty.com',
    image: '/work-blake-brown-beauty.png',
    description:
      'A direct-to-consumer brand focused on healthy, high-performance haircare founded by Blake Lively.',
  },
  {
    title: 'Heatonist',
    href: 'https://heatonist.com',
    image: '/work-heatonist.png',
    description:
      "A curated marketplace for the world's best small-batch hot sauces.",
  },
  {
    title: 'Florence by Mills Beauty',
    href: 'https://florencebymillsbeauty.com',
    image: '/work-florence-by-mills-beauty.png',
    description:
      'A clean beauty and skincare line founded by Millie Bobby Brown.',
  },
  {
    title: '9 Point Studios',
    href: 'https://9pointstudios.com',
    image: '/work-9-point-studios.png',
    description:
      'A world-class recording and video production facility for creative artists.',
  },
  {
    title: 'Officina del Bere 1397',
    href: 'https://officinadelbere1397.com',
    image: '/work-officina-del-bere-1397.png',
    description:
      'A specialty shop offering elegant, functional wine and bar accessories.',
  },
  {
    title: 'The Good for Nothings Club',
    href: 'https://www.thegoodfornothings.club',
    image: '/work-the-good-for-nothings-club.png',
    description:
      'A creators club from Austin, TX made up of designers, engineers, filmmakers, musicians, and writers.',
  },
  {
    title: 'Lifepacks',
    href: 'https://www.lifepacks.co',
    image:
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80',
    description:
      'Easily create product guides and earn commission, just like the pros at Wirecutter and Consumer Reports.',
  },
]

export function WorkSection() {
  return (
    <AnimatedSection id='work' className='flex flex-col gap-8 md:gap-20'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Work
        </span>
        <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Select projects that moved the needle
        </h2>
        <p className='max-w-xl text-balance text-base !leading-snug text-ink/60 md:text-lg'>
          A look at the product, marketing, and brand experiences we craft with
          our partners.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className='grid grid-cols-2 gap-3 md:gap-4'>
        {projects.map(project => (
          <a
            key={project.title}
            href={project.href}
            target='_blank'
            rel='noreferrer noopener'
            aria-label={`View ${project.title} project (opens in a new tab)`}
            className='group relative overflow-hidden rounded-xl no-underline shadow-none transition-all duration-300 ease-out hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink/30'
          >
            {/* Clean image area */}
            <div className='relative aspect-video w-full overflow-hidden'>
              <Image
                src={project.image}
                alt={`${project.title} project thumbnail`}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </div>
            {/* Caption bar - fixed height with sliding content */}
            <div className='relative h-14 overflow-hidden bg-white/95 md:h-16'>
              {/* Stationary favicon - stays on top */}
              <div className='absolute left-3 top-1/2 z-10 -translate-y-1/2 md:left-4'>
                <img
                  src={`https://www.google.com/s2/favicons?domain=${new URL(project.href).hostname}&sz=64`}
                  alt=''
                  className='h-7 w-7 md:h-8 md:w-8'
                />
              </div>
              {/* Description - slides down from above on hover */}
              <div className='absolute inset-0 flex -translate-y-full items-center gap-5 pl-14 pr-8 transition-transform duration-300 group-hover:translate-y-0 md:gap-6 md:pl-16 md:pr-10'>
                <p className='line-clamp-2 flex-1 text-balance text-left text-xs font-normal !leading-[1.1] text-ink md:text-base'>
                  {project.description}
                </p>
                <svg
                  className='h-4 w-4 shrink-0 text-ink md:h-5 md:w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </div>
              {/* Title row - slides down out of view on hover */}
              <div className='absolute inset-0 flex items-center pl-14 pr-3 transition-transform duration-300 group-hover:translate-y-full md:pl-16 md:pr-4'>
                <h3 className='flex-1 font-headline text-sm font-semibold uppercase leading-none text-ink md:text-base'>
                  {project.title}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </AnimatedSection>
  )
}
