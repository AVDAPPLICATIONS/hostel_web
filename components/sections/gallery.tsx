"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3, LayoutList } from "lucide-react"
import Image from "next/image"

const categories = ["All", "Rooms", "Common Area", "Outdoor"]

const galleryImages = [
  { id: 1, src: "https://www.avdvvn.org/assets/images/final_room%202.jpg", category: "Rooms", title: "AC Room", accent: "#C8A96E" },
  { id: 2, src: "https://www.avdvvn.org/assets/images/final%20room%204.jpg", category: "Rooms", title: "Non-AC Room", accent: "#8EB4D4" },
  { id: 3, src: "https://www.avdvvn.org/assets/images/d1.jpg", category: "Rooms", title: "Dormitory", accent: "#9FB8AD" },
  { id: 4, src: "https://www.avdvvn.org/assets/images/jr1.jpg", category: "Rooms", title: "Junior Room", accent: "#D4A5A5" },
  { id: 5, src: "https://www.avdvvn.org/assets/images/dh1.jpg", category: "Common Area", title: "Dining Hall", accent: "#C8A96E" },
  { id: 6, src: "https://www.avdvvn.org/assets/images/gym.jpg", category: "Common Area", title: "Gymnasium", accent: "#7BA7BC" },
  { id: 7, src: "https://www.avdvvn.org/assets/images/r1.png", category: "Common Area", title: "Reading Room", accent: "#A8B5A0" },
  { id: 8, src: "https://www.avdvvn.org/assets/images/e3.jpg", category: "Outdoor", title: "Cultural Event", accent: "#D4956A" },
  { id: 9, src: "https://www.avdvvn.org/assets/images/s1.jpg", category: "Outdoor", title: "Sports Event", accent: "#7BA7BC" },
  { id: 10, src: "https://www.avdvvn.org/assets/images/t1.jpeg", category: "Outdoor", title: "Temple", accent: "#C8A96E" },
  { id: 11, src: "https://www.avdvvn.org/assets/images/e1.jpg", category: "Outdoor", title: "Celebration", accent: "#D4956A" },
  { id: 12, src: "https://www.avdvvn.org/assets/images/bathroom.jpg", category: "Rooms", title: "Attached Bathroom", accent: "#8EB4D4" },
]

// Magnetic hover card
function MagneticCard({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [6, -6])
  const rotateY = useTransform(x, [-50, 50], [-6, 6])
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }, [x, y])

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

