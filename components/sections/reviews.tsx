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
      "I never thought that somebody can be helpful without any expectations. Also, I never felt I am away from home as the place just suited me with itself. I found the best mentors here, came in contact with good individuals, and along with that my every expectation of college life is answered.",
    tag: "Student",
    badge: "Found a Family",
    imagePosition: "object-center",
  },
  {
    id: 2,
    name: "Axat Patel",
    image: "https://www.avdvvn.org/assets/images/senior.jpg",
    rating: 5,
    review:
      "Stepping out from the protected environment and studying far away from home was a challenge for me. But maybe my parent's decision of admitting me here at Harisaurabh Hostel was a blessing for me. Not only I secured my Academics but me being able with a healthy attitude and just cultural and moral values is possible because of the environment here I perceived.",
    tag: "4th yr Student (BE IT, ADIT)",
    badge: "Blessed Environment",
    imagePosition: "object-center",
  },
  {
    id: 3,
    name: "Naitik Joshi",
    image: "https://www.avdvvn.org/assets/images/alumni2.jpeg",
    rating: 5,
    review:
      "Frankly, it wasn't my initial choice but was more of a dad's. But till date, if I miss anything in about my entire academic life is staying at AVD. The atmosphere made an impact which I realized later when I cracked CAT. So much attention was paid to me. And damn that breakfast! Class-apart! I didn't make friends instead came out with a family. The guidance provided by Anand Sagar Swamiji and Gurus' talks enabled a life-altering experience at AVD",
    tag: "Business Analyst, American Express",
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
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-stretch md:gap-0">
                  {/* Avatar — hidden on mobile, overlapping panel on desktop */}
                  <div className="relative z-10 -mr-12 hidden flex-shrink-0 self-center md:block">
                    <div className="group relative">
                      <div
                        className="absolute inset-0 rounded-[32px]"
                        style={{
                          background: UI.card.soft,
                          border: `1px solid ${UI.border.white}`,
                          transform: "rotate(6deg)",
                        }}
                      />

                      <div
                        className="relative h-44 w-44 overflow-hidden rounded-[30px] border-[4px]"
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
                  </div>

                  {/* Content Card */}
                  <div
                    className="relative w-full flex-1 overflow-hidden rounded-[2rem] p-1"
                    style={{
                      background: UI.card.soft,
                      boxShadow: UI.shadow.card,
                    }}
                  >
                    <div
                      className="rounded-[1.75rem] p-5 md:p-14 md:pl-20"
                      style={{
                        background: UI.card.light,
                        border: `1px solid ${UI.border.white}`,
                      }}
                    >
                      {/* Mobile-only: photo + name row at the top of the card */}
                      <div className="mb-5 flex items-center gap-4 md:hidden">
                        <div className="group relative flex-shrink-0">
                          <div
                            className="relative h-14 w-14 overflow-hidden rounded-2xl border-2"
                            style={{
                              background: UI.card.soft,
                              borderColor: UI.border.white,
                              boxShadow: UI.shadow.soft,
                            }}
                          >
                            <Image
                              src={review.image}
                              alt={review.name}
                              width={56}
                              height={56}
                              className={`h-full w-full object-cover ${
                                review.imagePosition || "object-center"
                              }`}
                            />
                          </div>
                        </div>
                        <div>
                          <p
                            className="text-sm font-bold"
                            style={{
                              color: UI.text.primaryDark,
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            {review.name}
                          </p>
                          <p
                            className="text-[11px] font-semibold"
                            style={{ color: UI.text.accent }}
                          >
                            {review.tag}
                          </p>
                        </div>
                      </div>

                      <blockquote
                        className="mb-6 text-sm font-medium leading-[1.7] md:mb-10 md:text-3xl md:leading-[1.35] lg:text-[2rem]"
                        style={{
                          color: UI.text.primaryDark,
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        {review.review}
                      </blockquote>

                      {/* Desktop-only: name/tag at the bottom */}
                      <div
                        className="hidden border-t pt-7 md:block"
                        style={{ borderColor: UI.border.light }}
                      >
                        <h4
                          className="mb-1 text-2xl font-semibold"
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