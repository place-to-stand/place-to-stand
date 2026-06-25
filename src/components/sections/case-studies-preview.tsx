import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Badge } from '@/src/components/ui/badge'
import { caseStudies } from '@/src/lib/case-studies'

export function CaseStudiesPreview() {
  const featured = caseStudies.slice(0, 4)
  return (
    <AnimatedSection className='max-w-7xl lg:px-10'>
      <div className='flex flex-col gap-12'>
        {/* Header — left-aligned */}
        <div className='flex flex-col gap-4'>
          <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-accent'>
            Case Studies
          </span>
          <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <h2 className='font-headline text-4xl font-bold leading-[0.95] tracking-tight text-text md:text-5xl'>
              Real results
            </h2>
            <Link
              href='/case-studies'
              className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
            >
              View all case studies
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Alternating case study rows */}
        <div className='flex flex-col gap-6'>
          {featured.map((cs, i) => (
            <div
              key={cs.slug}
              className={`group grid gap-6 border border-border bg-bg-card transition-all duration-300 hover:border-accent/30 md:grid-cols-2 ${
                i % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              <div
                className={`relative aspect-video overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}
              >
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-bg-card/60 to-transparent' />
              </div>
              <div
                className={`flex flex-col justify-center gap-4 p-8 md:p-10 ${i % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}
              >
                <div
                  className={`flex items-center gap-3 ${i % 2 === 1 ? 'md:justify-end' : ''}`}
                >
                  <span className='font-mono text-xs font-bold text-accent'>
                    {cs.metric}
                  </span>
                  <span className='text-border'>|</span>
                  <span className='font-mono text-[11px] uppercase tracking-wider text-text-muted'>
                    {cs.client}
                  </span>
                </div>
                <h3 className='font-headline text-2xl font-semibold tracking-tight text-text'>
                  {cs.title}
                </h3>
                <p className='text-sm leading-relaxed text-text-muted'>
                  {cs.summary}
                </p>
                <div
                  className={`flex flex-wrap gap-2 ${i % 2 === 1 ? 'md:justify-end' : ''}`}
                >
                  {cs.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
