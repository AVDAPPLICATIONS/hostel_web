// lib/theme.ts

export const COLORS = {
  // Main palette
  navy: "#2F4156",
  teal: "#567C8D",
  sky: "#C8D9E6",
  beige: "#F5EFEB",
  white: "#FFFFFF",

  // Supporting shades
  deepNavy: "#243447",
  darkerNavy: "#1D2A38",
  softNavy: "#3B5066",

  deepTeal: "#466A79",
  softTeal: "#6E91A0",

  softSky: "#D9E6EE",
  paleSky: "#EEF5F8",

  softBeige: "#FAF7F4",
  warmBeige: "#EFE7E1",
} as const

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
    // light: COLORS.beige,
    light: COLORS.paleSky,
    lighter: COLORS.softBeige,
    warm: COLORS.warmBeige,

    soft: COLORS.sky,
    softer: COLORS.softSky,
    pale: COLORS.paleSky,

    white: COLORS.white,

    dark: COLORS.navy,
    darkSoft: "rgba(245, 239, 235, 0.08)",
    darkMedium: "rgba(245, 239, 235, 0.12)",
    darkStrong: "rgba(245, 239, 235, 0.18)",

    // Backward-compatible alias
    darkTransparent: "rgba(245, 239, 235, 0.08)",
  },

  border: {
    light: COLORS.sky,
    lighter: COLORS.softSky,
    white: COLORS.white,

    soft: "rgba(200, 217, 230, 0.35)",
    medium: "rgba(200, 217, 230, 0.5)",
    strong: "rgba(200, 217, 230, 0.72)",

    dark: "rgba(47, 65, 86, 0.16)",
    darkMedium: "rgba(47, 65, 86, 0.28)",
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
    placeholder: "rgba(47, 65, 86, 0.45)",

    border: COLORS.sky,
    borderHover: COLORS.softTeal,
    borderFocus: COLORS.teal,

    icon: COLORS.navy,
    iconFocus: COLORS.teal,

    focusRing: "rgba(200, 217, 230, 0.9)",
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

    darkBackground: "rgba(245, 239, 235, 0.08)",
    darkText: COLORS.sky,
    darkBorder: "rgba(200, 217, 230, 0.35)",
  },

  shadow: {
    card: "0 32px 90px rgba(0, 0, 0, 0.28)",
    cardSoft: "0 28px 70px rgba(0, 0, 0, 0.22)",

    soft: "0 18px 40px rgba(47, 65, 86, 0.18)",
    light: "0 12px 28px rgba(47, 65, 86, 0.12)",

    button: "0 16px 34px rgba(47, 65, 86, 0.18)",

    focus:
      "0 0 0 4px rgba(200, 217, 230, 0.9), 0 12px 28px rgba(47, 65, 86, 0.16)",

    image: "0 22px 50px rgba(47, 65, 86, 0.18)",
  },
  radius: {
    common: "22px",
    rounded22: "22px",
  },
} as const

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
  "--radius-common": "22px",
} as const