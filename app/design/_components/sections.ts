/**
 * The /design page's table of contents, in page order. The sticky index and
 * its scroll-spy both read it, and every DesignSection takes its id from here,
 * so the index can't point at a missing anchor.
 */
export const DESIGN_SECTION_GROUPS = [
  {
    title: 'Foundations',
    sections: [
      { id: 'colour', label: 'Colour' },
      { id: 'type', label: 'Type' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'motion', label: 'Motion' },
    ],
  },
  {
    title: 'Components',
    sections: [
      { id: 'buttons', label: 'Buttons and CTA' },
      { id: 'links', label: 'Links' },
      { id: 'marks', label: 'Labels, bullets, chips' },
      { id: 'logo', label: 'Logo' },
      { id: 'forms', label: 'Forms' },
    ],
  },
  {
    title: 'Patterns',
    sections: [
      { id: 'headings', label: 'Page and section headings' },
      { id: 'cards', label: 'Offer cards and steps' },
      { id: 'rows', label: 'Ruled rows' },
      { id: 'alt-row', label: 'Alternating row' },
      { id: 'featured', label: 'Featured case study' },
      { id: 'cta-band', label: 'Closing band' },
    ],
  },
] as const

export type DesignSectionId =
  (typeof DESIGN_SECTION_GROUPS)[number]['sections'][number]['id']
