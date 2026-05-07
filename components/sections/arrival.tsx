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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          `,
        }}
      />

      <section
        id="arrival"
        className="relative overflow-hidden px-4 py-24 md:py-36"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="relative container mx-auto max-w-6xl">
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
            className="overflow-hidden rounded-[2rem] p-1"
            delay={0.1}
            style={{
              background: UI.card.soft,
              boxShadow: UI.shadow.card,
            }}
          >
            <div
              className="overflow-hidden rounded-[1.8rem]"
              style={{
                background: UI.card.light,
                border: `1px solid ${UI.border.white}`,
              }}
            >
              <div className="flex min-h-[540px] flex-col lg:flex-row">
                {/* Left Map */}
                <div
                  className="relative h-[340px] w-full overflow-hidden lg:h-auto lg:w-[52%]"
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
                  <div className="absolute bottom-5 left-5 right-5 z-20">
                    <motion.div
                      key={current.from}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="rounded-2xl p-4"
                      style={{
                        background: UI.card.light,
                        border: `1px solid ${UI.border.white}`,
                        boxShadow: UI.shadow.soft,
                      }}
                    >
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <span
                          className="text-[10px] font-black uppercase tracking-[0.18em]"
                          style={{ color: UI.text.accent }}
                        >
                          Destination Status
                        </span>

                        <span
                          className="flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            background: UI.card.soft,
                            color: UI.text.dark,
                          }}
                        >
                          <span className="relative flex h-2 w-2">
                            <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                              style={{ background: UI.text.accent }}
                            />
                            <span
                              className="relative inline-flex h-2 w-2 rounded-full"
                              style={{ background: UI.text.accent }}
                            />
                          </span>
                          Open Now
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{
                            background: UI.button.primary,
                            color: UI.button.primaryText,
                          }}
                        >
                          <MapPin size={18} />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="truncate text-sm font-bold"
                            style={{ color: UI.text.dark }}
                          >
                            Atmiya Vidya Dham
                          </p>
                          <p
                            className="truncate text-xs"
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
                <div className="flex w-full flex-col p-6 md:p-8 lg:w-[48%] lg:p-10">
                  <motion.div
                    key={current.from}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mb-7"
                  >
                    <span
                      className="mb-3 inline-flex rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em]"
                      style={{
                        background: UI.card.soft,
                        color: UI.text.accent,
                      }}
                    >
                      Route {current.label}
                    </span>

                    <h3
                      className="text-3xl font-semibold leading-tight md:text-4xl"
                      style={{
                        color: UI.text.dark,
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      Smart Navigation
                    </h3>

                    <p
                      className="mt-2 text-sm leading-6"
                      style={{ color: UI.text.accent }}
                    >
                      Select your arrival point to preview the best route.
                    </p>
                  </motion.div>

                  <div className="flex-1 space-y-4">
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

                          <div className="flex items-center gap-4 px-5 py-4">
                            <div
                              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-300"
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
                              <Icon className="h-5 w-5" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-1 flex items-center justify-between gap-3">
                                <span
                                  className="truncate text-sm font-bold transition-colors duration-300"
                                  style={{ color: UI.text.dark }}
                                >
                                  {option.from}
                                </span>

                                <span
                                  className="flex-shrink-0 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wider"
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
                                className="text-xs leading-5 transition-colors duration-300"
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
                    className="mt-8 pt-6"
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
                      className="group flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-4 text-sm font-black transition-all"
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