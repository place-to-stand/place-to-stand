import type { Metadata } from 'next'
import { HomeTemplate } from '@/src/components/templates/home'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return <HomeTemplate />
}
