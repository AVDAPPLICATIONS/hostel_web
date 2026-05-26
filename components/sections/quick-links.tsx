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
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: UI.section.dark,
        fontFamily: FONT_FAMILY.sans,
      }}
    >
      {/* Subtle static ambient — no animation */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse, ${OVERLAYS.tealSoft}, transparent 70%)`,
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
          className="mb-12 text-center md:mb-16"
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
                  className="group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[1.5rem] p-7 lg:p-8 transition-shadow duration-300"
                  style={{
                    background: COLORS.panelBg,
                    border: `1px solid ${COLORS.panelBorder}`,
                    boxShadow: SHADOWS.cardSubtle,
                  }}
                  whileHover={{ boxShadow: SHADOWS.cardLight, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Watermark number */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-4 select-none text-[60px] font-black leading-none"
                    style={{ color: COLORS.teal, opacity: 0.07, fontFamily: FONT_FAMILY.heading }}
                  >
                    {item.label}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        background: OVERLAYS.tealSoft,
                        border: `1px solid ${OVERLAYS.tealBorderLight}`,
                        color: COLORS.teal,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3 text-[1.35rem] font-semibold leading-tight md:text-[1.5rem]"
                    style={{ color: COLORS.navy, fontFamily: FONT_FAMILY.heading }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-8 flex-1 text-[0.875rem] leading-[1.8]"
                    style={{ color: "#6B7B8D" }}
                  >
                    {item.description}
                  </p>

                  {/* CTA */}
                  <AnimatedButton
                    onClick={() => scrollToSection(item.href)}
                    whileTap={{ scale: 0.96 }}
                    className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-[13px] font-black uppercase tracking-[0.14em]"
                    style={{ border: "none", outline: "none", boxShadow: "none" }}
                  >
                    {item.action}
                    <ArrowRight className="h-3.5 w-3.5" />
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