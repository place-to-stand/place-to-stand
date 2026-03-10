'use client'

import { useEffect } from 'react'

export function LandingSessionMarker() {
  useEffect(() => {
    sessionStorage.setItem('pts-landing-session', '1')
  }, [])

  return null
}
