"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, Wifi, Wind, Bath, BookOpen } from "lucide-react"
import Image from "next/image"

const rooms = [
  {
    id: 1,
    category: "PREMIUM",
    label: "01",
    title: "A/C Room",
    tagline: "Maximum comfort, zero compromise.",
    description:
      "Spacious air-conditioned rooms designed for deep focus and restful nights — because great academics start with great sleep.",
    image: "https://www.avdvvn.org/assets/images/final_room%202.jpg",
    features: ["2 Sharing", "Attached Bathroom", "Smart AC", "Personal Wardrobe", "Study Table", "Laundry Bag"],
    accent: "#C8A96E",
    tourAvailable: true,
  },
  {
    id: 2,
    category: "STANDARD",
    label: "02",
    title: "Non-AC Room",
    tagline: "Naturally ventilated, thoughtfully designed.",
    description:
      "Well-ventilated rooms with premium furniture and all essential amenities — comfort that breathes with you.",
    image: "https://www.avdvvn.org/assets/images/final%20room%204.jpg",
    features: ["2 Sharing", "Attached Bathroom", "Ventilated", "Personal Wardrobe", "Study Table", "Laundry Bag"],
    accent: "#8EB4D4",
    tourAvailable: true,
  },
  {
    id: 3,
    category: "ECONOMY",
    label: "03",
    title: "Dormitory",
    tagline: "Community living at its finest.",
    description:
      "Budget-friendly shared spaces that foster lifelong friendships and a culture of collaborative growth.",
    image: "https://www.avdvvn.org/assets/images/d1.jpg",
    features: ["6 Sharing", "Attached Bathroom", "Spacious", "Personal Wardrobe", "Study Table", "Laundry Bag"],
    accent: "#A8B87A",
    tourAvailable: false,
  },
  {
    id: 4,
    category: "JUNIORS",
    label: "04",
    title: "Junior Room",
    tagline: "Safe, supervised, and made for young minds.",
    description:
      "Dedicated spaces for high school students with extra care and supervision for a smooth transition.",
    image: "https://www.avdvvn.org/assets/images/jr1.jpg",
    features: ["3 Sharing", "Personal Wardrobe", "Study Table", "Laundry Bag"],
    accent: "#D4A5A5",
    tourAvailable: true,
  },
]

