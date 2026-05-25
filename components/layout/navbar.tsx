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
    if (typeof window === "undefined") return
    const isScrolled = latest > 50
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
    setScrolled(window.scrollY > 50)

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
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.7, 0.8, 0.9, 1.0],
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
    <motion.nav
      className="pointer-events-auto fixed left-0 right-0 top-0 z-50 w-full"
      style={{
        background: scrolled ? UI.section.dark : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
        boxShadow: scrolled ? SHADOWS.nav : "none",
        borderBottom: scrolled ? `1px solid ${OVERLAYS.borderWhiteMicro}` : "none",
        transition: TRANSITION.cssSmooth,
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex h-14 items-center justify-between md:h-16">

          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection("#home")}
            className="flex cursor-pointer items-center gap-3"
            aria-label="Go to home"
          >
            <div className="flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Atmiya Vidya Dham logo"
                width={62}
                height={29}
                className="h-[27px] w-auto object-contain"
                priority
              />
            </div>

            <div className="hidden flex-col text-left leading-none sm:flex">
              <span className="text-[15px] font-bold tracking-[0.12em] text-white md:text-[16px]">
                Atmiya Vidya Dham
              </span>
            </div>
          </motion.button>

          {/* Right Side (Nav + CTA) */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative text-[15px] font-medium tracking-wide outline-none transition-all duration-300"
                    style={{
                      color: isActive ? UI.text.light : UI.text.muted,
                    }}
                  >
                    <span className="transition-colors duration-300 hover:text-white">
                      {item.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4 md:gap-6">
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("#contact")}
                className="hidden items-center justify-center rounded-xl px-6 py-2.5 text-[14px] font-bold tracking-wide transition-all sm:flex"
                style={{
                  background: UI.button.primary,
                  color: "#fff",
                  boxShadow: SHADOWS.buttonPrimary,
                }}
              >
                Enquire Now
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen((p) => !p)}
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors lg:hidden md:h-10 md:w-10"
                style={{
                  background: OVERLAYS.glassSoft,
                  border: `1px solid ${OVERLAYS.borderWhiteSoft}`,
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
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-auto absolute left-0 right-0 top-full overflow-hidden p-5 md:p-6 lg:hidden"
            style={{
              background: UI.section.dark,
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              boxShadow: SHADOWS.card,
            }}
          >
            <div className="container mx-auto max-w-7xl px-4 md:px-8">
              <div className="relative flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)

                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => scrollToSection(item.href)}
                      className="group flex items-center justify-between py-3.5 text-left text-[15px] font-normal tracking-wide lowercase transition-all duration-300"
                      style={{
                        color: isActive ? UI.text.light : UI.text.muted,
                      }}
                    >
                      <span
                        className="pb-0.5 border-b transition-all duration-300"
                        style={{
                          borderColor: isActive ? UI.text.light : "transparent",
                        }}
                      >
                        {item.name}
                      </span>
                    </motion.button>
                  )
                })}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="pt-3"
                >
                  <motion.button
                    onClick={() => scrollToSection("#contact")}
                    className="flex py-3.5 text-left text-[15px] font-normal tracking-wide lowercase transition-all duration-300"
                    style={{
                      color: UI.text.light,
                    }}
                  >
                    <span className="pb-0.5 border-b border-current">
                      enquire now
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
