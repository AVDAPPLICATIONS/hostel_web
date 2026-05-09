"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealCardProps {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right"
  layout?: boolean | "position" | "size" | "preserve-aspect"
  exit?: any
  style?: React.CSSProperties
}

/**
 * A shared component for premium card entries on scroll.
 * Features a 3D perspective reveal with a smooth glide.
 */
const ScrollRevealCard = forwardRef<HTMLDivElement, ScrollRevealCardProps>(({
  children,
  className,
  delay = 0,
  once = true,
  direction = "up",
  layout,
  exit,
  style,
}, forwardedRef) => {
  const internalRef = useRef(null)
  // Use forwardedRef if available, otherwise internalRef
  const effectiveRef = (forwardedRef as any) || internalRef
  const isInView = useInView(effectiveRef, { once, margin: "-10% 0px" })

  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 80, x: 0 }
      case "down": return { y: -80, x: 0 }
      case "left": return { y: 0, x: -80 }
      case "right": return { y: 0, x: 80 }
      default: return { y: 80, x: 0 }
    }
  }

  const initialPos = getInitialPosition()

  return (
    <motion.div
      ref={effectiveRef}
      layout={layout}
      initial={{ 
        opacity: 0, 
        ...initialPos,
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0, 
      } : {}}
      exit={exit}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("will-change-transform", className)}
      style={style}
    >
      {children}
    </motion.div>
  )
})

ScrollRevealCard.displayName = "ScrollRevealCard"

export default ScrollRevealCard
