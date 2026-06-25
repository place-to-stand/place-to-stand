import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Badge } from '@/src/components/ui/badge'
import { caseStudies } from '@/src/lib/case-studies'

export function CaseStudiesPreview() {
  const featured = caseStudies.slice(0, 3)
  return (
    <AnimatedSection className='flex flex-col gap-12'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
          Case Studies
        </span>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-text md:text-5xl'>
          Real results
        </h2>
        <p className='max-w-xl text-balance text-base text-text-muted'>
          Custom solutions delivering measurable impact for real businesses.
        </p>
      </div>
      <div className='grid gap-6 md:grid-cols-3'>
        {featured.map(cs => (
          <div
            key={cs.slug}
            className='group flex flex-col overflow-hidden rounded-xl border border-border bg-bg-card transition-all duration-300 hover:border-accent/30'
          >
            <div className='relative aspect-video overflow-hidden'>
              <Image
                src={cs.image}
                alt={cs.title}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent' />
              <div className='absolute bottom-3 left-3'>
                <span className='font-mono text-xs font-bold text-accent'>{cs.metric}</span>
              </div>
            </div>
            <div className='flex flex-1 flex-col gap-3 p-6'>
              <h3 className='font-headline text-xl uppercase text-text'>{cs.title}</h3>
              <p className='text-sm leading-relaxed text-text-muted'>{cs.summary}</p>
              <div className='mt-auto flex flex-wrap gap-2 pt-2'>
                {cs.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'>
        <Link
          href='/case-studies'
          className='inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
        >
          View all case studies
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </AnimatedSection>
  )
}
