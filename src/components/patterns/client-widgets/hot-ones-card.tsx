/* oxlint-disable next-js/no-img-element, design/no-raw-color, design/no-raw-aspect, design/no-raw-focus -- hotones.com's lineup card rebuilt in HTML for Home's proof, in their colors and sizes */
'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { HeatMeter } from './heat-meter'

/**
 * A hotones.com "Explore the sauces" card, rebuilt in HTML so it stays sharp
 * at any size. Same layout as theirs (a 266 x 405 card): the yellow front
 * with the number, the bottle and the "Flip for more!" badge; the red back
 * with the number, the sauce, its notes and the heat meter. Every size is a
 * share of the card's width (u = 1/266 of it), so it scales whole.
 *
 * It is a button: click, tap, Enter or Space flips it, like on their site.
 * `autoFlip` turns it once when it first scrolls into view; after that the
 * visitor drives it. Reduced motion swaps the faces without the 3D turn.
 */
const YELLOW = '#FED204'
const RED = '#DA1F27'

const u = (px: number) => `calc(${px} * var(--ho-u))`

export function HotOnesCard({
  number,
  name,
  maker,
  notes,
  level,
  bottle,
  autoFlip = false,
  className,
  style,
}: {
  number: number
  name: string
  /** The maker, after the name ("Beach Bonnet | Double Comfort"). */
  maker?: string
  notes: string[]
  level: number
  bottle: string
  autoFlip?: boolean
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [flipped, setFlipped] = useState(false)
  const touched = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!autoFlip || !el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: ReturnType<typeof setTimeout> | undefined
    let frame = 0
    let done = false
    // Wait until the card can actually be seen: in view, its section's
    // fade-in finished (every ancestor fully opaque) and its fonts loaded.
    // Otherwise the turn plays under the fade and it just appears flipped,
    // as it did on a refresh with the section already on screen.
    const opaque = () => {
      for (let n: HTMLElement | null = el; n; n = n.parentElement)
        if (parseFloat(getComputedStyle(n).opacity) < 0.99) return false
      return true
    }
    const whenShown = () => {
      if (done) return
      if (!opaque()) {
        frame = requestAnimationFrame(whenShown)
        return
      }
      done = true
      timer = setTimeout(() => {
        if (!touched.current) setFlipped(true)
      }, 500)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        document.fonts.ready.then(whenShown)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [autoFlip])

  const face: CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: u(16),
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    overflow: 'hidden',
  }
  const frame = (color: string): CSSProperties => ({
    position: 'absolute',
    inset: u(8),
    border: `${u(4)} solid ${color}`,
    borderRadius: u(12),
  })

  return (
    <div className={`@container ${className ?? ''}`} style={style}>
      <button
        ref={ref}
        type='button'
        aria-pressed={flipped}
        // The faces are drawn for the eye; the name says what's on the
        // card (both sides), then what pressing does.
        aria-label={`${name}${maker ? `, ${maker}` : ''}: ${notes.join(', ')}; heat level ${level} of 10. Flip card`}
        onClick={() => {
          touched.current = true
          setFlipped(f => !f)
        }}
        className='block aspect-[266/405] w-full cursor-pointer transition-transform duration-(--hover-dur) ease-(--hover-ease) [perspective:1400px] hover:-translate-y-[2%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none'
        style={{ '--ho-u': 'calc(100cqw / 266)' } as CSSProperties}
      >
        <span
          // Only the turn lives here; the hover lift is on the button, so it
          // is the same on either face.
          className={`relative block size-full transition-transform duration-[800ms] ease-(--ease-enter) [transform-style:preserve-3d] motion-reduce:transition-none ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {/* Front */}
          <span
            style={{ ...face, backgroundColor: YELLOW }}
            className='shadow-[12px_20px_40px_-14px_rgba(0,0,0,0.6)]'
          >
            <img
              src={bottle}
              alt=''
              loading='lazy'
              decoding='async'
              style={{
                position: 'absolute',
                left: u(12),
                top: u(21),
                width: u(242),
                height: u(363),
                objectFit: 'contain',
              }}
            />
            <span style={frame(RED)} />
            <span
              style={{
                position: 'absolute',
                left: u(20),
                top: u(16),
                fontFamily: 'var(--font-passion-one)',
                fontSize: u(48),
                lineHeight: 1,
                color: '#000',
              }}
            >
              #{number}
            </span>
            <FlipBadge
              style={{
                position: 'absolute',
                left: u(36),
                top: u(327),
                width: u(194),
                height: u(58),
              }}
            />
          </span>
          {/* Back */}
          <span
            style={{
              ...face,
              backgroundColor: RED,
              transform: 'rotateY(180deg)',
            }}
            className='shadow-[-12px_20px_40px_-14px_rgba(0,0,0,0.6)]'
          >
            <span style={frame(YELLOW)} />
            <span
              style={{
                position: 'absolute',
                left: u(12),
                right: u(12),
                top: u(16),
                textAlign: 'center',
                fontFamily: 'var(--font-passion-one)',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: u(48),
                  lineHeight: 1,
                  color: YELLOW,
                }}
              >
                #{number}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: u(20),
                  lineHeight: 1,
                  color: '#fff',
                  paddingBottom: u(12),
                  borderBottom: `${u(4)} solid ${YELLOW}`,
                  margin: `0 ${u(-4)}`,
                }}
              >
                {name}
                {maker && ` | ${maker}`}
              </span>
              <span
                style={{
                  display: 'block',
                  paddingTop: u(14),
                  fontSize: u(24),
                  lineHeight: 1,
                  color: '#fff',
                }}
              >
                {notes.map(n => (
                  <span key={n} style={{ display: 'block' }}>
                    {n}
                  </span>
                ))}
              </span>
            </span>
            <HeatMeter
              level={level}
              className='absolute'
              style={{ left: u(12), top: u(264), width: u(242) }}
            />
          </span>
        </span>
      </button>
    </div>
  )
}

/** Their red starburst with "Flip for more!" set in a brush-style face. */
function FlipBadge({ style }: { style: CSSProperties }) {
  const points: string[] = []
  const n = 26
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2
    const r = i % 2 === 0 ? 1 : 0.78
    points.push(
      `${(50 + Math.cos(a) * 50 * r).toFixed(2)},${(50 + Math.sin(a) * 50 * r).toFixed(2)}`
    )
  }
  return (
    <span style={style}>
      <svg
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <polygon points={points.join(' ')} fill={RED} />
      </svg>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-bangers)',
          fontSize: 'calc(16 * var(--ho-u))',
          letterSpacing: '0.04em',
          fontStyle: 'italic',
          color: '#fff',
          textTransform: 'uppercase',
          transform: 'skewX(-6deg)',
        }}
      >
        Flip for more!
      </span>
    </span>
  )
}
