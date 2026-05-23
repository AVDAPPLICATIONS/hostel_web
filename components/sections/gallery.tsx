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
<<<<<<< HEAD
import ScrollRevealCard from "@/components/shared/scroll-reveal-card"
=======
import CinematicPhoto from "@/components/shared/cinematic-photo"
>>>>>>> f75f139a85d9390175831a90464687d83a49d1c0

const categories = ["All", "Rooms", "Common Area", "Outdoor"]

const galleryImages = [
  { id: 1,  src: "https://www.avdvvn.org/assets/images/final_room%202.jpg",  category: "Rooms",       title: "AC Room" },
  { id: 2,  src: "https://www.avdvvn.org/assets/images/final%20room%204.jpg", category: "Rooms",       title: "Non-AC Room" },
  { id: 3,  src: "https://www.avdvvn.org/assets/images/d1.jpg",               category: "Rooms",       title: "Dormitory" },
  { id: 4,  src: "https://www.avdvvn.org/assets/images/jr1.jpg",              category: "Rooms",       title: "Junior Room" },
  { id: 5,  src: "https://www.avdvvn.org/assets/images/dh1.jpg",              category: "Common Area", title: "Dining Hall" },
  { id: 6,  src: "https://www.avdvvn.org/assets/images/gym.jpg",              category: "Common Area", title: "Gymnasium" },
  { id: 7,  src: "https://www.avdvvn.org/assets/images/r1.png",               category: "Common Area", title: "Reading Room" },
  { id: 8,  src: "https://www.avdvvn.org/assets/images/e3.jpg",               category: "Outdoor",     title: "Cultural Event" },
  { id: 9,  src: "https://www.avdvvn.org/assets/images/s1.jpg",               category: "Outdoor",     title: "Sports Event" },
  { id: 10, src: "https://www.avdvvn.org/assets/images/t1.jpeg",              category: "Outdoor",     title: "Temple" },
  { id: 11, src: "https://www.avdvvn.org/assets/images/e1.jpg",               category: "Outdoor",     title: "Celebration" },
  { id: 12, src: "https://www.avdvvn.org/assets/images/bathroom.jpg",         category: "Rooms",       title: "Attached Bathroom" },
]

// ── MagneticCard ─────────────────────────────────────────
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
  const rotateX = useTransform(y, [-50, 50], [4, -4])
  const rotateY = useTransform(x, [-50, 50], [-4, 4])
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
      onClick={onClick}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── GalleryCard ───────────────────────────────────────────
