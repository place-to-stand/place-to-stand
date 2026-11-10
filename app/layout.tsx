import type { Metadata, Viewport } from 'next'
import { Suspense, type ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/src/lib/utils'
import { Toaster } from '@/src/components/primitives/use-toast'
import { Header } from '@/src/components/sections/header'
import { SkipLink } from '@/src/components/primitives/skip-link'
import { Footer } from '@/src/components/sections/footer'
import { PostHogProvider } from '@/src/components/posthog-provider'
import { ScrollDepthTracker } from '@/src/components/scroll-depth-tracker'
import { AttributionCapture } from '@/src/components/attribution-capture'
import { JsonLd } from '@/src/components/seo/json-ld'
import { organizationJsonLd, webSiteJsonLd } from '@/src/lib/structured-data'

const GTM_ID = 'GTM-MS2BB27R'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

// Body text.
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-plex-sans',
})

// Labels, buttons and footnotes. Not a variable font, so list the weights used.
const plexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://placetostandagency.com/'),
  title: {
    default: 'Custom Software & AI Development | Place To Stand Agency',
    template: '%s | Place To Stand Agency',
  },
  description:
    'Custom software, automation and online stores, shaped to how your business runs. Built by the engineers you talk to, and yours to keep.',
  openGraph: {
    title: 'Custom Software & AI Development | Place To Stand Agency',
    description:
      'Custom software, automation and online stores, shaped to how your business runs. Built by the engineers you talk to, and yours to keep.',
    url: 'https://placetostandagency.com/',
    siteName: 'Place To Stand Agency',
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
    title: 'Custom Software & AI Development | Place To Stand Agency',
    description:
      'Custom software, automation and online stores, shaped to how your business runs. Built by the engineers you talk to, and yours to keep.',
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
          'min-h-screen overflow-x-clip bg-bg text-text',
          spaceGrotesk.variable,
          plexSans.variable,
          plexMono.variable
        )}
      >
        <SkipLink />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
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
          <div className='relative flex min-h-screen flex-col overflow-x-clip'>
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
