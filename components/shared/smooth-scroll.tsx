"use client"

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
      syncTouch: false,
    }}>
      {children}
    </ReactLenis>
  )
}
