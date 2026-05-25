// lib/theme.ts
// ─── Central Design System ─────────────────────────────────────────────────────
// Re-exports raw constants AND provides the composed UI token object that
// components consume.  All design tokens originate from `lib/constants/`.

import { COLORS } from "@/lib/constants/colors"
import { SHADOWS } from "@/lib/constants/shadows"
import { RADIUS } from "@/lib/constants/radius"
import { OVERLAYS } from "@/lib/constants/overlays"
import { FONT_FAMILY } from "@/lib/constants/typography"

// Re-export everything so consumers can `import { COLORS, UI, SHADOWS, … } from "@/lib/theme"`
export { COLORS } from "@/lib/constants/colors"
export { SHADOWS } from "@/lib/constants/shadows"
export { RADIUS } from "@/lib/constants/radius"
export { OVERLAYS } from "@/lib/constants/overlays"
export { FONT_FAMILY, TEXT_STYLES } from "@/lib/constants/typography"
export { EASING, DURATION, SPRING, TRANSITION } from "@/lib/constants/animations"
export { BREAKPOINTS } from "@/lib/constants/breakpoints"
export { SPACING } from "@/lib/constants/spacing"

// ─── Composed UI Tokens ────────────────────────────────────────────────────────
// High-level semantic tokens that map raw values to UI concerns.

export const UI = {
  section: {
    dark: COLORS.navy,
    darker: COLORS.deepNavy,
    darkest: COLORS.darkerNavy,
    light: COLORS.beige,
    soft: COLORS.sky,
    white: COLORS.white,
  },

  text: {
    dark: COLORS.navy,
    darkSoft: COLORS.softNavy,

    light: COLORS.white,
    lightSoft: COLORS.beige,

    muted: COLORS.sky,
    mutedSoft: COLORS.softSky,

    accent: COLORS.teal,
    accentDark: COLORS.deepTeal,
    accentSoft: COLORS.softTeal,

    // Backward-compatible aliases
    primaryDark: COLORS.navy,
    primaryLight: COLORS.white,
    mutedLight: COLORS.sky,
  },

  card: {
    light: COLORS.paleSky,
    lighter: COLORS.softBeige,
    warm: COLORS.warmBeige,

    soft: COLORS.sky,
    softer: COLORS.softSky,
    pale: COLORS.paleSky,

    white: COLORS.white,

    /** Light content panel (rooms, reviews, arrival, campus-preview, gallery) */
    panel: COLORS.panelBg,

    dark: COLORS.navy,
    darkSoft: OVERLAYS.darkCardSoft,
    darkMedium: OVERLAYS.darkCardMedium,
    darkStrong: OVERLAYS.darkCardStrong,

    // Backward-compatible alias
    darkTransparent: OVERLAYS.darkCardSoft,
  },

  border: {
    light: COLORS.sky,
    lighter: COLORS.softSky,
    white: COLORS.white,

    /** Light panel border (#E2E8F0) */
    panel: COLORS.panelBorder,
    /** Alternate panel border (#F1F5F9) */
    panelAlt: COLORS.panelBorderAlt,

    soft: OVERLAYS.borderSkySoft,
    medium: OVERLAYS.borderSkyMedium,
    strong: OVERLAYS.borderSkyStrong,

    dark: OVERLAYS.borderNavy,
    darkMedium: OVERLAYS.borderNavyMedium,
  },

  button: {
    primary: COLORS.teal,
    primaryHover: COLORS.deepTeal,
    primaryText: COLORS.white,

    secondary: COLORS.white,
    secondaryHover: COLORS.sky,
    secondaryText: COLORS.navy,

    light: COLORS.beige,
    lightHover: COLORS.softSky,
    lightText: COLORS.navy,

    dark: COLORS.navy,
    darkHover: COLORS.deepNavy,
    darkText: COLORS.white,
  },

  input: {
    background: COLORS.white,
    backgroundSoft: COLORS.softBeige,

    text: COLORS.navy,
    placeholder: OVERLAYS.inputPlaceholder,

    border: COLORS.sky,
    borderHover: COLORS.softTeal,
    borderFocus: COLORS.teal,

    icon: COLORS.navy,
    iconFocus: COLORS.teal,

    focusRing: OVERLAYS.focusRing,
  },

  icon: {
    dark: COLORS.navy,
    light: COLORS.white,
    muted: COLORS.sky,
    accent: COLORS.teal,
    accentDark: COLORS.deepTeal,
  },

  badge: {
    background: COLORS.beige,
    text: COLORS.teal,
    border: COLORS.white,

    darkBackground: OVERLAYS.darkCardSoft,
    darkText: COLORS.sky,
    darkBorder: OVERLAYS.borderSkySoft,
  },

  shadow: SHADOWS,

  radius: {
    common: RADIUS.lg,
    rounded22: RADIUS.lg,
    sm: RADIUS.sm,
    md: RADIUS.md,
    xl: RADIUS.xl,
    "2xl": RADIUS["2xl"],
    full: RADIUS.full,
  },

  overlay: OVERLAYS,

  font: FONT_FAMILY,
} as const

// ─── CSS Custom Properties ─────────────────────────────────────────────────────
// Injected on <html> for Tailwind / CSS consumption.

export const CSS_VARS = {
  "--color-navy": COLORS.navy,
  "--color-deep-navy": COLORS.deepNavy,
  "--color-teal": COLORS.teal,
  "--color-deep-teal": COLORS.deepTeal,
  "--color-sky": COLORS.sky,
  "--color-soft-sky": COLORS.softSky,
  "--color-beige": COLORS.beige,
  "--color-soft-beige": COLORS.softBeige,
  "--color-white": COLORS.white,
  "--radius-common": RADIUS.lg,
} as const