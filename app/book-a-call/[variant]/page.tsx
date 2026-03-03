import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LandingVariantPage } from '@/src/components/sections/landing-variant-page'
import { landingVariantMap, landingVariants } from '@/src/lib/landing-pages'

type LandingVariantParams = {
  variant: string
}

type LandingVariantRouteProps = {
  params: Promise<LandingVariantParams>
}

export async function generateStaticParams() {
  return landingVariants.map(variant => ({ variant: variant.slug }))
}

export async function generateMetadata({
  params,
}: LandingVariantRouteProps): Promise<Metadata> {
  const { variant: variantSlug } = await params
  const variant = landingVariantMap[variantSlug]

  if (!variant) {
    return {
      title: 'Book a Call',
    }
  }

  return {
    title: `${variant.headline} | Book a Call`,
    description: variant.subheadline,
  }
}

export default async function LandingVariantRoute({
  params,
}: LandingVariantRouteProps) {
  const { variant: variantSlug } = await params
  const variant = landingVariantMap[variantSlug]

  if (!variant) {
    notFound()
  }

  return <LandingVariantPage variant={variant} />
}
