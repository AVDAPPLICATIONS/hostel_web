"use client"

import type React from "react"

import { useRef, useState, useCallback, useEffect } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion"
import {
  BookOpen,
  Users,
  Smile,
  ArrowUpDown,
  Utensils,
  Trophy,
  Shirt,
  Tv,
  HeartPulse,
  Droplets,
  Landmark,
  Car,
  Video,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { COLORS, UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import ScrollRevealCard from "@/components/shared/scroll-reveal-card"

const features = [
  {
    icon: Landmark,
    title: "Temple",
    description: "A serene temple where peace and spirituality prevails",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Spacious parking facilities within campus grounds",
  },
  {
    icon: Video,
    title: "CCTV Surveillance",
    description: "24/7 monitoring for complete student safety",
  },
  {
    icon: Shirt,
    title: "Laundry Service",
    description: "Comprehensive washing and ironing included",
  },
  {
    icon: Dumbbell,
    title: "Gymnasium",
    description: "Fully equipped gym for physical fitness",
  },
  {
    icon: Utensils,
    title: "Dining Hall",
    description: "Hygienic vegetarian food served fresh daily",
  },
  {
    icon: BookOpen,
    title: "Reading Room",
    description: "Dedicated quiet space for focused study",
  },
  {
    icon: Users,
    title: "Hospitality",
    description: "Warm staff dedicated to student wellbeing",
  },
  {
    icon: Smile,
    title: "Weekly Sabha",
    description: "Regular spiritual and cultural gatherings",
  },
  {
    icon: ArrowUpDown,
    title: "Lift Access",
    description: "24/7 elevator access across all floors",
  },
  {
    icon: Trophy,
    title: "Sports Ground",
    description: "Spacious grounds for sports and activities",
  },
  {
    icon: Tv,
    title: "TV Room",
    description: "Entertainment room for downtime and relaxation",
  },
  {
    icon: HeartPulse,
    title: "First-Aid",
    description: "Medical facilities available round the clock",
  },
  {
    icon: Droplets,
    title: "Water Cooler",
    description: "Purified drinking water on every floor",
  },
]

const stats = [
  { number: "1000+", label: "Prayer Hall Capacity" },
  { number: "100%", label: "Vegetarian Meals" },
  { number: "24/7", label: "Medical Support" },
  { number: "5★", label: "Hostel Rating" },
]

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-50, 50], [6, -6])
  const rotateY = useTransform(x, [-50, 50], [-6, 6])

  const springX = useSpring(rotateX, {
    stiffness: 300,
    damping: 30,
  })

  const springY = useSpring(rotateY, {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      x.set(event.clientX - rect.left - rect.width / 2)
      y.set(event.clientY - rect.top - rect.height / 2)
    },
    [x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  })

  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isInView) return

    const numericMatch = value.match(/(\d+)/)

    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const target = parseInt(numericMatch[1])
    const suffix = value.replace(numericMatch[1], "").trim()
    const prefix =
      value.indexOf(numericMatch[1]) > 0
        ? value.substring(0, value.indexOf(numericMatch[1]))
        : ""

    const duration = 1500
    const steps = 40
    let step = 0

    const timer = setInterval(() => {
      step++

      const progress = 1 - Math.pow(1 - step / steps, 3)
      let current = Math.round(target * progress)

      if (step >= steps) {
        current = target
        clearInterval(timer)
      }

      setDisplayValue(`${prefix}${current}${suffix}`)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div
      ref={ref}
      className="mb-2 text-4xl font-black tabular-nums transition-colors duration-500 md:text-5xl"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        color: COLORS.white,
      }}
    >
      {isInView ? displayValue : "0"}
    </div>
  )
}

