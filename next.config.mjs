import { withBotId } from 'botid/next/config'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: projectRoot,
  },
  // react-pdf reads the referral PDF's fonts from disk at request time; make
  // sure the files ship inside that function's bundle on Vercel.
  outputFileTracingIncludes: {
    '/referral/pdf': ['./public/fonts/**/*'],
    // The social share image reads the same fonts.
    '/opengraph-image': ['./public/fonts/**/*'],
    '/twitter-image': ['./public/fonts/**/*'],
  },
  images: {
    // AVIF first (~20% smaller than WebP); browsers without it get WebP.
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://t.placetostandagency.com'

// Report-only for now: violations are sent to PostHog (CSP reporting) and
// nothing is blocked. Once the reports are clean, rename the header to
// Content-Security-Policy to enforce it. 'unsafe-inline' scripts are needed
// because every page is static (no per-request nonce) and GTM's tags inject
// inline code.
// React's dev build evals for debugging and Vercel Analytics loads its debug
// script from a CDN; production needs neither, so keep them out of its policy.
const devScriptSources =
  process.env.NODE_ENV === 'development'
    ? " 'unsafe-eval' https://va.vercel-scripts.com"
    : ''

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${posthogHost} https://*.googletagmanager.com https://www.googleadservices.com https://www.google.com https://*.doubleclick.net https://pagead2.googlesyndication.com${devScriptSources}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${posthogHost} https://us.posthog.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.doubleclick.net https://www.google.com https://www.googleadservices.com https://pagead2.googlesyndication.com`,
  'frame-src https://www.googletagmanager.com https://*.doubleclick.net',
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(process.env.NEXT_PUBLIC_POSTHOG_KEY
    ? [
        // Direct to PostHog ingest: the docs don't cover CSP reports through
        // the reverse proxy. Bump `v` whenever the policy changes.
        `report-uri https://us.i.posthog.com/report/?token=${process.env.NEXT_PUBLIC_POSTHOG_KEY}&v=1`,
      ]
    : []),
].join('; ')

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: contentSecurityPolicy,
  },
]

export default withBotId(nextConfig)
