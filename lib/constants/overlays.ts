// lib/constants/overlays.ts
// ─── Overlay, Glass & Gradient Tokens ──────────────────────────────────────────
// Centralises all rgba() values, backdrop effects, and gradient strings.

export const OVERLAYS = {
  // ── Glass backgrounds ────────────────────────────────────
  glassLight: "rgba(248,250,252,0.96)",
  glassDark: "rgba(10,18,30,0.60)",
  glassDarker: "rgba(10,18,30,0.96)",
  glassSoft: "rgba(255,255,255,0.07)",
  glassSubtle: "rgba(255,255,255,0.05)",
  glassMicro: "rgba(255,255,255,0.03)",
  glassThin: "rgba(255,255,255,0.02)",

  // ── Dark-on-dark card backgrounds ────────────────────────
  cardGlassLight: "rgba(255,255,255,0.048)",
  cardGlassHover: "rgba(255,255,255,0.072)",
  cardGlassMedium: "rgba(255,255,255,0.07)",
  /** Used for dark transparent cards in footer, gallery filters */
  darkCardSoft: "rgba(245, 239, 235, 0.08)",
  darkCardMedium: "rgba(245, 239, 235, 0.12)",
  darkCardStrong: "rgba(245, 239, 235, 0.18)",

  // ── Teal-tinted overlays ─────────────────────────────────
  tealSubtle: "rgba(86,124,141,0.14)",
  tealLight: "rgba(86,124,141,0.12)",
  tealMedium: "rgba(86,124,141,0.16)",
  tealSoft: "rgba(86,124,141,0.10)",
  tealBorder: "rgba(86,124,141,0.28)",
  tealBorderLight: "rgba(86,124,141,0.20)",
  tealBorderSoft: "rgba(86,124,141,0.22)",
  tealMuted: "rgba(86,124,141,0.45)",
  tealFaint: "rgba(86,124,141,0.38)",

  // ── White borders ────────────────────────────────────────
  borderWhiteStrong: "rgba(255,255,255,0.55)",
  borderWhiteMedium: "rgba(255,255,255,0.20)",
  borderWhiteSoft: "rgba(255,255,255,0.14)",
  borderWhiteSubtle: "rgba(255,255,255,0.10)",
  borderWhiteFaint: "rgba(255,255,255,0.08)",
  borderWhiteMicro: "rgba(255,255,255,0.05)",
  borderWhiteRest: "rgba(255,255,255,0.80)",

  // ── Sky borders ──────────────────────────────────────────
  borderSkyLight: "rgba(200,217,230,0.3)",
  borderSkySoft: "rgba(200, 217, 230, 0.35)",
  borderSkyMedium: "rgba(200, 217, 230, 0.5)",
  borderSkyStrong: "rgba(200, 217, 230, 0.72)",
  borderSkyFaint: "rgba(200,217,230,0.05)",
  borderSkyGlow: "rgba(200,217,230,0.10)",
  borderSkySubtle: "rgba(200,217,230,0.04)",
  borderSkyMuted: "rgba(200,217,230,0.18)",
  borderSkyWarm: "rgba(200,217,230,0.20)",
  borderSkyGlare: "rgba(200,217,230,0.85)",

  // ── Dark borders ─────────────────────────────────────────
  borderNavy: "rgba(47, 65, 86, 0.16)",
  borderNavyMedium: "rgba(47, 65, 86, 0.28)",

  // ── Hover backgrounds ────────────────────────────────────
  hoverLightBg: "rgba(200,217,230,0.05)",
  hoverSubtleBg: "rgba(200,217,230,0.04)",

  // ── Shimmer / selection ──────────────────────────────────
  shimmer: "rgba(200, 217, 230, 0.16)",
  selection: "rgba(200, 217, 230, 0.35)",

  // ── Focus ring ───────────────────────────────────────────
  focusRing: "rgba(200, 217, 230, 0.9)",

  // ── Gradient overlays for images ─────────────────────────
  depthTop:
    "linear-gradient(to top, rgba(10,18,30,0.90) 0%, rgba(10,18,30,0.25) 45%, transparent 70%)",
  depthTopSoft:
    "linear-gradient(to top, rgba(10,18,30,0.75) 0%, transparent 55%)",
  depthTopMild:
    "linear-gradient(to top, rgba(10,18,30,0.70) 0%, transparent 55%)",
  depthLeft:
    "linear-gradient(135deg, rgba(10,18,30,0.30) 0%, transparent 55%)",
  depthRight:
    "linear-gradient(to right, rgba(10,18,30,0.18) 0%, transparent 50%)",
  depthDarkOverlay: "rgba(15,25,40,1)",

  // ── Input placeholder ────────────────────────────────────
  inputPlaceholder: "rgba(47, 65, 86, 0.45)",

  // ── White Translucents (Standardized) ────────────────────
  textWhite75: "rgba(255,255,255,0.75)",
  white60: "rgba(255,255,255,0.60)",
  white45: "rgba(255,255,255,0.45)",
  white25: "rgba(255,255,255,0.25)",
  white20: "rgba(255,255,255,0.20)",
  white15: "rgba(255,255,255,0.15)",
  white06: "rgba(255,255,255,0.06)",
  white04: "rgba(255,255,255,0.04)",
  white02: "rgba(255,255,255,0.02)",
} as const
