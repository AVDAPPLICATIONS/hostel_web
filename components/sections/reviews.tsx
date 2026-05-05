"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Sparkles, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    id: 1,
    name: "Mantra Sanathra",
    image: "https://www.avdvvn.org/assets/images/mantra.jpg",
    rating: 5,
    review:
      "I never thought somebody can be helpful without expectations. I never felt away from home... I found the best mentors here, and came in contact with good individuals.",
    tag: "Alumni · Batch 2020",
    badge: "FOUND A FAMILY",
    accent: "#C8A96E",
  },
  {
    id: 2,
    name: "Senior Student",
    image: "https://www.avdvvn.org/assets/images/senior.jpg",
    rating: 5,
    review:
      "Stepping out from the protected environment was a challenge. Admitting me here was a blessing. I secured my academics and gained cultural values.",
    tag: "Current Resident",
    badge: "BLESSED ENVIRONMENT",
    accent: "#C8A96E",
  },
  {
    id: 3,
    name: "Alumni Resident",
    image: "https://www.avdvvn.org/assets/images/alumni2.jpeg",
    rating: 5,
    review:
      "Till date, if I miss anything in my academic life is staying at AVD. The atmosphere helped me crack CAT. I didn't make friends instead came out with a family.",
    tag: "Alumni · Batch 2018",
    badge: "LIFE IMPACT",
    accent: "#C8A96E",
    imagePosition: "object-top",
  },
]

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const review = reviews[currentIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection(1)
          setCurrentIndex((curr) => (curr + 1) % reviews.length)
          return 0
        }
        return prev + 0.5
      })
    }, 25)
    return () => clearInterval(timer)
  }, [currentIndex])

  const handleManualSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setProgress(0)
  }

  const goNext = () => {
    setDirection(1)
    setCurrentIndex((c) => (c + 1) % reviews.length)
    setProgress(0)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrentIndex((c) => (c - 1 + reviews.length) % reviews.length)
    setProgress(0)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <section
        id="reviews"
        className="relative py-24 md:py-36 overflow-hidden"
        style={{
          background: "linear-gradient(170deg, #060d16 0%, #0d1b2a 50%, #091520 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        {/* Ambient glow — follows accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000"
            style={{ background: review.accent }}
          />
          <div
            className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl transition-all duration-1000"
            style={{ background: review.accent }}
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
            className="text-center mb-16 md:mb-24"
          >
            {/* Eyebrow */}
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
                style={{ color: "#C8A96E" }}
              >
                Testimonials
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A96E]" />
            </motion.div>

            <h2
              className="text-5xl md:text-7xl font-semibold text-white mb-5 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Voices of{" "}
              <em className="not-italic" style={{ color: "#C8A96E" }}>
                Alumni
              </em>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Real stories from real residents — discover why AVD feels like family.
            </p>
          </motion.div>

          {/* ── Testimonial Card ── */}
          <div
            className="max-w-5xl mx-auto relative [perspective:2000px]"
            ref={containerRef}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    x: d > 0 ? 80 : -80,
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(6px)",
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  },
                  exit: (d: number) => ({
                    x: d > 0 ? -80 : 80,
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(6px)",
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.35 },
                  filter: { duration: 0.35 },
                }}
              >
                <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center">
                  {/* Left — Avatar Column */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
                    className="flex-shrink-0 relative z-10 md:-mr-12"
                  >
                    <div className="relative group">
                      {/* Accent ring behind avatar */}
                      <div
                        className="absolute -inset-3 rounded-[28px] md:rounded-[32px] opacity-20 blur-sm transition-all duration-700"
                        style={{ background: review.accent }}
                      />
                      {/* Rotated background card */}
                      <div
                        className="absolute inset-0 rounded-[24px] md:rounded-[28px] rotate-6 group-hover:rotate-3 transition-transform duration-500"
                        style={{ background: review.accent, opacity: 0.3 }}
                      />
                      {/* Avatar image */}
                      <div
                        className="relative w-24 h-24 md:w-40 md:h-40 rounded-[24px] md:rounded-[28px] border-[3px] md:border-[4px] overflow-hidden bg-slate-800"
                        style={{ borderColor: `${review.accent}60` }}
                      >
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={200}
                          height={200}
                          className={`w-full h-full object-cover ${review.imagePosition || "object-center"} grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500`}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Right — Content Card */}
                  <div
                    className="relative flex-1 rounded-[28px] md:rounded-[36px] overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: `0 40px 100px -30px ${review.accent}18`,
                    }}
                  >
                    {/* Subtle accent glow top-right */}
                    <div
                      className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-[0.08] transition-all duration-700"
                      style={{ background: review.accent }}
                    />

                    <div className="relative p-8 md:p-14 md:pl-16">
                      {/* Quote icon */}
                      <div className="mb-6">
                        <Quote
                          className="w-8 h-8 md:w-10 md:h-10 transition-colors duration-700"
                          style={{ color: `${review.accent}50` }}
                        />
                      </div>

                      {/* Review text */}
                      <blockquote
                        className="text-xl md:text-3xl lg:text-[2rem] text-white leading-[1.4] md:leading-[1.35] font-medium mb-8 md:mb-10"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        &ldquo;{review.review}&rdquo;
                      </blockquote>

                      {/* Bottom row: info + badge */}
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pt-7 border-t border-white/[0.06]">
                        <div>
                          <h4
                            className="text-lg md:text-xl font-semibold text-white mb-1"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {review.name}
                          </h4>
                          <span className="text-xs text-white/30 font-medium tracking-wide">
                            {review.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 md:gap-5">
                          {/* Stars */}
                          <div className="flex gap-0.5">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3.5 w-3.5 md:h-4 md:w-4"
                                style={{ color: review.accent, fill: review.accent }}
                              />
                            ))}
                          </div>

                          <div className="h-6 w-px bg-white/[0.06] hidden sm:block" />

                          {/* Badge */}
                          <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                              background: `${review.accent}15`,
                              border: `1px solid ${review.accent}30`,
                            }}
                          >
                            <Sparkles
                              className="h-3 w-3"
                              style={{ color: review.accent }}
                            />
                            <span
                              className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase"
                              style={{ color: review.accent }}
                            >
                              {review.badge}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Navigation Row ── */}
            <div className="flex items-center justify-center gap-6 mt-12 md:mt-16">
              {/* Prev */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={goPrev}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              {/* Progress pills */}
              <div className="flex items-center gap-3">
                {reviews.map((r, index) => (
                  <button
                    key={index}
                    onClick={() => handleManualSelect(index)}
                    className="relative h-5 flex items-center group"
                  >
                    <div
                      className="h-[3px] rounded-full transition-all duration-500 overflow-hidden"
                      style={{
                        width: index === currentIndex ? 48 : 12,
                        background:
                          index === currentIndex
                            ? "rgba(255,255,255,0.15)"
                            : "rgba(255,255,255,0.12)",
                      }}
                    >
                      {index === currentIndex && (
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            width: `${progress}%`,
                            background: review.accent,
                          }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Next */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={goNext}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Counter */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px flex-1 max-w-[60px] bg-white/[0.06]" />
              <span className="text-white/20 text-xs font-mono tracking-widest">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(reviews.length).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 max-w-[60px] bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
