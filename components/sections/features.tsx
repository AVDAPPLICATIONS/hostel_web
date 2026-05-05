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
      className="mb-2 text-4xl font-black tabular-nums transition-colors duration-500 md:text-6xl"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        color: UI.text.muted,
      }}
    >
      {isInView ? displayValue : "0"}
    </div>
  )
}

export default function Features() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const { current } = scrollContainerRef
    const scrollAmount = current.clientWidth * 0.6

    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

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

            <motion.h2
              className="mb-5 text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: UI.text.light,
              }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              viewport={{ once: true }}
            >
              Why Choose{" "}
              <motion.em
                className="inline-block not-italic"
                style={{
                  color: UI.text.muted,
                }}
                animate={{
                  opacity: [0.75, 1, 0.75],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Us?
              </motion.em>
            </motion.h2>

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
              className="features-scroll grid auto-cols-[calc(50%-0.5rem)] grid-flow-col grid-rows-2 gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-6 pt-2 md:auto-cols-[calc(33.333%-0.875rem)] md:gap-5 lg:auto-cols-[calc(25%-0.9375rem)]"
            >
              {features.map((feature, index) => {
                const isHovered = hoveredIndex === index
                const Icon = feature.icon

                return (
                  <motion.div
                    key={feature.title}
                    className="h-full snap-center"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <TiltCard className="h-full">
                      <div
                        className="group relative flex h-full cursor-default flex-col items-start overflow-hidden rounded-2xl p-5 transition-all duration-500 md:p-6"
                        style={{
                          background: isHovered
                            ? UI.card.light
                            : UI.card.darkSoft,
                          border: `1px solid ${
                            isHovered ? UI.border.white : UI.border.soft
                          }`,
                          boxShadow: isHovered
                            ? UI.shadow.soft
                            : "0 10px 26px rgba(0, 0, 0, 0.08)",
                        }}
                      >
                        <motion.div
                          className="mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-500"
                          style={{
                            background: isHovered
                              ? UI.button.primary
                              : UI.card.soft,
                            border: `1px solid ${
                              isHovered
                                ? UI.button.primary
                                : UI.border.white
                            }`,
                          }}
                          whileHover={{ rotate: 4, scale: 1.08 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                        >
                          <Icon
                            className="h-5 w-5 transition-colors duration-500"
                            style={{
                              color: isHovered
                                ? UI.button.primaryText
                                : UI.text.dark,
                            }}
                          />
                        </motion.div>

                        <h3
                          className="mb-1.5 text-sm font-bold leading-tight transition-colors duration-500 md:text-base"
                          style={{
                            color: isHovered ? UI.text.dark : UI.text.light,
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(16px, 1.15vw, 19px)",
                          }}
                        >
                          {feature.title}
                        </h3>

                        <p
                          className="text-xs leading-relaxed transition-colors duration-500"
                          style={{
                            color: isHovered ? UI.text.accent : UI.text.muted,
                          }}
                        >
                          {feature.description}
                        </p>

                        <motion.div
                          className="absolute bottom-0 left-0 h-[3px] rounded-full"
                          style={{ background: UI.button.light }}
                          initial={{ width: 0 }}
                          animate={{
                            width: isHovered ? "70px" : "0px",
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </TiltCard>
                  </motion.div>
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
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="group text-center"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      y: -4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative rounded-3xl px-4 py-6"
                    style={{
                      background: UI.card.darkSoft,
                      border: `1px solid ${UI.border.soft}`,
                    }}
                  >
                    <AnimatedStat value={stat.number} />

                    <div
                      className="text-xs font-semibold tracking-wide md:text-sm"
                      style={{ color: UI.card.light }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}