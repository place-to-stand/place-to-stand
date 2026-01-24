import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referral Partners | Place to Stand',
  description:
    'Interested in partnering with Place To Stand? Get in touch to discuss referral opportunities.',
}

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