export default function Rooms() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const room = rooms[active]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  const next = () => setActive((p) => (p + 1) % rooms.length)
  const prev = () => setActive((p) => (p - 1 + rooms.length) % rooms.length)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .rooms-grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        id="rooms"
        ref={sectionRef}
        className="relative overflow-hidden py-24 md:py-36"
        style={{
          background: "linear-gradient(170deg, #0a1220 0%, #0f1c2e 50%, #0a1220 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Texture */}
        <div className="rooms-grain" />

        {/* Ambient glow — CSS transition on accent */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ transition: "all 0.9s ease" }}
        >
          <div
            className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
            style={{ background: room.accent, transition: "background 0.9s ease" }}
          />
          <div
            className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl"
            style={{ background: room.accent, transition: "background 0.9s ease" }}
          />
        </div>

        {/* Thin horizontal rule */}
        <div className="absolute top-0 left-0 right-0 h-px opacity-[0.08]"
          style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }} />

        <div className="relative container mx-auto px-4 max-w-7xl">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-white/20" />
              <span className="text-[10px] tracking-[0.35em] uppercase font-medium text-white/40">
                Accommodation
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2
                className="text-5xl md:text-7xl font-semibold text-white leading-[1.05]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Our Living
                <br />
                <em
                  className="not-italic font-normal"
                  style={{ color: room.accent, transition: "color 0.7s ease" }}
                >
                  Spaces
                </em>
              </h2>
              <p className="text-white/35 text-sm md:text-base max-w-xs leading-relaxed font-light">
                Four room types, each crafted for a distinct student life — pick what suits your chapter.
              </p>
            </div>
          </motion.div>

          {/* ── Main layout: sidebar tabs + content ── */}
          <div className="grid lg:grid-cols-[220px_1fr] gap-6 md:gap-10 items-start">

            {/* LEFT — Vertical room list */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0"
            >
              {rooms.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setActive(i)}
                  className="flex-shrink-0 lg:flex-shrink text-left group relative"
                >
                  <motion.div
                    className="relative px-4 py-4 rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: i === active ? "rgba(255,255,255,0.07)" : "transparent",
                      border: `1px solid ${i === active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
                    }}
                    whileHover={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    {/* Active accent left bar */}
                    <AnimatePresence>
                      {i === active && (
                        <motion.div
                          layoutId="roomTabBar"
                          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                          style={{ background: room.accent }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="pl-2">
                      <span
                        className="text-[9px] font-bold tracking-[0.2em] uppercase block mb-0.5 transition-colors duration-500"
                        style={{ color: i === active ? room.accent : "rgba(255,255,255,0.25)" }}
                      >
                        {r.label} — {r.category}
                      </span>
                      <span
                        className="font-medium text-sm transition-colors duration-300"
                        style={{ color: i === active ? "white" : "rgba(255,255,255,0.45)" }}
                      >
                        {r.title}
                      </span>
                    </div>
                  </motion.div>
                </button>
              ))}

              {/* Nav arrows below tabs on desktop */}
              <div className="hidden lg:flex items-center gap-2 mt-4 pl-1">
                <motion.button
                  onClick={prev}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all"
                  aria-label="Previous room"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all"
                  aria-label="Next room"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* RIGHT — Room showcase card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-[28px] md:rounded-[36px] overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: `0 40px 100px -30px ${room.accent}22`,
                transition: "box-shadow 0.8s ease",
              }}
            >
              <div className="flex flex-col lg:flex-row min-h-[520px] md:min-h-[620px]">

                {/* Image panel */}
                <div className="relative w-full lg:w-[55%] h-[300px] md:h-[420px] lg:h-auto overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={room.id + "-img"}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <motion.div style={{ y: imageY }} className="absolute inset-[-15%]">
                        <Image
                          src={room.image}
                          alt={room.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>

                      {/* Dark gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1220]/60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220]/70 via-transparent to-transparent" />

                      {/* Large room number watermark */}
                      <div
                        className="absolute top-6 left-7 select-none pointer-events-none"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(72px, 12vw, 120px)",
                          fontWeight: 700,
                          color: "white",
                          opacity: 0.07,
                          lineHeight: 1,
                        }}
                      >
                        {room.label}
                      </div>

                      {/* Bottom left: title on image */}
                      <div className="absolute bottom-7 left-7 z-10">
                        <span
                          className="text-[9px] tracking-[0.25em] uppercase font-bold block mb-1.5"
                          style={{ color: room.accent }}
                        >
                          {room.category}
                        </span>
                        <h3
                          className="text-3xl md:text-4xl font-semibold text-white"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {room.title}
                        </h3>
                      </div>

                      {/* Pagination dots bottom right */}
                      <div className="absolute bottom-8 right-7 flex gap-1.5 z-10">
                        {rooms.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActive(i)}
                            className="rounded-full transition-all duration-500"
                            style={{
                              width: i === active ? 22 : 6,
                              height: 6,
                              background: i === active ? room.accent : "rgba(255,255,255,0.3)",
                            }}
                          />
                        ))}
                      </div>

                      {/* Mobile nav arrows */}
                      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 lg:hidden">
                        <button
                          onClick={prev}
                          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/15 flex items-center justify-center text-white"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={next}
                          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/15 flex items-center justify-center text-white"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Content panel */}
                <div
                  className="w-full lg:w-[45%] p-7 md:p-10 lg:p-12 flex flex-col justify-center"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={room.id + "-content"}
                      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col h-full"
                    >
                      {/* Tagline */}
                      <p
                        className="text-base md:text-lg font-semibold mb-3 leading-snug"
                        style={{ color: room.accent, fontFamily: "'Cormorant Garamond', serif", transition: "color 0.6s ease" }}
                      >
                        {room.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-white/45 text-sm leading-relaxed mb-8 font-light">
                        {room.description}
                      </p>

                      {/* Thin divider */}
                      <div className="h-px mb-8 w-16 opacity-20 bg-white" />

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-10">
                        {room.features.map((feat, i) => (
                          <motion.div
                            key={feat}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                            className="flex items-center gap-2.5"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: room.accent }}
                            />
                            <span className="text-white/55 text-xs font-medium tracking-wide">{feat}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-auto">
                        <motion.button
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          className="relative group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-sm overflow-hidden"
                          style={{
                            background: room.accent,
                            color: "#0a1220",
                            boxShadow: `0 12px 32px -8px ${room.accent}60`,
                            transition: "background 0.6s ease, box-shadow 0.6s ease",
                          }}
                        >
                          <span className="relative z-10">Enquire Now</span>
                          <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                          {/* Shimmer */}
                          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                        </motion.button>

                        {room.tourAvailable && (
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                              <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                                style={{ background: "#4ade80" }}
                              />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            <span className="text-white/30 text-[10px] uppercase tracking-widest font-medium">
                              Tour available
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Bottom count strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="h-px flex-1 max-w-24 bg-white/8" />
            <span className="text-white/20 text-xs font-mono tracking-widest">
              {String(active + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 max-w-24 bg-white/8" />
          </motion.div>
        </div>
      </section>
    </>
  )
}