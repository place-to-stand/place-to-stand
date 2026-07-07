import Link from 'next/link'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { clients, getClientHostname } from '@/src/lib/clients'

export function ClientsPreview() {
  return (
    <AnimatedSection className='py-16 md:py-32'>
      <div className='grid gap-grid-3 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: heading (sticky) */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <Reveal index={0} className='flex flex-col gap-4'>
            <span className='bp-label font-mono'>Clients</span>
            <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-text md:text-4xl'>
              Who we&apos;ve
              <br />
              built for
            </h2>
          </Reveal>
          <Reveal index={1} className='text-md leading-relaxed text-text-muted'>
            <p>Product, marketing, and brand experiences we craft with our partners.</p>
          </Reveal>
          <Reveal index={2}>
            <Link
              href='/clients'
              className='mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
            >
              View all clients
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>

        {/* Right: client logo grid */}
        <Reveal index={2} className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {clients.map(client => (
            <a
              key={client.title}
              href={client.href}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`${client.title} (opens in a new tab)`}
              className='group relative flex flex-col items-center justify-center gap-3 border border-border bg-bg-card p-6 transition-colors duration-300 hover:border-accent/30'
            >
              <BlueprintCorners size={8} />
              <img
                src={`https://www.google.com/s2/favicons?domain=${getClientHostname(client.href)}&sz=64`}
                alt={`${client.title} logo`}
                className='h-8 w-8 transition-transform duration-300 group-hover:scale-110'
              />
              <span className='text-center font-mono text-[10px] uppercase leading-tight tracking-wider text-text-muted transition-colors duration-300 group-hover:text-text'>
                {client.title}
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
