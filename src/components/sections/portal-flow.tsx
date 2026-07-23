'use client'

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type TouchEvent,
} from 'react'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { cn } from '@/src/lib/utils'
import { PortalPipeline } from '@/src/components/graphics/portal-pipeline'

/**
 * The portal as one full-width set piece that plays itself. A single pipeline
 * graphic (comms → task → plan → cloud sandbox → GitHub → deploy) stays on
 * screen with its connectors marching; once in view the autoplay moves a
 * spotlight from stage to stage, narrated by a caption that follows the action.
 * The reader can jump between stages on the rail, and hovering pauses all motion
 * so they can linger.
 *
 * Under prefers-reduced-motion it falls back to the fully-lit pipeline with the
 * stage write-ups listed beneath it.
 */

type Scene = {
  key: string
  /** Short station label on the progress rail. */
  label: string
  /** Caption heading — the action happening in this stage. */
  status: string
  /** Caption line for every reader. */
  description: string
}

const SCENES: Scene[] = [
  {
    key: 'board',
    label: 'Board',
    status: 'Comms → Task',
    description:
      'A conversation, an email, or a meeting becomes a card on the board, ready to hand off.',
  },
  {
    key: 'plan',
    label: 'Planning',
    status: 'Human + agent planning',
    description:
      'A human and a frontier model draft the plan together, and we approve the version we want.',
  },
  {
    key: 'cloud',
    label: 'Dispatch',
    status: 'Dispatched to a cloud agent',
    description:
      'The approved plan goes to a deployed agent that builds it end to end in its own isolated cloud sandbox.',
  },
  {
    key: 'pr',
    label: 'Review',
    status: 'Human QA and tastemaking',
    description:
      'The agent opens a pull request; we pull it down, run it, and apply our taste and judgment.',
  },
  {
    key: 'deploy',
    label: 'Deploy',
    status: 'Verified and deployed',
    description:
      'Once it clears our checks and the live preview looks right, we verify and merge to production.',
  },
]

const N = SCENES.length

/** How long each stage holds the spotlight before advancing (ms). */
const SCENE_MS = 4200

/** Minimum horizontal travel (px) to register a stage swipe on mobile. Below this,
 *  or when the gesture is more vertical than horizontal, the page scrolls normally. */
const SWIPE_THRESHOLD = 40

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
/** Below Tailwind `md`, matching the heading's md:flex-row breakpoint. The wide
 *  pipeline strip is illegible here, so the graphic crops to one stage at a time. */
const MOBILE_QUERY = '(max-width: 767px)'

/** Subscribe to a media query without setState-in-effect; SSR-safe (server
 *  snapshot is false, so SSR renders the desktop layout and hydration matches). */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    cb => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

function usePrefersReducedMotion() {
  return useMediaQuery(REDUCED_QUERY)
}

/** Horizontal progress rail: a clickable station per stage. A single accent line
 *  fills the current segment toward the next dot; its completion (onAnimationEnd)
 *  drives the autoplay advance, so the fill and the step change share one timer
 *  and never drift. It pauses on hover / off-screen. Clicking a station jumps the
 *  spotlight there and restarts the fill. */
