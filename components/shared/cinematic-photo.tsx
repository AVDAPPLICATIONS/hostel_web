"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, ReactNode, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CinematicPhotoProps {
  children: ReactNode
  className?: string
  parallaxRange?: [number, number]
}

/**
 * A dedicated component for the 'perfect' left-to-right cinematic photo animation.
 * Optimized for mobile with spring physics and 3D depth.
 */
export default function CinematicPhoto({
  children,
  className,
  parallaxRange: customRange,
}: CinematicPhotoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const defaultRange: [number, number] = isMobile ? [-30, 30] : [-60, 60]
  const range = customRange || defaultRange
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  })

  // Smooth spring physics for a 'liquid' feel
  const xRaw = useTransform(scrollYProgress, [0, 1], range)
  const x = useSpring(xRaw, { stiffness: 80, damping: 25 })
  
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const scale = useSpring(scaleRaw, { stiffness: 100, damping: 30 })
  
  // Mask reveal from left to right
  const maskPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        opacity,
        scale,
        clipPath: maskPath,
        perspective: "1200px",
      }}
      className={cn("relative z-20 will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}
