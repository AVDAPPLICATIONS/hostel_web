"use client"

import { motion } from "framer-motion"
import { MapPin, Crown, Landmark, ArrowRight } from "lucide-react"
import { COLORS, UI, SHADOWS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import { AnimatedButton } from "@/components/ui/animated-button"

const highlights = [
  {
    id: 1,
    icon: MapPin,
    label: "01",
    title: "Map & Directions",
    description:
      "Situated in the outskirts of Vallabh Vidhyanagar near the Bakrol gate, the AVD campus is known for its visible and inherent beauty. Approx every education institute is a few km's away from this beautiful campus. Easy to reach by any means of transportation.",
    action: "Get Directions",
    href: "#arrival",
  },
  {
    id: 2,
    icon: Crown,
    label: "02",
    title: "Services & Accommodation",
    description:
      "We always try to provide the best and suitable facilities for our students — 24×7 basic medical help, regular room cleaning, green campus, healthy environment, quality food, access to sports resources, TV room, study room, and much more.",
    action: "Explore Rooms",
    href: "#rooms",
  },
  {
    id: 3,
    icon: Landmark,
    label: "03",
    title: "Great Highlights",
    description:
      "We always try to create a friendly environment for students. Various sports tournaments are organized every year including Sports Day. Stage events, drama, and cultural activities are a few of the highlights that make AVD life memorable.",
    action: "View Gallery",
    href: "#gallery",
  },
]

const slideFrom = [{ x: -80 }, { x: 0, y: 40 }, { x: 80 }]

export default function QuickLinks() {
  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return

    try {
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
      })
    } catch (e) {
      console.warn("Scroll error:", e)
    }
  }

  return (
    <section
      className="relative overflow-hidden py-24 md:py-36"
      style={{
        background: UI.section.dark,
        fontFamily: FONT_FAMILY.sans,
      }}
    >
      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05]"
        style={{
          background: `radial-gradient(ellipse, ${COLORS.teal}, transparent 70%)`,
        }}
      />

      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mb-16 text-center md:mb-20"
        >
          <ScrollShineText
            as="h2"
            className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
            style={{
              color: UI.text.light,
              fontFamily: FONT_FAMILY.heading,
            }}
          >
            Explore Campus Life
          </ScrollShineText>

          <p
            className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg"
            style={{ color: UI.text.muted }}
          >
            Location, accommodation, facilities, and student activities —
            all in one place.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-7">
          {highlights.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: slideFrom[index].x,
                  y: slideFrom[index].y ?? 0,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                className="h-full"
              >
                <motion.div
                  className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[2rem] p-7 lg:p-8"
                  style={{
                    background: COLORS.panelBg,
                    border: `1px solid ${COLORS.panelBorder}`,
                    boxShadow: SHADOWS.cardLight,
                  }}
                >
                  {/* Number */}
                  <div
                    className="pointer-events-none absolute right-6 top-5 select-none text-[68px] font-black leading-none"
                    style={{
                      color: COLORS.teal,
                      opacity: 0.08,
                      fontFamily: FONT_FAMILY.heading,
                    }}
                  >
                    {item.label}
                  </div>

                  {/* Icon */}
                  <div className="relative mb-7">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        background: OVERLAYS.tealSoft,
                        border: `1px solid ${OVERLAYS.tealBorderLight}`,
                        color: COLORS.teal,
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-4 text-2xl font-semibold leading-tight md:text-[1.65rem]"
                    style={{
                      color: COLORS.navy,
                      fontFamily: FONT_FAMILY.heading,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-8 flex-1 text-sm leading-[1.85]"
                    style={{
                      color: COLORS.teal,
                      opacity: 0.85,
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Button */}
                  <AnimatedButton
                    onClick={() => scrollToSection(item.href)}
                    whileTap={{ scale: 0.96 }}
                    className="relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full py-3.5 text-sm font-black uppercase tracking-[0.14em] transition-all duration-300"
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                    }}
                  >
                    <span className="relative z-10">
                      {item.action}
                    </span>

                    <ArrowRight className="relative z-10 h-4 w-4" />
                  </AnimatedButton>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}