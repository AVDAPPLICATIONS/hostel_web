"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Grid3X3,
  LayoutList,
  Sparkles,
  ImageIcon,
} from "lucide-react"
import Image from "next/image"
import { UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import ScrollRevealCard from "@/components/shared/scroll-reveal-card"
import CinematicPhoto from "@/components/shared/cinematic-photo"

const categories = ["All", "Rooms", "Common Area", "Outdoor"]

const galleryImages = [
  {
    id: 1,
    src: "https://www.avdvvn.org/assets/images/final_room%202.jpg",
    category: "Rooms",
    title: "AC Room",
  },
  {
    id: 2,
    src: "https://www.avdvvn.org/assets/images/final%20room%204.jpg",
    category: "Rooms",
    title: "Non-AC Room",
  },
  {
    id: 3,
    src: "https://www.avdvvn.org/assets/images/d1.jpg",
    category: "Rooms",
    title: "Dormitory",
  },
  {
    id: 4,
    src: "https://www.avdvvn.org/assets/images/jr1.jpg",
    category: "Rooms",
    title: "Junior Room",
  },
  {
    id: 5,
    src: "https://www.avdvvn.org/assets/images/dh1.jpg",
    category: "Common Area",
    title: "Dining Hall",
  },
  {
    id: 6,
    src: "https://www.avdvvn.org/assets/images/gym.jpg",
    category: "Common Area",
    title: "Gymnasium",
  },
  {
    id: 7,
    src: "https://www.avdvvn.org/assets/images/r1.png",
    category: "Common Area",
    title: "Reading Room",
  },
  {
    id: 8,
    src: "https://www.avdvvn.org/assets/images/e3.jpg",
    category: "Outdoor",
    title: "Cultural Event",
  },
  {
    id: 9,
    src: "https://www.avdvvn.org/assets/images/s1.jpg",
    category: "Outdoor",
    title: "Sports Event",
  },
  {
    id: 10,
    src: "https://www.avdvvn.org/assets/images/t1.jpeg",
    category: "Outdoor",
    title: "Temple",
  },
  {
    id: 11,
    src: "https://www.avdvvn.org/assets/images/e1.jpg",
    category: "Outdoor",
    title: "Celebration",
  },
  {
    id: 12,
    src: "https://www.avdvvn.org/assets/images/bathroom.jpg",
    category: "Rooms",
    title: "Attached Bathroom",
  },
]

function MagneticCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-50, 50], [5, -5])
  const rotateY = useTransform(x, [-50, 50], [-5, 5])

  const springX = useSpring(rotateX, {
    stiffness: 300,
    damping: 30,
  })

  const springY = useSpring(rotateY, {
    stiffness: 300,
    damping: 30,
  })

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
      onClick={onClick}
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

