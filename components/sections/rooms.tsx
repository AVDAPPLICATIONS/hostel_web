"use client"

import { useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion"
import {
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Wind,
  Bath,
  BookOpen,
  Shirt,
  Wifi,
  BedDouble,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { COLORS, UI } from "@/lib/theme"

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

const featureIcons = [BedDouble, Bath, Wind, Shirt, BookOpen, Wifi]

export default function Rooms() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const room = rooms[active]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  const next = () => setActive((prev) => (prev + 1) % rooms.length)

  const prev = () =>
    setActive((prev) => (prev - 1 + rooms.length) % rooms.length)

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

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
        className="relative overflow-hidden px-4 py-24 md:py-36"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="relative container mx-auto max-w-7xl">
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

            <h2
              className="text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{
                color: UI.text.light,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Our Living{" "}
              <motion.span
                className="inline-block"
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
                Spaces
              </motion.span>
            </h2>

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
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="no-scrollbar flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {rooms.map((item, index) => {
                const activeTab = index === active

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActive(index)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative min-w-[220px] overflow-hidden rounded-2xl p-4 text-left transition-all lg:min-w-0"
                    style={{
                      background: activeTab ? UI.card.light : UI.card.darkSoft,
                      border: `1.5px solid ${
                        activeTab ? UI.border.white : UI.border.soft
                      }`,
                      boxShadow: activeTab ? UI.shadow.soft : "none",
                    }}
                  >
                    <AnimatePresence>
                      {activeTab && (
                        <motion.div
                          layoutId="activeRoomTab"
                          className="absolute bottom-0 left-0 top-0 w-1"
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
            <motion.div
              initial={{ opacity: 0, y: 46, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.85,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[2rem] p-1"
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
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={room.id}
                        initial={{
                          opacity: 0,
                          scale: 1.04,
                          filter: "blur(6px)",
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          scale: 1.04,
                          filter: "blur(6px)",
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
                          filter: "blur(4px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          y: -18,
                          filter: "blur(4px)",
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

                        <div className="mb-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {room.features.map((feature, index) => {
                            const Icon =
                              featureIcons[index % featureIcons.length]

                            return (
                              <motion.div
                                key={feature}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: 0.08 + index * 0.05,
                                  duration: 0.35,
                                  ease: "easeOut",
                                }}
                                className="flex items-center gap-3 rounded-2xl p-3"
                                style={{
                                  background: UI.card.white,
                                  border: `1px solid ${UI.border.light}`,
                                }}
                              >
                                <div
                                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                                  style={{
                                    background: UI.card.soft,
                                    color: UI.text.dark,
                                  }}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>

                                <span
                                  className="text-sm font-bold"
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
            </motion.div>
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