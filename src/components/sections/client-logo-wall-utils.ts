/** Cells in the homepage logo grid at its widest (5×2 from 1280px). */
export const LOGO_SLOTS = 10

/** Cells showing at each width: three rows of two on phones, then two rows of
 * three from 576px wide, four from 800px and five from 1280px. Must match the grid classes and the
 * `slotVisibility` classes in client-logo-wall.tsx. */
export const VISIBLE_SLOTS = {
  phone: 6,
  tablet: 6,
  wideTablet: 8,
  laptop: 10,
} as const

/** Time between swaps, and how long the old logo takes to blur away. The new
 * logo's scan-in runs `SCAN_IN_MS` (`.logo-swap-in` in app/globals.css). */
export const SWAP_INTERVAL_MS = 8000
/** How long the opening set stays put once the grid first scrolls into view. */
export const FIRST_SWAP_DELAY_MS = 10000
export const SWAP_FADE_MS = 400
/** Must match the `.logo-swap-in` animation length in app/globals.css. */
export const SCAN_IN_MS = 900

/**
 * Picks the next swap. The first always takes the last cell (bottom right), so
 * the big names up front stay put while a visitor takes in the grid; after
 * that a random cell (never the one just swapped, so the eye doesn't sit on
 * one spot) takes the client that has gone longest unseen. A cell under the
 * pointer or keyboard focus (`held`) is never picked.
 * `shown` holds client indexes, one per cell.
 */
export function nextSwap(
  shown: number[],
  total: number,
  lastSlot: number | null,
  held: number | null,
  random: () => number = Math.random
): { slot: number; client: number } {
  const hidden = []
  for (let i = 0; i < total; i++) if (!shown.includes(i)) hidden.push(i)

  // Clients past the initial set wait in list order; once everyone has had a
  // turn, the one that left the grid longest ago comes back first.
  const client = hidden.sort((a, b) => lastSeen(a) - lastSeen(b))[0]

  const slots = shown.map((_, i) => i).filter(i => i !== lastSlot && i !== held)
  const slot =
    lastSlot === null && held !== shown.length - 1
      ? shown.length - 1
      : slots[Math.floor(random() * slots.length)]
  seen.set(shown[slot], ++clock)
  return { slot, client }
}

// When each client last left the grid; unseen clients sort first, by list order.
const seen = new Map<number, number>()
let clock = 0
function lastSeen(client: number): number {
  return seen.get(client) ?? client - 1e6
}
