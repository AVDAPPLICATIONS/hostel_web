"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { UI } from "@/lib/theme"

const campusHighlights = [
  {
    id: 1,
    title: "HARI SAURABH HOSTEL",
    subtitle: "A home away from home",
    description:
      "A student is always an empty shell without a pure heart. Along with studies, what good he imbibes in his life helps shape a better future for him. With the blessings of our Guru, we always try to impart brotherhood, humanity, love, and discipline in our students.",
    image: "/hostel-building.png",
  },
  {
    id: 2,
    title: "TEMPLE",
    subtitle: "Where peace prevails",
    description:
      "A place of beauty, sunlight, warmth, and satisfaction where every heart flashes purity is what a temple implies. With the blessings of Lord Swaminarayan, AVD campus comprises a beautiful temple where devotees step in for peace and positivity.",
    image: "/temple.png",
  },
  {
    id: 3,
    title: "PRAYER HALL",
    subtitle: "Togetherness is half success",
    description:
      "A large prayer hall with the capacity of 1000+ individuals is a symbol of togetherness. Every evening, prayer is performed here by the students of Harisaurabh Hostel. Various stage events and Sabha are also organized at this place.",
    image: "/prayer-hall.png",
  },
]

const AUTO_SLIDE_DELAY = 4500

export default function CampusPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const current = campusHighlights[activeIndex]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % campusHighlights.length)
    }, AUTO_SLIDE_DELAY)

    return () => window.clearTimeout(timer)
  }, [activeIndex])

  const goNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % campusHighlights.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setActiveIndex(
      (prev) => (prev - 1 + campusHighlights.length) % campusHighlights.length
    )
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          `,
        }}
      />

      <section
        className="relative overflow-hidden px-4 py-24 md:py-32"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
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
              Campus Spaces
            </motion.div>

            <h2
              className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl"
              style={{
                color: UI.text.light,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Life at{" "}
              <motion.em
                className="inline-block not-italic"
                style={{ color: UI.text.muted }}
                animate={{
                  opacity: [0.75, 1, 0.75],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Atmiya Vidya Dham
              </motion.em>
            </h2>

            <p
              className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed md:text-lg"
              style={{ color: UI.text.muted }}
            >
              Explore the environments dedicated to spiritual, cultural, and
              personal growth.
            </p>
          </motion.div>

          {/* Slider Container */}
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] p-1"
            style={{
              background: UI.card.soft,
              boxShadow: UI.shadow.card,
            }}
          >
            <div
              className="rounded-[1.8rem] p-5 md:p-8 lg:p-10"
              style={{
                background: UI.card.light,
                border: `1px solid ${UI.border.white}`,
              }}
            >
              <div className="flex min-h-[520px] flex-col justify-between">
                <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                  {/* Visual */}
                  <motion.div
                    className="relative h-[280px] overflow-hidden rounded-[1.5rem] md:h-[430px]"
                    style={{
                      background: UI.card.light,
                      border: `1px solid ${UI.border.white}`,
                      boxShadow: UI.shadow.light,
                    }}
                    whileHover={{ scale: 1.01 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 22,
                    }}
                  >
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.div
                        key={current.image}
                        custom={direction}
                        variants={{
                          enter: (d: number) => ({
                            opacity: 0,
                            x: d > 0 ? 60 : -60,
                            scale: 1.04,
                            filter: "blur(6px)",
                          }),
                          center: {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            filter: "blur(0px)",
                          },
                          exit: (d: number) => ({
                            opacity: 0,
                            x: d > 0 ? -60 : 60,
                            scale: 1.04,
                            filter: "blur(6px)",
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                          style={{
                            backgroundImage: `url(${current.image})`,
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div
                      className="absolute bottom-5 left-5 rounded-2xl px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]"
                      style={{
                        background: UI.card.light,
                        color: UI.text.accent,
                        border: `1px solid ${UI.border.white}`,
                      }}
                    >
                      0{activeIndex + 1} / 0{campusHighlights.length}
                    </div>
                  </motion.div>

                  {/* Information */}
                  <div className="relative min-h-[330px]">
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.div
                        key={current.id}
                        custom={direction}
                        variants={{
                          enter: (d: number) => ({
                            opacity: 0,
                            x: d > 0 ? 36 : -36,
                            filter: "blur(4px)",
                          }),
                          center: {
                            opacity: 1,
                            x: 0,
                            filter: "blur(0px)",
                          },
                          exit: (d: number) => ({
                            opacity: 0,
                            x: d > 0 ? -36 : 36,
                            filter: "blur(4px)",
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 flex flex-col justify-center"
                      >
                        <span
                          className="mb-4 text-[11px] font-black uppercase tracking-[0.26em]"
                          style={{ color: UI.text.accent }}
                        >
                          {current.subtitle}
                        </span>

                        <h3
                          className="mb-6 text-4xl font-semibold leading-[1.05] md:text-5xl"
                          style={{
                            color: UI.text.dark,
                            fontFamily: "'Cormorant Garamond', serif",
                          }}
                        >
                          {current.title}
                        </h3>

                        <p
                          className="mb-8 max-w-xl text-sm font-normal leading-7 md:text-base"
                          style={{ color: UI.text.accent }}
                        >
                          {current.description}
                        </p>

                        <motion.div
                          className="h-1 rounded-full"
                          style={{ background: UI.button.primary }}
                          initial={{ width: 0 }}
                          animate={{ width: 120 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: "easeOut",
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Slider Navigation */}
                <div
                  className="mt-8 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
                  style={{
                    borderColor: UI.border.light,
                  }}
                >
                  {/* Progress Dots */}
                  <div className="flex items-center gap-3">
                    {campusHighlights.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setDirection(index > activeIndex ? 1 : -1)
                          setActiveIndex(index)
                        }}
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: index === activeIndex ? 42 : 10,
                          background:
                            index === activeIndex
                              ? UI.button.primary
                              : UI.card.soft,
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.92 }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Arrow Buttons */}
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: UI.button.primary,
                        color: UI.button.primaryText,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goPrev}
                      className="flex h-11 w-11 items-center justify-center rounded-full border transition-all"
                      style={{
                        background: UI.card.white,
                        color: UI.text.dark,
                        borderColor: UI.border.light,
                      }}
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: UI.button.primary,
                        color: UI.button.primaryText,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goNext}
                      className="flex h-11 w-11 items-center justify-center rounded-full border transition-all"
                      style={{
                        background: UI.card.white,
                        color: UI.text.dark,
                        borderColor: UI.border.light,
                      }}
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}