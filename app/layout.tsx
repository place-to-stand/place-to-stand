import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { Afacad, Bebas_Neue, Ovo, Source_Sans_3, Work_Sans } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/src/lib/utils'
import { Toaster } from '@/src/components/ui/use-toast'
import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import { PageParticles } from '@/src/components/sections/page-particles'
import { PostHogProvider } from '@/src/components/posthog-provider'
import { FloatingBookCta } from '@/src/components/floating-book-cta'

const afacad = Afacad({
  subsets: ['latin'],
  variable: '--font-afacad',
  adjustFontFallback: false,
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  adjustFontFallback: false,
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  adjustFontFallback: false,
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: '400',
  adjustFontFallback: false,
})

const ovo = Ovo({
  subsets: ['latin'],
  variable: '--font-ovo',
  weight: '400',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://placetostandagency.com/'),
  title: {
    default: 'Place To Stand | Your Lever in the Digital World',
    template: '%s | Place To Stand',
  },
  description:
    'We help small businesses make big moves with the right tools and a solid foundation. Digital Strategy, Development, and Marketing.',
  openGraph: {
    title: 'Place To Stand | Your Lever in the Digital World',
    description:
      'We help small businesses make big moves with the right tools and a solid foundation. Digital Strategy, Development, and Marketing.',
    url: 'https://placetostandagency.com/',
    siteName: 'Place To Stand',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Place To Stand | Your Lever in the Digital World',
    description:
      'We help small businesses make big moves with the right tools and a solid foundation. Digital Strategy, Development, and Marketing.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <head>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=AW-18004452791'
          strategy='afterInteractive'
        />
        <Script id='google-ads' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18004452791');
          `}
        </Script>
      </head>
      <body
        className={cn(
          'min-h-screen overflow-x-hidden bg-ink text-ink',
          afacad.variable,
          bebasNeue.variable,
          sourceSans.variable,
          workSans.variable,
          ovo.variable
        )}
      >
        <PostHogProvider>
          <div
            className='pointer-events-none fixed inset-0 z-0 bg-white'
            aria-hidden
          />

          {/* <PageParticles /> */}

          <div className='relative z-10 flex min-h-screen flex-col overflow-x-hidden'>
            <Header />
            {children}
            <Footer />
          </div>
          <FloatingBookCta />
          <Toaster />
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  )
}
