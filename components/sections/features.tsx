"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion"
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

const features = [
  {
    icon: Landmark,
    title: "Temple",
    description: "A serene temple where peace and spirituality prevails",
    accent: "#C8A96E",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Spacious parking facilities within campus grounds",
    accent: "#8EB4D4",
  },
  {
    icon: Video,
    title: "CCTV Surveillance",
    description: "24/7 monitoring for complete student safety",
    accent: "#A8B87A",
  },
  {
    icon: Shirt,
    title: "Laundry Service",
    description: "Comprehensive washing and ironing included",
    accent: "#D4A5A5",
  },
  {
    icon: Dumbbell,
    title: "Gymnasium",
    description: "Fully equipped gym for physical fitness",
    accent: "#7BA7BC",
  },
  {
    icon: Utensils,
    title: "Dining Hall",
    description: "Hygienic vegetarian food served fresh daily",
    accent: "#C8A96E",
  },
  {
    icon: BookOpen,
    title: "Reading Room",
    description: "Dedicated quiet space for focused study",
    accent: "#D4956A",
  },
  {
    icon: Users,
    title: "Hospitality",
    description: "Warm staff dedicated to student wellbeing",
    accent: "#8EB4D4",
  },
  {
    icon: Smile,
    title: "Weekly Sabha",
    description: "Regular spiritual and cultural gatherings",
    accent: "#A8B87A",
  },
  {
    icon: ArrowUpDown,
    title: "Lift Access",
    description: "24/7 elevator access across all floors",
    accent: "#D4A5A5",
  },
  {
    icon: Trophy,
    title: "Sports Ground",
    description: "Spacious grounds for sports and activities",
    accent: "#7BA7BC",
  },
  {
    icon: Tv,
    title: "TV Room",
    description: "Entertainment room for downtime and relaxation",
    accent: "#C8A96E",
  },
  {
    icon: HeartPulse,
    title: "First-Aid",
    description: "Medical facilities available round the clock",
    accent: "#D4956A",
  },
  {
    icon: Droplets,
    title: "Water Cooler",
    description: "Purified drinking water on every floor",
    accent: "#8EB4D4",
  },
]

const stats = [
  { number: "1000+", label: "Prayer Hall Capacity", accent: "#C8A96E" },
  { number: "100%", label: "Vegetarian Meals", accent: "#A8B87A" },
  { number: "24/7", label: "Medical Support", accent: "#D4956A" },
  { number: "5★", label: "Hostel Rating", accent: "#7BA7BC" },
]

// Tilt card with magnetic hover
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
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set(e.clientX - rect.left - rect.width / 2)
      y.set(e.clientY - rect.top - rect.height / 2)
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
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated counting stat
function AnimatedStat({ value, accent }: { value: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isInView) return

    // Parse the numeric portion
    const numericMatch = value.match(/(\d+)/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const target = parseInt(numericMatch[1])
    const suffix = value.replace(numericMatch[1], "").trim()
    const prefix = value.indexOf(numericMatch[1]) > 0 ? value.substring(0, value.indexOf(numericMatch[1])) : ""
    const duration = 1500
    const steps = 40
    const increment = target / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      // Ease-out cubic
      const progress = 1 - Math.pow(1 - step / steps, 3)
      current = Math.round(target * progress)

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
      className="text-4xl md:text-6xl font-bold mb-2 transition-colors duration-500 tabular-nums"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        color: accent,
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
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = current.clientWidth * 0.6
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .features-scroll::-webkit-scrollbar { display: none; }
        .features-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
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

        {/* Ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #C8A96E, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #7BA7BC, transparent 70%)" }}
          />
        </div>

        {/* Thin top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-[0.08]"
          style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }}
        />

        <div className="relative container mx-auto px-4 max-w-7xl">
          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
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
                Amenities
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A96E]" />
            </motion.div>

            <h2
              className="text-5xl md:text-7xl font-semibold text-white mb-5 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Why Choose{" "}
              <em className="not-italic" style={{ color: "#C8A96E" }}>
                Us?
              </em>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Every detail is crafted to create a home away from home — fostering
              growth, discipline, and community.
            </p>
          </motion.div>

          {/* ── Amenities Scroll Grid ── */}
          <div className="relative">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d1b2a] to-transparent z-10 pointer-events-none hidden md:block" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d1b2a] to-transparent z-10 pointer-events-none hidden md:block" />

            <div
              ref={scrollContainerRef}
              className="features-scroll grid grid-rows-2 grid-flow-col gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-2 auto-cols-[calc(50%-0.5rem)] md:auto-cols-[calc(33.333%-0.875rem)] lg:auto-cols-[calc(25%-0.9375rem)] scroll-smooth"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="snap-center h-full"
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
                      className="relative h-full rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col items-start transition-all duration-500 group cursor-default"
                      style={{
                        background:
                          hoveredIndex === index
                            ? "rgba(255,255,255,0.07)"
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${
                          hoveredIndex === index
                            ? `${feature.accent}40`
                            : "rgba(255,255,255,0.06)"
                        }`,
                        boxShadow:
                          hoveredIndex === index
                            ? `0 20px 50px -15px ${feature.accent}25`
                            : "none",
                      }}
                    >
                      {/* Accent glow on hover */}
                      <div
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-[0.12] transition-opacity duration-700 blur-2xl"
                        style={{ background: feature.accent }}
                      />

                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 flex-shrink-0"
                        style={{
                          background:
                            hoveredIndex === index
                              ? `${feature.accent}25`
                              : "rgba(255,255,255,0.06)",
                          border: `1px solid ${
                            hoveredIndex === index
                              ? `${feature.accent}40`
                              : "rgba(255,255,255,0.08)"
                          }`,
                        }}
                      >
                        <feature.icon
                          className="h-5 w-5 transition-colors duration-500"
                          style={{
                            color:
                              hoveredIndex === index
                                ? feature.accent
                                : "rgba(255,255,255,0.5)",
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className="text-sm md:text-base font-semibold mb-1.5 transition-colors duration-500 leading-tight"
                        style={{
                          color:
                            hoveredIndex === index ? "white" : "rgba(255,255,255,0.7)",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(14px, 1.1vw, 18px)",
                        }}
                      >
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-xs leading-relaxed transition-colors duration-500"
                        style={{
                          color:
                            hoveredIndex === index
                              ? "rgba(255,255,255,0.55)"
                              : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {feature.description}
                      </p>

                      {/* Bottom accent line */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] rounded-full"
                        style={{ background: feature.accent }}
                        initial={{ width: 0 }}
                        animate={{
                          width: hoveredIndex === index ? "60px" : "0px",
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Navigation ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-3 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <span className="text-white/15 text-[10px] tracking-[0.2em] uppercase font-medium mx-2">
              Scroll
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* ── Stats Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-24 md:mt-32"
          >
            {/* Divider */}
            <div className="flex items-center gap-4 justify-center mb-14">
              <div className="h-px flex-1 max-w-[120px] bg-white/[0.06]" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-medium"
                style={{ color: "#C8A96E" }}
              >
                At a Glance
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    {/* Glow behind number */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] blur-2xl transition-opacity duration-700 rounded-full"
                      style={{ background: stat.accent }}
                    />
                    <AnimatedStat value={stat.number} accent={stat.accent} />
                  </motion.div>
                  <div className="text-white/30 text-xs md:text-sm font-medium tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
