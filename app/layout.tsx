import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Afacad, Bebas_Neue, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/src/lib/utils'
import { Toaster } from '@/src/components/ui/use-toast'
import { Header } from '@/src/components/layout/header'
import { Footer } from '@/src/components/layout/footer'
import { PageParticles } from '@/src/components/sections/page-particles'

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
      <body
        className={cn(
          'min-h-screen overflow-x-hidden bg-ink text-ink',
          afacad.variable,
          bebasNeue.variable,
          sourceSans.variable
        )}
      >
        <div
          className='pts-animated-gradient pointer-events-none fixed inset-0 z-0 bg-gradientSite'
          aria-hidden
        />
        <div
          className='pointer-events-none fixed inset-0 z-0 bg-ink/10'
          aria-hidden
        />

        <PageParticles />

        <div className='relative z-10 flex min-h-screen flex-col overflow-x-hidden'>
          <Header />
          {children}
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
