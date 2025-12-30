'use client'

import { useEffect, useRef } from 'react'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type Particle = {
  x: number
  y: number
  z: number
  radius: number
  vx: number
  vy: number
  color: string
}

export function PageParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let rafId = 0
    let running = true

    let width = 0
    let height = 0
    let dpr = 1

    const particleCount = 1500
    const particles: Particle[] = Array.from(
      { length: particleCount },
      (_, i) => {
        const z = Math.random()
        return {
          x: Math.random(),
          y: Math.random(),
          z,
          radius: 0.35 + z * 1.05,
          vx: (Math.random() - 0.5) * (0.00002 + z * 0.00005),
          vy: (Math.random() - 0.5) * (0.000015 + z * 0.00004),
          color: i % 2 === 0 ? '#ffffff' : '#7E7B7B',
        }
      }
    )

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(window.innerWidth))
      height = Math.max(1, Math.floor(window.innerHeight))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const getPageHeight = () => {
      const doc = document.documentElement
      return Math.max(
        doc.scrollHeight,
        document.body?.scrollHeight ?? 0,
        window.innerHeight
      )
    }

    const onVisibilityChange = () => {
      running = document.visibilityState === 'visible'
      if (running) tick()
      else cancelAnimationFrame(rafId)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      const scrollY = window.scrollY || 0
      const scrollFactor = 0.45
      const pageHeight = getPageHeight()
      const margin = 220

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
        }

        if (particle.x < -0.1) particle.x = 1.1
        if (particle.x > 1.1) particle.x = -0.1
        if (particle.y < -0.1) particle.y = 1.1
        if (particle.y > 1.1) particle.y = -0.1

        const worldX = particle.x * width
        const worldY = particle.y * pageHeight

        const screenY = worldY - scrollY * scrollFactor
        if (screenY < -margin || screenY > height + margin) continue

        const px = worldX
        const py = screenY

        context.beginPath()
        context.fillStyle = particle.color
        context.arc(px, py, particle.radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    const tick = () => {
      if (!running) return
      draw()
      rafId = requestAnimationFrame(tick)
    }

    resize()

    if (reducedMotion) {
      draw()

      const onScroll = () => draw()
      const onResize = () => {
        resize()
        draw()
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize, { passive: true })
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
      }
    }

    tick()

    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none fixed inset-0 z-0 opacity-75'
      aria-hidden
    />
  )
}
