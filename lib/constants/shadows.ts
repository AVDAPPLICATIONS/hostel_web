// lib/constants/shadows.ts
// ─── Box-Shadow Tokens ─────────────────────────────────────────────────────────

export const SHADOWS = {
  // ── Card shadows ─────────────────────────────────────────
  card: "0 32px 90px rgba(0, 0, 0, 0.28)",
  cardSoft: "0 28px 70px rgba(0, 0, 0, 0.22)",
  cardLight: "0 24px 60px rgba(0,0,0,0.22)",
  cardSubtle: "0 6px 20px rgba(0,0,0,0.16)",
  cardHover: "0 20px 50px rgba(0,0,0,0.28)",

  // ── Showcase (large feature cards) ───────────────────────
  showcase: "0 40px 100px rgba(0,0,0,0.40)",
  showcaseSoft: "0 40px 100px rgba(0,0,0,0.38)",
  showcaseDeep: "0 40px 100px rgba(0,0,0,0.45)",

  // ── General-purpose ──────────────────────────────────────
  soft: "0 18px 40px rgba(47, 65, 86, 0.18)",
  light: "0 12px 28px rgba(47, 65, 86, 0.12)",
  image: "0 22px 50px rgba(47, 65, 86, 0.18)",

  // ── Navigation ───────────────────────────────────────────
  nav: "0 16px 46px rgba(0, 0, 0, 0.22)",

  // ── Button shadows ───────────────────────────────────────
  button: "0 16px 34px rgba(47, 65, 86, 0.18)",
  buttonPrimary: "0 12px 32px rgba(86,124,141,0.38)",
  buttonTeal: "0 10px 28px rgba(86,124,141,0.32)",
  buttonActive: "0 8px 22px rgba(86,124,141,0.35)",
  buttonRest: "0 2px 6px rgba(0,0,0,0.06)",
  buttonHeroCta: "0 10px 30px rgba(0, 0, 0, 0.15)",

  // ── Route / transport card states ────────────────────────
  routeActive: "0 8px 28px rgba(86,124,141,0.18)",
  routeRest: "0 2px 8px rgba(0,0,0,0.04)",

  // ── Focus rings ──────────────────────────────────────────
  focus: "0 0 0 4px rgba(200, 217, 230, 0.9), 0 12px 28px rgba(47, 65, 86, 0.16)",
  inputFocus: "0 0 0 4px rgba(200,217,230,0.85), 0 4px 20px rgba(0,0,0,0.03)",
  inputRest: "0 2px 12px rgba(0,0,0,0.04)",

  // ── Feature cards ────────────────────────────────────────
  featureHover: "0 8px 32px rgba(0,0,0,0.22)",

  // ── Lightbox ─────────────────────────────────────────────
  lightbox: "0 40px 100px rgba(0,0,0,0.55)",

  // ── Footer logo ──────────────────────────────────────────
  logoFooter: "0 4px 20px rgba(0,0,0,0.18)",

  // ── Select menu ──────────────────────────────────────────
  menuDropdown: "0 12px 40px rgba(0,0,0,0.12)",

  // ── Specific Component Shadows ───────────────────────────
  heroImage: "0 24px 34px rgba(0,0,0,0.25)",
  insetTabs: "inset 0 2px 10px rgba(0,0,0,0.15)",
} as const