export default function Features() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const isCarouselInView = useInView(scrollContainerRef, {
    // Only auto-scroll when the carousel is actually visible
    amount: 0.2,
  })

  const [isMobile, setIsMobile] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  const featuresCount = features.length
  const featuresLoop = [...features, ...features]

  useEffect(() => {
    // Mobile-only auto scroll (Tailwind "md" starts at 768px)
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const { current } = scrollContainerRef
    const scrollAmount = current.clientWidth * 0.6

    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    if (!isMobile) return
    if (!isCarouselInView) return
    if (isUserInteracting) return
    if (!scrollContainerRef.current) return

    const interval = window.setInterval(() => {
      const el = scrollContainerRef.current
      if (!el) return

      const scrollAmount = el.clientWidth * 0.6
      // Because we render 2x the items, "half" is a full cycle.
      const loopWidth = Math.max(1, el.scrollWidth / 2)

      // Reset to the matching position in the first half (seamless loop).
      if (el.scrollLeft >= loopWidth - 2) {
        el.scrollTo({ left: el.scrollLeft - loopWidth, behavior: "auto" })
        return
      }

      el.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }, 2600)

    return () => window.clearInterval(interval)
  }, [isMobile, isCarouselInView, isUserInteracting])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

            .features-scroll::-webkit-scrollbar {
              display: none;
            }

            .features-scroll {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />

      <section
        className="relative overflow-hidden py-24 md:py-36"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="relative container mx-auto max-w-7xl px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="mb-16 text-center md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-6 flex items-center justify-center gap-3"
            >
              <div
                className="h-px w-12"
                style={{ background: UI.text.muted }}
              />

              <motion.span
                className="rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{
                  background: UI.card.light,
                  color: UI.text.accent,
                  border: `1px solid ${UI.border.white}`,
                  boxShadow: UI.shadow.light,
                }}
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Amenities
              </motion.span>

              <div
                className="h-px w-12"
                style={{ background: UI.text.muted }}
              />
            </motion.div>

            <ScrollShineText
              as="h2"
              className="mb-5 block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: UI.text.light,
              }}
            >
              Why Choose Us?
            </ScrollShineText>

            <motion.p
              className="mx-auto max-w-xl text-base font-light leading-relaxed md:text-lg"
              style={{ color: UI.text.muted }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Every detail is crafted to create a home away from home — fostering
              growth, discipline, and community.
            </motion.p>
          </motion.div>

          {/* Feature Cards */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="features-scroll grid auto-cols-[85%] grid-flow-col grid-rows-2 gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 pb-6 pt-2 md:auto-cols-[calc(33.333%-0.875rem)] md:gap-5 lg:auto-cols-[calc(25%-0.9375rem)]"
              onTouchStart={() => setIsUserInteracting(true)}
              onTouchEnd={() => setIsUserInteracting(false)}
              onTouchCancel={() => setIsUserInteracting(false)}
              onMouseEnter={() => setIsUserInteracting(true)}
              onMouseLeave={() => setIsUserInteracting(false)}
            >
              {featuresLoop.map((feature, index) => {
                const Icon = feature.icon
                const baseIndex = index % featuresCount
                return (
                  <ScrollRevealCard
                    key={`${feature.title}-${index}`}
                    delay={baseIndex * 0.08}
                    direction="left"
                    className="snap-center py-4"
                  >
                    <TiltCard className="h-full">
                      <div
                        className="group relative h-full overflow-hidden rounded-[1.5rem] p-5 transition-all duration-700 md:rounded-[2rem] md:p-6"
                        style={{
                          background: `linear-gradient(145deg, ${COLORS.softNavy} 0%, ${COLORS.deepNavy} 100%)`,
                          border: `1px solid rgba(255, 255, 255, 0.08)`,
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* 3D Depth Content */}
                        <div style={{ transform: "translateZ(45px)" }} className="relative z-10">
                          <motion.div
                            className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500"
                            style={{
                              background: "rgba(255, 255, 255, 0.03)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              backdropFilter: "blur(10px)",
                            }}
                            whileHover={{ 
                              scale: 1.15,
                              backgroundColor: COLORS.teal,
                              borderColor: COLORS.white,
                            }}
                          >
                            <Icon
                              className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110"
                            />
                          </motion.div>

                          <h3
                            className="mb-2 text-xl font-bold leading-tight text-white"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            {feature.title}
                          </h3>

                          <p
                            className="text-sm leading-relaxed"
                            style={{
                              color: COLORS.sky,
                              opacity: 0.8,
                            }}
                          >
                            {feature.description}
                          </p>
                        </div>

                        {/* Premium Shine Sweep */}
                        <div 
                          className="pointer-events-none absolute -inset-[100%] z-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-20"
                          style={{
                            background: "linear-gradient(45deg, transparent 45%, white 50%, transparent 55%)",
                            transform: "translateX(-100%)",
                          }}
                        >
                          <motion.div 
                            className="h-full w-full"
                            animate={{
                              x: ["-100%", "100%"]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          />
                        </div>

                        {/* Subtle Inner Glow */}
                        <div 
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)`
                          }}
                        />
                      </div>
                    </TiltCard>
                  </ScrollRevealCard>
                )
              })}
            </div>
          </div>

          {/* Scroll Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: UI.card.light,
                color: UI.text.dark,
              }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all"
              style={{
                borderColor: UI.border.soft,
                background: UI.card.darkStrong,
                color: UI.text.muted,
              }}
              aria-label="Scroll amenities left"
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>

            <span
              className="mx-2 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: UI.text.muted }}
            >
              Scroll
            </span>

            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: UI.card.light,
                color: UI.text.dark,
              }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all"
              style={{
                borderColor: UI.border.soft,
                background: UI.card.darkSoft,
                color: UI.text.muted,
              }}
              aria-label="Scroll amenities right"
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            className="mt-24 md:mt-32"
          >
            <div className="mb-14 flex items-center justify-center gap-4">
              <div
                className="h-px max-w-[120px] flex-1"
                style={{ background: UI.border.soft }}
              />

              <span
                className="rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{
                  background: UI.card.light,
                  color: UI.text.accent,
                  border: `1px solid ${UI.border.white}`,
                }}
              >
                At a Glance
              </span>

              <div
                className="h-px max-w-[120px] flex-1"
                style={{ background: UI.border.soft }}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
              {stats.map((stat, index) => (
                <ScrollRevealCard
                  key={stat.label}
                  delay={index * 0.1}
                  direction="up"
                  className="group"
                >
                  <TiltCard className="h-full">
                    <div
                      className="relative h-full overflow-hidden rounded-[2rem] p-6 text-center transition-all duration-700"
                      style={{
                        background: `linear-gradient(145deg, ${COLORS.softNavy} 0%, ${COLORS.deepNavy} 100%)`,
                        border: `1px solid rgba(200, 217, 230, 0.2)`,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Interactive Light Effect */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(200, 217, 230, 0.15) 0%, transparent 80%)",
                        }}
                      />

                      <div style={{ transform: "translateZ(60px)" }} className="relative z-10">
                        <AnimatedStat value={stat.number} />

                        <div
                          className="text-xs font-bold uppercase tracking-[0.25em] md:text-sm"
                          style={{
                            color: COLORS.sky,
                            fontFamily: "'DM Sans', sans-serif",
                            opacity: 0.8
                          }}
                        >
                          {stat.label}
                        </div>
                      </div>

                      {/* Corner Accents */}
                      <div 
                        className="absolute right-0 top-0 h-16 w-16 opacity-20"
                        style={{
                          background: `radial-gradient(circle at top right, ${COLORS.white}, transparent 70%)`
                        }}
                      />
                    </div>
                  </TiltCard>
                </ScrollRevealCard>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}