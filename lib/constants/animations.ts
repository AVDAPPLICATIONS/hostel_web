// lib/constants/animations.ts
// ─── Animation / Motion Tokens ─────────────────────────────────────────────────

/** Easing curves (Framer Motion format) */
export const EASING = {
  /** Primary smooth curve used across all components */
  smooth: [0.22, 1, 0.36, 1] as readonly number[],
} as const

/** Duration presets (seconds) */
export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  medium: 0.45,
  slow: 0.65,
  section: 0.85,
  hero: 1.2,
} as const

/** Spring config presets */
export const SPRING = {
  default: { stiffness: 260, damping: 22 },
  bouncy: { stiffness: 280, damping: 18 },
  heavy: { stiffness: 180, damping: 16 },
  gentle: { stiffness: 200, damping: 30 },
} as const

/** Pre-composed Framer Motion transition objects */
export const TRANSITION = {
  /** Standard section / large element entrance */
  section: { duration: DURATION.section, ease: EASING.smooth },
  /** Card / medium element entrance */
  card: { duration: 0.75, ease: EASING.smooth },
  /** Generic element entrance */
  element: { duration: DURATION.slow, ease: EASING.smooth },
  /** Fast interaction feedback */
  fast: { duration: DURATION.normal, ease: EASING.smooth },
  /** CSS transition string for style prop */
  cssSmooth: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
} as const
