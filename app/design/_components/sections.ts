/**
 * The /design page's table of contents, in page order: the six tiers
 * (tokens, primitives, boxes, patterns, sections, templates), then the
 * guidelines, each with a one-line intro. The sticky index and its scroll-spy both read it, and every
 * DesignSection takes its id from here, so the index can't point at a
 * missing anchor.
 */
export const DESIGN_SECTION_GROUPS = [
  {
    title: 'Tokens',
    intro:
      'Colors, type, spacing and motion: the values every other piece is made of.',
    sections: [
      { id: 'color', label: 'Color' },
      { id: 'type', label: 'Type' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'motion', label: 'Motion' },
    ],
  },
  {
    title: 'Primitives',
    intro:
      'The smallest parts: buttons, links, labels, the logo and form fields.',
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
    intro:
      'Every box on the site. Each one owns its stroke, so pages never draw borders.',
    sections: [{ id: 'boxes', label: 'Boxes and strokes' }],
  },
  {
    title: 'Patterns',
    intro: 'Page scaffolding: headings, ruled rows, media and lifted-out UI.',
    sections: [
      { id: 'headings', label: 'Page and section headings' },
      { id: 'rows', label: 'Ruled rows' },
      { id: 'grouped-rows', label: 'Grouped ruled rows' },
      { id: 'media', label: 'FAQ, logos, media' },
      { id: 'pieces', label: 'Lifted-out UI pieces' },
      { id: 'chat', label: 'Team chat' },
      { id: 'split', label: 'Split section (proposed)' },
    ],
  },
  {
    title: 'Sections',
    intro: 'Whole sections, as they appear on pages.',
    sections: [
      { id: 'cards', label: 'Steps' },
      { id: 'featured', label: 'Results' },
      { id: 'cta-band', label: 'Closing band' },
      { id: 'section-list', label: 'All sections and variants' },
    ],
  },
  {
    title: 'Templates',
    intro: 'How pages put the sections together.',
    sections: [{ id: 'templates', label: 'Page templates' }],
  },
  {
    title: 'Guidelines',
    intro:
      'The rules behind imagery, icons, interaction states, accessibility and voice.',
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

export type DesignGroupTitle = (typeof DESIGN_SECTION_GROUPS)[number]['title']
