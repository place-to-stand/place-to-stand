import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/src/lib/utils'
import { ALT_ROW } from '@/src/components/patterns/alt-row'
import { clients, getClientHostname, type Client } from '@/src/lib/clients'
import { MediaFrame } from '@/src/components/patterns/media-frame'

const ROW_LINK_CLASS = 'link-action mt-1'

/** One open row per client: a big brand photo with the name and description
 * beside it. On large screens the image takes two thirds of the width and
 * switches sides every row; below that the image sits on top. No cards, no
 * borders: large gaps separate the rows. Every photo is cut to the same 16:10
 * frame from its center, so they match whatever size the file is. A client
 * with a case study opens it from the photo, with its own site linked below. */
export function ClientsSection({ limit }: { limit?: number } = {}) {
  // Clients with a case study (Hot Ones, Heatonist) lead the page in
  // FeaturedCaseStudy, so they're left out of the rows.
  const featured = clients
    .filter(
      (client): client is Client & { image: string } =>
        Boolean(client.image) && !client.caseStudy
    )
    .slice(0, limit)
  return (
    <div className='flex flex-col gap-section'>
      {featured.map((client, index) => {
        const flipped = index % 2 === 1
        const host = getClientHostname(client.href)
        const imageClassName = cn(
          'block lg:col-span-7 lg:row-start-1',
          flipped ? 'lg:col-start-6' : 'lg:col-start-1'
        )
        const image = (
          <Image
            src={client.image}
            alt={client.imageAlt ?? ''}
            fill
            loading={index === 0 ? 'eager' : undefined}
            sizes='(min-width: 1440px) 764px, (min-width: 1024px) 54vw, 100vw'
            className='object-cover transition-transform duration-700 group-hover:scale-[1.02]'
          />
        )
        return (
          <article
            key={client.title}
            className={cn('group lg:items-end', ALT_ROW)}
          >
            {client.caseStudy ? (
              <MediaFrame
                as={Link}
                shape='work'
                href={client.caseStudy as Route}
                tabIndex={-1}
                aria-hidden
                className={imageClassName}
              >
                {image}
              </MediaFrame>
            ) : (
              <MediaFrame
                as='a'
                shape='work'
                href={client.href}
                target='_blank'
                rel='noreferrer noopener'
                tabIndex={-1}
                aria-hidden
                className={imageClassName}
              >
                {image}
              </MediaFrame>
            )}
            <div
              className={cn(
                'flex flex-col gap-grid-half lg:row-start-1 lg:gap-grid-1',
                flipped
                  ? 'lg:col-span-5 lg:col-start-1'
                  : 'lg:col-span-5 lg:col-start-8'
              )}
            >
              <h2 className='type-section-title text-balance uppercase'>
                {client.title}
              </h2>
              <p className='type-intro'>{client.description}</p>
              {client.built && (
                <p className='text-base text-text-muted'>{client.built}</p>
              )}
              {client.caseStudy && (
                <Link
                  href={client.caseStudy as Route}
                  className={ROW_LINK_CLASS}
                >
                  Read the case study <span aria-hidden>→</span>
                </Link>
              )}
              <a
                href={client.href}
                target='_blank'
                rel='noreferrer noopener'
                className={ROW_LINK_CLASS}
              >
                Visit site <span aria-hidden>↗</span>
                <span className='sr-only'> {host} (opens in a new tab)</span>
              </a>
            </div>
          </article>
        )
      })}
    </div>
  )
}
