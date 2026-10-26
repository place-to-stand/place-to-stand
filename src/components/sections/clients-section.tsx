import Image from 'next/image'
import { cn } from '@/src/lib/utils'
import { clients, getClientHostname, type Client } from '@/src/lib/clients'

/** One open row per client: a big screenshot with the name and description
 * beside it. On large screens the image takes two thirds of the width and
 * switches sides every row; below that the image sits on top. No cards, no
 * borders: large gaps separate the rows. Every screenshot is cut to the same
 * 16:10 frame from the top of the page, so they match whatever size the file
 * is. */
export function ClientsSection() {
  const featured = clients.filter(
    (client): client is Client & { image: string } => Boolean(client.image)
  )
  return (
    <div className='flex flex-col gap-grid-4 md:gap-grid-6'>
      {featured.map((client, index) => {
        const flipped = index % 2 === 1
        const host = getClientHostname(client.href)
        return (
          <article
            key={client.title}
            className='group grid gap-grid-1 lg:grid-cols-12 lg:items-end lg:gap-x-grid-1'
          >
            <a
              href={client.href}
              target='_blank'
              rel='noreferrer noopener'
              tabIndex={-1}
              aria-hidden
              className={cn(
                'relative block aspect-[16/10] overflow-hidden bg-bg-card lg:col-span-8 lg:row-start-1',
                flipped ? 'lg:col-start-5' : 'lg:col-start-1'
              )}
            >
              <Image
                src={client.image}
                alt=''
                fill
                sizes='(min-width: 1440px) 888px, (min-width: 1024px) 62vw, 100vw'
                className='object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]'
              />
            </a>
            <div
              className={cn(
                'flex flex-col gap-4 lg:row-start-1 lg:gap-5',
                flipped
                  ? 'lg:col-span-3 lg:col-start-1'
                  : 'lg:col-span-3 lg:col-start-10'
              )}
            >
              <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text uppercase md:text-5xl'>
                {client.title}
              </h2>
              <p className='text-base text-text-muted md:text-lg'>
                {client.description}
              </p>
              <a
                href={client.href}
                target='_blank'
                rel='noreferrer noopener'
                className='mt-1 w-fit font-mono text-sm font-medium tracking-[0.1em] text-text uppercase no-underline transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/30'
              >
                Visit {host} <span aria-hidden>↗</span>
                <span className='sr-only'> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        )
      })}
    </div>
  )
}
