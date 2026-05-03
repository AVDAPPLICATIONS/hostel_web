"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, ArrowDown } from "lucide-react"
import Magnetic from "@/components/shared/magnetic"
import TextReveal from "@/components/shared/text-reveal"

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: ((i * 3) % 4) + 1, // Deterministic size 1-4
  x: (i * 23) % 100,       // Deterministic x 0-100
  y: (i * 37) % 100,       // Deterministic y 0-100
  duration: 10 + ((i * 7) % 15), // Deterministic duration 10-25
  delay: (i * 11) % 5,     // Deterministic delay 0-5
}))

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6])

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
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(170deg, #060d16 0%, #0d1b2a 40%, #091520 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -left-[10%] w-[55%] h-[55%] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, rgba(200,169,110,0.15), transparent 70%)" }}
        />
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.3, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[15%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(139,180,212,0.1), transparent 70%)" }}
        />
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(200,169,110,0.08), transparent 70%)" }}
        />
      </div>

      {/* Floating gold dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: "rgba(200, 169, 110, 0.4)",
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scroll-driven overlay for smooth transition */}
      <motion.div
        className="absolute inset-0 bg-[#060d16] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <motion.div className="max-w-5xl" style={{ y: textY }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
              style={{
                background: "rgba(200,169,110,0.08)",
                border: "1px solid rgba(200,169,110,0.2)",
                color: "#C8A96E",
                backdropFilter: "blur(12px)",
              }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-amber-400"
              />
              Redefining Student Living
            </span>
          </motion.div>

          {/* Title */}
          <div className="mb-10 space-y-1">
            <TextReveal>
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.92] tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Atmiya Vidya
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.92] tracking-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#C8A96E",
                }}
              >
                Dham Hostel.
              </h1>
            </TextReveal>
          </div>

          {/* Description with staggered words */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-white/40 mb-14 max-w-2xl leading-relaxed font-light"
          >
            Not just a residence, but a platform to instill cultural and moral values alongside academic excellence in the lap of nature.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-5 mb-20"
          >
            <Magnetic>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("#contact")}
                className="relative group flex items-center justify-center gap-2.5 px-8 py-4 h-14 rounded-2xl font-semibold text-base overflow-hidden"
                style={{
                  background: "#C8A96E",
                  color: "#0a1220",
                  boxShadow: "0 16px 40px -10px rgba(200,169,110,0.4)",
                }}
              >
                <span className="relative z-10">Book Your Stay</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 skew-x-12" />
              </motion.button>
            </Magnetic>

            <Magnetic>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("#virtual-tour")}
                className="flex items-center justify-center gap-2.5 px-8 py-4 h-14 rounded-2xl font-semibold text-base transition-all duration-300"
                style={{
                  background: "transparent",
                  color: "#C8A96E",
                  border: "1px solid rgba(200,169,110,0.35)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Play className="h-4 w-4" />
                Virtual Tour
              </motion.button>
            </Magnetic>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col items-start gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-px h-10 bg-gradient-to-b from-[#C8A96E]/50 to-transparent" />
              <span className="text-white/25 text-[10px] tracking-[0.25em] uppercase font-medium">
                Scroll to explore
              </span>
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="ml-[1px]"
            >
              <ArrowDown className="h-4 w-4 text-white/20" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060d16] to-transparent pointer-events-none" />
    </section>
  )
}
