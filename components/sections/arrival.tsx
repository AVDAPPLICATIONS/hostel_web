"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Car,
  Train,
  Bus,
  ArrowRight,
  Navigation,
} from "lucide-react"

import {
  COLORS,
  UI,
  SHADOWS,
  OVERLAYS,
  FONT_FAMILY,
} from "@/lib/theme"

import ScrollShineText from "@/components/shared/scroll-shine-text"
import { AnimatedButton } from "@/components/ui/animated-button"

const transportOptions = [
  {
    icon: Train,
    label: "01",
    from: "Anand Railway Station",
    distance: "7 km",
    route: "Via GJ SH 60 & 100 Feet Rd",
    mode: "Auto / Bus",
    originQuery: "Anand+Railway+Station,+Gujarat",
  },
  {
    icon: Bus,
    label: "02",
    from: "New Anand Bus Station",
    distance: "6 km",
    route: "Via Zydus Hospital & GJ SH 60 Rd",
    mode: "Public Bus",
    originQuery: "New+Anand+Bus+Station,+Gujarat",
  },
  {
    icon: Car,
    label: "03",
    from: "Personal Transport (NH-8)",
    distance: "Highway",
    route: "Via Samarkha Chokdi & Bhalej Rd",
    mode: "Self Drive",
    originQuery: "Samarkha+Chokdi,+Anand,+Gujarat",
  },
]

