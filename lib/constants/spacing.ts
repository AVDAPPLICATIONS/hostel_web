// lib/constants/spacing.ts
// ─── Spacing Tokens ────────────────────────────────────────────────────────────
// Common spacing combinations used across section layouts.

export const SPACING = {
  /** Standard section vertical padding */
  sectionPy: "py-24 md:py-36",
  /** Alternate section vertical padding (slightly tighter) */
  sectionPyAlt: "py-24 md:py-32",

  /** Standard container horizontal padding */
  containerPx: "px-4",

  /** Section header bottom margin */
  headerMb: "mb-14 md:mb-16",
  /** Larger section header bottom margin (features, reviews) */
  headerMbLg: "mb-16 md:mb-20",
} as const
