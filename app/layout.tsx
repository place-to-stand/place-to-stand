import type { Metadata, Viewport } from 'next'
import { Suspense, type ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
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

const GTM_ID = 'GTM-MS2BB27R'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://placetostandagency.com/'),
  title: {
    default: 'Place To Stand | Custom Software & AI Development Agency',
    template: '%s | Place To Stand',
  },
  description:
    'Off-the-shelf software is made for everyone. We build custom software, automation, and AI around how your business actually works.',
  openGraph: {
    title: 'Place To Stand | Custom Software & AI Development Agency',
    description:
      'Off-the-shelf software is made for everyone. We build custom software, automation, and AI around how your business actually works.',
    url: 'https://placetostandagency.com/',
    siteName: 'Place To Stand',
    locale: 'en_US',
    type: 'website',
  },
  // iOS WebViews (e.g. the TikTok in-app browser) auto-link phone numbers,
  // dates and addresses by rewriting the DOM before React hydrates, which
  // surfaces as React error #418. Opt out so the server HTML stays untouched.
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Place To Stand | Custom Software & AI Development Agency',
    description:
      'Off-the-shelf software is made for everyone. We build custom software, automation, and AI around how your business actually works.',
  },
}

// Every page on the site is static. Fail the build if a change would make
// any of them render per request.
export const ensureStatic = 'navigation'

// Matches --color-bg so mobile browser chrome blends into the page.
export const viewport: Viewport = {
  themeColor: '#0e0f11',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className='scroll-smooth'
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={GTM_ID} />
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
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
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
