export type Vendor = {
  name: string
  url: string
  description: string
}

export const vendors: Vendor[] = [
  {
    name: 'Anthropic',
    url: 'https://www.anthropic.com',
    description: 'AI reasoning & code generation',
  },
  {
    name: 'OpenAI',
    url: 'https://www.openai.com',
    description: 'AI language models & embeddings',
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
    name: 'Cloudflare',
    url: 'https://www.cloudflare.com',
    description: 'CDN, DNS & edge security',
  },
  {
    name: 'Resend',
    url: 'https://resend.com',
    description: 'Transactional email delivery',
  },
  {
    name: 'Shopify',
    url: 'https://www.shopify.com',
    description: 'E-commerce platform & storefront APIs',
  },
]