function GalleryCard({
  image,
  index,
  layout,
  onClick,
}: {
  image: (typeof galleryImages)[0]
  index: number
  layout: "grid" | "masonry"
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const heights = ["h-56", "h-72", "h-64", "h-80", "h-60", "h-72"]
  const masonryHeight = layout === "masonry" ? heights[index % heights.length] : "h-64"

  return (
    <CinematicPhoto
      className="min-w-[82vw] snap-center md:min-w-0"
    >
      <MagneticCard
        className="group block w-full cursor-pointer"
        onClick={onClick}
      >
        <div
          className={`relative overflow-hidden rounded-[1.6rem] ${masonryHeight}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: UI.card.soft,
            border: `1px solid ${hovered ? UI.border.white : UI.border.soft}`,
            boxShadow: hovered ? UI.shadow.soft : "0 10px 24px rgba(0,0,0,0.14)",
          }}
        >
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-cover transition-all duration-700 ease-out"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />

          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: UI.text.dark,
              opacity: hovered ? 0.26 : 0.38,
            }}
          />

          <motion.div
            className="absolute left-4 top-4"
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : -8,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <span
              className="rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em]"
              style={{
                background: UI.card.light,
                color: UI.text.accent,
                border: `1px solid ${UI.border.white}`,
              }}
            >
              {image.category}
            </span>
          </motion.div>

          <motion.div
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: UI.card.light,
              color: UI.text.dark,
              border: `1px solid ${UI.border.white}`,
            }}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.72,
            }}
            transition={{
              duration: 0.3,
              ease: "backOut",
            }}
          >
            <ZoomIn className="h-4 w-4" />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <motion.div
              className="mb-3 h-[3px] rounded-full"
              style={{ background: UI.button.primary }}
              animate={{ width: hovered ? "48px" : "0px" }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            />

            <h3
              className="text-xl font-semibold leading-tight tracking-tight"
              style={{
                color: UI.text.light,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {image.title}
            </h3>

            <p
              className="mt-1 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: UI.text.muted }}
            >
              {image.category}
            </p>
          </div>
        </div>
      </MagneticCard>
    </CinematicPhoto>
  )
}

function Lightbox({
  image,
  images,
  onClose,
  onNavigate,
}: {
  image: (typeof galleryImages)[0]
  images: typeof galleryImages
  onClose: () => void
  onNavigate: (dir: "prev" | "next") => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onNavigate("prev")
      if (e.key === "ArrowRight") onNavigate("next")
    }

    window.addEventListener("keydown", handler)

    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onNavigate])

  const currentIndex = images.findIndex((item) => item.id === image.id)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(47, 65, 86, 0.96)",
          backdropFilter: "blur(18px)",
        }}
      />

      <motion.button
        className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-all"
        style={{
          background: UI.card.light,
          color: UI.text.dark,
          borderColor: UI.border.white,
        }}
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        whileTap={{ scale: 0.9 }}
        aria-label="Close gallery"
      >
        <X className="h-5 w-5" />
      </motion.button>

      <motion.div
        className="relative z-10 w-full max-w-5xl px-14 md:px-20"
        initial={{
          scale: 0.85,
          opacity: 0,
          y: 30,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        exit={{
          scale: 0.9,
          opacity: 0,
          y: -20,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden rounded-[1.8rem] p-1"
          style={{
            background: UI.card.soft,
            boxShadow: UI.shadow.card,
          }}
        >
          <div
            className="overflow-hidden rounded-[1.55rem]"
            style={{
              border: `1px solid ${UI.border.white}`,
              background: UI.card.light,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={image.id}
                initial={{
                  opacity: 0,
                  x: 30,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                  filter: "blur(4px)",
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  width={1000}
                  height={650}
                  className="max-h-[68vh] w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div
              className="flex items-end justify-between gap-5 p-6"
              style={{ background: UI.card.light }}
            >
              <div>
                <span
                  className="mb-2 block text-[9px] font-black uppercase tracking-[0.2em]"
                  style={{ color: UI.text.accent }}
                >
                  {image.category}
                </span>

                <h3
                  className="text-3xl font-semibold"
                  style={{
                    color: UI.text.dark,
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {image.title}
                </h3>
              </div>

              <span
                className="text-sm font-mono"
                style={{ color: UI.text.accent }}
              >
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="scrollbar-hide mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <motion.button
              key={img.id}
              className="relative flex-shrink-0 overflow-hidden rounded-lg"
              style={{
                width: 56,
                height: 40,
                outline:
                  img.id === image.id
                    ? `2px solid ${UI.button.primary}`
                    : "2px solid transparent",
                outlineOffset: 2,
                opacity: img.id === image.id ? 1 : 0.48,
              }}
              onClick={() => {
                const dir = index > currentIndex ? "next" : "prev"
                const steps = Math.abs(index - currentIndex)

                for (let i = 0; i < steps; i++) {
                  setTimeout(() => onNavigate(dir), i * 60)
                }
              }}
              whileHover={{
                opacity: 0.9,
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Open ${img.title}`}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {(["prev", "next"] as const).map((dir) => (
        <motion.button
          key={dir}
          className={`absolute ${
            dir === "prev" ? "left-4 md:left-6" : "right-4 md:right-6"
          } top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition-all`}
          style={{
            background: UI.card.light,
            color: UI.text.dark,
            borderColor: UI.border.white,
          }}
          initial={{
            opacity: 0,
            x: dir === "prev" ? -20 : 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ delay: 0.25 }}
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(dir)
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: UI.button.primary,
            color: UI.button.primaryText,
          }}
          whileTap={{ scale: 0.92 }}
          aria-label={dir === "prev" ? "Previous image" : "Next image"}
        >
          {dir === "prev" ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </motion.button>
      ))}
    </motion.div>
  )
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxId, setLightboxId] = useState<number | null>(null)
  const [layout, setLayout] = useState<"grid" | "masonry">("grid")

  const filtered =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === selectedCategory)

  const lightboxImage = filtered.find((item) => item.id === lightboxId) ?? null

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      if (!lightboxId) return

      const index = filtered.findIndex((item) => item.id === lightboxId)

      const nextIndex =
        dir === "prev"
          ? (index - 1 + filtered.length) % filtered.length
          : (index + 1) % filtered.length

      setLightboxId(filtered[nextIndex].id)
    },
    [lightboxId, filtered]
  )

  const counts = categories.reduce((acc, category) => {
    acc[category] =
      category === "All"
        ? galleryImages.length
        : galleryImages.filter((item) => item.category === category).length

    return acc
  }, {} as Record<string, number>)

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }

            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />

      <section
        id="gallery"
        className="relative overflow-hidden px-4 py-24 md:py-32"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="relative container mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 46,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
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
              Our Facilities
            </motion.div>

            <ScrollShineText
              as="h2"
              className="text-5xl font-semibold leading-[1.05] md:text-7xl justify-center text-center"
              style={{
                color: UI.text.light,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              A Glimpse Inside
            </ScrollShineText>

            <p
              className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg"
              style={{ color: UI.text.muted }}
            >
              Take a visual journey through Atmiya Vidya Dham — where comfort
              meets tradition.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            viewport={{ once: true }}
            className="mb-10 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = selectedCategory === category

                return (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full px-5 py-2 text-sm font-bold transition-all"
                    style={{
                      color: active ? UI.button.primaryText : UI.text.muted,
                      background: active ? UI.button.primary : UI.card.darkSoft,
                      border: `1px solid ${
                        active ? UI.button.primary : UI.border.soft
                      }`,
                    }}
                    whileHover={{
                      scale: 1.04,
                      backgroundColor: active
                        ? UI.button.primaryHover
                        : UI.card.light,
                      color: active ? UI.button.primaryText : UI.text.dark,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {category}

                    <span
                      className="ml-2 text-[10px] font-mono opacity-70"
                      style={{
                        color: active ? UI.button.primaryText : "inherit",
                      }}
                    >
                      {counts[category]}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            <div
              className="hidden items-center gap-1 rounded-full border p-1 md:flex"
              style={{
                background: UI.card.darkSoft,
                borderColor: UI.border.soft,
              }}
            >
              {([
                ["grid", Grid3X3],
                ["masonry", LayoutList],
              ] as const).map(([itemLayout, Icon]) => {
                const active = layout === itemLayout

                return (
                  <motion.button
                    key={itemLayout}
                    onClick={() => setLayout(itemLayout)}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-all"
                    style={{
                      background: active ? UI.button.primary : "transparent",
                      color: active ? UI.button.primaryText : UI.text.muted,
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Switch to ${itemLayout} layout`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            layout
            className={`
              scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6
              md:grid md:overflow-visible md:pb-0
              ${
                layout === "masonry"
                  ? "md:grid-cols-3 md:items-start"
                  : "md:grid-cols-2 lg:grid-cols-3"
              }
            `}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((image, index) => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  index={index}
                  layout={layout}
                  onClick={() => setLightboxId(image.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-5 flex items-center justify-center gap-3 md:hidden"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronRight
                className="h-4 w-4"
                style={{ color: UI.text.muted }}
              />
            </motion.div>

            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: UI.text.muted }}
            >
              Swipe to explore
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div
              className="h-px max-w-[80px] flex-1"
              style={{ background: UI.border.soft }}
            />

            <span
              className="flex items-center gap-2 text-xs font-mono"
              style={{ color: UI.text.muted }}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
            </span>

            <div
              className="h-px max-w-[80px] flex-1"
              style={{ background: UI.border.soft }}
            />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxId && lightboxImage && (
          <Lightbox
            image={lightboxImage}
            images={filtered}
            onClose={() => setLightboxId(null)}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </>
  )
}