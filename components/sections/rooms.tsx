"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Wind,
  Bath,
  BookOpen,
  Shirt,
  Users,
  Maximize2,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { COLORS, UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import ScrollRevealCard from "@/components/shared/scroll-reveal-card"

const rooms = [
  {
    id: 1,
    category: "Premium",
    label: "01",
    title: "A/C Room",
    tagline: "Maximum comfort, zero compromise.",
    description:
      "Spacious air-conditioned rooms designed for deep focus and restful nights — because great academics start with great sleep.",
    image: "https://www.avdvvn.org/assets/images/final_room%202.jpg",
    features: [
      "2 Sharing",
      "Attached Bathroom",
      "Smart AC",
      "Personal Wardrobe",
      "Study Table",
      "Laundry Bag",
    ],
    tourAvailable: true,
  },
  {
    id: 2,
    category: "Standard",
    label: "02",
    title: "Non-AC Room",
    tagline: "Naturally ventilated, thoughtfully designed.",
    description:
      "Well-ventilated rooms with premium furniture and all essential amenities — comfort that breathes with you.",
    image: "https://www.avdvvn.org/assets/images/final%20room%204.jpg",
    features: [
      "2 Sharing",
      "Attached Bathroom",
      "Ventilated",
      "Personal Wardrobe",
      "Study Table",
      "Laundry Bag",
    ],
    tourAvailable: true,
  },
  {
    id: 3,
    category: "Economy",
    label: "03",
    title: "Dormitory",
    tagline: "Community living at its finest.",
    description:
      "Budget-friendly shared spaces that foster lifelong friendships and a culture of collaborative growth.",
    image: "https://www.avdvvn.org/assets/images/d1.jpg",
    features: [
      "6 Sharing",
      "Attached Bathroom",
      "Spacious",
      "Personal Wardrobe",
      "Study Table",
      "Laundry Bag",
    ],
    tourAvailable: false,
  },
  {
    id: 4,
    category: "Juniors",
    label: "04",
    title: "Junior Room",
    tagline: "Safe, supervised, and made for young minds.",
    description:
      "Dedicated spaces for high school students with extra care and supervision for a smooth transition.",
    image: "https://www.avdvvn.org/assets/images/jr1.jpg",
    features: ["3 Sharing", "Personal Wardrobe", "Study Table", "Laundry Bag"],
    tourAvailable: true,
  },
]

const FEATURE_ICONS: Record<string, any> = {
  "2 sharing": Users,
  "3 sharing": Users,
  "6 sharing": Users,
  "attached bathroom": Bath,
  "smart ac": Wind,
  "ventilated": Wind,
  "spacious": Maximize2,
  "personal wardrobe": Shirt,
  "study table": BookOpen,
  "laundry bag": Shirt,
}

function getFeatureIcon(feature: string) {
  const norm = feature.toLowerCase().trim()
  return FEATURE_ICONS[norm] || Sparkles
}

export default function Rooms() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const tabsInView = useInView(tabsScrollRef, { amount: 0.2 })
  const showcaseInView = useInView(showcaseRef, { amount: 0.25 })
  const sectionInView = useInView(sectionRef, { amount: 0.2 })
  const [isMobile, setIsMobile] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const room = rooms[active]

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  const next = () => setActive((prev) => (prev + 1) % rooms.length)

  const prev = () =>
    setActive((prev) => (prev - 1 + rooms.length) % rooms.length)

  // Keep the active tab centered on mobile as the room changes
  useEffect(() => {
    if (!isMobile) return
    const el = tabsScrollRef.current
    if (!el) return

    const tab = el.querySelector<HTMLElement>(`[data-room-tab="${active}"]`)
    tab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [active, isMobile])

  // Auto-advance the active room on mobile (syncs with the tabs row)
  useEffect(() => {
    if (!isMobile) return
    if (!sectionInView || !showcaseInView) return
    if (isUserInteracting) return

    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % rooms.length)
    }, 5200)

    return () => window.clearInterval(interval)
  }, [isMobile, sectionInView, showcaseInView, isUserInteracting])

  useEffect(() => {
    if (!isMobile) return
    if (!tabsInView) return
    if (isUserInteracting) return

    const interval = window.setInterval(() => {
      const el = tabsScrollRef.current
      if (!el) return

      const maxScrollLeft = el.scrollWidth - el.clientWidth

      // Keep it moving; when we hit the end, jump back to start
      if (el.scrollLeft >= maxScrollLeft - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: 180, behavior: "smooth" })
      }
    }, 2200)

    return () => window.clearInterval(interval)
  }, [isMobile, tabsInView, isUserInteracting])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }

            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />

      <section
        id="rooms"
        ref={sectionRef}
        className="relative overflow-hidden py-24 md:py-36"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="relative container mx-auto max-w-7xl px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
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
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={14} />
              Accommodation
            </motion.div>

            <ScrollShineText
              as="h2"
              className="text-5xl font-semibold leading-[1.05] md:text-7xl block justify-center text-center"
              style={{
                color: UI.text.light,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Our Living Spaces
            </ScrollShineText>

            <p
              className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed md:text-lg"
              style={{ color: UI.text.muted }}
            >
              Four room types, each crafted for a distinct student life — pick
              what suits your chapter.
            </p>
          </motion.div>

          {/* Main Layout */}
          <div className="grid items-start gap-7 lg:grid-cols-[260px_1fr] lg:gap-10">
            {/* Room Tabs */}
            <motion.div
              ref={tabsScrollRef}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="no-scrollbar flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
              onTouchStart={() => setIsUserInteracting(true)}
              onTouchEnd={() => setIsUserInteracting(false)}
              onTouchCancel={() => setIsUserInteracting(false)}
              onMouseEnter={() => setIsUserInteracting(true)}
              onMouseLeave={() => setIsUserInteracting(false)}
            >
              {rooms.map((item, index) => {
                const activeTab = index === active

                return (
                  <motion.button
                    key={item.id}
                    data-room-tab={index}
                    onClick={() => setActive(index)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative min-w-[220px] overflow-hidden rounded-2xl p-4 text-left transition-all lg:min-w-0"
                    style={{
                      background: activeTab ? UI.card.light : UI.card.darkSoft,
                      border: `1.5px solid ${activeTab ? UI.border.white : UI.border.soft
                        }`,
                      boxShadow: activeTab ? UI.shadow.soft : "none",
                    }}
                  >
                    <AnimatePresence>
                      {activeTab && (
                        <motion.div
                          layoutId="activeRoomTab"
                          className="absolute bottom-0 left-0 right-0 h-1 lg:bottom-0 lg:left-0 lg:top-0 lg:h-auto lg:w-1"
                          style={{ background: UI.button.primary }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="pl-2">
                      <span
                        className="mb-1 block text-[10px] font-black uppercase tracking-[0.22em]"
                        style={{
                          color: activeTab ? UI.text.accent : UI.text.muted,
                        }}
                      >
                        {item.label} — {item.category}
                      </span>

                      <span
                        className="block text-base font-bold"
                        style={{
                          color: activeTab ? UI.text.dark : UI.text.light,
                        }}
                      >
                        {item.title}
                      </span>

                      <span
                        className="mt-2 block text-xs leading-5"
                        style={{
                          color: activeTab ? UI.text.accent : UI.text.muted,
                        }}
                      >
                        {item.tagline}
                      </span>
                    </div>
                  </motion.button>
                )
              })}

              <div className="hidden items-center gap-3 pt-3 lg:flex">
                <motion.button
                  onClick={prev}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: UI.button.primary,
                    color: UI.button.primaryText,
                  }}
                  whileTap={{ scale: 0.93 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-all"
                  style={{
                    background: UI.card.darkSoft,
                    borderColor: UI.border.soft,
                    color: UI.text.muted,
                  }}
                  aria-label="Previous room"
                >
                  <ChevronLeft className="h-4 w-4" />
                </motion.button>

                <motion.button
                  onClick={next}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: UI.button.primary,
                    color: UI.button.primaryText,
                  }}
                  whileTap={{ scale: 0.93 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-all"
                  style={{
                    background: UI.card.darkSoft,
                    borderColor: UI.border.soft,
                    color: UI.text.muted,
                  }}
                  aria-label="Next room"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Showcase */}
            <ScrollRevealCard
              ref={showcaseRef}
              className="overflow-hidden rounded-[2rem] p-1"
              delay={0.1}
              style={{
                background: UI.card.soft,
                boxShadow: UI.shadow.card,
              }}
            >
              <div
                className="overflow-hidden rounded-[1.8rem]"
                style={{
                  background: UI.card.light,
                  border: `1px solid ${UI.border.white}`,
                }}
              >
                <div className="grid min-h-[620px] lg:grid-cols-[1.18fr_0.82fr]">
                  {/* Image Panel */}
                  <div
                    className="relative min-h-[320px] overflow-hidden md:min-h-[450px] lg:min-h-full"
                    style={{ background: UI.card.soft }}
                    onTouchStart={() => setIsUserInteracting(true)}
                    onTouchEnd={() => setIsUserInteracting(false)}
                    onTouchCancel={() => setIsUserInteracting(false)}
                    onMouseEnter={() => setIsUserInteracting(true)}
                    onMouseLeave={() => setIsUserInteracting(false)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={room.id}
                        initial={{
                          opacity: 0,
                          scale: 1.04,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 1.04,
                        }}
                        transition={{
                          duration: 0.65,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0"
                      >
                        <motion.div
                          style={{ y: imageY }}
                          className="absolute inset-[-10%]"
                        >
                          <Image
                            src={room.image}
                            alt={room.title}
                            fill
                            className="object-cover"
                            priority
                          />
                        </motion.div>

                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "rgba(47, 65, 86, 0.18)",
                          }}
                        />

                        <div className="absolute left-6 top-6">
                          <span
                            className="inline-flex rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em]"
                            style={{
                              background: UI.card.light,
                              color: UI.text.accent,
                              border: `1px solid ${UI.border.white}`,
                            }}
                          >
                            {room.category}
                          </span>
                        </div>

                        <div
                          className="absolute bottom-6 left-6 select-none text-[96px] font-black leading-none opacity-20 md:text-[130px]"
                          style={{
                            color: UI.text.light,
                            fontFamily: "'Cormorant Garamond', serif",
                          }}
                        >
                          {room.label}
                        </div>

                        <div className="absolute bottom-6 right-6 flex gap-2">
                          {rooms.map((_, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setActive(index)}
                              className="h-2 rounded-full"
                              style={{
                                width: index === active ? 34 : 10,
                                background:
                                  index === active
                                    ? UI.button.primary
                                    : "rgba(255,255,255,0.5)",
                              }}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.92 }}
                              aria-label={`Go to room ${index + 1}`}
                            />
                          ))}
                        </div>

                        <div className="absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 justify-between lg:hidden">
                          <motion.button
                            onClick={prev}
                            whileTap={{ scale: 0.92 }}
                            className="flex h-11 w-11 items-center justify-center rounded-full"
                            style={{
                              background: UI.card.light,
                              color: UI.text.dark,
                              border: `1px solid ${UI.border.white}`,
                            }}
                            aria-label="Previous room"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </motion.button>

                          <motion.button
                            onClick={next}
                            whileTap={{ scale: 0.92 }}
                            className="flex h-11 w-11 items-center justify-center rounded-full"
                            style={{
                              background: UI.card.light,
                              color: UI.text.dark,
                              border: `1px solid ${UI.border.white}`,
                            }}
                            aria-label="Next room"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Content Panel */}
                  <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${room.id}-content`}
                        initial={{
                          opacity: 0,
                          y: 24,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -18,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex h-full flex-col"
                      >
                        <span
                          className="mb-4 text-[11px] font-black uppercase tracking-[0.26em]"
                          style={{ color: UI.text.accent }}
                        >
                          {room.category} Room
                        </span>

                        <h3
                          className="text-4xl font-semibold leading-[1.05] md:text-5xl"
                          style={{
                            color: UI.text.dark,
                            fontFamily: "'Cormorant Garamond', serif",
                          }}
                        >
                          {room.title}
                        </h3>

                        <p
                          className="mt-4 text-lg font-semibold leading-snug"
                          style={{
                            color: UI.text.accent,
                            fontFamily: "'Cormorant Garamond', serif",
                          }}
                        >
                          {room.tagline}
                        </p>

                        <p
                          className="mt-5 text-sm font-normal leading-7 md:text-base"
                          style={{ color: UI.text.accent }}
                        >
                          {room.description}
                        </p>

                        <div
                          className="my-8 h-px w-full"
                          style={{ background: UI.border.light }}
                        />

                        <div className="mb-9 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3">
                          {room.features.map((feature, index) => {
                            const Icon = getFeatureIcon(feature)

                            return (
                              <motion.div
                                key={feature}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{
                                  delay: 0.08 + index * 0.05,
                                  duration: 0.35,
                                  ease: "easeOut",
                                }}
                                className="flex min-h-[56px] items-center gap-2 rounded-xl p-2 sm:min-h-0 sm:gap-3 sm:rounded-2xl sm:p-3 transition-shadow hover:shadow-sm"
                                style={{
                                  background: UI.card.white,
                                  border: `1px solid ${UI.border.light}`,
                                }}
                              >
                                <div
                                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9"
                                  style={{
                                    background: "rgba(86, 124, 141, 0.12)",
                                    color: UI.text.accent,
                                  }}
                                >
                                  <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                                </div>

                                <span
                                  className="text-[13px] font-bold leading-tight sm:text-sm"
                                  style={{ color: UI.text.dark }}
                                >
                                  {feature}
                                </span>
                              </motion.div>
                            )
                          })}
                        </div>

                        <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center">
                          <motion.button
                            whileHover={{
                              scale: 1.03,
                              y: -2,
                              backgroundColor: UI.button.primaryHover,
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="group flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-sm font-black transition-all"
                            style={{
                              background: UI.button.primary,
                              color: UI.button.primaryText,
                              boxShadow: UI.shadow.soft,
                            }}
                          >
                            Enquire Now
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </motion.button>

                          {room.tourAvailable && (
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-2.5 w-2.5">
                                <span
                                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                                  style={{ background: UI.button.primary }}
                                />
                                <span
                                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                                  style={{ background: UI.button.primary }}
                                />
                              </span>

                              <span
                                className="text-[10px] font-black uppercase tracking-[0.2em]"
                                style={{ color: UI.text.accent }}
                              >
                                Tour available
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </ScrollRevealCard>
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div
              className="h-px max-w-24 flex-1"
              style={{ background: UI.border.soft }}
            />

            <span
              className="text-xs font-mono tracking-widest"
              style={{ color: UI.text.muted }}
            >
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(rooms.length).padStart(2, "0")}
            </span>

            <div
              className="h-px max-w-24 flex-1"
              style={{ background: UI.border.soft }}
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}