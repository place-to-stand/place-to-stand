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
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let rafId = 0
    let width = 0
    let height = 0
    let dpr = 1
    let running = true

    const particleCount = 42
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const z = Math.random()
      return {
        x: Math.random(),
        y: Math.random(),
        z,
        radius: 0.9 + z * 2.6,
        vx: (Math.random() - 0.5) * (0.00035 + z * 0.0006),
        vy: (Math.random() - 0.5) * (0.00025 + z * 0.0005),
      }
    })

    let pointerX = 0
    let pointerY = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = (event.clientX - rect.left) / rect.width - 0.5
      pointerY = (event.clientY - rect.top) / rect.height - 0.5
    }

    const onVisibilityChange = () => {
      running = document.visibilityState === 'visible'
      if (running) tick()
      else cancelAnimationFrame(rafId)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
        }

        if (particle.x < -0.1) particle.x = 1.1
        if (particle.x > 1.1) particle.x = -0.1
        if (particle.y < -0.1) particle.y = 1.1
        if (particle.y > 1.1) particle.y = -0.1

        const depth = 0.35 + particle.z * 0.9
        const px = particle.x * width + pointerX * (10 * depth)
        const py = particle.y * height + pointerY * (8 * depth)

        context.beginPath()
        context.fillStyle = 'rgba(255, 255, 255, 0.34)'
        context.strokeStyle = 'rgba(255, 255, 255, 0.12)'
        context.arc(px, py, particle.radius, 0, Math.PI * 2)
        context.fill()
        context.stroke()
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
      return
    }

    tick()

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(canvas)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80'
      aria-hidden
    />
  )
}