export default function Arrival() {
  const [selected, setSelected] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const check = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    check()

    window.addEventListener("resize", check)

    return () => window.removeEventListener("resize", check)
  }, [])

  const current = transportOptions[selected]

  return (
    <section
      id="arrival"
      className="relative overflow-hidden py-24 md:py-36"
      style={{
        background: UI.section.dark,
        fontFamily: FONT_FAMILY.sans,
      }}
    >
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mb-14 text-center md:mb-16"
        >
          <ScrollShineText
            as="h2"
            className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
            style={{
              color: UI.text.light,
              fontFamily: FONT_FAMILY.heading,
            }}
          >
            Plan Your Arrival
          </ScrollShineText>

          <p
            className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg"
            style={{
              color: UI.text.muted,
            }}
          >
            Multiple routes, one destination — find the best way to
            reach Atmiya Vidya Dham.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
          style={{
            border: `1px solid ${OVERLAYS.borderWhiteFaint}`,
            boxShadow: SHADOWS.showcaseDeep,
          }}
        >
          <div className="flex min-h-[520px] flex-col lg:flex-row">
            {/* Map */}
            <div
              className="relative h-[450px] w-full overflow-hidden lg:h-auto lg:w-[54%]"
              style={{
                background: COLORS.deepNavy,
              }}
            >
              {transportOptions.map((option, index) => (
                <iframe
                  key={option.from}
                  title={`Route Map — ${option.from}`}
                  src={`https://maps.google.com/maps?saddr=${option.originQuery}&daddr=Atmiya+Vidya+Dham,+Bakrol+Road,+VV+Nagar,+Gujarat&output=embed`}
                  className="absolute inset-0 h-full w-full border-0 transition-opacity duration-500"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{
                    opacity: selected === index ? 1 : 0,
                    pointerEvents:
                      selected === index ? "auto" : "none",
                    zIndex: selected === index ? 10 : 0,
                  }}
                />
              ))}
            </div>

            {/* Right Panel */}
            <div
              className="flex w-full flex-col p-5 sm:p-7 lg:w-[46%] lg:p-10"
              style={{
                background: COLORS.panelBg,
                borderLeft: `1px solid ${COLORS.panelBorder}`,
              }}
            >
              {/* Heading */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.from}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mb-5"
                >
                  <span
                    className="mb-2 inline-flex rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em]"
                    style={{
                      background: COLORS.softSky,
                      color: COLORS.teal,
                    }}
                  >
                    Route {current.label}
                  </span>

                  <h3
                    className="text-2xl font-semibold leading-tight sm:text-3xl"
                    style={{
                      color: COLORS.navy,
                      fontFamily: FONT_FAMILY.heading,
                    }}
                  >
                    Smart Navigation
                  </h3>

                  <p
                    className="mt-1.5 text-xs leading-5"
                    style={{
                      color: COLORS.teal,
                      opacity: 0.8,
                    }}
                  >
                    Select your arrival point to preview the best route.
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Top Icons */}
              <div className="relative mb-6 flex items-start justify-between">
                <div
                  className="absolute left-[13%] right-[13%] top-[22px] h-[2px] rounded-full"
                  style={{
                    background: COLORS.panelBorder,
                  }}
                />

                {transportOptions.map((option, index) => {
                  const Icon = option.icon
                  const active = selected === index

                  return (
                    <motion.button
                      key={index}
                      onClick={() => setSelected(index)}
                      className="relative z-10 flex flex-col items-center gap-1.5"
                      whileTap={{ scale: 0.92 }}
                    >
                      <motion.div
                        className="flex items-center justify-center rounded-xl"
                        animate={{
                          background: active
                            ? UI.button.primary
                            : COLORS.panelBorderAlt,
                          color: active
                            ? COLORS.white
                            : COLORS.teal,
                          scale: active ? 1.1 : 1,
                        }}
                        style={{
                          width: 44,
                          height: 44,
                          border: `1px solid ${active
                              ? UI.button.primary
                              : COLORS.panelBorder
                            }`,
                          boxShadow: "none",
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>

                      <span
                        className="text-[8px] font-black uppercase tracking-[0.16em]"
                        style={{
                          color: active
                            ? COLORS.teal
                            : OVERLAYS.tealFaint,
                        }}
                      >
                        {option.mode}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-3">
                {transportOptions.map((option, index) => {
                  const Icon = option.icon
                  const active = selected === index

                  return (
                    <motion.button
                      key={option.from}
                      onClick={() => setSelected(index)}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full overflow-hidden rounded-2xl text-left"
                      style={{
                        background: active
                          ? COLORS.white
                          : COLORS.panelBorderAlt,
                        border: `1px solid ${active
                            ? UI.button.primary
                            : COLORS.panelBorder
                          }`,
                        boxShadow: "none",
                      }}
                    >
                      <div className="flex items-center gap-3.5 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
                        {/* Icon */}
                        <div
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                          style={{
                            background: active
                              ? UI.button.primary
                              : COLORS.softSky,
                            color: active
                              ? COLORS.white
                              : COLORS.teal,
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-start justify-between gap-2">
                            <span
                              className="text-[13px] font-bold leading-tight"
                              style={{
                                color: COLORS.navy,
                              }}
                            >
                              {option.from}
                            </span>

                            <span
                              className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider"
                              style={{
                                background: active
                                  ? COLORS.softSky
                                  : COLORS.panelBorder,
                                color: COLORS.teal,
                              }}
                            >
                              {option.mode}
                            </span>
                          </div>

                          <p
                            className="text-[11px] leading-4"
                            style={{
                              color: COLORS.teal,
                              opacity: 0.75,
                            }}
                          >
                            {option.distance} · {option.route}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* CTA */}
              <div
                className="mt-6 border-t pt-5"
                style={{
                  borderColor: COLORS.panelBorder,
                }}
              >
                <AnimatedButton
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/dir/?api=1&destination=Atmiya+Vidya+Dham+Bakrol",
                      "_blank"
                    )
                  }
                  className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-black sm:py-4"
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                >
                  <Navigation className="h-4 w-4" />

                  Get Live Directions

                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <div
            className="h-px max-w-[80px] flex-1"
            style={{
              background: UI.border.soft,
            }}
          />

          <span
            className="font-mono text-xs tracking-widest"
            style={{
              color: UI.text.muted,
            }}
          >
            {String(selected + 1).padStart(2, "0")} /{" "}
            {String(transportOptions.length).padStart(2, "0")} routes
          </span>

          <div
            className="h-px max-w-[80px] flex-1"
            style={{
              background: UI.border.soft,
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}