// Individual gallery card
function GalleryCard({
  image,
  index,
  layout,
  onClick,
}: {
  image: typeof galleryImages[0]
  index: number
  layout: "grid" | "masonry"
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const heights = ["h-56", "h-72", "h-64", "h-80", "h-60", "h-68"]
  const masonryHeight = layout === "masonry" ? heights[index % heights.length] : "h-64"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-w-[82vw] md:min-w-0 snap-center"
    >
      <MagneticCard
        className="cursor-pointer group block w-full"
        onClick={onClick}
      >
        <div
          className={`relative overflow-hidden rounded-2xl ${masonryHeight} bg-[#0d1b2a] shadow-lg`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ boxShadow: hovered ? `0 20px 60px -10px ${image.accent}55` : "0 8px 30px -8px rgba(0,0,0,0.3)" }}
        >
          {/* Image */}
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-cover transition-all duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />

          {/* Base gradient always visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/80 via-transparent to-transparent" />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${image.accent}22, #0d1b2a99)` }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          />

          {/* Top badge */}
          <motion.div
            className="absolute top-4 left-4"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span
              className="text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full backdrop-blur-md"
              style={{ background: `${image.accent}30`, color: image.accent, border: `1px solid ${image.accent}50` }}
            >
              {image.category}
            </span>
          </motion.div>

          {/* Zoom icon */}
          <motion.div
            className="absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border border-white/20 bg-white/10"
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </motion.div>

          {/* Accent line + title */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <motion.div
              className="h-[2px] rounded-full mb-3"
              style={{ background: image.accent }}
              animate={{ width: hovered ? "40px" : "0px" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
            <h3 className="text-white font-semibold text-lg leading-tight tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {image.title}
            </h3>
          </div>

          {/* Shimmer on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
            animate={{ backgroundPosition: hovered ? ["200% 0%", "-200% 0%"] : "200% 0%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
      </MagneticCard>
    </motion.div>
  )
}

// Lightbox
function Lightbox({
  image,
  images,
  onClose,
  onNavigate,
}: {
  image: typeof galleryImages[0]
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

  const currentIndex = images.findIndex((i) => i.id === image.id)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-[#060d16]/95 backdrop-blur-xl" />

      {/* Decorative accent ring */}
      <motion.div
        className="absolute rounded-full border opacity-10 pointer-events-none"
        style={{ width: 600, height: 600, borderColor: image.accent }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Close */}
      <motion.button
        className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center border border-white/15 bg-white/8 backdrop-blur-sm text-white hover:bg-white/15 transition-colors z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Main image container */}
      <motion.div
        className="relative z-10 max-w-5xl w-full px-16 md:px-20"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image frame */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            boxShadow: `0 40px 100px -20px ${image.accent}40, 0 0 0 1px rgba(255,255,255,0.05)`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={image.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={1000}
                height={650}
                className="w-full max-h-[68vh] object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0d1b2a]/90 to-transparent">
            <div className="flex items-end justify-between">
              <div>
                <span
                  className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2 block"
                  style={{ color: image.accent }}
                >
                  {image.category}
                </span>
                <h3 className="text-white text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {image.title}
                </h3>
              </div>
              <span className="text-white/30 text-sm font-mono">
                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              className="relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: 52,
                height: 36,
                outline: img.id === image.id ? `2px solid ${image.accent}` : "2px solid transparent",
                outlineOffset: 2,
                opacity: img.id === image.id ? 1 : 0.45,
              }}
              onClick={() => {
                const dir = i > currentIndex ? "next" : "prev"
                // navigate to specific - simulate by calling parent
              }}
              whileHover={{ opacity: 0.9, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={img.src} alt={img.title} fill className="object-cover" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Nav buttons */}
      {(["prev", "next"] as const).map((dir) => (
        <motion.button
          key={dir}
          className={`absolute ${dir === "prev" ? "left-4 md:left-6" : "right-4 md:right-6"} top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center border border-white/15 bg-white/8 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/30 transition-all z-10`}
          initial={{ opacity: 0, x: dir === "prev" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          onClick={(e) => { e.stopPropagation(); onNavigate(dir) }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          {dir === "prev" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </motion.button>
      ))}
    </motion.div>
  )
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxId, setLightboxId] = useState<number | null>(null)
  const [layout, setLayout] = useState<"grid" | "masonry">("grid")
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const filtered = selectedCategory === "All" ? galleryImages : galleryImages.filter((i) => i.category === selectedCategory)
  const lightboxImage = filtered.find((i) => i.id === lightboxId) ?? null

  const navigate = useCallback((dir: "prev" | "next") => {
    if (!lightboxId) return
    const idx = filtered.findIndex((i) => i.id === lightboxId)
    const next = dir === "prev"
      ? (idx - 1 + filtered.length) % filtered.length
      : (idx + 1) % filtered.length
    setLightboxId(filtered[next].id)
  }, [lightboxId, filtered])

  const counts = categories.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? galleryImages.length : galleryImages.filter((i) => i.category === cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <>
      {/* Google Font import */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <section
        id="gallery"
        className="relative py-24 overflow-hidden"
        style={{
          background: "linear-gradient(170deg, #060d16 0%, #0d1b2a 40%, #091520 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Ambient background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #C8A96E, transparent 70%)" }} />
          <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #7BA7BC, transparent 70%)" }} />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #C8A96E, transparent 70%)" }} />
          {/* Grain */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-4 max-w-7xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
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
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: "#C8A96E" }}>
                Our Facilities
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A96E]" />
            </motion.div>

            <h2
              className="text-5xl md:text-7xl font-semibold text-white mb-5 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A Glimpse Inside
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Take a visual journey through Atmiya Vidya Dham — where comfort meets tradition
            </p>
          </motion.div>

          {/* Controls row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10 gap-4 flex-wrap"
          >
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    onMouseEnter={() => setHoveredCategory(cat)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 outline-none"
                    style={{
                      color: active ? "#0d1b2a" : "rgba(255,255,255,0.5)",
                      background: active ? "#C8A96E" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${active ? "#C8A96E" : "rgba(255,255,255,0.1)"}`,
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {cat}
                    <span
                      className="ml-2 text-[10px] font-mono opacity-60"
                      style={{ color: active ? "#0d1b2a" : "rgba(255,255,255,0.35)" }}
                    >
                      {counts[cat]}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Layout toggle */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
              {([["grid", Grid3X3], ["masonry", LayoutList]] as const).map(([l, Icon]) => (
                <motion.button
                  key={l}
                  onClick={() => setLayout(l)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: layout === l ? "rgba(200,169,110,0.2)" : "transparent",
                    color: layout === l ? "#C8A96E" : "rgba(255,255,255,0.35)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className={`
              flex md:grid gap-5 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide snap-x snap-mandatory
              ${layout === "masonry"
                ? "md:grid-cols-3 md:items-start"
                : "md:grid-cols-2 lg:grid-cols-3"}
            `}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <GalleryCard
                  key={img.id}
                  image={img}
                  index={i}
                  layout={layout}
                  onClick={() => setLightboxId(img.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Mobile swipe hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex md:hidden items-center justify-center gap-3 mt-5"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="w-4 h-4 text-white/20" />
            </motion.div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/25 font-medium">Swipe to explore</span>
          </motion.div>

          {/* Bottom count line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 flex items-center gap-4 justify-center"
          >
            <div className="h-px flex-1 max-w-[80px] bg-white/8" />
            <span className="text-white/20 text-xs font-mono">
              {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-white/8" />
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
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
