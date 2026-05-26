// lib/constants/shadows.ts
// ─── Box-Shadow Tokens ─────────────────────────────────────────────────────────
// Shadow base: #F5C0A8 (soft peach) — warm, light shadows matching the palette.
// rgba(245,192,168,...) used for warm-toned shadows.
// rgba(232,68,28,...) used for terracotta accent glows on buttons.

export const SHADOWS = {
  // ── Card shadows ─────────────────────────────────────────
  card: "0 32px 90px rgba(245, 192, 168, 0.28)",
  cardSoft: "0 28px 70px rgba(245, 192, 168, 0.22)",
  cardLight: "0 24px 60px rgba(245, 192, 168, 0.18)",
  cardSubtle: "0 6px 20px rgba(245, 192, 168, 0.14)",
  cardHover: "0 20px 50px rgba(245, 192, 168, 0.28)",

  // ── Showcase (large feature cards) ───────────────────────
  showcase: "0 40px 100px rgba(245, 192, 168, 0.32)",
  showcaseSoft: "0 40px 100px rgba(245, 192, 168, 0.28)",
  showcaseDeep: "0 40px 100px rgba(245, 192, 168, 0.38)",

  // ── General-purpose ──────────────────────────────────────
  soft: "0 18px 40px rgba(245, 192, 168, 0.20)",
  light: "0 12px 28px rgba(245, 192, 168, 0.16)",
  image: "0 22px 50px rgba(245, 192, 168, 0.22)",

  // ── Navigation ───────────────────────────────────────────
  nav: "0 16px 46px rgba(245, 192, 168, 0.18)",

  // ── Button shadows ───────────────────────────────────────
  button: "0 16px 34px rgba(245, 192, 168, 0.22)",
  buttonPrimary: "0 12px 32px rgba(232, 68, 28, 0.36)",
  buttonTeal: "0 10px 28px rgba(232, 68, 28, 0.30)",
  buttonActive: "0 8px 22px rgba(232, 68, 28, 0.32)",
  buttonRest: "0 2px 6px rgba(245, 192, 168, 0.12)",
  buttonHeroCta: "0 10px 30px rgba(232, 68, 28, 0.22)",

  // ── Route / transport card states ────────────────────────
  routeActive: "0 8px 28px rgba(232, 68, 28, 0.20)",
  routeRest: "0 2px 8px rgba(245, 192, 168, 0.10)",

  // ── Focus rings ──────────────────────────────────────────
  focus: "0 0 0 4px rgba(232, 68, 28, 0.30), 0 12px 28px rgba(245, 192, 168, 0.20)",
  inputFocus: "0 0 0 4px rgba(232, 68, 28, 0.28), 0 4px 20px rgba(245, 192, 168, 0.12)",
  inputRest: "0 2px 12px rgba(245, 192, 168, 0.10)",

  // ── Feature cards (no shadow) ────────────────────────────
  featureHover: "none",

  // ── Lightbox ─────────────────────────────────────────────
  lightbox: "0 40px 100px rgba(61, 32, 16, 0.50)",

  // ── Footer logo ──────────────────────────────────────────
  logoFooter: "0 4px 20px rgba(245, 192, 168, 0.18)",

  // ── Select menu ──────────────────────────────────────────
  menuDropdown: "0 12px 40px rgba(245, 192, 168, 0.16)",

  // ── Specific Component Shadows ───────────────────────────
  heroImage: "0 24px 34px rgba(245, 192, 168, 0.22)",
  insetTabs: "inset 0 2px 10px rgba(245, 192, 168, 0.14)",
} as const
