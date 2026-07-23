import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { type LandingVariant } from '@/src/lib/landing-pages'
import { LandingSessionMarker } from '@/src/components/landing-session-marker'
import { ScrollDepthTracker } from '@/src/components/scroll-depth-tracker'
import { BookCallLink } from '@/src/components/book-call-link'

type LandingVariantPageProps = {
  variant: LandingVariant
}

export function LandingVariantPage({ variant }: LandingVariantPageProps) {
  return (
    <main className='flex-1'>
      <LandingSessionMarker />
      <ScrollDepthTracker />
      <AnimatedSection className='relative isolate flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-8 px-6 pt-32 pb-24 text-center'>
        <div className='mx-auto flex w-full max-w-4xl flex-col items-center gap-6'>
          <p className='font-headline text-sm font-semibold tracking-[0.14em] text-text-muted uppercase'>
            {variant.eyebrow}
          </p>
          <p className='text-base font-semibold text-balance text-text-muted md:text-lg'>
            {variant.audience}
          </p>
          <h1 className='max-w-4xl font-headline text-4xl leading-[.9]! font-semibold text-balance text-text uppercase md:text-6xl'>
            {variant.headline}
          </h1>
          <p className='max-w-3xl text-lg leading-snug! text-balance text-text-muted md:text-xl'>
            {variant.subheadline}
          </p>
          <div className='mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row'>
            <BookCallLink
              label={variant.ctaLabel}
              variantSlug={variant.slug}
              placement='hero'
              className='w-full sm:w-auto'
            />
            <Button
              asChild
              size='lg'
              variant='outline'
              className='w-full sm:w-auto'
            >
              <Link href='/#contact'>Ask a question first</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className='flex flex-col gap-8 pt-8 pb-24 md:pb-28'>
        <div className='grid gap-6 md:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>What you get</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-3 text-left'>
                {variant.outcomeBullets.map(item => (
                  <li key={item} className='flex gap-2'>
                    <span className='mt-2 h-1.5 w-1.5 bg-accent' aria-hidden />
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
                    <span className='mt-2 h-1.5 w-1.5 bg-accent' aria-hidden />
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
                    <span className='mt-2 h-1.5 w-1.5 bg-accent' aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className='mx-auto flex w-full max-w-3xl flex-col items-center gap-4 border border-border bg-bg-card p-8 text-center'>
          <h2 className='font-headline text-3xl font-semibold text-text uppercase md:text-4xl'>
            Ready to book your strategy call?
          </h2>
          <p className='max-w-2xl text-base text-balance text-text-muted md:text-lg'>
            We&apos;ll review your goals, identify the highest-impact
            opportunities, and outline next steps tailored to your business.
          </p>
          <BookCallLink
            label='Book your call'
            variantSlug={variant.slug}
            placement='bottom'
            className='mt-2 w-full sm:w-auto'
          />
        </div>
      </AnimatedSection>
    </main>
  )
}
