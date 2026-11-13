export type Vendor = {
  name: string
  url: string
  description: string
}

/** "Our usual stack" on Process, in the order shown (approved Nov 13). Each
 *  name has a one-color mark in vendorIcons. */
export const vendors: Vendor[] = [
  {
    name: 'Claude',
    url: 'https://claude.ai',
    description: 'AI models for planning and writing code',
  },
  {
    name: 'Cloudflare',
    url: 'https://www.cloudflare.com',
    description: 'CDN, DNS & edge security',
  },
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    description: 'Edge hosting & serverless deployment',
  },
  {
    name: 'Supabase',
    url: 'https://supabase.com',
    description: 'Postgres database & auth',
  },
  {
    name: 'Resend',
    url: 'https://resend.com',
    description: 'Transactional email delivery',
  },
  {
    name: 'PostHog',
    url: 'https://posthog.com',
    description: 'Product analytics & session replay',
  },
  {
    name: 'Shopify',
    url: 'https://www.shopify.com',
    description: 'E-commerce platform & storefront APIs',
  },
  {
    name: 'Stripe',
    url: 'https://stripe.com',
    description: 'Payments & billing',
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    description: 'Source control & CI/CD',
  },
]
