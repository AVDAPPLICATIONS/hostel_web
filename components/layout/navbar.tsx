"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import { Menu, X, ArrowRight } from "lucide-react"
import { COLORS, UI } from "@/lib/theme"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Rooms", href: "#rooms" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window === "undefined") return
    const isScrolled = latest > window.innerHeight * 2.5
    if (isScrolled !== scrolled) setScrolled(isScrolled)
  })

  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return
    try {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } catch (e) {
      console.warn("Scroll error:", e)
    }
    setIsOpen(false)
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    setScrolled(window.scrollY > window.innerHeight * 2.5)

    // Keep track of which elements are visible and their ratio
    const visibleEntries = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleEntries.set(entry.target.id, entry.intersectionRatio)
          } else {
            visibleEntries.delete(entry.target.id)
          }
        })

        // Find the one with highest intersection ratio
        let winnerId: string | null = null
        let maxRatio = 0
        visibleEntries.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio
            winnerId = id
          }
        })

        if (winnerId) {
          setActiveSection(winnerId)
        }
      },
      { 
        root: null, 
        rootMargin: "-15% 0px -35% 0px", 
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.7, 0.8, 0.9, 1.0] 
      }
    )

    navItems.forEach(({ href }) => {
      const el = document.getElementById(href.substring(1))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(10,18,30,0.60)", backdropFilter: "blur(6px)" }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 md:px-5"
        style={{
          paddingTop: scrolled ? "10px" : "18px",
          transition: "padding-top 0.4s ease",
        }}
      >
        <div className="container mx-auto max-w-7xl">

          {/* ── Main Bar ── */}
          <motion.div
            className="pointer-events-auto flex h-[58px] items-center justify-between rounded-[22px] px-4 md:h-[64px] md:rounded-[28px] md:px-7"
            style={{
              background: scrolled
                ? "rgba(36,52,71,0.98)"
                : "rgba(47,65,86,0.88)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(200,217,230,0.16)",
              boxShadow: scrolled
                ? "0 20px 56px rgba(0,0,0,0.32), 0 0 0 1px rgba(200,217,230,0.06)"
                : "0 10px 32px rgba(0,0,0,0.18)",
              transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >

            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("#home")}
              className="flex cursor-pointer items-center gap-3 outline-none"
              aria-label="Go to home"
            >
              <div
                className="flex h-9 w-[66px] items-center justify-center overflow-hidden rounded-xl md:h-10 md:w-[72px]"
                style={{
                  background: UI.card.light,
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.14)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Atmiya Vidya Dham"
                  width={62}
                  height={29}
                  className="h-[27px] w-auto object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col text-left leading-none">
                <span
                  className="text-[15px] font-black uppercase tracking-tight md:text-[16px]"
                  style={{ color: "#fff" }}
                >
                  Atmiya Vidya Dham
                </span>
                <span
                  className="hidden text-[9px] font-bold uppercase tracking-[0.22em] sm:block"
                  style={{ color: COLORS.sky, opacity: 0.7 }}
                >
                  Student Residence
                </span>
              </div>
            </motion.button>

            {/* Desktop Nav Links */}
            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="group relative flex flex-col items-center gap-1.5 outline-none"
                  >
                    <span
                      className="text-[13px] font-bold transition-colors duration-250"
                      style={{ color: isActive ? "#fff" : COLORS.sky, opacity: isActive ? 1 : 0.65 }}
                    >
                      {item.name}
                    </span>

                    <span className="relative h-px w-full overflow-hidden rounded-full">
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ background: UI.button.primary }}
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                  </button>
                )
              })}
            </nav>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("#contact")}
                className="group relative hidden h-9 items-center gap-2 overflow-hidden rounded-xl px-5 text-xs font-black sm:flex md:h-10 md:rounded-2xl md:px-6 md:text-[13px]"
                style={{
                  background: UI.button.primary,
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(86,124,141,0.38)",
                }}
              >
                <span className="relative z-10">Enquire Now</span>
                <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                <span
                  className="absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen((p) => !p)}
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors lg:hidden md:h-10 md:w-10"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(200,217,230,0.14)",
                  color: COLORS.sky,
                }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="h-4 w-4 md:h-[18px] md:w-[18px]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="h-4 w-4 md:h-[18px] md:w-[18px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>

          {/* ── Mobile Menu ── */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto absolute left-3 right-3 top-[72px] overflow-hidden rounded-[22px] lg:hidden md:top-[80px]"
                style={{
                  background: COLORS.deepNavy,
                  border: "1px solid rgba(200,217,230,0.11)",
                  boxShadow: "0 40px 90px rgba(0,0,0,0.50), 0 0 0 1px rgba(200,217,230,0.05)",
                }}
              >
                {/* Nav items */}
                <div className="p-3">
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => scrollToSection(item.href)}
                        className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-200"
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,0.07)"
                            : "transparent",
                          borderLeft: isActive
                            ? `3px solid ${UI.button.primary}`
                            : "3px solid transparent",
                        }}
                      >
                        <span
                          className="font-mono text-[10px] font-black tracking-widest"
                          style={{ color: isActive ? UI.button.primary : "rgba(200,217,230,0.35)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <span
                          className="text-[16px] font-bold"
                          style={{ color: isActive ? "#fff" : "rgba(200,217,230,0.60)" }}
                        >
                          {item.name}
                        </span>

                        {isActive && (
                          <motion.span
                            layoutId="mobile-active-dot"
                            className="ml-auto h-1.5 w-1.5 rounded-full"
                            style={{ background: UI.button.primary }}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Divider + CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="p-3 pt-0"
                >
                  <div
                    className="mb-3 h-px w-full"
                    style={{ background: "rgba(200,217,230,0.08)" }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToSection("#contact")}
                    className="group relative flex h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl text-[15px] font-black"
                    style={{
                      background: UI.button.primary,
                      color: "#fff",
                      boxShadow: "0 8px 28px rgba(86,124,141,0.35)",
                    }}
                  >
                    <span className="relative z-10">Enquire Now</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <span
                      className="absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-full"
                      style={{ background: "rgba(255,255,255,0.10)" }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.nav>
    </>
  )
}
