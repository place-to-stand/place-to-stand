# Implementation Plan: Place To Stand — Complete Website Redesign

## Overview

Complete redesign of placetostandagency.com from a single-page light-themed site to a multi-page dark blueprint/schematic aesthetic.

### Design System
- **Background**: `#0e0f11` (off-black) with CSS dot-grid pattern
- **Text**: `#e8e6e3` (off-white) primary, `#8a8a8d` (muted)
- **Accent**: `#b5f542` (lime-green) for CTAs and highlights
- **Cards**: `#1a1b1f` surface, `#242529` elevated
- **Borders**: `#2a2b30` default, `#3a3b40` light

### Architecture
- Multi-page routing with Next.js App Router
- Routes: `/`, `/services`, `/services/[slug]`, `/case-studies`, `/field-notes`, `/team`, `/how-we-work`, `/contact`
- Preserved: `/book-a-call/[variant]` (15 variants), `/privacy`, `/terms`, `/referral`

### Messaging Framework
- **Belief**: "Bureaucracy feeds on inefficiency. We starve it."
- **Principle**: "One builder + AI workflows replaces the traditional agency structure."
- **Pillars**: Ownership, Direct Access, AI Speed
- **Phases**: Validate → Scale → Optimize → Reinvent

### Implementation Phases
1. Design System Foundation — Color tokens, UI components, dot-grid background
2. Layout Shell — Dark header, footer, route-based navigation
3. Data Layer — Typed modules for services, case studies, field notes, team
4. Homepage Rewrite — Hero, pillars, phases, manifesto, preview sections
5. Dedicated Pages — Services, case studies, field notes, team, how we work, contact
6. Restyle Existing Routes — Landing variants, privacy, terms, referral
7. SEO & Cleanup — Sitemap, metadata, dead code removal

### Key Files
- Theme: `app/globals.css`, `tailwind.config.ts`
- Layout: `app/layout.tsx`, `src/components/layout/header.tsx`, `footer.tsx`, `nav-links.ts`
- Data: `src/lib/services.ts`, `case-studies.ts`, `field-notes.ts`, `team.ts`
- Pages: `app/page.tsx`, `app/services/`, `app/case-studies/`, `app/field-notes/`, `app/team/`, `app/how-we-work/`, `app/contact/`

### Preserved Backend
- Contact form (Resend + BotID + Portal API)
- Referral form (Resend + BotID)
- PostHog analytics
- Google Ads tracking (AW-18004452791)
- Landing page variant system (15 variants)
- Vercel Analytics
