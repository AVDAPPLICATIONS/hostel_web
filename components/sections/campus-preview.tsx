"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const campusHighlights = [
  {
    id: 1,
    title: "HARI SAURABH HOSTEL",
    subtitle: "a home away from home",
    description:
      "A student is always an empty shell without a pure heart. Along with studies what good he imbibes in his life helps to shapes a better future for him. We with the blessings of our Guru always try to impart brotherhood, humanity, love, and discipline in our students which are the sole practices an Indian culture is known for.",
    image: "/hostel-building.png",
  },
  {
    id: 2,
    title: "TEMPLE",
    subtitle: "where peace prevails",
    description:
      "A place of beauty, shafting sunlight, warmth, and satisfaction where every heart flashes purity is what a temple implies. With the blessings of Lord Swaminarayan, AVD campus comprises of a beautiful temple with enormous devotees stepping in for peace and positivity.",
    image: "/temple.png",
  },
  {
    id: 3,
    title: "PRAYER HALL",
    subtitle: "togetherness is half success",
    description:
      "A large prayer hall with the capacity of 1000+ individuals is a symbol of togetherness. Prayer hall symbolizes the ancient Gurukul culture where students come together for prayers and augment positive energy in themselves. Every day in evening prayer is performed here by the students of Harisaurabh Hostel. Also, various stage events and Sabha are organized at this place.",
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
    setActiveIndex((prev) => (prev - 1 + campusHighlights.length) % campusHighlights.length)
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `,
        }}
      />

      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[140px]" style={{ background: "#C8A96E" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[120px]" style={{ background: "#7BA7BC" }} />
        </div>

        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A96E]" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: "#C8A96E" }}>
                Campus Spaces
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A96E]" />
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-5 leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Life at{" "}
              <em className="not-italic" style={{ color: "#C8A96E" }}>
                Atmiya Vidya Dham
              </em>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Explore the environments dedicated to spiritual, cultural, and personal growth.
            </p>
          </motion.div>

          {/* Slider Container */}
          <div
            className="relative rounded-[32px] overflow-hidden p-6 md:p-12 min-h-[500px] md:min-h-[580px] flex flex-col justify-between"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 30px 80px -40px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 flex-1">
              {/* Visual */}
              <div className="relative w-full lg:w-1/2 h-[280px] md:h-[400px] rounded-[24px] overflow-hidden group">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={current.image}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48, filter: "blur(6px)" }),
                      center: { opacity: 1, x: 0, filter: "blur(0px)" },
                      exit: (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48, filter: "blur(6px)" }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${current.image})` }}
                    />
                  </motion.div>
                </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060d16]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Information */}
              <div className="relative w-full lg:w-1/2 min-h-[300px] md:min-h-[320px] lg:min-h-[360px]">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32, filter: "blur(4px)" }),
                      center: { opacity: 1, x: 0, filter: "blur(0px)" },
                      exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32, filter: "blur(4px)" }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <span
                      className="text-[10px] tracking-[0.25em] font-bold uppercase mb-3"
                      style={{ color: "#C8A96E" }}
                    >
                      {current.subtitle}
                    </span>

                    <h3
                      className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-[1.1]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {current.title}
                    </h3>

                    <p
                      className="text-white/45 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {current.description}
                    </p>

                    <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-[#C8A96E]/40 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.04]">
              {/* Progress Dots */}
              <div className="flex items-center gap-3">
                {campusHighlights.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1)
                      setActiveIndex(index)
                    }}
                    className="relative h-2 rounded-full transition-all duration-500 bg-white"
                    style={{
                      width: index === activeIndex ? 36 : 8,
                      opacity: index === activeIndex ? 1 : 0.2,
                      background: index === activeIndex ? "#C8A96E" : "white",
                    }}
                  />
                ))}
              </div>

              {/* Arrow Buttons */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goPrev}
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/25 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goNext}
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/25 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