function FlowRail({
  active,
  paused,
  onAdvance,
  onSelect,
}: {
  active: number
  paused: boolean
  onAdvance: () => void
  onSelect: (index: number) => void
}) {
  const hasNext = active < N - 1
  return (
    <div className='relative flex'>
      {/* base line, spanning first→last station centres */}
      <div
        className='absolute top-[6px] h-px bg-border-light'
        style={{ left: `${50 / N}%`, right: `${50 / N}%` }}
        aria-hidden
      />
      {/* completed segments, locked in instantly as each step lands */}
      <div
        className='absolute top-[6px] h-px bg-line'
        style={{ left: `${50 / N}%`, width: `${active * (100 / N)}%` }}
        aria-hidden
      />
      {/* the current segment filling toward the next dot; on the last step it is
          zero-width (invisible) but still runs, so its completion wraps the loop */}
      <div
        key={`fill-${active}`}
        onAnimationEnd={onAdvance}
        className='absolute top-[6px] h-px origin-left bg-line'
        style={{
          left: hasNext ? `${(0.5 + active) * (100 / N)}%` : '0%',
          width: hasNext ? `${100 / N}%` : '0%',
          animation: `railProgress ${SCENE_MS}ms linear forwards`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
        aria-hidden
      />
      {SCENES.map((scene, i) => {
        const done = i <= active
        return (
          <button
            key={scene.key}
            type='button'
            onClick={() => onSelect(i)}
            aria-current={i === active ? 'step' : undefined}
            aria-label={scene.label}
            className='group relative z-10 flex flex-1 flex-col items-center pb-1 focus-visible:outline-none'
          >
            <span
              className={cn(
                'h-3 w-3 rounded-full border transition-colors duration-300 group-hover:border-text-muted group-focus-visible:ring-2 group-focus-visible:ring-text-muted/40',
                done ? 'border-line bg-line' : 'border-border-light bg-bg'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

/** The full-width pipeline set piece in its framed card. `paused` freezes the
 *  graphic's ongoing motion (marching lines, spinning gear). */
function PipelineStage({
  active,
  paused = false,
  mobile = false,
  focus,
}: {
  active: number | null
  paused?: boolean
  mobile?: boolean
  focus?: number
}) {
  return (
    <div className='group relative w-full'>
      {/* Corner marks appear only while the graphic is hovered. */}
      <span className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <BlueprintCorners size={20} />
      </span>
      {/* Mobile crops to one stage in a square window; desktop keeps the wide strip. */}
      <div className={mobile ? 'aspect-square w-full' : 'aspect-[159/40] w-full'}>
        <PortalPipeline
          active={active}
          paused={paused}
          mobile={mobile}
          focus={focus}
          className='h-full w-full'
        />
      </div>
    </div>
  )
}

/** The narration that sits above the graphic: the status heading and the
 *  one-line description for the stage under the spotlight. */
function StageNarration({ scene }: { scene: Scene }) {
  return (
    <div className='flex flex-col items-center gap-3 text-center'>
      <span className='font-headline text-xl font-bold uppercase tracking-tight text-accent md:text-2xl'>
        {scene.status}
      </span>
      <p className='max-w-2xl text-sm leading-relaxed text-text-muted md:text-base'>
        {scene.description}
      </p>
    </div>
  )
}

export function PortalFlow() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const reduced = usePrefersReducedMotion()
  const mobile = useMediaQuery(MOBILE_QUERY)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Only play while the flow is on screen.
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // The rail's fill drives the advance (see FlowRail): when the current segment
  // finishes it calls this, so the countdown and the step change share one timer.
  // Pause while the reader hovers to linger, or the flow is off screen.
  const paused = hovered
  const advance = () => setActive(a => (a + 1) % N)

  const selectScene = (index: number) => {
    setActive(index)
  }

  // Mobile has no hover, so the crop-and-pan graphic doubles as a swipeable
  // carousel: a horizontal drag steps prev/next (clamped at the ends). We hold the
  // start point and only act on release, so vertical page-scroll is never hijacked.
  const swipeStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = (e: TouchEvent) => {
    if (!mobile) return
    const t = e.touches[0]
    swipeStart.current = { x: t.clientX, y: t.clientY }
    setHovered(true) // pause autoplay while the finger is down, mirroring hover
  }

  const onTouchEnd = (e: TouchEvent) => {
    setHovered(false)
    const start = swipeStart.current
    swipeStart.current = null
    const t = e.changedTouches[0]
    if (!mobile || !start || !t) return
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    // Only a clearly horizontal swipe navigates; otherwise it was a tap or scroll.
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return
    setActive(a => (dx < 0 ? Math.min(a + 1, N - 1) : Math.max(a - 1, 0)))
  }

  return (
    <section className='mx-auto w-full max-w-content px-6 pb-20 lg:px-12'>
      {reduced ? (
        mobile ? (
          // Reduced motion on mobile: a legible static card per stage — the crop
          // framed on that stage (fully lit, no pan) above its write-up.
          <div className='flex flex-col gap-10'>
            {SCENES.map((scene, i) => (
              <div key={scene.key} className='flex flex-col gap-6'>
                <PipelineStage active={null} mobile focus={i} />
                <StageNarration scene={scene} />
              </div>
            ))}
          </div>
        ) : (
          // Reduced motion: the fully-lit pipeline with every stage written out.
          <div className='flex flex-col gap-10'>
            <PipelineStage active={null} />
            <div className='flex flex-col gap-8'>
              {SCENES.map(scene => (
                <StageNarration key={scene.key} scene={scene} />
              ))}
            </div>
          </div>
        )
      ) : (
        // Auto-play: narration above the set piece and its timeline.
        <div
          ref={rootRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          className='flex flex-col gap-8'
        >
          <div
            key={`caption-${active}`}
            className='animate-[fadeIn_0.4s_ease-out]'
          >
            <StageNarration scene={SCENES[active]} />
          </div>
          <FlowRail
            active={active}
            paused={paused || !inView}
            onAdvance={advance}
            onSelect={selectScene}
          />
          <PipelineStage active={active} paused={paused} mobile={mobile} />
        </div>
      )}
    </section>
  )
}
