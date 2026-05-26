"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import { Menu, X, ArrowRight } from "lucide-react"
import { COLORS, UI, SHADOWS, OVERLAYS, TRANSITION } from "@/lib/theme"

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
    setScrolled(latest > 60)
  })

  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return
    try {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } catch {}
    setIsOpen(false)
  }

  // Section tracking via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined") return
    setScrolled(window.scrollY > 60)

    const visibleEntries = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleEntries.set(entry.target.id, entry.intersectionRatio)
          else visibleEntries.delete(entry.target.id)
        })
        let winnerId: string | null = null
        let maxRatio = 0
        visibleEntries.forEach((ratio, id) => {
          if (ratio > maxRatio) { maxRatio = ratio; winnerId = id }
        })
        if (winnerId) setActiveSection(winnerId)
      },
      { root: null, rootMargin: "-15% 0px -35% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
    )

    navItems.forEach(({ href }) => {
      const el = document.getElementById(href.substring(1))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (typeof document === "undefined") return
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <motion.nav
      className="pointer-events-auto fixed left-0 right-0 top-0 z-50 w-full"
      animate={{
        backgroundColor: scrolled ? COLORS.navy : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderBottomColor: scrolled ? OVERLAYS.borderWhiteMicro : "transparent",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        borderBottom: "1px solid transparent",
        boxShadow: scrolled ? SHADOWS.nav : "none",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex h-16 items-center justify-between md:h-[70px]">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-3 outline-none"
            aria-label="Go to top"
          >
            <Image
              src="/logo.png"
              alt="Atmiya Vidya Dham"
              width={62}
              height={29}
              className="h-7 w-auto object-contain"
              priority
            />
            <span
              className="hidden text-[15px] font-bold tracking-[0.12em] text-white sm:block md:text-[16px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Atmiya Vidya Dham
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative rounded-lg px-4 py-2 text-[14px] font-medium transition-colors duration-200 outline-none"
                  style={{ color: isActive ? COLORS.white : COLORS.sky }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: OVERLAYS.glassSoft }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Right: CTA + Mobile toggle ── */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("#contact")}
              className="hidden items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold tracking-wide text-white transition-all sm:flex"
              style={{
                background: COLORS.teal,
                boxShadow: SHADOWS.buttonTeal,
              }}
            >
              Enquire Now
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              className="flex h-9 w-9 items-center justify-center rounded-xl outline-none transition-colors lg:hidden"
              style={{
                background: OVERLAYS.glassSoft,
                border: `1px solid ${OVERLAYS.borderWhiteSoft}`,
                color: COLORS.sky,
              }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
            style={{
              background: COLORS.navy,
              borderTop: `1px solid ${OVERLAYS.borderWhiteMicro}`,
            }}
          >
            <div className="container mx-auto max-w-7xl px-4 py-5 md:px-8">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors"
                      style={{
                        color: isActive ? COLORS.white : COLORS.sky,
                        background: isActive ? OVERLAYS.glassSoft : "transparent",
                      }}
                    >
                      {item.name}
                      {isActive && (
                        <div
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: COLORS.teal }}
                        />
                      )}
                    </motion.button>
                  )
                })}

                {/* Mobile CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  onClick={() => scrollToSection("#contact")}
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[15px] font-bold text-white"
                  style={{ background: COLORS.teal, boxShadow: SHADOWS.buttonTeal }}
                >
                  Enquire Now
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
