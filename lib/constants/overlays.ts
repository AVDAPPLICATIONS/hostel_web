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
  darkCardSoft: "rgba(255, 248, 243, 0.08)",
  darkCardMedium: "rgba(255, 248, 243, 0.12)",
  darkCardStrong: "rgba(255, 248, 243, 0.18)",

  // ── Terracotta-tinted overlays (replaces teal) ───────────
  tealSubtle: "rgba(232, 68, 28, 0.14)",
  tealLight: "rgba(232, 68, 28, 0.12)",
  tealMedium: "rgba(232, 68, 28, 0.16)",
  tealSoft: "rgba(232, 68, 28, 0.10)",
  tealBorder: "rgba(232, 68, 28, 0.28)",
  tealBorderLight: "rgba(232, 68, 28, 0.20)",
  tealBorderSoft: "rgba(232, 68, 28, 0.22)",
  tealMuted: "rgba(232, 68, 28, 0.45)",
  tealFaint: "rgba(232, 68, 28, 0.38)",

  // ── White borders ────────────────────────────────────────
  borderWhiteStrong: "rgba(255,255,255,0.55)",
  borderWhiteMedium: "rgba(255,255,255,0.20)",
  borderWhiteSoft: "rgba(255,255,255,0.14)",
  borderWhiteSubtle: "rgba(255,255,255,0.10)",
  borderWhiteFaint: "rgba(255,255,255,0.08)",
  borderWhiteMicro: "rgba(255,255,255,0.05)",
  borderWhiteRest: "rgba(255,255,255,0.80)",

  // ── Warm-peach borders (replaces sky) ───────────────────
  borderSkyLight: "rgba(245,196,168,0.3)",
  borderSkySoft: "rgba(245,196,168,0.35)",
  borderSkyMedium: "rgba(245,196,168,0.5)",
  borderSkyStrong: "rgba(245,196,168,0.72)",
  borderSkyFaint: "rgba(245,196,168,0.05)",
  borderSkyGlow: "rgba(245,196,168,0.10)",
  borderSkySubtle: "rgba(245,196,168,0.04)",
  borderSkyMuted: "rgba(245,196,168,0.18)",
  borderSkyWarm: "rgba(245,196,168,0.20)",
  borderSkyGlare: "rgba(245,196,168,0.85)",

  // ── Dark borders ─────────────────────────────────────────
  borderNavy: "rgba(61, 32, 16, 0.16)",
  borderNavyMedium: "rgba(61, 32, 16, 0.28)",

  // ── Hover backgrounds ────────────────────────────────────
  hoverLightBg: "rgba(245,196,168,0.05)",
  hoverSubtleBg: "rgba(245,196,168,0.04)",

  // ── Shimmer / selection ──────────────────────────────────
  shimmer: "rgba(232, 68, 28, 0.12)",
  selection: "rgba(245, 196, 168, 0.35)",

  // ── Focus ring ───────────────────────────────────────────
  focusRing: "rgba(245, 196, 168, 0.9)",

  // ── Gradient overlays for images ─────────────────────────
  depthTop:
    "linear-gradient(to top, rgba(30,14,5,0.90) 0%, rgba(30,14,5,0.25) 45%, transparent 70%)",
  depthTopSoft:
    "linear-gradient(to top, rgba(30,14,5,0.75) 0%, transparent 55%)",
  depthTopMild:
    "linear-gradient(to top, rgba(30,14,5,0.70) 0%, transparent 55%)",
  depthLeft:
    "linear-gradient(135deg, rgba(30,14,5,0.30) 0%, transparent 55%)",
  depthRight:
    "linear-gradient(to right, rgba(30,14,5,0.18) 0%, transparent 50%)",
  depthDarkOverlay: "rgba(30,14,5,1)",

  // ── Input placeholder ────────────────────────────────────
  inputPlaceholder: "rgba(61, 32, 16, 0.45)",

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
