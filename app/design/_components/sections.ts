/**
 * The /design page's table of contents, in page order: the six tiers
 * (tokens, primitives, boxes, patterns, sections, templates), then the
 * guidelines. The sticky index and its scroll-spy both read it, and every
 * DesignSection takes its id from here, so the index can't point at a
 * missing anchor.
 */
export const DESIGN_SECTION_GROUPS = [
  {
    title: 'Tokens',
    sections: [
      { id: 'color', label: 'Color' },
      { id: 'type', label: 'Type' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'motion', label: 'Motion' },
    ],
  },
  {
    title: 'Primitives',
    sections: [
      { id: 'buttons', label: 'Buttons and CTA' },
      { id: 'links', label: 'Links' },
      { id: 'marks', label: 'Labels, bullets, chips' },
      { id: 'logo', label: 'Logo' },
      { id: 'forms', label: 'Forms' },
    ],
  },
  {
    title: 'Boxes',
    sections: [{ id: 'boxes', label: 'Boxes and strokes' }],
  },
  {
    title: 'Patterns',
    sections: [
      { id: 'headings', label: 'Page and section headings' },
      { id: 'rows', label: 'Ruled rows' },
      { id: 'grouped-rows', label: 'Grouped ruled rows' },
      { id: 'media', label: 'FAQ, logos, media' },
      { id: 'pieces', label: 'Lifted-out UI pieces' },
    ],
  },
  {
    title: 'Sections',
    sections: [
      { id: 'cards', label: 'Steps' },
      { id: 'featured', label: 'Results' },
      { id: 'cta-band', label: 'Closing band' },
      { id: 'section-list', label: 'All sections and variants' },
    ],
  },
  {
    title: 'Templates',
    sections: [{ id: 'templates', label: 'Page templates' }],
  },
  {
    title: 'Guidelines',
    sections: [
      { id: 'imagery', label: 'Imagery' },
      { id: 'icons', label: 'Icons' },
      { id: 'states', label: 'Interaction states' },
      { id: 'a11y', label: 'Accessibility' },
      { id: 'voice', label: 'Voice' },
    ],
  },
] as const

export type DesignSectionId =
  (typeof DESIGN_SECTION_GROUPS)[number]['sections'][number]['id']
