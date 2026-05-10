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
import ScrollShineText from "@/components/shared/scroll-shine-text"
import { UI } from "@/lib/theme"

const floatingParticles = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  size: ((i * 3) % 4) + 2,
  x: (i * 23) % 100,
  y: (i * 37) % 100,
  duration: 14 + ((i * 7) % 12),
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
              willChange: "transform",
            }}
            animate={{
              y: [0, -55, 0],
              opacity: [0, 0.2, 0],
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





      <div className="relative z-10 container mx-auto flex min-h-screen items-center px-5 pb-16 pt-28 md:px-8 md:pt-32 lg:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* Text Content */}
          <motion.div className="max-w-[680px]" style={{ y: textY }}>
            <div className="mb-8 space-y-2 md:mb-10 md:space-y-4">
              <ScrollShineText
                as="h1"
                className="text-5xl font-bold uppercase leading-[1.05] tracking-wide sm:text-6xl md:text-7xl xl:text-[4.5rem]"
                style={{
                  color: UI.text.light,
                }}
              >
                ATMIYA VIDYA DHAM
              </ScrollShineText>

              <ScrollShineText
                as="h2"
                delay={0.2}
                className="text-3xl font-light uppercase leading-[1.1] tracking-widest sm:text-4xl md:text-5xl xl:text-[3rem]"
                style={{
                  color: UI.text.muted,
                }}
              >
                REDEFINING YOUTH
              </ScrollShineText>
            </div>

            <ScrollShineText
              delay={0.6}
              className="mb-10 max-w-[610px] text-base font-light leading-8 md:mb-11 md:text-lg"
              style={{ color: UI.text.muted }}
            >
              Developed in the laps of nature, AVD is the epitome of the education system that has diverse youth from across the country studying in various colleges. It is not just a hostel but a platform to instill cultural and moral values along with providing environment for academic proficiency. To make students learn from the best mentors and fostering a harmonious atmosphere is what we constantly strive for.
            </ScrollShineText>

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
              className="relative z-10 drop-shadow-[0_24px_34px_rgba(0,0,0,0.25)]"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="https://www.avdvvn.org/assets/images/demo-content/swamiji.png"
                alt="Swamiji"
                className="max-h-[85vh] w-auto object-contain brightness-105"
                style={{
                  maskImage: "linear-gradient(to bottom, black 75%, transparent 98%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 75%, transparent 98%)",
                }}
              />
            </motion.div>
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