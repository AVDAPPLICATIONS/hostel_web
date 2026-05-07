"use client"

import { motion } from "framer-motion"
import { MapPin, Crown, Landmark, ArrowRight } from "lucide-react"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import ScrollRevealCard from "@/components/shared/scroll-reveal-card"

const COLORS = {
  navy: "#2F4156",
  teal: "#567C8D",
  sky: "#C8D9E6",
  beige: "#F5EFEB",
  white: "#FFFFFF",
}

const highlights = [
  {
    id: 1,
    icon: MapPin,
    title: "Map & Directions",
    description:
      "Situated in the outskirts of Vallabh Vidhyanagar near the Bakrol gate, the AVD campus is known for its visible and inherent beauty. Educational institutes are only a few kilometers away, with easy transportation access.",
    action: "Learn More",
    href: "#arrival",
  },
  {
    id: 2,
    icon: Crown,
    title: "Services & Accommodations",
    description:
      "We provide suitable facilities for students including 24/7 basic medical help, regular room cleaning, a green campus, healthy environment, quality food, sports access, TV room, study room, and more.",
    action: "Learn More",
    href: "#rooms",
  },
  {
    id: 3,
    icon: Landmark,
    title: "Great Highlights",
    description:
      "We create a friendly environment through sports tournaments, annual sports day, stage events, drama, and cultural activities where students can participate and cherish every moment.",
    action: "Learn More",
    href: "#gallery",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
}

export default function QuickLinks() {
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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          `,
        }}
      />

      <section
        className="relative z-20 overflow-hidden px-4 py-20 md:py-28"
        style={{
          background: COLORS.navy,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="container mx-auto max-w-7xl">
          {/* Section Heading */}
          <motion.div
            className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="mb-5 inline-flex items-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.24em]"
              style={{
                background: COLORS.beige,
                color: COLORS.teal,
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Quick Access
            </motion.div>

            <ScrollShineText
              as="h2"
              className="text-4xl font-bold leading-tight md:text-6xl justify-center text-center"
              style={{
                color: COLORS.white,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Explore Our Campus Life
            </ScrollShineText>

            <p
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base"
              style={{ color: COLORS.sky }}
            >
              Find important information about location, accommodation,
              facilities, and student activities in one place.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon

                return (
                  <ScrollRevealCard
                    key={item.id}
                    delay={index * 0.1}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <motion.div
                      whileHover={{
                        y: -10,
                        scale: 1.015,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[2rem] p-7 md:p-8 lg:p-9"
                      style={{
                        background: COLORS.beige,
                        border: `1px solid ${COLORS.sky}`,
                        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.18)",
                      }}
                    >
                  {/* Card Number */}
                  <div
                    className="absolute right-7 top-6 text-6xl font-black leading-none opacity-20"
                    style={{
                      color: COLORS.teal,
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background: COLORS.sky,
                      border: `1px solid ${COLORS.white}`,
                    }}
                    whileHover={{
                      rotate: 5,
                      scale: 1.08,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                  >
                    <Icon
                      className="h-8 w-8"
                      style={{ color: COLORS.navy }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3
                    className="mb-5 text-2xl font-bold leading-tight md:text-3xl"
                    style={{
                      color: COLORS.navy,
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mb-8 flex-grow text-sm font-normal leading-7"
                    style={{ color: COLORS.teal }}
                  >
                    {item.description}
                  </p>

                  {/* Button */}
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: COLORS.navy,
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="group/button flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] transition-all duration-300"
                    style={{
                      background: COLORS.teal,
                      color: COLORS.white,
                      boxShadow: "0 14px 28px rgba(47, 65, 86, 0.2)",
                    }}
                  >
                    {item.action}

                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1"
                    />
                  </motion.button>

                  {/* Bottom Accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1"
                    style={{ background: COLORS.teal }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + index * 0.12,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  />
                  </motion.div>
                </ScrollRevealCard>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}