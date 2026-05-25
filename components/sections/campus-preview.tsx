"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { COLORS, UI, SHADOWS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"

const campusHighlights = [
  {
    id: 1,
    title: "Hari Saurabh Hostel",
    subtitle: "a home away from home",
    description:
      "A student is always an empty shell without a pure heart. Along with studies what good he imbibes in his life helps to shapes a better future for him. We with the blessings of our Guru always try to impart brotherhood, humanity, love, and discipline in our students which are the sole practices an Indian culture is known for.",
    image: "/hostel-building.jpg",
    tag: "Student Residence",
  },
  {
    id: 2,
    title: "Temple",
    subtitle: "where peace prevails",
    description:
      "A place of cool stone, beauty, shafting sunlight, warmth, and satisfaction where every heart flashes purity is what a temple implies. With the blessings of Lord Swaminarayan, AVD campus comprises of a beautiful temple with enormous devotees stepping in for peace and positivity.",
    image: "/temple.jpg",
    tag: "Spiritual Space",
  },
  {
    id: 3,
    title: "Prayer Hall",
    subtitle: "togetherness is half success",
    description:
      "A large prayer hall with the capacity of 1000+ individuals is a symbol of togetherness. Prayer hall symbolizes the ancient Gurukul culture where students come together for prayers and augment positive energy. Every evening, prayer is performed here by the students of Harisaurabh Hostel.",
    image: "/prayer-hall.jpg",
    tag: "Community Space",
  },
]

const AUTO_DELAY = 4000

export default function CampusPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const current = campusHighlights[activeIndex]

  const goNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((p) => (p + 1) % campusHighlights.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((p) => (p - 1 + campusHighlights.length) % campusHighlights.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(goNext, AUTO_DELAY)
    return () => clearTimeout(t)
  }, [activeIndex, paused, goNext])

  const handleSelect = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1)
    setActiveIndex(i)
  }

  return (
    <section
      id="campus"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: UI.section.dark, fontFamily: FONT_FAMILY.sans }}
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


          <ScrollShineText
            as="h2"
            className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
            style={{ color: UI.text.light, fontFamily: FONT_FAMILY.heading }}
          >
            Life at Atmiya Vidya Dham
          </ScrollShineText>

          <p
            className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg"
            style={{ color: UI.text.muted }}
          >
            Explore the environments dedicated to spiritual, cultural, and personal growth.
          </p>
        </motion.div>

        {/* ── Main Slider Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
          style={{
            boxShadow: SHADOWS.showcaseDeep,
            border: `1px solid ${OVERLAYS.borderWhiteFaint}`,
          }}
        >
          <div className="flex min-h-[540px] flex-col lg:flex-row">

            {/* ── Image Panel ── */}
            <div className="relative h-[300px] w-full overflow-hidden lg:h-auto lg:w-[58%]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current.image}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({
                      opacity: 0,
                      x: d > 0 ? 100 : -100,
                      filter: "blur(15px)",
                    }),
                    center: {
                      zIndex: 1,
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                    },
                    exit: (d: number) => ({
                      zIndex: 0,
                      opacity: 0,
                      x: d > 0 ? -60 : 60,
                      filter: "blur(5px)",
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    opacity: { duration: 0.65, ease: "easeInOut" },
                    x: { type: "spring", stiffness: 200, damping: 30 },
                    filter: { duration: 0.5 }
                  }}
                  className="absolute inset-0"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${current.image})` }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlays */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: OVERLAYS.depthTop }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(to right, transparent 55%, ${OVERLAYS.white06} 100%)`,
                }}
              />


            </div>

            {/* ── Content Panel ── */}
            <div
              className="relative flex w-full flex-col p-6 sm:p-8 lg:w-[42%] lg:p-10"
              style={{ background: COLORS.panelBg, borderLeft: `1px solid ${COLORS.panelBorder}` }}
            >
              {/* Watermark index */}
              <div
                className="pointer-events-none absolute right-8 top-6 select-none font-black leading-none"
                style={{
                  color: COLORS.teal,
                  opacity: 0.06,
                  fontSize: "clamp(80px, 12vw, 120px)",
                  fontFamily: FONT_FAMILY.heading,
                }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              {/* Animated text content */}
              <div className="relative flex-1">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 20 : -20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: direction > 0 ? -20 : 20, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col"
                  >
                    {/* Subtitle */}
                    <motion.span
                      initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="mb-5 block text-[10px] font-black uppercase tracking-[0.28em]"
                      style={{ color: COLORS.teal }}
                    >
                      {current.subtitle}
                    </motion.span>

                    {/* Title — word-by-word stagger */}
                    <h3
                      className="mb-6 text-4xl font-semibold leading-tight md:text-[2.6rem]"
                      style={{ color: COLORS.navy, fontFamily: FONT_FAMILY.heading }}
                    >
                      {current.title.split(" ").map((word, i) => (
                        <motion.span
                          key={word + i}
                          className="mr-[0.22em] inline-block"
                          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{
                            delay: 0.12 + i * 0.08,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.26, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1 text-sm leading-[1.9]"
                      style={{ color: OVERLAYS.tealMuted }}
                    >
                      {current.description}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Bottom: slide selector + nav ── */}
              <div className="mt-8 border-t pt-6" style={{ borderColor: COLORS.panelBorder }}>

                {/* Prev / Next */}
                <div className="flex items-center gap-2.5">
                  <motion.button
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: COLORS.teal,
                      color: COLORS.white,
                      borderColor: COLORS.teal,
                    }}
                    whileTap={{ scale: 0.92 }}
                    onClick={goPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all"
                    style={{ background: COLORS.white, color: COLORS.navy, borderColor: COLORS.panelBorder }}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: COLORS.teal,
                      color: COLORS.white,
                      borderColor: COLORS.teal,
                    }}
                    whileTap={{ scale: 0.92 }}
                    onClick={goNext}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all"
                    style={{ background: COLORS.white, color: COLORS.navy, borderColor: COLORS.panelBorder }}
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>

                  <span
                    className="ml-auto font-mono text-[10px] tracking-widest"
                    style={{ color: OVERLAYS.tealMuted }}
                  >
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(campusHighlights.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
