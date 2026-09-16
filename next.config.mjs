import { withBotId } from 'botid/next/config'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
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
  // Pages are served as HTML or, on `Accept: text/markdown`, as markdown
  // (see proxy.ts). `Vary: Accept` keeps a CDN from handing one variant to a
  // client that asked for the other. Next merges this with its own Vary list.
  async headers() {
    return [
      {
        source: '/((?!_next/|api/|.*\\.[a-z0-9]+$).*)',
        headers: [{ key: 'Vary', value: 'Accept' }],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default withBotId(nextConfig)
