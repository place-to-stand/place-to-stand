import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { landingVariants } from '@/src/lib/landing-pages'

export default function BookACallLandingIndexPage() {
  return (
    <main className='flex-1'>
      <AnimatedSection className='flex min-h-[70svh] flex-col items-center justify-center gap-8 pt-28 text-center'>
        <div className='mx-auto flex w-full max-w-3xl flex-col items-center gap-4'>
          <p className='font-headline text-sm font-semibold uppercase tracking-[0.14em] text-ink/60'>
            Book-a-call landing pages
          </p>
          <h1 className='text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-6xl'>
            Select a messaging variant
          </h1>
          <p className='text-balance text-base text-ink/80 md:text-lg'>
            Four conversion-focused variants for small business owners.
          </p>
        </div>

        <div className='grid w-full max-w-5xl gap-5 md:grid-cols-2'>
          {landingVariants.map(variant => (
            <Card key={variant.slug} className='text-left'>
              <CardHeader>
                <CardTitle className='text-2xl'>{variant.eyebrow}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='font-semibold text-ink'>{variant.headline}</p>
                <p>{variant.subheadline}</p>
                <Button asChild variant='outline'>
                  <Link href={`/book-a-call/${variant.slug}`}>Open variant</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </main>
  )
}
