export type VendorCategory = 'ai' | 'infra'

export type Vendor = {
  name: string
  url: string
  description: string
  /** Grouping used where the stack is shown by role (e.g. the how-we-work
   *  process). 'ai' = frontier models, 'infra' = platforms and infrastructure. */
  category: VendorCategory
  /** Brand color used to tint the vendor icon. For brands whose official mark
   *  is black/near-black, this is the recognized on-dark variant so it stays
   *  visible against the dark card background. */
  color: string
}

export const vendors: Vendor[] = [
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    description: 'Edge hosting & serverless deployment',
    category: 'infra',
    color: '#FFFFFF',
  },
  {
    name: 'Supabase',
    url: 'https://supabase.com',
    description: 'Postgres database & auth',
    category: 'infra',
    color: '#3FCF8E',
  },
  {
    name: 'Cloudflare',
    url: 'https://www.cloudflare.com',
    description: 'CDN, DNS & edge security',
    category: 'infra',
    color: '#F38020',
  },
  {
    name: 'Resend',
    url: 'https://resend.com',
    description: 'Transactional email delivery',
    category: 'infra',
    color: '#FFFFFF',
  },
  {
    name: 'Shopify',
    url: 'https://www.shopify.com',
    description: 'E-commerce platform & storefront APIs',
    category: 'infra',
    color: '#95BF47',
  },
  {
    name: 'HubSpot',
    url: 'https://www.hubspot.com',
    description: 'CRM & marketing automation',
    category: 'infra',
    color: '#FF7A59',
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    description: 'Source control & CI/CD',
    category: 'infra',
    color: '#FFFFFF',
  },
  {
    name: 'Git',
    url: 'https://git-scm.com',
    description: 'Distributed version control',
    category: 'infra',
    color: '#F05032',
  },
  {
    name: 'Next.js',
    url: 'https://nextjs.org',
    description: 'React framework for the web',
    category: 'infra',
    color: '#FFFFFF',
  },
  {
    name: 'Anthropic',
    url: 'https://www.anthropic.com',
    description: 'AI reasoning & code generation',
    category: 'ai',
    color: '#D97757',
  },
  {
    name: 'OpenAI',
    url: 'https://www.openai.com',
    description: 'AI language models & embeddings',
    category: 'ai',
    color: '#10A37F',
  },
  {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    description: 'Google multimodal AI models',
    category: 'ai',
    color: '#8E75B2',
  },
  {
    name: 'Mistral',
    url: 'https://mistral.ai',
    description: 'Open-weight foundation models',
    category: 'ai',
    color: '#FA520F',
  },
  {
    name: 'Ollama',
    url: 'https://ollama.com',
    description: 'Local open-model runtime',
    category: 'ai',
    color: '#FFFFFF',
  },
  {
    name: 'LM Studio',
    url: 'https://lmstudio.ai',
    description: 'Local LLM workspace',
    category: 'ai',
    color: '#4C6EF5',
  },
  {
    name: 'Hugging Face',
    url: 'https://huggingface.co',
    description: 'Open model & dataset hub',
    category: 'ai',
    color: '#FFD21E',
  },
]
