// lib/constants/typography.ts
// ─── Typography Tokens ─────────────────────────────────────────────────────────

export const FONT_FAMILY = {
  /** Primary body font */
  sans: "'DM Sans', sans-serif",
  /** Display / heading font */
  heading: "'Cormorant Garamond', serif",
} as const

export const TEXT_STYLES = {
  /** Section title classes */
  sectionTitle:
    "text-5xl font-semibold leading-[1.05] md:text-7xl",
  /** Section subtitle / description classes */
  sectionSubtitle:
    "mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg",
  /** Badge / pill label */
  badgeLabel:
    "text-[10px] font-black uppercase tracking-[0.22em]",
  /** Micro label (9px) */
  microLabel:
    "text-[9px] font-black uppercase tracking-[0.2em]",
  /** Extended micro label */
  microLabelWide:
    "text-[9px] font-black uppercase tracking-[0.28em]",
  /** Counter / pagination text */
  counterText:
    "font-mono text-xs tracking-widest",
} as const
