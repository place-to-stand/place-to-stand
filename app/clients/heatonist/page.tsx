import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { CaseStudyTemplate } from '@/src/components/templates/case-study'
import { heatonistCaseStudy as cs } from '@/src/lib/case-study-heatonist'

export const metadata: Metadata = pageMetadata({
  title: cs.title,
  description: cs.description,
  path: cs.path,
})

export default function HeatonistCaseStudyPage() {
  return <CaseStudyTemplate />
}
