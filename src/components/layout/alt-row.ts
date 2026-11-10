/**
 * The big alternating row (Clients, About): a large image on one side and
 * the text on the other, switching sides each row on large screens and
 * stacking (image first) below that. One shared grid so every such row has
 * the same 48px gap between image and text, with the two columns side by
 * side and no empty column between them.
 */
export const ALT_ROW = 'grid gap-grid-1 lg:grid-cols-12 lg:gap-x-grid-2'
