// lib/constants/radius.ts
// ─── Border Radius Scale ───────────────────────────────────────────────────────

export const RADIUS = {
  xs: "8px",       // small chips, dots
  sm: "12px",      // small buttons, inputs, icons (rounded-xl)
  md: "16px",      // medium cards, containers (rounded-2xl)
  lg: "22px",      // main UI radius — brand "common" radius
  xl: "28px",      // ~2rem — showcase card inner rounding
  "2xl": "36px",   // ~2.5rem — showcase card outer rounding
  "3xl": "40px",   // extra-large feature cards
  full: "9999px",  // pills, dots, circular buttons, progress bars
} as const
