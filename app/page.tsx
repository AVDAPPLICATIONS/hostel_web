"use client"

// ─── PAGE ENTRY — CODE-SPLIT ARCHITECTURE ────────────────────────────────────
//
// Eagerly loaded (above-the-fold, critical path):
//   • Navbar        — always visible; must render synchronously
//   • Hero          — LCP element; must render synchronously
//   • ScrollProgress — tiny, no cost
//
// Dynamically imported (below-the-fold):
//   Every other section is code-split into its own chunk.
//   Next.js still SSRs these by default (no ssr:false), so HTML is present for
//   SEO and there is no CLS.  But the JS for each section is only downloaded
//   when the browser is idle / the route is navigated to, dramatically reducing
//   the initial JS bundle and improving TTI.
//
// FloatingElements removed:
//   The fixed-position divs with filter:blur() created expensive GPU composite
//   layers on EVERY page scroll. Ambient gradients are now inlined per-section.

import dynamic from "next/dynamic"
import { useEffect } from "react"

// ── Critical path — eager imports ──
import Navbar from "@/components/layout/navbar"
import Hero from "@/components/sections/hero"
import ScrollProgress from "@/components/layout/scroll-progress"

// ── Below-fold — dynamic / lazy ──
const QuickLinks    = dynamic(() => import("@/components/sections/quick-links"))
const CampusPreview = dynamic(() => import("@/components/sections/campus-preview"))
const Features      = dynamic(() => import("@/components/sections/features"))
const Rooms         = dynamic(() => import("@/components/sections/rooms"))
const Arrival       = dynamic(() => import("@/components/sections/arrival"))
const Gallery       = dynamic(() => import("@/components/sections/gallery"))
const Reviews       = dynamic(() => import("@/components/sections/reviews"))
const Contact       = dynamic(() => import("@/components/sections/contact"))
const Footer        = dynamic(() => import("@/components/layout/footer"))

import { COLORS } from "@/lib/theme"

export default function Home() {
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: COLORS.navy }}>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* ── Above fold — renders immediately ── */}
        <Hero />

        {/* ── Below fold — JS lazy-loaded, HTML SSR'd ── */}
        <QuickLinks />
        <CampusPreview />
        <Features />
        <Rooms />
        <Arrival />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
