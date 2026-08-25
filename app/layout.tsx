import type { Metadata } from 'next'
import { Suspense, type ReactNode } from 'react'
import Script from 'next/script'
import { Space_Grotesk, Bebas_Neue, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/src/lib/utils'
import { Toaster } from '@/src/components/ui/use-toast'
import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import { PostHogProvider } from '@/src/components/posthog-provider'
import { ScrollDepthTracker } from '@/src/components/scroll-depth-tracker'
import { AttributionCapture } from '@/src/components/attribution-capture'

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
    default: 'Place To Stand | Software Agency',
    template: '%s | Place To Stand',
  },
  description:
    'Off-the-shelf software is built for everyone. We build purpose-built software, automation, and AI around how your business actually works.',
  openGraph: {
    title: 'Place To Stand | Software Agency',
    description:
      'Off-the-shelf software is built for everyone. We build purpose-built software, automation, and AI around how your business actually works.',
    url: 'https://placetostandagency.com/',
    siteName: 'Place To Stand',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Place To Stand | Software Agency',
    description:
      'Off-the-shelf software is built for everyone. We build purpose-built software, automation, and AI around how your business actually works.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <Script id='google-tag-manager' strategy='afterInteractive'>
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MS2BB27R');
        `}
      </Script>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=AW-18356348929'
        strategy='afterInteractive'
      />
      <Script id='google-tag' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18356348929');
        `}
      </Script>
      <body
        className={cn(
          'min-h-screen overflow-x-hidden bg-bg text-text',
          spaceGrotesk.variable,
          bebasNeue.variable,
          sourceSans.variable
        )}
      >
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-MS2BB27R'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/*
          A sibling of PostHogProvider, not a child: that provider returns its
          children untouched when NEXT_PUBLIC_POSTHOG_KEY is unset, so nesting
          this inside it would stop attribution capture running in local dev.
        */}
        <Suspense fallback={null}>
          <AttributionCapture />
        </Suspense>
        <PostHogProvider>
          <div className='relative flex min-h-screen flex-col overflow-x-hidden'>
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster />
          <ScrollDepthTracker />
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  )
}
