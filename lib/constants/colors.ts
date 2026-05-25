// lib/constants/colors.ts
// ─── Brand Color Palette ───────────────────────────────────────────────────────
// Single source of truth for every color used across the UI.

export const COLORS = {
  // ── Main palette ─────────────────────────────────────────
  navy: "#2F4156",
  teal: "#567C8D",
  sky: "#C8D9E6",
  beige: "#F5EFEB",
  white: "#FFFFFF",

  // ── Supporting shades ────────────────────────────────────
  deepNavy: "#243447",
  darkerNavy: "#1D2A38",
  softNavy: "#3B5066",

  deepTeal: "#466A79",
  softTeal: "#6E91A0",

  softSky: "#D9E6EE",
  paleSky: "#EEF5F8",

  softBeige: "#FAF7F4",
  warmBeige: "#EFE7E1",

  // ── Panel / surface colors (light content panels) ────────
  panelBg: "#FAFBFC",
  panelBorder: "#E2E8F0",
  panelBorderAlt: "#F1F5F9",

  // ── Neutral grays ───────────────────────────────────────
  muted400: "#CBD5E0",
  slate400: "#94a3b8",

  // ── Accent: gold / warm ──────────────────────────────────
  gold: "#C8A96E",
  heroCtaBg: "rgba(200, 169, 110, 0.85)",

  // ── Cinematic dark surfaces (virtual-tour) ───────────────
  cinematicDark: "#060d16",
  cinematicMid: "#0d1b2a",
  cinematicDeep: "#091520",
  cinematicBase: "#080e18",
  videoBase: "#0F172A",

  // ── Semantic ─────────────────────────────────────────────
  destructive: "#ef4444",
} as const
