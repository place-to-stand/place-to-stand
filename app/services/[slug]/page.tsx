import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BarChart3, Code2, Compass, GitBranch, type LucideIcon } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { services, serviceMap } from '@/src/lib/services'

const serviceIcons: Record<string, LucideIcon> = {
  Code2,
  GitBranch,
  BarChart3,
  Compass,
}

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = serviceMap[slug]
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.title,
    description: service.tagline,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = serviceMap[slug]
  if (!service) notFound()

  const Icon = serviceIcons[service.icon]

  return (
    <main className='flex-1 pt-28'>
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col gap-6'>
          <Link
            href='/services'
            className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent'
          >
            <span aria-hidden>&larr;</span> All Services
          </Link>
          <div className='flex flex-col gap-4'>
            {Icon && (
              <span className='inline-flex h-10 w-10 items-center justify-center border border-accent/30 text-accent'>
                <Icon className='h-5 w-5' aria-hidden />
              </span>
            )}
            <h1 className='font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
              {service.title}
            </h1>
            <p className='max-w-2xl text-lg text-text-muted'>{service.tagline}</p>
          </div>
        </div>

        <div className='grid gap-12 md:grid-cols-5'>
          <div className='md:col-span-3'>
            <p className='text-base leading-relaxed text-text-muted'>
              {service.description}
            </p>
          </div>
          <div className='md:col-span-2'>
            <div className='relative border border-border bg-bg-card p-6'>
              <BlueprintCorners />
              <h2 className='mb-4 font-headline text-lg uppercase text-text'>Capabilities</h2>
              <ul className='flex flex-col gap-3'>
                {service.features.map(feature => (
                  <li key={feature} className='flex items-start gap-3 text-sm text-text-muted'>
                    <span className='mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent' aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='relative flex flex-col items-center gap-6 border border-border bg-bg-card p-10 text-center'>
          <BlueprintCorners size={16} all />
          <h2 className='font-headline text-2xl uppercase text-text md:text-3xl'>
            Ready to get started?
          </h2>
          <p className='max-w-lg text-text-muted'>
            Tell us about your project and we&apos;ll outline the highest-impact approach.
          </p>
          <Button asChild size='lg'>
            <Link href='/contact'>Start a Project</Link>
          </Button>
        </div>
      </AnimatedSection>
    </main>
  )
}
