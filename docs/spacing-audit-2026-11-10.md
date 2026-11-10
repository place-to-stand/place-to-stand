# Spacing audit, Nov 10 2026

Measured in Chrome at 390 / 768 / 1024 / 1440 on every page except the home hero: Home, Platform, Process, Clients, About, Contact, Blog, two posts, the Heatonist case study, Audit, Referral, Privacy, Terms and the 404. Values are rendered distances between letters (text is trimmed to cap height), not class names. Uncommitted working note.

## Roles (from docs/design-system.md)

| Role                                   | 390 | 768 | 1024 | 1440 |
| -------------------------------------- | --- | --- | ---- | ---- |
| eyebrow (label → title)                | 24  | 24  | 24   | 24   |
| intro (title → intro)                  | 12  | 12  | 24   | 24   |
| header (page header → content)         | 48  | 72  | 96   | 96   |
| stack (heading group → content)        | 48  | 48  | 72   | 72   |
| section (content → content, same band) | 96  | 144 | 168  | 168  |
| band-pad (new: a band's own padding)   | 48  | 72  | 84   | 84   |

## Label → title

Before:

| width | role | found                               |
| ----- | ---- | ----------------------------------- |
| 390   | 24   | 12px ×8, 16px ×1, 17px ×1, 24px ×43 |
| 768   | 24   | 12px ×8, 16px ×1, 17px ×1, 24px ×43 |
| 1024  | 24   | 12px ×8, 16px ×1, 17px ×1, 24px ×43 |
| 1440  | 24   | 12px ×8, 16px ×1, 17px ×1, 24px ×43 |

After:

| width | role | found    |
| ----- | ---- | -------- |
| 390   | 24   | 24px ×53 |
| 768   | 24   | 24px ×53 |
| 1024  | 24   | 24px ×53 |
| 1440  | 24   | 24px ×53 |

## Title → intro

Before:

| width | role | found    |
| ----- | ---- | -------- |
| 390   | 12   | 12px ×22 |
| 768   | 12   | 12px ×22 |
| 1024  | 24   | 24px ×22 |
| 1440  | 24   | 24px ×22 |

After:

| width | role | found    |
| ----- | ---- | -------- |
| 390   | 12   | 12px ×24 |
| 768   | 12   | 12px ×24 |
| 1024  | 24   | 24px ×24 |
| 1440  | 24   | 24px ×24 |

## Section → section, same colour

Before:

| width | role | found                                  |
| ----- | ---- | -------------------------------------- |
| 390   | 96   | 48px ×1, 72px ×2, 96px ×15, 292px ×2   |
| 768   | 144  | 48px ×1, 96px ×2, 144px ×15, 329px ×2  |
| 1024  | 168  | 72px ×1, 120px ×2, 168px ×15, 439px ×2 |
| 1440  | 168  | 72px ×1, 120px ×2, 168px ×15, 617px ×2 |

After:

| width | role | found                                           |
| ----- | ---- | ----------------------------------------------- |
| 390   | 96   | 48px ×3, 72px ×2, 96px ×18, 484px ×2            |
| 768   | 144  | 48px ×1, 72px ×2, 96px ×2, 144px ×18, 617px ×2  |
| 1024  | 168  | 72px ×1, 84px ×2, 120px ×2, 168px ×18, 775px ×2 |
| 1440  | 168  | 72px ×1, 84px ×2, 120px ×2, 168px ×18, 953px ×2 |

## Section → section across a colour change

Before:

| width | role            | found                          |
| ----- | --------------- | ------------------------------ |
| 390   | one section gap | 96px ×13, 168px ×1, 192px ×10  |
| 768   | one section gap | 144px ×13, 240px ×1, 288px ×10 |
| 1024  | one section gap | 168px ×13, 288px ×1, 336px ×10 |
| 1440  | one section gap | 168px ×13, 288px ×1, 336px ×10 |

After:

| width | role            | found                         |
| ----- | --------------- | ----------------------------- |
| 390   | one section gap | 48px ×13, 96px ×10, 120px ×1  |
| 768   | one section gap | 72px ×13, 144px ×10, 168px ×1 |
| 1024  | one section gap | 84px ×13, 168px ×10, 204px ×1 |
| 1440  | one section gap | 84px ×13, 168px ×10, 204px ×1 |

## Worst offenders (before)

1. **Heatonist case study**: built before the design system. Label → title 12–16px (role 24), heading → content 24–48px (role 72), its own section padding (72/96px) instead of the page-owned gap, and a 617px stretch around the full-bleed video. Now on PageHeader, Section, the eyebrow/intro/stack roles and gap-section, with new type roles for its numbers (type-stat) and quote (type-quote).
2. **Colour changes doubled the section gap**: two bands each padded by the full section role, so a light → dark change put 192/288/336px between content where same-colour neighbours had 96/144/168. Bands now pad by half (band-pad), so every content-to-content gap is one section gap, colour change or not. Gaps inside a section (stack 48/72) are now always clearly smaller than gaps between sections (96–168).
3. **Blog subscribe box and 404**: label → title 12px and 17px. Now the eyebrow role; the 404 uses PageHeader.
4. **Raw spacing utilities**: 214 raw spacing classes (gap-3, gap-4, px-6, mt-3 …) across 50 files, mostly older components. Snapped to the nearest grid token (12/24/48/72/96 …); 9 deliberate optical offsets keep raw values with a comment saying why.

## Measurement notes

- Remaining large 'section' values in the raw data (484/953px) are measured across the case study's full-bleed photo and video, not real gaps.
- 84px values under 'across a colour change' are a page header's dotted rule to the first light section (band-pad), see judgment call 2.
- Legal pages: h2 → paragraph is 48/72 by design (legal prose headings).
- Clients rows: row to row is the section gap (168 at 1440), as intended.

## Judgment calls for Jason

1. **Home logo strip**: the logos sit in a dark strip with the edge role above (120 at 1440) and band-pad below (84) before the light section. Recommend: keep, it reads as one strip; making them equal would need a one-off value.
2. **Page header → first light section**: the header's dotted rule, then band-pad (84 at 1440) to the first content, so header intro → first content is 132px against the header role's 96. Recommend: keep, the rule and the colour change already separate them.
3. **Size changes from moving to type roles**: case study numbers went from 96px to 60px (type-stat), the quote from 60px to 48px (type-quote), blog list titles to 30px (type-item-title). Recommend: keep for consistency; if the case study needs more drama, give type-stat a larger step on large screens for every page.
4. **Rounded micro-spacing**: gap-4 (16px) became 12px and px-8 (32px) became 24px in a few components (forms, audit tiles). Recommend: keep; give the audit flow one look by eye.

## Proposed spacing set (one value per role per breakpoint)

|                                     | 390 | 768 | 1024+ |
| ----------------------------------- | --- | --- | ----- |
| grid-half (tight pairs, list items) | 12  | 12  | 12    |
| intro                               | 12  | 12  | 24    |
| eyebrow                             | 24  | 24  | 24    |
| card padding                        | 24  | 24  | 36    |
| stack (heading → content)           | 48  | 48  | 72    |
| header (page header → content)      | 48  | 72  | 96    |
| band-pad                            | 48  | 72  | 84    |
| section                             | 96  | 144 | 168   |
