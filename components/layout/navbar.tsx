"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, ArrowRight } from "lucide-react"
import { COLORS, UI } from "@/lib/theme"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Rooms", href: "#rooms" },
  { name: "Tour", href: "#virtual-tour" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return

    try {
      const element = document.querySelector(href)

      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.warn("Error scrolling to section:", error)
    }

    setIsOpen(false)
  }

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return

    const handleScroll = () => {
      try {
        setScrolled(window.scrollY > 20)

        const sections = navItems.map((item) => item.href.substring(1))

        const currentSection = sections.find((section) => {
          const element = document.getElementById(section)

          if (!element) return false

          const rect = element.getBoundingClientRect()

          return rect.top <= 120 && rect.bottom >= 120
        })

        if (currentSection) {
          setActiveSection(currentSection)
        }
      } catch (error) {
        console.warn("Error in scroll handler:", error)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.85,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 md:px-4"
      style={{
        paddingTop: scrolled ? "10px" : "16px",
        transition: "padding-top 0.4s ease",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="pointer-events-auto flex h-14 items-center justify-between rounded-[20px] px-4 md:h-16 md:rounded-[28px] md:px-7"
          style={{
            background: scrolled ? UI.section.dark : "rgba(47, 65, 86, 0.92)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: `1px solid ${
              scrolled ? UI.border.soft : "rgba(200, 217, 230, 0.22)"
            }`,
            boxShadow: scrolled
              ? "0 16px 46px rgba(0, 0, 0, 0.22)"
              : "0 10px 30px rgba(0, 0, 0, 0.16)",
            transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection("#home")}
            className="flex cursor-pointer items-center gap-3"
            aria-label="Go to home"
          >
            <div
              className="flex h-9 w-[68px] items-center justify-center overflow-hidden rounded-xl md:h-10 md:w-[74px]"
              style={{
                background: UI.card.light,
                border: `1px solid ${UI.border.white}`,
                boxShadow: UI.shadow.light,
              }}
            >
              <Image
                src="/logo.png"
                alt="Atmiya Vidya Dham logo"
                width={62}
                height={29}
                className="h-[27px] w-auto object-contain"
                priority
              />
            </div>

            <div className="flex flex-col text-left">
              <span
                className="text-base font-black uppercase leading-tight tracking-tight md:text-lg"
                style={{ color: UI.text.light }}
              >
                Atmiya Vidya Dham
              </span>

              <span
                className="hidden text-[9px] font-bold uppercase tracking-[0.2em] sm:block"
                style={{ color: UI.text.muted }}
              >
                Student Hostel
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div
            className="hidden items-center gap-1 rounded-full p-1 lg:flex"
            style={{
              background: "rgba(245, 239, 235, 0.08)",
              border: `1px solid ${UI.border.soft}`,
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative rounded-full px-4 py-2 text-[13px] font-bold outline-none transition-colors duration-300 xl:px-5"
                  style={{
                    color: isActive ? UI.text.dark : UI.text.muted,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: UI.card.light,
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.14)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}

                  <span
                    className="relative z-10 transition-colors duration-300 hover:text-white"
                    style={{
                      color: isActive ? UI.text.dark : undefined,
                    }}
                  >
                    {item.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -1,
                backgroundColor: UI.button.primaryHover,
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("#contact")}
              className="group relative hidden h-9 items-center gap-2 overflow-hidden rounded-xl px-5 text-xs font-black sm:flex md:h-10 md:rounded-2xl md:px-6 md:text-[13px]"
              style={{
                background: UI.button.primary,
                color: UI.button.primaryText,
                boxShadow: UI.shadow.soft,
              }}
            >
              <span className="relative z-10">Enquire Now</span>

              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />

              <span
                className="absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors md:h-10 md:w-10 lg:hidden"
              style={{
                background: UI.card.darkSoft,
                border: `1px solid ${UI.border.soft}`,
                color: UI.text.muted,
              }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
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
        </motion.div>

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
              className="pointer-events-auto absolute left-3 right-3 top-[68px] overflow-hidden rounded-[20px] p-5 md:top-[76px] md:rounded-[24px] md:p-6 lg:hidden"
              style={{
                background: UI.section.dark,
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: `1px solid ${UI.border.soft}`,
                boxShadow: UI.shadow.card,
              }}
            >
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
                      className="group flex items-center justify-between rounded-xl px-5 py-3.5 text-left text-[15px] font-bold transition-all duration-300"
                      style={{
                        background: isActive ? UI.card.light : "transparent",
                        color: isActive ? UI.text.dark : UI.text.muted,
                        border: `1px solid ${
                          isActive ? UI.border.white : "transparent"
                        }`,
                      }}
                    >
                      <span>{item.name}</span>

                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: UI.button.primary }}
                        />
                      )}
                    </motion.button>
                  )
                })}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-4 pt-4"
                  style={{ borderTop: `1px solid ${UI.border.soft}` }}
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{
                      backgroundColor: UI.button.primaryHover,
                    }}
                    onClick={() => scrollToSection("#contact")}
                    className="group relative flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl text-base font-black"
                    style={{
                      background: UI.button.primary,
                      color: UI.button.primaryText,
                      boxShadow: UI.shadow.soft,
                    }}
                  >
                    <span className="relative z-10">Enquire Now</span>

                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />

                    <span
                      className="absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-full"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}