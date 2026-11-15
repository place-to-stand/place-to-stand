/**
 * Tiny geometric portraits for the made-up people in TeamChat: built from
 * basic shapes on a square tile (a circle head, rounded hair shapes,
 * rounded shoulders), flat fills, no outlines or gradients, and no facial
 * features: people differ by hair and skin. Simple and friendly, not
 * identicons.
 */

type Hair = 'long' | 'short' | 'buzz' | 'bun' | 'curly' | 'swept'
type Look = {
  skin: string
  hair: string
  style: Hair
  shirt: string
}

// Site palette for shirts and the tile.
const TILE = '#3a3b40' // border-light: a clear step up from the card (1.5:1)
const SHIRT = {
  lime: '#b5f542', // accent
  light: '#e8e6e3', // text
  gray: '#6b6d75',
  slate: '#8a8c93', // line
}

/** Who looks like what. Sam appears twice and keeps one face. */
const LOOKS: Record<string, Look> = {
  Dana: { skin: '#c68a62', hair: '#24170f', style: 'long', shirt: SHIRT.lime },
  Marcus: {
    skin: '#6b4430',
    hair: '#121212',
    style: 'buzz',
    shirt: SHIRT.light,
  },
  Rachel: { skin: '#f1c7a3', hair: '#8e3b1f', style: 'bun', shirt: SHIRT.gray },
  Priya: {
    skin: '#a86d48',
    hair: '#141414',
    style: 'long',
    shirt: SHIRT.light,
  },
  Leo: {
    skin: '#e0ac83',
    hair: '#d9b45f',
    style: 'short',
    shirt: SHIRT.slate,
  },
  Sam: { skin: '#b07d55', hair: '#7a5232', style: 'swept', shirt: SHIRT.lime },
  Jordan: {
    skin: '#4f3020',
    hair: '#101010',
    style: 'curly',
    shirt: SHIRT.gray,
  },
}

// On a 32x32 tile: head circle at (16, 14) r 7, shoulders below.
const HEAD = { cx: 16, cy: 14, r: 7 }
/** The top half of a circle a little wider than the head: a hair cap. */
const cap = (r: number, cy = HEAD.cy - 0.5) =>
  `M${16 - r} ${cy} a${r} ${r} 0 0 1 ${2 * r} 0 z`

function HairBack({ look }: { look: Look }) {
  // Long hair falls behind the head and shoulders.
  if (look.style !== 'long') return null
  return <rect x={8} y={8} width={16} height={18} rx={8} fill={look.hair} />
}

function HairFront({ look }: { look: Look }) {
  const f = look.hair
  switch (look.style) {
    case 'long':
    case 'short':
      return <path d={cap(7.6)} fill={f} />
    case 'buzz':
      return <path d={cap(7.2, HEAD.cy - 2)} fill={f} />
    case 'bun':
      return (
        <>
          <circle cx={16} cy={5.5} r={3.2} fill={f} />
          <path d={cap(7.6)} fill={f} />
        </>
      )
    case 'curly':
      return (
        <>
          <circle cx={10.5} cy={10} r={4} fill={f} />
          <circle cx={16} cy={7.5} r={4.5} fill={f} />
          <circle cx={21.5} cy={10} r={4} fill={f} />
          <circle cx={9} cy={14} r={2.8} fill={f} />
          <circle cx={23} cy={14} r={2.8} fill={f} />
        </>
      )
    case 'swept':
      return (
        <>
          <path d={cap(7.6)} fill={f} />
          <rect x={8.4} y={9} width={9} height={4.5} rx={2.25} fill={f} />
        </>
      )
  }
}

export function hasBlockAvatar(name: string) {
  return name in LOOKS
}

export function BlockAvatar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const look = LOOKS[name]
  if (!look) return null
  return (
    <svg aria-hidden viewBox='0 0 32 32' className={className}>
      <rect width={32} height={32} fill={TILE} />
      <HairBack look={look} />
      {/* Shoulders: a wide half circle cut off by the tile's bottom edge. */}
      <ellipse cx={16} cy={33} rx={12} ry={9} fill={look.shirt} />
      <rect x={13.5} y={18} width={5} height={7} rx={2} fill={look.skin} />
      <circle {...HEAD} fill={look.skin} />
      <HairFront look={look} />
    </svg>
  )
}

/** Everyone in the set, for /design. */
export const BLOCK_AVATAR_NAMES = Object.keys(LOOKS)
