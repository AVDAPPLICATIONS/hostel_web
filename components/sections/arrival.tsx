"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Navigation,
  Car,
  Train,
  Bus,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import ScrollRevealCard from "@/components/shared/scroll-reveal-card"

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
    mode: "Public Transport",
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
  const current = transportOptions[selected]

  return (
    <>


      <section
        id="arrival"
        className="relative overflow-hidden py-24 md:py-36"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="relative container mx-auto max-w-6xl px-4">
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
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{
                background: UI.card.light,
                color: UI.text.accent,
                border: `1px solid ${UI.border.white}`,
                boxShadow: UI.shadow.light,
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={14} />
              Getting Here
            </motion.div>

            <ScrollShineText
              as="h2"
              className="text-5xl font-semibold leading-[1.05] md:text-7xl justify-center text-center"
              style={{
                color: UI.text.light,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Plan Your Arrival
            </ScrollShineText>

            <p
              className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg"
              style={{ color: UI.text.muted }}
            >
              Multiple routes, one destination — find the best way to reach
              Atmiya Vidya Dham.
            </p>
          </motion.div>

          {/* Main Card */}
          <ScrollRevealCard
            className="overflow-hidden rounded-[1.8rem] sm:rounded-[2rem] p-0.5 sm:p-1"
            delay={0.1}
            style={{
              background: UI.card.soft,
              boxShadow: UI.shadow.card,
            }}
          >
            <div
              className="overflow-hidden rounded-[1.6rem] sm:rounded-[1.8rem]"
              style={{
                background: UI.card.light,
                border: `1px solid ${UI.border.white}`,
              }}
            >
              <div className="flex min-h-[500px] sm:min-h-[540px] flex-col lg:flex-row">
                {/* Left Map */}
                <div
                  className="relative h-[280px] sm:h-[340px] w-full overflow-hidden lg:h-auto lg:w-[52%]"
                  style={{
                    background: UI.card.soft,
                    borderRight: `1px solid ${UI.border.light}`,
                  }}
                >
                  {transportOptions.map((option, index) => (
                    <iframe
                      key={option.from}
                      title={`Interactive Route Map - ${option.from}`}
                      src={`https://maps.google.com/maps?saddr=${option.originQuery}&daddr=Atmiya+Vidya+Dham,+Bakrol+Road,+VV+Nagar,+Gujarat&output=embed`}
                      className="absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ease-in-out"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{
                        opacity: selected === index ? 1 : 0,
                        pointerEvents: selected === index ? "auto" : "none",
                        zIndex: selected === index ? 10 : 0,
                      }}
                    />
                  ))}

                  {/* Map Info Bar */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-20">
                    <motion.div
                      key={current.from}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="rounded-2xl p-3 sm:p-4"
                      style={{
                        background: UI.card.light,
                        border: `1px solid ${UI.border.white}`,
                        boxShadow: UI.shadow.soft,
                      }}
                    >
                      <div className="mb-2 sm:mb-3 flex items-center justify-between gap-4">
                        <span
                          className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em]"
                          style={{ color: UI.text.accent }}
                        >
                          Destination Status
                        </span>

                        <span
                          className="flex items-center gap-1.5 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            background: UI.card.soft,
                            color: UI.text.dark,
                          }}
                        >
                          <span className="relative flex h-1.5 w-1.5">
                            <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                              style={{ background: UI.text.accent }}
                            />
                            <span
                              className="relative inline-flex h-1.5 w-1.5 rounded-full"
                              style={{ background: UI.text.accent }}
                            />
                          </span>
                          Open Now
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div
                          className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl"
                          style={{
                            background: UI.button.primary,
                            color: UI.button.primaryText,
                          }}
                        >
                          <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="truncate text-xs sm:text-sm font-bold"
                            style={{ color: UI.text.dark }}
                          >
                            Atmiya Vidya Dham
                          </p>
                          <p
                            className="truncate text-[10px] sm:text-xs"
                            style={{ color: UI.text.accent }}
                          >
                            Bakrol Road, V.V. Nagar, Gujarat
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Route Picker */}
                <div className="flex w-full flex-col p-4 sm:p-6 md:p-8 lg:w-[48%] lg:p-10">
                  <motion.div
                    key={current.from}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mb-5 sm:mb-7"
                  >
                    <span
                      className="mb-2 sm:mb-3 inline-flex rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em]"
                      style={{
                        background: UI.card.soft,
                        color: UI.text.accent,
                      }}
                    >
                      Route {current.label}
                    </span>

                    <h3
                      className="text-2xl sm:text-3xl font-semibold leading-tight md:text-4xl"
                      style={{
                        color: UI.text.dark,
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      Smart Navigation
                    </h3>

                    <p
                      className="mt-1 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6"
                      style={{ color: UI.text.accent }}
                    >
                      Select your arrival point to preview the best route.
                    </p>
                  </motion.div>

                  <div className="flex-1 space-y-3 sm:space-y-4">
                    {transportOptions.map((option, index) => {
                      const Icon = option.icon
                      const active = selected === index

                      return (
                        <motion.button
                          key={option.from}
                          onClick={() => setSelected(index)}
                          whileHover={{
                            x: 4,
                            scale: 1.01,
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full overflow-hidden rounded-2xl text-left transition-all duration-300"
                          style={{
                            background: active ? UI.card.white : UI.card.soft,
                            border: `1.5px solid ${
                              active ? UI.button.primary : UI.border.white
                            }`,
                            boxShadow: active ? UI.shadow.soft : UI.shadow.light,
                          }}
                        >
                          <AnimatePresence>
                            {active && (
                              <motion.div
                                layoutId="arrivalActiveBar"
                                className="absolute bottom-0 left-0 top-0 w-1"
                                style={{ background: UI.button.primary }}
                                transition={{
                                  duration: 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              />
                            )}
                          </AnimatePresence>

                          <div className="flex items-start sm:items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4">
                            <div
                              className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 mt-0.5 sm:mt-0"
                              style={{
                                background: active
                                  ? UI.button.primary
                                  : UI.card.light,
                                color: active
                                  ? UI.button.primaryText
                                  : UI.text.dark,
                                border: `1px solid ${
                                  active
                                    ? UI.button.primary
                                    : UI.border.white
                                }`,
                              }}
                            >
                              <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                                <span
                                  className="text-xs sm:text-sm font-bold leading-tight transition-colors duration-300 whitespace-normal break-words"
                                  style={{ color: UI.text.dark }}
                                >
                                  {option.from}
                                </span>

                                <span
                                  className="self-start sm:self-auto flex-shrink-0 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider"
                                  style={{
                                    background: active
                                      ? UI.card.soft
                                      : UI.card.white,
                                    color: UI.text.accent,
                                  }}
                                >
                                  {option.mode}
                                </span>
                              </div>

                              <p
                                className="text-[11px] sm:text-xs leading-4 sm:leading-5 transition-colors duration-300"
                                style={{ color: UI.text.accent }}
                              >
                                {option.distance} · {option.route}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Directions Button */}
                  <div
                    className="mt-6 pt-5 sm:mt-8 sm:pt-6"
                    style={{ borderTop: `1px solid ${UI.border.light}` }}
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        backgroundColor: UI.button.primaryHover,
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        window.open(
                          "https://www.google.com/maps/dir/?api=1&destination=Atmiya+Vidya+Dham+Bakrol",
                          "_blank"
                        )
                      }
                      className="group flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-3.5 sm:py-4 text-sm font-black transition-all"
                      style={{
                        background: UI.button.primary,
                        color: UI.button.primaryText,
                        boxShadow: UI.shadow.soft,
                      }}
                    >
                      <Navigation className="h-4 w-4" />
                      <span>Get Live Directions</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealCard>

          {/* Bottom Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div
              className="h-px max-w-[80px] flex-1"
              style={{ background: UI.border.soft }}
            />

            <span
              className="text-xs font-bold tracking-widest"
              style={{ color: UI.text.muted }}
            >
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(transportOptions.length).padStart(2, "0")} routes
            </span>

            <div
              className="h-px max-w-[80px] flex-1"
              style={{ background: UI.border.soft }}
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}