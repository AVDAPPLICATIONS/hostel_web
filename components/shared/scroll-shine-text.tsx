"use client"

import { motion, useInView } from "framer-motion"
import { useRef, CSSProperties, ElementType, useMemo } from "react"
import { cn } from "@/lib/utils"

interface ScrollShineTextProps {
  children: string
  className?: string
  once?: boolean
  delay?: number
  style?: CSSProperties
  as?: ElementType
}

/**
 * Optimized premium text component.
 * Automatically chooses between per-word and per-block animation based on length
 * to ensure high performance even on mobile.
 */
export default function ScrollShineText({ 
  children, 
  className, 
  once = true,
  delay = 0,
  style,
  as: Component = "div"
}: ScrollShineTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10% 0px" })

  // Performance Optimization: Only split by word if text is short (titles)
  const words = useMemo(() => children.split(" "), [children])
  const isLongText = words.length > 20

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  const revealVariants = {
    hidden: { 
      y: isLongText ? 20 : "110%", 
      opacity: 0,
      rotateX: isLongText ? 0 : 45,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: isLongText ? 0.8 : 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative flex flex-wrap", className)}
      style={{ ...style, transform: "translateZ(0)" }} // Hardware acceleration
    >
      <Component className="contents">
        {isLongText ? (
          // Optimized for long text: single animation block
          <motion.span
            variants={revealVariants}
            className="shining-text inline-block"
          >
            {children}
          </motion.span>
        ) : (
          // Premium for short text: word-by-word stagger
          words.map((word, i) => (
            <span
              key={i}
              className="relative inline-flex overflow-hidden py-[0.1em] mr-[0.35em] last:mr-0"
            >
              <motion.span
                variants={revealVariants}
                className="shining-text inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))
        )}
      </Component>
    </motion.div>
  )
}
