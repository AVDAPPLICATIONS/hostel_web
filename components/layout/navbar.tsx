"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, ArrowRight } from "lucide-react"

const PALETTE = {
  navy: "#2F4156",
  teal: "#567C8D",
  skyBlue: "#C8D9E6",
  beige: "#F5EFEB",
  white: "#FFFFFF",
}

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
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 120 && rect.bottom >= 120
          }
          return false
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
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 md:px-4 pointer-events-none"
      style={{ paddingTop: scrolled ? "10px" : "16px", transition: "padding-top 0.4s ease" }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="pointer-events-auto rounded-[20px] md:rounded-[28px] px-4 md:px-7 h-14 md:h-16 flex items-center justify-between"
          style={{
            background: scrolled
              ? "linear-gradient(135deg, rgba(47,65,86,0.96), rgba(42,61,80,0.94))"
              : "linear-gradient(135deg, rgba(47,65,86,0.9), rgba(86,124,141,0.82))",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: `1px solid ${scrolled ? "rgba(200,217,230,0.24)" : "rgba(200,217,230,0.18)"}`,
            boxShadow: scrolled
              ? "0 14px 45px rgba(47,65,86,0.26), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "0 10px 34px rgba(47,65,86,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="h-9 w-[68px] md:h-10 md:w-[74px] rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${PALETTE.white}, ${PALETTE.beige})`,
                border: "1px solid rgba(200,217,230,0.55)",
                boxShadow: "0 10px 26px -18px rgba(0,0,0,0.5)",
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
            <div className="flex flex-col -space-y-0.5">
              <span className="text-base md:text-lg font-black tracking-tight uppercase leading-tight" style={{ color: PALETTE.white }}>
                Atmiya Vidya Dham
              </span>
              
            </div>
          </motion.div>

          {/* Desktop Navigation — Pill Design */}
          <div
            className="hidden lg:flex items-center gap-0.5 p-1 rounded-full"
            style={{
              background: "rgba(47,65,86,0.28)",
              border: "1px solid rgba(200,217,230,0.16)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative px-4 xl:px-5 py-2 text-[13px] font-medium transition-colors duration-300 rounded-full outline-none"
                  style={{
                    color: isActive ? PALETTE.navy : "rgba(245,239,235,0.68)",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: PALETTE.beige,
                        boxShadow: "0 6px 18px rgba(245,239,235,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className="relative z-10 transition-colors duration-300"
                    style={{
                      color: isActive ? PALETTE.navy : undefined,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = PALETTE.skyBlue
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "rgba(245,239,235,0.68)"
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
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("#contact")}
              className="hidden sm:flex items-center gap-2 h-9 md:h-10 px-5 md:px-6 rounded-xl md:rounded-2xl font-bold text-xs md:text-[13px] overflow-hidden group relative"
              style={{
                background: PALETTE.beige,
                color: PALETTE.navy,
                boxShadow: "0 10px 26px -14px rgba(245,239,235,0.55)",
              }}
            >
              <span className="relative z-10">Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </motion.button>

            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(200,217,230,0.18)",
                color: PALETTE.beige,
              }}
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
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden absolute top-[68px] md:top-[76px] left-3 right-3 rounded-[20px] md:rounded-[24px] p-5 md:p-6 pointer-events-auto overflow-hidden"
              style={{
                background: "rgba(47, 65, 86, 0.96)",
                backdropFilter: "blur(32px) saturate(1.6)",
                WebkitBackdropFilter: "blur(32px) saturate(1.6)",
                border: "1px solid rgba(200,217,230,0.18)",
                boxShadow: "0 20px 60px rgba(47,65,86,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Accent glow */}
              <div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[150px] rounded-full blur-3xl opacity-[0.06]"
                style={{ background: PALETTE.skyBlue }}
              />

              <div className="relative flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left py-3.5 px-5 rounded-xl font-medium text-[15px] transition-all duration-300 flex items-center justify-between group"
                      style={{
                        background: isActive ? "rgba(245,239,235,0.12)" : "transparent",
                        color: isActive ? PALETTE.skyBlue : "rgba(245,239,235,0.68)",
                        border: isActive
                          ? "1px solid rgba(200,217,230,0.24)"
                          : "1px solid transparent",
                      }}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: PALETTE.teal }}
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
                  style={{ borderTop: "1px solid rgba(200,217,230,0.14)" }}
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToSection("#contact")}
                    className="w-full flex items-center justify-center gap-2.5 h-14 rounded-2xl font-bold text-base overflow-hidden group relative"
                    style={{
                      background: PALETTE.beige,
                      color: PALETTE.navy,
                      boxShadow: "0 12px 32px -14px rgba(245,239,235,0.45)",
                    }}
                  >
                    <span className="relative z-10">Enquire Now</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 skew-x-12" />
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
