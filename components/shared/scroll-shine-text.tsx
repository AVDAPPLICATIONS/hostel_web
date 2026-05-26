"use client"

// ─── ScrollShineText ──────────────────────────────────────────────────────────
//
// Props
//   immediate  — skips the useInView gate and the initial hidden state.
//                Use for headings in sections that are already in the viewport
//                on first paint (e.g. the very first below-fold section heading).
//                Above-fold H1 in the Hero should NOT use this component at all;
//                it renders as plain <h1 className="shining-text"> instead.
//
//   once       — default true; don't re-animate when element scrolls in/out.
//   delay      — stagger delay in seconds (default 0).

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
  id?: string
  /** Skip useInView gate — text visible immediately, animation plays from start. */
  immediate?: boolean
}

export default function ScrollShineText({
  children,
  className,
  once = true,
  delay = 0,
  style,
  as: Component = "div",
  id,
  immediate = false,
}: ScrollShineTextProps) {
  const ref = useRef(null)
  // When `immediate`, treat the element as always in-view
  const isInViewNative = useInView(ref, { once, margin: "-8% 0px" })
  const isInView = immediate || isInViewNative

  const words = useMemo(() => children.split(" "), [children])
  // Use block animation for long text; word stagger for short headings
  const isLongText = words.length > 18

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isLongText ? 0 : 0.08,
        delayChildren: delay,
      },
    },
  }

  const revealVariants = {
    hidden: {
      y: isLongText ? 16 : "105%",
      opacity: 0,
      rotateX: isLongText ? 0 : 30,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: isLongText ? 0.7 : 1.0,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative flex flex-wrap", className)}
      style={{ ...style, transform: "translateZ(0)" }}
    >
      <Component className="contents">
        {isLongText ? (
          <motion.span variants={revealVariants} className="shining-text inline-block">
            {children}
          </motion.span>
        ) : (
          words.map((word, i) => (
            <span
              key={i}
              className="relative mr-[0.32em] inline-flex overflow-hidden py-[0.08em] last:mr-0"
            >
              <motion.span variants={revealVariants} className="shining-text inline-block">
                {word}
              </motion.span>
            </span>
          ))
        )}
      </Component>
    </motion.div>
  )
}
