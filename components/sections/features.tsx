"use client"


import { motion } from "framer-motion"
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
} from "lucide-react"
import { COLORS, UI, SHADOWS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"

const features = [
  {
    icon: Landmark,
    title: "Temple",
    description: "A serene space where peace and spirituality prevails",
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

const row1 = features.slice(0, 7)
const row2 = features.slice(7)

type Feature = (typeof features)[number]

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div
      className="group flex w-[268px] flex-shrink-0 cursor-default select-none flex-col gap-3.5 rounded-2xl p-5 transition-all duration-300"
      style={{
        background: OVERLAYS.cardGlassLight,
        border: `1px solid ${OVERLAYS.borderWhiteFaint}`,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          background: OVERLAYS.tealMedium,
          border: `1px solid ${OVERLAYS.tealBorderSoft}`,
        }}
      >
        <Icon className="h-5 w-5" style={{ color: COLORS.sky }} />
      </div>

      <div>
        <h3 className="mb-1.5 text-[15px] font-bold leading-tight text-white">
          {title}
        </h3>
        <p
          className="text-[13px] leading-relaxed"
          style={{ color: "#6B7B8D" }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee-left {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-right {
              0%   { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
          `,
        }}
      />

      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: UI.section.dark, fontFamily: FONT_FAMILY.sans }}
      >
        {/* Header */}
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mb-16 text-center md:mb-20"
          >
            <ScrollShineText
              as="h2"
              className="mb-5 block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{ fontFamily: FONT_FAMILY.heading, color: UI.text.light }}
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
        </div>

        {/* Marquee — full-width, outside container */}
        <div className="relative">
          {/* Left fade */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 md:w-48"
            style={{ background: `linear-gradient(to right, ${COLORS.navy} 10%, ${COLORS.navy}00)` }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 md:w-48"
            style={{ background: `linear-gradient(to left, ${COLORS.navy} 10%, ${COLORS.navy}00)` }}
          />

          {/* Row 1 — scrolls left */}
          <div className="mb-4 overflow-hidden">
            <div
              className="flex w-max gap-4 px-4"
              style={{
                animation: "marquee-left 38s linear infinite",
              }}
            >
              {[...row1, ...row1].map((f, i) => (
                <FeatureCard key={i} {...f} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="overflow-hidden">
            <div
              className="flex w-max gap-4 px-4"
              style={{
                animation: "marquee-right 32s linear infinite",
              }}
            >
              {[...row2, ...row2].map((f, i) => (
                <FeatureCard key={i} {...f} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer count */}
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="h-px max-w-24 flex-1" style={{ background: UI.border.soft }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{ color: UI.text.muted }}
            >
              {features.length} Amenities
            </span>
            <div className="h-px max-w-24 flex-1" style={{ background: UI.border.soft }} />
          </motion.div>
        </div>
      </section>
    </>
  )
}
