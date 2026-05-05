"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { Play, ArrowDown } from "lucide-react"
import Magnetic from "@/components/shared/magnetic"
import TextReveal from "@/components/shared/text-reveal"
import { UI } from "@/lib/theme"

const floatingParticles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size: ((i * 3) % 4) + 2,
  x: (i * 23) % 100,
  y: (i * 37) % 100,
  duration: 10 + ((i * 7) % 15),
  delay: (i * 11) % 5,
}))

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  })

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.12])

  const colorFieldX = useTransform(smoothPointerX, [0, 100], ["-1.2%", "1.2%"])
  const colorFieldY = useTransform(smoothPointerY, [0, 100], ["-1%", "1%"])

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
      className="relative min-h-screen overflow-hidden"
      style={{
        background: UI.section.dark,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Soft moving flat overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          x: colorFieldX,
          y: colorFieldY,
          background: UI.card.darkSoft,
          opacity: 0.6,
        }}
      />

      {/* Subtle floating dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: UI.text.muted,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -55, 0],
              opacity: [0, 0.25, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,217,230,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(200,217,230,0.45) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Scroll overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background: UI.section.light,
        }}
      />

      <div className="relative z-10 container mx-auto flex min-h-screen items-center px-5 pb-16 pt-28 md:px-8 md:pt-32 lg:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* Text Content */}
          <motion.div className="max-w-[680px]" style={{ y: textY }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8 md:mb-9"
            >
              <motion.span
                className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em]"
                style={{
                  background: UI.card.light,
                  border: `1px solid ${UI.border.white}`,
                  color: UI.text.accent,
                  boxShadow: UI.shadow.light,
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2 w-2 rounded-full"
                  style={{ background: UI.text.accent }}
                />
                Redefining Student Living
              </motion.span>
            </motion.div>

            {/* Title */}
            <div className="mb-7 space-y-2 md:mb-8 md:space-y-3">
              <TextReveal>
                <h1
                  className="text-5xl font-bold leading-[1.02] tracking-normal sm:text-6xl md:text-7xl xl:text-[5.5rem]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: UI.text.light,
                  }}
                >
                  Atmiya Vidhya
                </h1>
              </TextReveal>

              <TextReveal delay={0.2}>
                <motion.h1
                  className="text-5xl font-bold leading-[1.02] tracking-normal sm:text-6xl md:text-7xl xl:text-[5.5rem]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: UI.text.muted,
                  }}
                  animate={{
                    opacity: [0.78, 1, 0.78],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Dham Hostel.
                </motion.h1>
              </TextReveal>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-10 max-w-[610px] text-base font-light leading-8 md:mb-11 md:text-lg"
              style={{ color: UI.text.muted }}
            >
              A value-centered student residence shaped for focused study,
              cultural grounding, and everyday comfort in a calm campus
              environment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-16 flex flex-col gap-4 sm:flex-row md:mb-20"
            >
              <Magnetic>
                <motion.button
                  whileHover={{
                    scale: 1.035,
                    y: -3,
                    backgroundColor: UI.button.primaryHover,
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("#contact")}
                  className="group relative flex h-14 min-w-[190px] items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-8 py-4 text-base font-black"
                  style={{
                    background: UI.button.primary,
                    color: UI.button.primaryText,
                    boxShadow: UI.shadow.soft,
                  }}
                >
                  <span className="relative z-10">Book Your Stay</span>

                  <span
                    className="absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-full"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  />
                </motion.button>
              </Magnetic>

              <Magnetic>
                <motion.button
                  whileHover={{
                    scale: 1.035,
                    y: -3,
                    backgroundColor: UI.card.soft,
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("#virtual-tour")}
                  className="flex h-14 min-w-[190px] items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-black transition-all duration-300"
                  style={{
                    background: UI.card.light,
                    color: UI.text.dark,
                    border: `1px solid ${UI.border.white}`,
                    boxShadow: UI.shadow.light,
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
                <div
                  className="h-10 w-px"
                  style={{ background: UI.text.muted }}
                />

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.25em]"
                  style={{ color: UI.text.muted }}
                >
                  Scroll to explore
                </span>
              </div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="ml-[1px]"
              >
                <ArrowDown
                  className="h-4 w-4"
                  style={{ color: UI.text.muted }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative hidden items-center justify-end lg:flex"
            style={{ y: imageY }}
          >
            <motion.div
              className="absolute right-8 top-1/2 h-[520px] w-[360px] -translate-y-1/2 rounded-[3rem]"
              style={{
                background: UI.card.soft,
                border: `1px solid ${UI.border.white}`,
                boxShadow: UI.shadow.card,
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              src="https://www.avdvvn.org/assets/images/demo-content/swamiji.png"
              alt="Swamiji"
              className="relative z-10 max-h-[85vh] w-auto object-contain drop-shadow-[0_24px_34px_rgba(0,0,0,0.25)] brightness-105"
              style={{
                maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom flat fade block */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: UI.section.dark,
        }}
      />
    </section>
  )
}