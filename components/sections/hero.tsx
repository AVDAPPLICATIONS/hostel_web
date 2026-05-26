"use client"

// ─── LCP-OPTIMISED HERO ───────────────────────────────────────────────────────
//
// Key changes from the previous version:
//  1. H1 is plain text with a CSS-only shimmer class — no opacity:0 initial state,
//     so the browser can paint it immediately and it becomes the LCP element.
//  2. Removed: useScroll / useSpring / useTransform parallax  (main-thread work)
//  3. Removed: onPointerMove tracking                         (main-thread work)
//  4. Removed: floatingParticles (6 JS-driven animating divs) (compositor cost)
//  5. Hero background is a pure CSS gradient — zero JS.
//  6. Swamiji image uses next/image with `priority` so it is preloaded.
//  7. Secondary elements animate in with a single short Framer Motion motion.div.

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { COLORS, UI, SHADOWS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"
import { AnimatedButton } from "@/components/ui/animated-button"
import React from "react"

const STATS = [
  { value: "500+", label: "Students" },
  { value: "14+",  label: "Amenities" },
  { value: "5 ★",  label: "Rated" },
] as const

function scrollTo(href: string) {
  if (typeof document === "undefined") return
  try { document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }) } catch {}
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ background: UI.section.dark, fontFamily: FONT_FAMILY.sans }}
    >
      {/*
        ── Background gradient — pure CSS, no JS, no animation ──────────────
        Renders synchronously with the page. Does NOT block LCP.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            `radial-gradient(ellipse 65% 60% at 72% 30%, ${OVERLAYS.tealLight} 0%, transparent 62%)`,
            `radial-gradient(ellipse 45% 40% at 12% 85%, rgba(28,58,92,0.35) 0%, transparent 60%)`,
          ].join(", "),
        }}
      />

      {/* ── Main layout ── */}
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col justify-center px-5 pb-20 pt-28 md:px-8 md:pt-32 lg:flex-row lg:items-center lg:gap-10 lg:px-10 xl:gap-16">

        {/* ── Left column: text ── */}
        <div className="flex-1 max-w-2xl">

          {/*
            Location badge — CSS animation (hero-badge-reveal defined in globals.css)
            Rendered in HTML immediately, animated purely via @keyframes.
          */}
          <div className="mb-7 hero-badge-reveal">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.22em]"
              style={{
                background: OVERLAYS.tealMedium,
                color: COLORS.sky,
                border: `1px solid ${OVERLAYS.tealBorder}`,
              }}
            >
              Vallabh Vidyanagar · Gujarat
            </span>
          </div>

          {/*
            ── H1 — THE LCP ELEMENT ──────────────────────────────────────────
            Rendered as plain text with the .shining-text CSS class.
            • No Framer Motion — no opacity:0 initial state
            • No useInView gate — text is immediately visible
            • CSS shimmer animation plays without JS
            → Browser paints this within the first frame → LCP target: <2.5 s
          */}
          <h1
            className="shining-text mb-3 text-[2.6rem] font-bold uppercase leading-[1.06] tracking-wide sm:text-5xl md:text-[3.6rem] xl:text-[4.4rem]"
            style={{ color: COLORS.white, fontFamily: FONT_FAMILY.heading }}
          >
            Atmiya Vidya Dham
          </h1>

          {/* Subtitle — CSS animation */}
          <h2
            className="hero-subtitle-reveal mb-7 text-xl font-light uppercase tracking-[0.24em] sm:text-2xl md:text-[1.75rem]"
            style={{ color: UI.text.muted }}
          >
            Redefining Youth
          </h2>

          {/* Body copy — CSS animation */}
          <p
            className="hero-body-reveal mb-10 max-w-[560px] text-[0.97rem] font-light leading-[1.95] md:text-[1.04rem]"
            style={{ color: UI.text.muted }}
          >
            Developed in the lap of nature, AVD is a platform that instils cultural and
            moral values while providing an environment for academic proficiency. More
            than a hostel — a community that shapes futures.
          </p>

          {/* CTAs — single Framer Motion block, short delay */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 flex flex-wrap gap-3.5"
          >
            <AnimatedButton
              onClick={() => scrollTo("#contact")}
              className="h-14 min-w-[190px] rounded-full px-8 text-[15px] font-black"
              style={{ boxShadow: SHADOWS.buttonPrimary }}
            >
              Book Your Stay
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>

            <AnimatedButton
              onClick={() => scrollTo("#rooms")}
              variant="secondary"
              className="h-14 min-w-[158px] rounded-full px-8 text-[15px] font-black"
            >
              Explore Rooms
            </AnimatedButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="flex items-start gap-7"
          >
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && (
                  <div
                    className="h-10 w-px self-center"
                    style={{ background: OVERLAYS.borderWhiteFaint }}
                    aria-hidden
                  />
                )}
                <div>
                  <div
                    className="text-[1.55rem] font-black leading-none"
                    style={{ color: COLORS.white }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: COLORS.sky, opacity: 0.72 }}
                  >
                    {s.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: image ── */}
        {/*
          Fades in with a short opacity/scale transition.
          next/image priority → preloaded as <link rel="preload"> in <head>.
          Replaces the old <img> which was not preloaded and had a JS-driven float animation.
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 hidden flex-shrink-0 items-end justify-center lg:mt-0 lg:flex"
          aria-hidden
        >
          {/* Soft glow behind the image */}
          <div
            className="absolute bottom-[5%] left-1/2 h-[55%] w-[55%] -translate-x-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${OVERLAYS.tealMedium} 0%, transparent 68%)`,
              filter: "blur(48px)",
            }}
          />
          <div className="relative h-[78vh] w-[36vw] max-h-[680px] max-w-[400px]">
            <Image
              src="https://www.avdvvn.org/assets/images/demo-content/swamiji.png"
              alt="Spiritual guide — Atmiya Vidya Dham"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 0vw, 38vw"
              className="object-contain object-bottom"
              style={{
                maskImage: "linear-gradient(to bottom, black 70%, transparent 96%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 96%)",
                filter: "brightness(1.06) contrast(1.02)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28"
        style={{ background: `linear-gradient(to bottom, transparent, ${UI.section.dark})` }}
      />
    </section>
  )
}
