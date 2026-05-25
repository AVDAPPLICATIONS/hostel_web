"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { COLORS, UI, SHADOWS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"

const reviews = [
  {
    id: 1,
    name: "Mantra Sanathra",
    image: "https://www.avdvvn.org/assets/images/mantra.jpg",
    rating: 5,
    review:
      "I never thought that somebody can be helpful without any expectations. Also, I never felt I am away from home as the place just suited me with itself. I found the best mentors here, came in contact with good individuals, and along with that my every expectation of college life is answered.",
    tag: "Student",
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
    imagePosition: "object-center",
  },
  {
    id: 3,
    name: "Naitik Joshi",
    image: "https://www.avdvvn.org/assets/images/alumni2.jpeg",
    rating: 5,
    review:
      "Frankly, it wasn't my initial choice but was more of a dad's. But till date, if I miss anything in about my entire academic life is staying at AVD. The atmosphere made an impact which I realized later when I cracked CAT. So much attention was paid to me. And damn that breakfast! Class-apart! I didn't make friends instead came out with a family. The guidance provided by Anand Sagar Swamiji and Gurus' talks enabled a life-altering experience at AVD.",
    tag: "Business Analyst, American Express",
    imagePosition: "object-top",
  },
]

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const review = reviews[currentIndex]

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((c) => (c + 1) % reviews.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((c) => (c - 1 + reviews.length) % reviews.length)
  }, [])

  useEffect(() => {
    const t = setTimeout(goNext, 5500)
    return () => clearTimeout(t)
  }, [currentIndex, goNext])

  const handleSelect = (i: number) => {
    setDirection(i > currentIndex ? 1 : -1)
    setCurrentIndex(i)
  }

  return (
    <section
      id="reviews"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: UI.section.dark, fontFamily: FONT_FAMILY.sans }}
    >
      <div className="container mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 38 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-16 text-center md:mb-20"
        >


          <ScrollShineText
            as="h2"
            className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
            style={{ color: UI.text.light, fontFamily: FONT_FAMILY.heading }}
          >
            Voices of Alumni
          </ScrollShineText>

          <p
            className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg"
            style={{ color: UI.text.muted }}
          >
            Real stories from real residents — discover why AVD feels like family.
          </p>
        </motion.div>

        {/* ── Testimonial Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
          style={{
            boxShadow: SHADOWS.showcaseDeep,
            border: `1px solid ${OVERLAYS.borderWhiteFaint}`,
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? 72 : -72, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? -72 : 72, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-[2fr_3fr]"
            >
              {/* ── Photo Panel ── */}
              <div className="relative min-h-[300px] overflow-hidden lg:min-h-[560px]">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  className={`object-cover ${review.imagePosition}`}
                  priority
                />
                {/* Depth gradients */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: OVERLAYS.depthTop,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: OVERLAYS.depthRight,
                  }}
                />

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p
                    className="mb-1 text-[1.35rem] font-semibold text-white"
                    style={{ fontFamily: FONT_FAMILY.heading }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ color: COLORS.sky, opacity: 0.8 }}
                  >
                    {review.tag}
                  </p>
                </div>
              </div>

              {/* ── Content Panel ── */}
              <div
                className="flex flex-col justify-between p-7 sm:p-9 lg:p-12"
                style={{ background: COLORS.panelBg, borderLeft: `1px solid ${COLORS.panelBorder}` }}
              >
                <div>

                  {/* Decorative quote glyph */}


                  {/* Quote */}
                  <p
                    className="text-[1rem] leading-[1.92] lg:text-[1.08rem]"
                    style={{
                      color: COLORS.navy,
                      fontFamily: FONT_FAMILY.heading,
                    }}
                  >
                    {review.review}
                  </p>
                </div>

                {/* Bottom: counter + dots */}
                <div
                  className="mt-8 flex items-center gap-4 border-t pt-6"
                  style={{ borderColor: COLORS.panelBorder }}
                >
                  <span
                    className="font-mono text-xs tracking-widest"
                    style={{ color: COLORS.softTeal }}
                  >
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(reviews.length).padStart(2, "0")}
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    {reviews.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleSelect(i)}
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: i === currentIndex ? 28 : 8,
                          background: i === currentIndex ? COLORS.teal : COLORS.panelBorder,
                        }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Review ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>


      </div>
    </section>
  )
}
