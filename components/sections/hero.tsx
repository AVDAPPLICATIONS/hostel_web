"use client"

import { useRef } from "react"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { Play, ArrowDown } from "lucide-react"
import Magnetic from "@/components/shared/magnetic"
import TextReveal from "@/components/shared/text-reveal"

const PALETTE = {
  navy: "#2F4156",
  teal: "#567C8D",
  skyBlue: "#C8D9E6",
  beige: "#F5EFEB",
  white: "#FFFFFF",
}

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
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)
  const smoothPointerX = useSpring(pointerX, { stiffness: 80, damping: 24, mass: 0.4 })
  const smoothPointerY = useSpring(pointerY, { stiffness: 80, damping: 24, mass: 0.4 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.28])
  const colorFieldX = useTransform(smoothPointerX, [0, 100], ["-3%", "3%"])
  const colorFieldY = useTransform(smoothPointerY, [0, 100], ["-2%", "2%"])

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100)
  }

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
      onPointerMove={handlePointerMove}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${PALETTE.beige} 0%, ${PALETTE.white} 44%, ${PALETTE.skyBlue} 118%)`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Interactive palette wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: colorFieldX,
          y: colorFieldY,
          background:
            "linear-gradient(120deg, rgba(200,217,230,0.55) 0%, transparent 36%), linear-gradient(290deg, rgba(86,124,141,0.16) 0%, transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(245,239,235,0.22) 100%)",
        }}
      />

      {/* Animated color fields */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ["-4%", "3%", "-1%", "-4%"],
            y: ["0%", "-2%", "2%", "0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[18%] -left-[18%] h-[70%] w-[75%] blur-[90px]"
          style={{
            background: "linear-gradient(135deg, rgba(200,217,230,0.5), rgba(255,255,255,0))",
            transform: "skewX(-10deg)",
          }}
        />
        <motion.div
          animate={{
            x: ["4%", "-2%", "3%", "4%"],
            y: ["0%", "3%", "-1%", "0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[22%] right-[-18%] h-[78%] w-[72%] blur-[105px]"
          style={{
            background: "linear-gradient(225deg, rgba(86,124,141,0.24), rgba(245,239,235,0))",
            transform: "skewX(12deg)",
          }}
        />
      </div>

      {/* Floating palette dust particles */}
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
              background: "rgba(86, 124, 141, 0.24)",
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
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: "linear-gradient(rgba(47,65,86,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(47,65,86,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scroll-driven overlay for smooth transition */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background: `linear-gradient(180deg, ${PALETTE.white}, ${PALETTE.skyBlue})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 md:px-8 lg:px-10 min-h-screen flex items-center pt-28 pb-16 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-16 items-center w-full">
          {/* Text Content */}
          <motion.div className="max-w-[680px]" style={{ y: textY }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 md:mb-9"
            >
              <span
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase"
                style={{
                  background: "rgba(245,239,235,0.1)",
                  border: "1px solid rgba(86,124,141,0.24)",
                  color: PALETTE.teal,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 14px 38px rgba(47,65,86,0.08)",
                }}
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: PALETTE.teal }}
                />
                Redefining Student Living
              </span>
            </motion.div>

            {/* Title */}
            <div className="mb-7 md:mb-8 space-y-2 md:space-y-3">
              <TextReveal>
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-normal"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: PALETTE.navy }}
                >
                  Atmiya Vidhya
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-normal"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: PALETTE.teal,
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
              className="text-base md:text-lg mb-10 md:mb-11 max-w-[610px] leading-8 font-light"
              style={{ color: "rgba(47,65,86,0.72)" }}
            >
              A value-centered student residence shaped for focused study, cultural grounding, and everyday comfort in a calm campus environment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20"
            >
              <Magnetic>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("#contact")}
                  className="relative group flex items-center justify-center gap-2.5 px-8 py-4 h-14 min-w-[190px] rounded-2xl font-semibold text-base overflow-hidden"
                  style={{
                    background: PALETTE.navy,
                    color: PALETTE.white,
                    boxShadow: "0 18px 40px -16px rgba(47,65,86,0.55)",
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
                  className="flex items-center justify-center gap-2.5 px-8 py-4 h-14 min-w-[190px] rounded-2xl font-semibold text-base transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    color: PALETTE.teal,
                    border: "1px solid rgba(86,124,141,0.24)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 16px 40px -22px rgba(47,65,86,0.45)",
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
                <div className="w-px h-10 bg-gradient-to-b from-[#567C8D]/50 to-transparent" />
                <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "rgba(47,65,86,0.42)" }}>
                  Scroll to explore
                </span>
              </div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="ml-[1px]"
              >
                <ArrowDown className="h-4 w-4" style={{ color: "rgba(86,124,141,0.58)" }} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-end items-center relative"
            style={{ y: textY }}
          >
            {/* Glowing backdrop for the image */}
            <img
              src="https://www.avdvvn.org/assets/images/demo-content/swamiji.png"
              alt="Swamiji"
              className="relative z-10 max-h-[85vh] w-auto object-contain drop-shadow-[0_24px_34px_rgba(47,65,86,0.22)] filter brightness-105"
              style={{
                maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5EFEB] to-transparent pointer-events-none" />
    </section>
  )
}
