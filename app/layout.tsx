import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { Space_Grotesk, Bebas_Neue, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/src/lib/utils'
import { Toaster } from '@/src/components/ui/use-toast'
import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import { PostHogProvider } from '@/src/components/posthog-provider'
import { FloatingBookCta } from '@/src/components/floating-book-cta'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
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

export const metadata: Metadata = {
  metadataBase: new URL('https://placetostandagency.com/'),
  title: {
    default: 'Place To Stand | Bureaucracy feeds on inefficiency. We starve it.',
    template: '%s | Place To Stand',
  },
  description:
    'One builder + AI workflows replaces the traditional agency structure. Custom software, automation, and AI solutions.',
  openGraph: {
    title: 'Place To Stand | Bureaucracy feeds on inefficiency. We starve it.',
    description:
      'One builder + AI workflows replaces the traditional agency structure. Custom software, automation, and AI solutions.',
    url: 'https://placetostandagency.com/',
    siteName: 'Place To Stand',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Place To Stand | Bureaucracy feeds on inefficiency. We starve it.',
    description:
      'One builder + AI workflows replaces the traditional agency structure. Custom software, automation, and AI solutions.',
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
          'min-h-screen overflow-x-hidden bg-bg text-text',
          spaceGrotesk.variable,
          bebasNeue.variable,
          sourceSans.variable
        )}
      >
        <PostHogProvider>
          <div className='relative flex min-h-screen flex-col overflow-x-hidden'>
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
