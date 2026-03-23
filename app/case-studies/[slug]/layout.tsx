import { CaseStudyNav } from '@/src/components/case-study-nav'
import { ScrollDepthTracker } from '@/src/components/scroll-depth-tracker'

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollDepthTracker />
      {children}
      <CaseStudyNav />
    </>
  )
}
