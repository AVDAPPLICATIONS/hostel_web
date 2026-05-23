"use client"

/**
 * SlideInView — A dedicated scroll-triggered slide animation component.
 *
 * Supports:
 *  - direction: "left" | "right" | "up" | "down"
 *  - Custom distance (px), delay (s), duration (s)
 *  - Optional blur-in effect on entry (blurAmount)
 *  - Optional hover blur effect (hoverBlur) — blurs this element on hover
 *  - Optional hover scale (hoverScale) — scales up on hover
 *  - Optional hover lift (hoverY) — lifts up (negative = up) on hover
 *  - Spring or ease transition types
 *  - viewport: amount — how much of element must be visible to trigger
 *  - once: only animate in once (default: true)
 */

import { motion, useInView } from "framer-motion"
import { useRef, forwardRef, type ReactNode, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export type SlideDirection = "left" | "right" | "up" | "down"

export type SlideTransitionType = "spring" | "ease"

export interface SlideInViewProps {
  /** Content to animate */
  children: ReactNode

  /** Direction the element slides IN FROM. Default: "up" */
  direction?: SlideDirection

  /** How far (in px) the element starts offset from its final position. Default: 100 */
  distance?: number

  /** Delay before the animation starts (seconds). Default: 0 */
  delay?: number

  /** Duration of the animation (seconds). Default: 0.8 */
  duration?: number

  /** Apply a blur effect during the slide-in transition. Default: 0 (no blur) */
  blurAmount?: number

  /**
   * Blur amount (px) to apply when the element is hovered.
   * Useful for "frosted glass" or "de-focus" hover effects.
   * Default: 0 (no hover blur)
   */
  hoverBlur?: number

  /**
   * Scale applied on hover. e.g. 1.03 = slight zoom-in, 0.97 = shrink.
   * Default: 1 (no scale)
   */
  hoverScale?: number

  /**
   * Y-axis translation on hover (px). Negative = lift up.
   * Default: 0
   */
  hoverY?: number

  /** Transition type — "spring" gives a bouncy feel, "ease" is smoother. Default: "ease" */
  transitionType?: SlideTransitionType

  /** Spring stiffness (only used when transitionType = "spring"). Default: 280 */
  stiffness?: number

  /** Spring damping (only used when transitionType = "spring"). Default: 26 */
  damping?: number

  /** Fraction of the element that must be visible to trigger. 0–1. Default: 0.15 */
  viewportAmount?: number

  /** Whether to trigger the animation only once. Default: true */
  once?: boolean

  /** Extra CSS class names */
  className?: string

  /** Inline styles */
  style?: CSSProperties

  /** Optional layout prop forwarded to motion.div */
  layout?: boolean | "position" | "size" | "preserve-aspect"
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitialOffset(direction: SlideDirection, distance: number) {
  switch (direction) {
    case "left":  return { x: -distance, y: 0 }
    case "right": return { x:  distance, y: 0 }
    case "up":    return { x: 0, y:  distance }
    case "down":  return { x: 0, y: -distance }
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

const SlideInView = forwardRef<HTMLDivElement, SlideInViewProps>((
  {
    children,
    direction      = "up",
    distance       = 100,
    delay          = 0,
    duration       = 0.8,
    blurAmount     = 0,
    hoverBlur      = 0,
    hoverScale     = 1,
    hoverY         = 0,
    transitionType = "ease",
    stiffness      = 280,
    damping        = 26,
    viewportAmount = 0.15,
    once           = true,
    className,
    style,
    layout,
  },
  forwardedRef
) => {
  const internalRef = useRef<HTMLDivElement>(null)
  const ref         = (forwardedRef as React.RefObject<HTMLDivElement>) ?? internalRef
  const isInView    = useInView(ref, { once, amount: viewportAmount })

  const { x, y } = getInitialOffset(direction, distance)

  // ── Entry animation states ────────────────────────────────────────────────

  const initial = {
    opacity: 0,
    x,
    y,
    ...(blurAmount > 0 ? { filter: `blur(${blurAmount}px)` } : {}),
  }

  const animate = isInView
    ? {
        opacity: 1,
        x: 0,
        y: 0,
        ...(blurAmount > 0 ? { filter: "blur(0px)" } : {}),
      }
    : {}

  // ── Entry transition ──────────────────────────────────────────────────────

  const transition =
    transitionType === "spring"
      ? {
          type: "spring" as const,
          stiffness,
          damping,
          delay,
        }
      : {
          type: "tween" as const,
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }

  // ── Hover animation ───────────────────────────────────────────────────────

  const hasHoverEffect = hoverBlur > 0 || hoverScale !== 1 || hoverY !== 0

  const whileHover = hasHoverEffect
    ? {
        ...(hoverScale !== 1   ? { scale: hoverScale }            : {}),
        ...(hoverY     !== 0   ? { y: hoverY }                    : {}),
        ...(hoverBlur  >  0    ? { filter: `blur(${hoverBlur}px)` } : {}),
      }
    : undefined

  // Snap back cleanly after hover
  const whileTapReset = hasHoverEffect
    ? { scale: hoverScale > 1 ? hoverScale - 0.01 : hoverScale }
    : undefined

  return (
    <motion.div
      ref={ref}
      layout={layout}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      transition={{
        ...transition,
        // Hover transitions use a fast spring so they feel instant and snappy
        ...(hasHoverEffect
          ? {
              type: "spring",
              stiffness: 320,
              damping: 24,
            }
          : {}),
      }}
      className={cn("will-change-transform", className)}
      style={style}
    >
      {children}
    </motion.div>
  )
})

SlideInView.displayName = "SlideInView"

export default SlideInView
