export type Vendor = {
  name: string
  url: string
  description: string
  /** Brand color used to tint the vendor icon. For brands whose official mark
   *  is black/near-black, this is the recognized on-dark variant so it stays
   *  visible against the dark card background. */
  color: string
}

export const vendors: Vendor[] = [
  {
    name: 'Anthropic',
    url: 'https://www.anthropic.com',
    description: 'AI reasoning & code generation',
    color: '#D97757',
  },
  {
    name: 'OpenAI',
    url: 'https://www.openai.com',
    description: 'AI language models & embeddings',
    color: '#10A37F',
  },
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    description: 'Edge hosting & serverless deployment',
    color: '#FFFFFF',
  },
  {
    name: 'Supabase',
    url: 'https://supabase.com',
    description: 'Postgres database & auth',
    color: '#3FCF8E',
  },
  {
    name: 'Cloudflare',
    url: 'https://www.cloudflare.com',
    description: 'CDN, DNS & edge security',
    color: '#F38020',
  },
  {
    name: 'Resend',
    url: 'https://resend.com',
    description: 'Transactional email delivery',
    color: '#FFFFFF',
  },
  {
    name: 'Shopify',
    url: 'https://www.shopify.com',
    description: 'E-commerce platform & storefront APIs',
    color: '#95BF47',
  },
]
