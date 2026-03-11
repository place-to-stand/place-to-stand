import { CaseStudyNav } from '@/src/components/case-study-nav'

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <CaseStudyNav />
    </>
  )
}
