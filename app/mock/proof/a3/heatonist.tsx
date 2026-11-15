/* eslint-disable @next/next/no-img-element, design/no-raw-color, design/no-raw-border -- a mock rebuild of heatonist.com's filter and product card, in their colors and sizes */
import type { CSSProperties } from 'react'

/**
 * heatonist.com's collection page, two pieces rebuilt in HTML from their live
 * markup (sizes, fonts, colors and copy as measured on Nov 15): the Heat
 * filter group and the Trio Pack product card. Each scales as one object:
 * every size is a share of its width (u), so text stays sharp at any size.
 * Both sit on the shared object treatment (their 8px radius, a hairline, a
 * solid red top rule, the composition's shadow).
 */
const RED = '#DC1F26'
const u = (px: number) => `calc(${px} * var(--ht-u))`

function Shell({
  base,
  className,
  style,
  children,
}: {
  /** The piece's width on heatonist.com, in px. */
  base: number
  className?: string
  style?: CSSProperties
  children: React.ReactNode
}) {
  return (
    <div className={`@container ${className ?? ''}`} style={style}>
      <div
        className='overflow-hidden rounded-[3.2cqw] border border-black/10 bg-white shadow-[10px_16px_32px_-10px_rgba(0,0,0,0.6)]'
        style={{ '--ht-u': `calc(100cqw / ${base})` } as CSSProperties}
      >
        <div style={{ height: u(3), backgroundColor: '#ce2a39' }} />
        {children}
      </div>
    </div>
  )
}

const LEVELS = [
  ['Mild', 15],
  ['Medium', 12],
  ['Hot', 11],
  ['Hottest', 5],
] as const

export function HeatFilter({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <Shell base={254} className={className} style={style}>
      <div
        aria-hidden
        style={{
          padding: `${u(18)} ${u(20)} ${u(20)}`,
          fontFamily: 'var(--font-open-sans)',
          color: '#000',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-poppins)',
            fontWeight: 700,
            fontSize: u(26),
            lineHeight: 1.15,
            textTransform: 'uppercase',
          }}
        >
          Filters
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: u(14),
            paddingBottom: u(10),
            fontFamily: 'var(--font-poppins)',
            fontWeight: 700,
            fontSize: u(16),
            textTransform: 'uppercase',
          }}
        >
          <span>Heat</span>
          <span style={{ fontSize: u(20), lineHeight: 1 }}>–</span>
        </div>
        {LEVELS.map(([label, n]) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: u(8),
              height: u(26),
              fontSize: u(14),
            }}
          >
            <span
              style={{
                width: u(14),
                height: u(14),
                border: `${u(2)} solid #474747`,
                background: '#fff',
                flexShrink: 0,
              }}
            />
            <span>{label}</span>
            <span style={{ fontSize: u(12), color: '#909090' }}>({n})</span>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function TrioCard({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <Shell base={250} className={className} style={style}>
      <div
        aria-hidden
        style={{ position: 'relative', fontFamily: 'var(--font-open-sans)' }}
      >
        <img
          src='/mock/a3/trio-photo.webp'
          alt=''
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
        <span
          style={{
            position: 'absolute',
            left: u(10),
            top: u(10),
            padding: `${u(4)} ${u(8)}`,
            borderRadius: u(6),
            background: RED,
            color: '#fff',
            fontWeight: 600,
            fontSize: u(12),
            lineHeight: 1.5,
            textTransform: 'uppercase',
          }}
        >
          Save 9%
        </span>
        <span
          style={{
            position: 'absolute',
            right: u(8),
            top: u(8),
            width: u(36),
            height: u(36),
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: `${u(1)} solid #e5e5e5`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox='0 0 24 24' style={{ width: u(20), height: u(20) }}>
            <path
              d='M12 20.3 4.6 13a4.7 4.7 0 0 1 6.7-6.7l.7.7.7-.7A4.7 4.7 0 0 1 19.4 13Z'
              fill='none'
              stroke='#666'
              strokeWidth='1.6'
              strokeLinejoin='round'
            />
          </svg>
        </span>
        <div
          style={{
            padding: `${u(12)} ${u(10)} ${u(14)}`,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: u(12), color: '#474747' }}>
            Hot Ones Hot Sauce
          </div>
          <div
            style={{
              fontSize: u(15),
              fontWeight: 700,
              lineHeight: 1.3,
              marginTop: u(4),
              color: '#000',
            }}
          >
            Hot Ones Hot Sauce Trio Pack - Season 31
          </div>
          <p
            style={{
              fontSize: u(12),
              lineHeight: 1.4,
              marginTop: u(4),
              color: 'rgba(0,0,0,0.54)',
            }}
          >
            House Sauce, Rojo, Thermageddon. Mild to wild.
          </p>
          <div style={{ fontSize: u(14), marginTop: u(6), color: RED }}>
            $40{' '}
            <span style={{ color: '#909090', textDecoration: 'line-through' }}>
              $44
            </span>
          </div>
        </div>
      </div>
    </Shell>
  )
}
