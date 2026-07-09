import type { ReactElement } from 'react'

/**
 * Simplified, monochrome SaaS logo marks for the hero's "sprawl" side. Authored
 * on a 24x24 grid using currentColor, so a parent group sets the (muted grey)
 * colour and a transform scales them into the scattered field. Recognisable by
 * silhouette; deliberately not brand-coloured, to stay within the site palette
 * and let the single accent app read as the resolution.
 */

export function AsanaLogo(): ReactElement {
  return (
    <g fill="currentColor">
      <circle cx="12" cy="6" r="3.4" />
      <circle cx="6.2" cy="15.5" r="3.4" />
      <circle cx="17.8" cy="15.5" r="3.4" />
    </g>
  )
}

export function MondayLogo(): ReactElement {
  return (
    <g fill="currentColor">
      <rect x="4.5" y="5" width="3.5" height="14" rx="1.75" />
      <rect x="10.25" y="5" width="3.5" height="14" rx="1.75" />
      <rect x="16" y="5" width="3.5" height="14" rx="1.75" />
    </g>
  )
}

export function SlackLogo(): ReactElement {
  return (
    <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <line x1="9" y1="3.5" x2="7.5" y2="20.5" />
      <line x1="16.5" y1="3.5" x2="15" y2="20.5" />
      <line x1="3.5" y1="9" x2="20.5" y2="7.5" />
      <line x1="3.5" y1="16.5" x2="20.5" y2="15" />
    </g>
  )
}

export function TrelloLogo(): ReactElement {
  return (
    <g>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="6.5" y="6.5" width="4" height="11" rx="1" fill="currentColor" />
      <rect x="13.5" y="6.5" width="4" height="7.5" rx="1" fill="currentColor" />
    </g>
  )
}

export function NotionLogo(): ReactElement {
  return (
    <g>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8.5 16.5 V8 l7 8.5 V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

export function SheetsLogo(): ReactElement {
  return (
    <g>
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="10.3" x2="20" y2="10.3" stroke="currentColor" strokeWidth="1.6" />
      <line x1="4" y1="15" x2="20" y2="15" stroke="currentColor" strokeWidth="1.6" />
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.6" />
    </g>
  )
}
