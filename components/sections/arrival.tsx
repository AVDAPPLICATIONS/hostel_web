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
import { COLORS, UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"

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
  const current = transportOptions[selected]

  return (
    <section
      id="arrival"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: UI.section.dark, fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="container mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-14 text-center md:mb-16"
        >
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{
              background: UI.card.darkSoft,
              color: UI.text.muted,
              border: "1px solid rgba(200,217,230,0.12)",
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={13} />
            Getting Here
          </motion.div>

          <ScrollShineText
            as="h2"
            className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
            style={{ color: UI.text.light, fontFamily: "'Cormorant Garamond', serif" }}
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

        {/* ── Main Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
          style={{
            boxShadow: "0 40px 100px rgba(0,0,0,0.40)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex min-h-[520px] flex-col lg:flex-row">

            {/* ── Map Panel ── */}
            <div
              className="relative h-[300px] w-full overflow-hidden lg:h-auto lg:w-[54%]"
              style={{ background: COLORS.deepNavy }}
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
                    pointerEvents: selected === index ? "auto" : "none",
                    zIndex: selected === index ? 10 : 0,
                  }}
                />
              ))}

              {/* Destination info bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 sm:bottom-5 sm:left-5 sm:right-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.from}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl p-3.5 sm:p-4"
                    style={{
                      background: "rgba(248,250,252,0.96)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.80)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                    }}
                  >
                    <div className="mb-2.5 flex items-center justify-between gap-3">
                      <span
                        className="text-[9px] font-black uppercase tracking-[0.2em]"
                        style={{ color: UI.text.accent }}
                      >
                        Destination
                      </span>

                      <span
                        className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                        style={{ background: UI.card.softer, color: UI.text.accent }}
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                            style={{ background: UI.button.primary }}
                          />
                          <span
                            className="relative inline-flex h-1.5 w-1.5 rounded-full"
                            style={{ background: UI.button.primary }}
                          />
                        </span>
                        Open Now
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ background: UI.button.primary, color: "#fff" }}
                      >
                        <MapPin size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold" style={{ color: COLORS.navy }}>
                          Atmiya Vidya Dham
                        </p>
                        <p className="truncate text-[11px]" style={{ color: COLORS.teal }}>
                          Bakrol Road, V.V. Nagar, Gujarat
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Route Picker Panel ── */}
            <div
              className="flex w-full flex-col p-5 sm:p-7 lg:w-[46%] lg:p-10"
              style={{ background: "#FAFBFC", borderLeft: "1px solid #E2E8F0" }}
            >
              {/* Panel header */}
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
                    style={{ background: COLORS.softSky, color: COLORS.teal }}
                  >
                    Route {current.label}
                  </span>

                  <h3
                    className="text-2xl font-semibold leading-tight sm:text-3xl"
                    style={{ color: COLORS.navy, fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Smart Navigation
                  </h3>

                  <p className="mt-1.5 text-xs leading-5" style={{ color: COLORS.teal, opacity: 0.8 }}>
                    Select your arrival point to preview the best route.
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* ── UNIQUE: Horizontal Transport Mode Strip ── */}
              <div className="relative mb-6 flex items-start justify-between">
                {/* Animated connecting line */}
                <div
                  className="absolute left-[13%] right-[13%] top-[22px] h-[2px] overflow-hidden rounded-full"
                  style={{ background: "#E2E8F0" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: COLORS.teal, transformOrigin: "left" }}
                    animate={{
                      scaleX: selected / (transportOptions.length - 1),
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {transportOptions.map((option, index) => {
                  const Icon = option.icon
                  const active = selected === index
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setSelected(index)}
                      className="relative z-10 flex flex-col items-center gap-1.5"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <motion.div
                        className="flex items-center justify-center rounded-xl"
                        animate={{
                          background: active ? UI.button.primary : "#F1F5F9",
                          color: active ? "#fff" : COLORS.teal,
                          scale: active ? 1.1 : 1,
                          boxShadow: active
                            ? "0 8px 22px rgba(86,124,141,0.35)"
                            : "0 2px 6px rgba(0,0,0,0.06)",
                        }}
                        style={{ width: 44, height: 44, border: `1.5px solid ${active ? UI.button.primary : "#E2E8F0"}` }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <motion.span
                        className="text-[8px] font-black uppercase tracking-[0.16em]"
                        animate={{ color: active ? COLORS.teal : "rgba(86,124,141,0.38)" }}
                        transition={{ duration: 0.3 }}
                      >
                        {option.mode}
                      </motion.span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Route option cards */}
              <div className="flex-1 space-y-3">
                {transportOptions.map((option, index) => {
                  const Icon = option.icon
                  const active = selected === index

                  return (
                    <motion.button
                      key={option.from}
                      onClick={() => setSelected(index)}
                      whileHover={{ x: 3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      viewport={{ once: true }}
                      className="relative w-full overflow-hidden rounded-2xl text-left"
                      style={{
                        background: active ? "#fff" : "#F1F5F9",
                        border: `1.5px solid ${active ? UI.button.primary : "#E2E8F0"}`,
                        boxShadow: active
                          ? "0 8px 28px rgba(86,124,141,0.18)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      {/* Active left accent bar */}
                      <AnimatePresence>
                        {active && (
                          <motion.div
                            layoutId="arrivalActiveBar"
                            className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl"
                            style={{ background: UI.button.primary }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                      </AnimatePresence>

                      <div className="flex items-center gap-3.5 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
                        {/* Icon */}
                        <div
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300"
                          style={{
                            background: active ? UI.button.primary : COLORS.softSky,
                            color: active ? "#fff" : COLORS.teal,
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-start justify-between gap-2">
                            <span
                              className="text-[13px] font-bold leading-tight"
                              style={{ color: COLORS.navy }}
                            >
                              {option.from}
                            </span>
                            <span
                              className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider"
                              style={{
                                background: active ? COLORS.softSky : "#E2E8F0",
                                color: COLORS.teal,
                              }}
                            >
                              {option.mode}
                            </span>
                          </div>

                          <p className="text-[11px] leading-4" style={{ color: COLORS.teal, opacity: 0.75 }}>
                            {option.distance} · {option.route}
                          </p>
                        </div>
                      </div>

                      {/* Active bottom fill bar */}
                      {active && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-[2px]"
                          style={{ background: UI.button.primary, opacity: 0.3 }}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Directions CTA */}
              <div
                className="mt-6 border-t pt-5"
                style={{ borderColor: "#E2E8F0" }}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/dir/?api=1&destination=Atmiya+Vidya+Dham+Bakrol",
                      "_blank"
                    )
                  }
                  className="group flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-black transition-all sm:py-4"
                  style={{
                    background: UI.button.primary,
                    color: "#fff",
                    boxShadow: "0 12px 32px rgba(86,124,141,0.38)",
                  }}
                >
                  <Navigation className="h-4 w-4" />
                  Get Live Directions
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Counter ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <div className="h-px max-w-[80px] flex-1" style={{ background: UI.border.soft }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: UI.text.muted }}>
            {String(selected + 1).padStart(2, "0")} /{" "}
            {String(transportOptions.length).padStart(2, "0")} routes
          </span>
          <div className="h-px max-w-[80px] flex-1" style={{ background: UI.border.soft }} />
        </motion.div>

      </div>
    </section>
  )
}
