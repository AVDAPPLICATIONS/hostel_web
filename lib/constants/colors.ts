// lib/constants/colors.ts
// ─── Brand Color Palette ───────────────────────────────────────────────────────
// Single source of truth for every color used across the UI.
// Warm orange / terracotta palette.

export const COLORS = {
  // ── Main palette ─────────────────────────────────────────
  navy: "#3D2010",        // dark warm brown  (replaces navy #2F4156)
  teal: "#E8441C",        // terracotta red   (replaces teal #567C8D)
  sky: "#F5C4A8",         // warm peach       (replaces sky #C8D9E6)
  beige: "#FFF8F3",       // warm near-white  (replaces beige #F5EFEB)
  white: "#FFFFFF",

  // ── Supporting shades ────────────────────────────────────
  deepNavy: "#2C1508",    // deeper warm brown
  darkerNavy: "#1E0E05",  // darkest warm brown
  softNavy: "#5C3018",    // medium warm brown
  peachBg: "#FDE7D9",       // Light peach — page background
  brandDarker: "#1E1E1E",
  brandDarkest: "#141414",
  shadowBase: "#3E261A",

  deepTeal: "#C03A16",    // deeper terracotta
  softTeal: "#F0704A",    // lighter terracotta

  softSky: "#FDDCC8",     // light warm peach
  paleSky: "#FEF0E8",     // very light warm peach

  softBeige: "#FFFAF7",   // warm white
  warmBeige: "#F5EDE5",   // warm cream

  // ── Panel / surface colors (light content panels) ────────
  panelBg: "#FAFBFC",
  panelBorder: "#F0DDD0",
  panelBorderAlt: "#F8EDE5",

  // ── Neutral grays ───────────────────────────────────────
  muted400: "#CBD5E0",
  slate400: "#94a3b8",

  // ── Accent: gold / warm ──────────────────────────────────
  gold: "#E8441C",
  heroCtaBg: "rgba(232,68,28,0.85)",

  // ── Cinematic dark surfaces (virtual-tour) ───────────────
  cinematicDark: "#060d16",
  cinematicMid: "#0d1b2a",
  cinematicDeep: "#091520",
  cinematicBase: "#080e18",
  videoBase: "#0F172A",

  // ── Semantic ─────────────────────────────────────────────
  destructive: "#ef4444",
} as const
