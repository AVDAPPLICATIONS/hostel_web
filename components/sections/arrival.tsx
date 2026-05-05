"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, Car, Train, Bus, ExternalLink, ArrowRight } from "lucide-react"

const ACCENT = "#C8A96E"

const transportOptions = [
  {
    icon: Train,
    label: "01",
    from: "Anand Railway Station",
    distance: "7 km",
    route: "Via GJ SH 60 & 100 Feet Rd",
    mode: "Auto / Bus",
    accent: "#C8A96E",
    originQuery: "Anand+Railway+Station,+Gujarat",
  },
  {
    icon: Bus,
    label: "02",
    from: "New Anand Bus Station",
    distance: "6 km",
    route: "Via Zydus Hospital & GJ SH 60 Rd",
    mode: "Public Transport",
    accent: "#C8A96E",
    originQuery: "New+Anand+Bus+Station,+Gujarat",
  },
  {
    icon: Car,
    label: "03",
    from: "Personal Transport (NH-8)",
    distance: "Highway",
    route: "Via Samarkha Chokdi & Bhalej Rd",
    mode: "Self Drive",
    accent: "#C8A96E",
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      `,
        }}
      />

      <section
        id="arrival"
        className="relative py-24 md:py-36 overflow-hidden"
        style={{
          background: "linear-gradient(170deg, #060d16 0%, #0d1b2a 50%, #091520 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000"
            style={{ background: current.accent }}
          />
          <div
            className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl"
            style={{ background: "#D4956A" }}
          />
        </div>

        {/* Top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-[0.08]"
          style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }}
        />

        <div className="relative container mx-auto px-4 max-w-6xl">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A96E]" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                Getting Here
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A96E]" />
            </motion.div>

            <h2
              className="text-5xl md:text-7xl font-semibold text-white mb-5 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Plan Your{" "}
              <em className="not-italic" style={{ color: ACCENT }}>
                Arrival
              </em>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Multiple routes, one destination — find the best way to reach Atmiya Vidya Dham.
            </p>
          </motion.div>

          {/* ── Main Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-[28px] md:rounded-[36px] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: `0 40px 100px -30px ${current.accent}15`,
              transition: "box-shadow 0.8s ease",
            }}
          >
            <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[560px]">
              {/* Left — Map / Location Visual */}
              <div className="relative w-full lg:w-[50%] h-[300px] md:h-[380px] lg:h-auto overflow-hidden bg-[#0a1220]">
                {/* Dot grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Interactive Google Maps - Preloaded for instant switching */}
                {transportOptions.map((option, index) => (
                  <iframe
                    key={option.from}
                    title={`Interactive Route Map - ${option.from}`}
                    src={`https://maps.google.com/maps?saddr=${option.originQuery}&daddr=Atmiya+Vidya+Dham,+Bakrol+Road,+VV+Nagar,+Gujarat&output=embed`}
                    className="absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ease-in-out"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ 
                      opacity: selected === index ? 1 : 0,
                      pointerEvents: selected === index ? "auto" : "none",
                      filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)",
                      zIndex: selected === index ? 10 : 0
                    }}
                  />
                ))}

                {/* Subtle dark overlay to blend the map with the theme */}
                <div className="absolute inset-0 bg-[#0a1220]/20 pointer-events-none mix-blend-overlay" />

                {/* Bottom status bar */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div
                    className="p-4 rounded-xl backdrop-blur-md"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[9px] font-bold text-white/25 uppercase tracking-[0.15em]">
                        Destination Status
                      </span>
                      <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                        </span>
                        <span className="text-green-400/80">Open Now</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-1 flex-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "70%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full"
                          style={{ background: current.accent }}
                        />
                      </div>
                      <div className="h-1 flex-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "45%" }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-white/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Route Picker */}
              <div
                className="w-full lg:w-[50%] p-7 md:p-10 flex flex-col"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="mb-7">
                  <h3
                    className="text-xl md:text-2xl font-semibold text-white mb-1.5"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Smart Navigation
                  </h3>
                  <p className="text-white/30 text-xs font-light">
                    Select your arrival point to see the best route
                  </p>
                </div>

                <div className="space-y-3 flex-1">
                  {transportOptions.map((option, index) => {
                    const active = selected === index
                    return (
                      <motion.button
                        key={option.from}
                        onClick={() => setSelected(index)}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left relative rounded-2xl overflow-hidden transition-all duration-300"
                        style={{
                          background: active
                            ? "rgba(255,255,255,0.07)"
                            : "rgba(255,255,255,0.02)",
                          border: `1px solid ${
                            active
                              ? `${option.accent}40`
                              : "rgba(255,255,255,0.05)"
                          }`,
                          boxShadow: active
                            ? `0 8px 30px -10px ${option.accent}20`
                            : "none",
                        }}
                      >
                        {/* Active accent bar */}
                        <AnimatePresence>
                          {active && (
                            <motion.div
                              layoutId="arrivalTabBar"
                              className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                              style={{ background: option.accent }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            />
                          )}
                        </AnimatePresence>

                        <div className="flex items-center gap-4 px-5 py-4 pl-6">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                            style={{
                              background: active
                                ? `${option.accent}20`
                                : "rgba(255,255,255,0.04)",
                              border: `1px solid ${
                                active
                                  ? `${option.accent}35`
                                  : "rgba(255,255,255,0.06)"
                              }`,
                            }}
                          >
                            <option.icon
                              className="h-5 w-5 transition-colors duration-300"
                              style={{
                                color: active
                                  ? option.accent
                                  : "rgba(255,255,255,0.3)",
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <span
                                className="font-medium text-sm transition-colors duration-300 truncate"
                                style={{
                                  color: active ? "white" : "rgba(255,255,255,0.5)",
                                }}
                              >
                                {option.from}
                              </span>
                              <span
                                className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex-shrink-0 ml-2 transition-all duration-300"
                                style={{
                                  background: active
                                    ? `${option.accent}20`
                                    : "rgba(255,255,255,0.04)",
                                  color: active
                                    ? option.accent
                                    : "rgba(255,255,255,0.25)",
                                  border: `1px solid ${
                                    active
                                      ? `${option.accent}30`
                                      : "rgba(255,255,255,0.06)"
                                  }`,
                                }}
                              >
                                {option.mode}
                              </span>
                            </div>
                            <p
                              className="text-xs transition-colors duration-300"
                              style={{
                                color: active
                                  ? "rgba(255,255,255,0.4)"
                                  : "rgba(255,255,255,0.2)",
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

                {/* Directions button */}
                <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/dir/?api=1&destination=Atmiya+Vidya+Dham+Bakrol",
                        "_blank"
                      )
                    }
                    className="w-full relative group flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-sm overflow-hidden transition-all"
                    style={{
                      background: ACCENT,
                      color: "#0a1220",
                      boxShadow: `0 16px 40px -10px ${ACCENT}50`,
                    }}
                  >
                    <Navigation className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Get Live Directions</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="h-px flex-1 max-w-[80px] bg-white/[0.06]" />
            <span className="text-white/20 text-xs font-mono tracking-widest">
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(transportOptions.length).padStart(2, "0")} routes
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-white/[0.06]" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
