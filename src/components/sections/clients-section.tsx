import Image from 'next/image'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { clients, getClientHostname } from '@/src/lib/clients'

export function ClientsSection() {
  return (
    // Grid: 1 col on mobile, 2 cols on md+
    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6'>
        {clients.map(project => (
          <a
            key={project.title}
            href={project.href}
            target='_blank'
            rel='noreferrer noopener'
            aria-label={`View ${project.title} project (opens in a new tab)`}
            className='group relative border border-border bg-bg-card no-underline transition-all duration-300 ease-out hover:border-accent/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/30'
          >
            <BlueprintCorners />
            {/* External link indicator */}
            <span className='pointer-events-none absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center border border-border bg-bg-card text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'>
              <svg
                className='h-3.5 w-3.5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 19.5 19.5 4.5m0 0H8.25m11.25 0v11.25'
                />
              </svg>
            </span>
            {/* Clean image area */}
            <div className='relative aspect-video w-full overflow-hidden'>
              <Image
                src={project.image}
                alt={`${project.title} project thumbnail`}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </div>
            {/* Caption - favicon, name, and description, always visible */}
            <div className='flex items-start gap-3 border-t border-border bg-bg-card p-3 md:gap-4 md:p-4'>
              <img
                src={`https://www.google.com/s2/favicons?domain=${getClientHostname(project.href)}&sz=64`}
                alt=''
                className='mt-0.5 h-7 w-7 shrink-0 md:h-8 md:w-8'
              />
              <div className='flex flex-col gap-1.5'>
                <h3 className='font-headline text-sm font-semibold uppercase leading-none text-text md:text-base'>
                  {project.title}
                </h3>
                <p className='line-clamp-2 min-h-[2.75em] text-xs leading-[1.375] text-text-muted md:text-sm'>
                  {project.description}
                </p>
              </div>
            </div>
          </a>
        ))}
    </div>
  )
}
