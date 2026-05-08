"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CinematicPhotoProps {
  children: ReactNode
  className?: string
}

/**
 * A dedicated component for the 'perfect' center-outward cinematic photo animation.
 * Optimized for mobile with spring physics and 3D depth.
 */
export default function CinematicPhoto({
  children,
  className,
}: CinematicPhotoProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1])
  const scaleRaw = useTransform(scrollYProgress, [0, 0.8], [0.8, 1])
  const scale = useSpring(scaleRaw, { stiffness: 90, damping: 20 })
  
  // Premium mask reveal opening symmetrically from the center outward
  const maskPath = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["inset(45% 45% 45% 45%)", "inset(0% 0% 0% 0%)"]
  )

  return (
    <motion.div
      ref={ref}
      style={{
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
