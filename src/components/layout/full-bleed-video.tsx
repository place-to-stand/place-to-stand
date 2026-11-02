'use client'

import { useEffect, useRef } from 'react'

/** An edge-to-edge, muted, looping video between sections. Nothing loads
 * until it nears the viewport; it plays only while on screen, and anyone who
 * asks for reduced motion sees the poster instead. */
export function FullBleedVideo({
  src,
  poster,
  label,
}: {
  src: string
  poster: string
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can be refused (e.g. low-power mode); the poster stays.
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className='relative aspect-[4/3] w-full overflow-hidden bg-bg-card md:aspect-[21/9]'>
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload='none'
        className='absolute inset-0 h-full w-full object-cover'
      />
    </div>
  )
}
