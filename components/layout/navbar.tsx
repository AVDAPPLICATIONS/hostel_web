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
    const threshold = window.innerHeight * 2.5
    const isScrolled = latest > threshold
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled)
    }
  })

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

    // Initialize scrolled state on mount
    setScrolled(window.scrollY > window.innerHeight * 2.5)

    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -60% 0px", // focus on the upper/middle half of the viewport
      threshold: [0, 0.1, 0.2, 0.5],
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navItems.forEach((item) => {
      const id = item.href.substring(1)
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      animate={{ 
        y: scrolled ? 0 : -100, 
        opacity: scrolled ? 1 : 0 
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pointer-events-auto fixed left-0 right-0 top-0 z-50 w-full"
      style={{
        background: scrolled ? UI.section.dark : "rgba(47, 65, 86, 0.92)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        boxShadow: scrolled
          ? "0 16px 46px rgba(0, 0, 0, 0.22)"
          : "0 10px 30px rgba(0, 0, 0, 0.16)",
        transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
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
                Student Residence
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-[14px] font-normal tracking-wide lowercase outline-none transition-all duration-300"
                  style={{
                    color: isActive ? UI.text.light : UI.text.muted,
                  }}
                >
                  <span
                    className="pb-1 transition-all duration-300 border-b hover:text-white"
                    style={{
                      borderColor: isActive 
                        ? UI.text.light 
                        : "rgba(200, 217, 230, 0.3)",
                    }}
                  >
                    {item.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("#contact")}
              className="hidden text-[14px] font-normal tracking-wide lowercase outline-none transition-all duration-300 sm:block"
              style={{
                color: UI.text.light,
              }}
            >
              <span className="pb-1 transition-all duration-300 border-b border-current hover:text-white">
                enquire now
              </span>
            </button>

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
              boxShadow: UI.shadow.card,
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-4 pt-4"
                  style={{ borderTop: `1px solid ${UI.border.soft}` }}
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