const masonryHeights = ["h-56", "h-72", "h-64", "h-80", "h-60", "h-72"]

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

  const sizeClass =
    layout === "masonry"
      ? masonryHeights[index % masonryHeights.length]
      : "aspect-[4/3]"

  return (
<<<<<<< HEAD
    <div className="min-w-[82vw] snap-center md:min-w-0">
      <MagneticCard
        className="group block w-full cursor-pointer"
        onClick={onClick}
      >
        <div
          className={`relative overflow-hidden rounded-common ${masonryHeight}`}
=======
    <CinematicPhoto className="min-w-[82vw] snap-center md:min-w-0">
      <MagneticCard className="group block w-full cursor-pointer" onClick={onClick}>
        <div
          className={`relative overflow-hidden rounded-[1.6rem] ${sizeClass}`}
>>>>>>> f75f139a85d9390175831a90464687d83a49d1c0
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: UI.card.soft,
            border: `1px solid ${hovered ? "rgba(255,255,255,0.55)" : UI.border.soft}`,
            boxShadow: hovered
              ? "0 20px 50px rgba(0,0,0,0.28)"
              : "0 6px 20px rgba(0,0,0,0.16)",
          }}
        >
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1.0)" }}
          />

          {/* Overlay — subtle at rest, slightly stronger on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: "rgba(15,25,40,1)",
              opacity: hovered ? 0.22 : 0.10,
            }}
          />

          {/* Bottom gradient for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(10,18,30,0.75) 0%, transparent 55%)",
              opacity: hovered ? 1 : 0.6,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Category badge — slides in on hover */}
          <motion.div
            className="absolute left-4 top-4"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
            transition={{ duration: 0.25 }}
          >
            <span
              className="rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md"
              style={{
                background: "rgba(248,250,252,0.90)",
                color: UI.text.accent,
                border: "1px solid rgba(255,255,255,0.55)",
              }}
            >
              {image.category}
            </span>
          </motion.div>

          {/* Zoom icon — scales in on hover */}
          <motion.div
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md"
            style={{
              background: "rgba(248,250,252,0.90)",
              color: UI.text.dark,
              border: "1px solid rgba(255,255,255,0.55)",
            }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.25, ease: "backOut" }}
          >
            <ZoomIn className="h-4 w-4" />
          </motion.div>

          {/* Title area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <motion.div
              className="mb-2.5 h-[2.5px] rounded-full"
              style={{ background: UI.button.primary }}
              animate={{ width: hovered ? "40px" : "0px" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <h3
              className="text-lg font-semibold leading-tight tracking-tight sm:text-xl"
              style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}
            >
              {image.title}
            </h3>
            <p
              className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "rgba(200,217,230,0.75)" }}
            >
              {image.category}
            </p>
          </div>
        </div>
      </MagneticCard>
    </div>
  )
}

// ── Lightbox ──────────────────────────────────────────────
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
      if (e.key === "Escape")      onClose()
      if (e.key === "ArrowLeft")   onNavigate("prev")
      if (e.key === "ArrowRight")  onNavigate("next")
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
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,18,30,0.96)", backdropFilter: "blur(20px)" }}
      />

      {/* Close */}
      <motion.button
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-all md:right-7 md:top-7"
        style={{ background: "rgba(255,255,255,0.10)", color: "#fff", borderColor: "rgba(255,255,255,0.18)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.18 }}
        onClick={onClose}
        whileHover={{ background: "rgba(255,255,255,0.18)" }}
        whileTap={{ scale: 0.9 }}
        aria-label="Close gallery"
      >
        <X className="h-5 w-5" />
      </motion.button>

      {/* Main image */}
      <motion.div
        className="relative z-10 w-full max-w-5xl px-14 md:px-20"
        initial={{ scale: 0.88, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: -16 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
<<<<<<< HEAD
          className="relative overflow-hidden rounded-common p-1"
=======
          className="overflow-hidden rounded-[2rem]"
>>>>>>> f75f139a85d9390175831a90464687d83a49d1c0
          style={{
            boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
<<<<<<< HEAD
          <div
            className="overflow-hidden rounded-common"
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
=======
          {/* Photo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={image.id}
              initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0,  filter: "blur(0px)" }}
              exit={{    opacity: 0, x: -24, filter: "blur(4px)" }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
>>>>>>> f75f139a85d9390175831a90464687d83a49d1c0
            >
              <Image
                src={image.src}
                alt={image.title}
                width={1000}
                height={650}
                className="max-h-[65vh] w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <div
            className="flex items-end justify-between gap-4 px-6 py-5"
            style={{ background: "#FAFBFC", borderTop: "1px solid #E2E8F0" }}
          >
            <div>
              <span
                className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.22em]"
                style={{ color: UI.text.accent }}
              >
                {image.category}
              </span>
              <h3
                className="text-2xl font-semibold sm:text-3xl"
                style={{ color: UI.text.dark, fontFamily: "'Cormorant Garamond', serif" }}
              >
                {image.title}
              </h3>
            </div>
            <span className="flex-shrink-0 font-mono text-sm" style={{ color: UI.text.accent }}>
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="scrollbar-hide mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              className="relative flex-shrink-0 overflow-hidden rounded-xl"
              style={{
                width: 60,
                height: 42,
                outline: img.id === image.id ? `2px solid ${UI.button.primary}` : "2px solid transparent",
                outlineOffset: 2,
                opacity: img.id === image.id ? 1 : 0.45,
                transition: "opacity 0.2s",
              }}
              onClick={() => {
                const dir = i > currentIndex ? "next" : "prev"
                const steps = Math.abs(i - currentIndex)
                for (let s = 0; s < steps; s++) setTimeout(() => onNavigate(dir), s * 55)
              }}
              whileHover={{ opacity: 0.9, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Open ${img.title}`}
            >
              <Image src={img.src} alt={img.title} fill className="object-cover" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Prev / Next arrows */}
      {(["prev", "next"] as const).map((dir) => (
        <motion.button
          key={dir}
          className={`absolute ${dir === "prev" ? "left-4 md:left-6" : "right-4 md:right-6"} top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition-all`}
          style={{
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            borderColor: "rgba(255,255,255,0.16)",
          }}
          initial={{ opacity: 0, x: dir === "prev" ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22 }}
          onClick={(e) => { e.stopPropagation(); onNavigate(dir) }}
          whileHover={{ scale: 1.1, backgroundColor: UI.button.primary, borderColor: UI.button.primary }}
          whileTap={{ scale: 0.92 }}
          aria-label={dir === "prev" ? "Previous image" : "Next image"}
        >
          {dir === "prev" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </motion.button>
      ))}
    </motion.div>
  )
}

// ── Gallery ───────────────────────────────────────────────
export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxId, setLightboxId]             = useState<number | null>(null)
  const [layout, setLayout]                     = useState<"grid" | "masonry">("grid")

  const filtered =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === selectedCategory)

  const lightboxImage = filtered.find((item) => item.id === lightboxId) ?? null

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      if (!lightboxId) return
      const index = filtered.findIndex((item) => item.id === lightboxId)
      const next = dir === "prev"
        ? (index - 1 + filtered.length) % filtered.length
        : (index + 1) % filtered.length
      setLightboxId(filtered[next].id)
    },
    [lightboxId, filtered]
  )

  const counts = categories.reduce((acc, cat) => {
    acc[cat] = cat === "All"
      ? galleryImages.length
      : galleryImages.filter((item) => item.category === cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`,
        }}
      />

      <section
        id="gallery"
        className="relative overflow-hidden px-4 py-24 md:py-32"
        style={{ background: UI.section.dark, fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="container mx-auto max-w-7xl">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 46 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mb-14 text-center md:mb-16"
          >
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{
                background: UI.card.darkSoft,
                color: UI.text.muted,
                border: "1px solid rgba(200,217,230,0.12)",
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={13} />
              Our Facilities
            </motion.div>

            <ScrollShineText
              as="h2"
              className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{ color: UI.text.light, fontFamily: "'Cormorant Garamond', serif" }}
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

          {/* ── Filters + Layout Toggle ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-10 flex flex-wrap items-center justify-between gap-4"
          >
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="rounded-full px-5 py-2 text-sm font-bold transition-all"
                    style={{
                      color: active ? "#fff" : UI.text.muted,
                      background: active ? UI.button.primary : UI.card.darkSoft,
                      border: `1px solid ${active ? UI.button.primary : UI.border.soft}`,
                    }}
                    whileHover={{
                      scale: 1.04,
                      backgroundColor: active ? UI.button.primaryHover : UI.card.light,
                      color: active ? "#fff" : UI.text.dark,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {cat}
                    <span
                      className="ml-2 font-mono text-[10px] opacity-65"
                      style={{ color: active ? "#fff" : "inherit" }}
                    >
                      {counts[cat]}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Grid / Masonry toggle */}
            <div
              className="hidden items-center gap-1 rounded-full border p-1 md:flex"
              style={{ background: UI.card.darkSoft, borderColor: UI.border.soft }}
            >
              {([["grid", Grid3X3], ["masonry", LayoutList]] as const).map(
                ([itemLayout, Icon]) => {
                  const active = layout === itemLayout
                  return (
                    <motion.button
                      key={itemLayout}
                      onClick={() => setLayout(itemLayout)}
                      className="flex h-9 w-9 items-center justify-center rounded-full transition-all"
                      style={{
                        background: active ? UI.button.primary : "transparent",
                        color: active ? "#fff" : UI.text.muted,
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Switch to ${itemLayout} layout`}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.button>
                  )
                }
              )}
            </div>
          </motion.div>

          {/* ── Photo Grid ── */}
          <motion.div
            layout
            className={`
              scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6
              md:grid md:overflow-visible md:pb-0 md:gap-5
              ${layout === "masonry"
                ? "md:grid-cols-3 md:items-start"
                : "md:grid-cols-2 lg:grid-cols-3"}
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

          {/* Mobile swipe hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-5 flex items-center justify-center gap-2 md:hidden"
          >
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="h-4 w-4" style={{ color: UI.text.muted }} />
            </motion.div>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: UI.text.muted }}
            >
              Swipe to explore
            </span>
          </motion.div>

          {/* Photo count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="h-px max-w-[80px] flex-1" style={{ background: UI.border.soft }} />
            <span
              className="flex items-center gap-2 font-mono text-xs"
              style={{ color: UI.text.muted }}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
            </span>
            <div className="h-px max-w-[80px] flex-1" style={{ background: UI.border.soft }} />
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
