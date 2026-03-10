import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { type LandingVariant, bookingLink } from '@/src/lib/landing-pages'
import { LandingSessionMarker } from '@/src/components/landing-session-marker'

type LandingVariantPageProps = {
  variant: LandingVariant
}

export function LandingVariantPage({ variant }: LandingVariantPageProps) {
  return (
    <main className='flex-1'>
      <LandingSessionMarker />
      <AnimatedSection className='relative isolate flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-8 px-6 pb-24 pt-32 text-center'>
        <div className='mx-auto flex w-full max-w-4xl flex-col items-center gap-6'>
          <p className='font-headline text-sm font-semibold uppercase tracking-[0.14em] text-ink/60'>
            {variant.eyebrow}
          </p>
          <p className='text-balance text-base font-semibold text-ink/80 md:text-lg'>
            {variant.audience}
          </p>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-6xl'>
            {variant.headline}
          </h1>
          <p className='max-w-3xl text-balance text-lg !leading-snug text-ink/80 md:text-xl'>
            {variant.subheadline}
          </p>
          <div className='mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button asChild size='lg' className='w-full sm:w-auto'>
              <a href={bookingLink} target='_blank' rel='noopener noreferrer'>
                {variant.ctaLabel}
              </a>
            </Button>
            <Button asChild size='lg' variant='outline' className='w-full sm:w-auto'>
              <Link href='/#contact'>Ask a question first</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className='flex flex-col gap-8 pb-24 pt-8 md:pb-28'>
        <div className='grid gap-6 md:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>What you get</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-3 text-left'>
                {variant.outcomeBullets.map(item => (
                  <li key={item} className='flex gap-2'>
                    <span className='mt-2 h-1.5 w-1.5 rounded-full bg-ink/70' aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common bottlenecks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-3 text-left'>
                {variant.painPoints.map(item => (
                  <li key={item} className='flex gap-2'>
                    <span className='mt-2 h-1.5 w-1.5 rounded-full bg-ink/70' aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Place To Stand</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-3 text-left'>
                {variant.differentiators.map(item => (
                  <li key={item} className='flex gap-2'>
                    <span className='mt-2 h-1.5 w-1.5 rounded-full bg-ink/70' aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className='mx-auto flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-white/50 p-8 text-center'>
          <h2 className='font-headline text-3xl font-semibold uppercase text-ink md:text-4xl'>
            Ready to book your strategy call?
          </h2>
          <p className='max-w-2xl text-balance text-base text-ink/80 md:text-lg'>
            We&apos;ll review your goals, identify the highest-impact opportunities,
            and outline next steps tailored to your business.
          </p>
          <Button asChild size='lg' className='mt-2 w-full sm:w-auto'>
            <a href={bookingLink} target='_blank' rel='noopener noreferrer'>
              Book your call
            </a>
          </Button>
        </div>
      </AnimatedSection>
    </main>
  )
}
