"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react"
import Image from "next/image"
import { COLORS, UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import ScrollRevealCard from "@/components/shared/scroll-reveal-card"
import CinematicPhoto from "@/components/shared/cinematic-photo"

const reviews = [
  {
    id: 1,
    name: "Mantra Sanathra",
    image: "https://www.avdvvn.org/assets/images/mantra.jpg",
    rating: 5,
    review:
      "I never thought somebody can be helpful without expectations. I never felt away from home... I found the best mentors here, and came in contact with good individuals.",
    tag: "Alumni · Batch 2020",
    badge: "Found a Family",
    imagePosition: "object-center",
  },
  {
    id: 2,
    name: "Senior Student",
    image: "https://www.avdvvn.org/assets/images/senior.jpg",
    rating: 5,
    review:
      "Stepping out from the protected environment was a challenge. Admitting me here was a blessing. I secured my academics and gained cultural values.",
    tag: "Current Resident",
    badge: "Blessed Environment",
    imagePosition: "object-center",
  },
  {
    id: 3,
    name: "Alumni Resident",
    image: "https://www.avdvvn.org/assets/images/alumni2.jpeg",
    rating: 5,
    review:
      "Till date, if I miss anything in my academic life is staying at AVD. The atmosphere helped me crack CAT. I didn't make friends instead came out with a family.",
    tag: "Alumni · Batch 2018",
    badge: "Life Impact",
    imagePosition: "object-top",
  },
]

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const review = reviews[currentIndex]

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((current) => (current + 1) % reviews.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((current) => (current - 1 + reviews.length) % reviews.length)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      goNext()
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentIndex, goNext])

  const handleManualSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <>


      <section
        id="reviews"
        className="relative overflow-hidden py-24 md:py-36"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="relative container mx-auto max-w-6xl px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="mb-16 text-center md:mb-20"
          >
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{
                background: UI.card.light,
                color: UI.text.accent,
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={14} />
              Testimonials
            </motion.div>

            <ScrollShineText
              as="h2"
              className="text-5xl font-semibold leading-[1.05] md:text-7xl justify-center text-center"
              style={{
                color: UI.text.primaryLight,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Voices of Alumni
            </ScrollShineText>

            <p
              className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg"
              style={{ color: UI.text.mutedLight }}
            >
              Real stories from real residents — discover why AVD feels like
              family.
            </p>
          </motion.div>

          {/* Testimonial Card */}
          <ScrollRevealCard
            ref={containerRef}
            className="relative mx-auto max-w-5xl [perspective:2000px]"
            direction="left"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    x: d > 0 ? 120 : -120,
                    rotateY: d > 0 ? 8 : -8,
                    opacity: 0,
                    scale: 0.95,
                  }),
                  center: {
                    x: 0,
                    rotateY: 0,
                    opacity: 1,
                    scale: 1,
                  },
                  exit: (d: number) => ({
                    x: d > 0 ? -120 : 120,
                    rotateY: d > 0 ? -8 : 8,
                    opacity: 0,
                    scale: 0.95,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  },
                  rotateY: {
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  },
                  opacity: { duration: 0.35 },
                  scale: { duration: 0.35 },
                }}
              >
                <div className="flex flex-col items-center gap-8 md:flex-row md:gap-0">
                  {/* Avatar */}
                  <CinematicPhoto className="relative z-10 flex-shrink-0 md:-mr-12">
                    <div className="group relative">
                      <div
                        className="absolute inset-0 rounded-[28px] md:rounded-[32px]"
                        style={{
                          background: UI.card.soft,
                          border: `1px solid ${UI.border.white}`,
                          transform: "rotate(6deg)",
                        }}
                      />

                      <div
                        className="relative h-28 w-28 overflow-hidden rounded-[24px] border-[4px] md:h-44 md:w-44 md:rounded-[30px]"
                        style={{
                          background: UI.card.soft,
                          borderColor: UI.border.white,
                          boxShadow: UI.shadow.soft,
                        }}
                      >
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={220}
                          height={220}
                          className={`h-full w-full object-cover ${
                            review.imagePosition || "object-center"
                          } transition-all duration-500 group-hover:scale-105`}
                        />
                      </div>
                    </div>
                  </CinematicPhoto>

                  {/* Content Card */}
                  <div
                    className="relative flex-1 overflow-hidden rounded-[2rem] p-1"
                    style={{
                      background: UI.card.soft,
                      boxShadow: UI.shadow.card,
                    }}
                  >
                    <div
                      className="rounded-[1.75rem] p-8 md:p-14 md:pl-20"
                      style={{
                        background: UI.card.light,
                        border: `1px solid ${UI.border.white}`,
                      }}
                    >
                      <Quote
                        className="mb-6 h-9 w-9 md:h-11 md:w-11"
                        style={{ color: UI.text.accent }}
                      />

                      <blockquote
                        className="mb-8 text-xl font-medium leading-[1.4] md:mb-10 md:text-3xl md:leading-[1.35] lg:text-[2rem]"
                        style={{
                          color: UI.text.primaryDark,
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        &ldquo;{review.review}&rdquo;
                      </blockquote>

                      <div
                        className="flex flex-col justify-between gap-5 border-t pt-7 sm:flex-row sm:items-end"
                        style={{ borderColor: UI.border.light }}
                      >
                        <div>
                          <h4
                            className="mb-1 text-xl font-semibold md:text-2xl"
                            style={{
                              color: UI.text.primaryDark,
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            {review.name}
                          </h4>

                          <span
                            className="text-xs font-semibold tracking-wide"
                            style={{ color: UI.text.accent }}
                          >
                            {review.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 md:gap-5">
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4"
                                style={{
                                  color: UI.text.accent,
                                  fill: UI.text.accent,
                                }}
                              />
                            ))}
                          </div>

                          <div
                            className="hidden h-6 w-px sm:block"
                            style={{ background: UI.border.light }}
                          />

                          <div
                            className="flex items-center gap-2 rounded-full px-4 py-2"
                            style={{
                              background: UI.card.soft,
                              border: `1px solid ${UI.border.white}`,
                            }}
                          >
                            <Sparkles
                              className="h-3 w-3"
                              style={{ color: UI.text.accent }}
                            />

                            <span
                              className="text-[9px] font-black uppercase tracking-[0.15em] md:text-[10px]"
                              style={{ color: UI.text.accent }}
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

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-center gap-6 md:mt-16">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: UI.button.primary,
                  color: UI.button.primaryText,
                }}
                whileTap={{ scale: 0.92 }}
                onClick={goPrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all"
                style={{
                  background: UI.card.darkTransparent,
                  color: UI.text.mutedLight,
                  borderColor: UI.border.soft,
                }}
                aria-label="Previous review"
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>

              <div className="flex items-center gap-3">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleManualSelect(index)}
                    className="group relative flex h-5 items-center"
                    aria-label={`Go to review ${index + 1}`}
                  >
                    <div
                      className="h-[4px] overflow-hidden rounded-full transition-all duration-500"
                      style={{
                        width: index === currentIndex ? 52 : 14,
                        background:
                          index === currentIndex
                            ? "rgba(245, 239, 235, 0.22)"
                            : "rgba(200, 217, 230, 0.22)",
                      }}
                    >
                      {index === currentIndex && (
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: UI.button.primary }}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: UI.button.primary,
                  color: UI.button.primaryText,
                }}
                whileTap={{ scale: 0.92 }}
                onClick={goNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all"
                style={{
                  background: UI.card.darkTransparent,
                  color: UI.text.mutedLight,
                  borderColor: UI.border.soft,
                }}
                aria-label="Next review"
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Counter */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <div
                className="h-px max-w-[60px] flex-1"
                style={{ background: UI.border.soft }}
              />

              <span
                className="text-xs font-mono tracking-widest"
                style={{ color: UI.text.mutedLight }}
              >
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(reviews.length).padStart(2, "0")}
              </span>

              <div
                className="h-px max-w-[60px] flex-1"
                style={{ background: UI.border.soft }}
              />
            </div>
          </ScrollRevealCard>
        </div>
      </section>
    </>
  )
}