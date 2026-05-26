"use client"

import type React from "react"

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
  forwardRef,
} from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  type PanInfo,
} from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Grid3X3,
  LayoutList,
  ImageIcon,
} from "lucide-react"
import Image from "next/image"
import { COLORS, UI, SHADOWS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"

// ── Constants ─────────────────────────────────────────────

const CATEGORIES = ["All", "Rooms", "Common Area", "Outdoor"] as const
type Category = (typeof CATEGORIES)[number]
type Layout = "grid" | "list"

const GALLERY_IMAGES = [
  { id: 1, src: "https://www.avdvvn.org/assets/images/final_room%202.jpg", category: "Rooms", title: "AC Room" },
  { id: 2, src: "/non-ac-room/1.jpg", category: "Rooms", title: "Non-AC Room" },
  { id: 3, src: "https://www.avdvvn.org/assets/images/d1.jpg", category: "Rooms", title: "Dormitory" },
  { id: 4, src: "https://www.avdvvn.org/assets/images/jr1.jpg", category: "Rooms", title: "Junior Room" },
  { id: 5, src: "https://www.avdvvn.org/assets/images/dh1.jpg", category: "Common Area", title: "Dining Hall" },
  { id: 6, src: "https://www.avdvvn.org/assets/images/gym.jpg", category: "Common Area", title: "Gymnasium" },
  { id: 7, src: "https://www.avdvvn.org/assets/images/r1.png", category: "Common Area", title: "Reading Room" },
  { id: 8, src: "https://www.avdvvn.org/assets/images/e3.jpg", category: "Outdoor", title: "Cultural Event" },
  { id: 9, src: "https://www.avdvvn.org/assets/images/s1.jpg", category: "Outdoor", title: "Sports Event" },
  { id: 10, src: "https://www.avdvvn.org/assets/images/t1.jpeg", category: "Outdoor", title: "Temple" },
  { id: 11, src: "https://www.avdvvn.org/assets/images/e1.jpg", category: "Outdoor", title: "Celebration" },
  { id: 12, src: "https://www.avdvvn.org/assets/images/bathroom.jpg", category: "Rooms", title: "Attached Bathroom" },
] as const

type GalleryImage = (typeof GALLERY_IMAGES)[number]

// ── Utilities ─────────────────────────────────────────────

function wrap(index: number, length: number) {
  return ((index % length) + length) % length
}

// ── MagneticCard ─────────────────────────────────────────

const MagneticCard = memo(function MagneticCard({
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
})

// ── GalleryCard ───────────────────────────────────────────

const GalleryCard = forwardRef<
  HTMLDivElement,
  {
    image: GalleryImage
    index: number
    layout: Layout
    onClick: () => void
  }
>(function GalleryCard({ image, index, layout, onClick }, ref) {
    const [hovered, setHovered] = useState(false)

    const sizeClass = layout === "list" ? "aspect-video md:aspect-[21/9]" : "aspect-[4/3]"

    return (
      <motion.div
        ref={ref}
        className={`snap-center min-w-[82vw] ${layout === "list" ? "md:min-w-[75vw] lg:min-w-[65vw]" : "md:min-w-0"
          }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        layout
      >
      <MagneticCard className="group block w-full cursor-pointer" onClick={onClick}>
        {/* Keyboard-accessible wrapper */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Open ${image.title} in lightbox`}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
          className={`relative overflow-hidden rounded-[1.6rem] ${sizeClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
          style={{
            // @ts-ignore — CSS custom property
            "--tw-ring-color": UI.button.primary,
            background: UI.card.soft,
            border: `1px solid ${hovered ? OVERLAYS.borderWhiteStrong : UI.border.soft}`,
            boxShadow: hovered ? SHADOWS.cardHover : SHADOWS.card,
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={image.src}
            alt={image.title}
            fill
            sizes="(max-width: 768px) 82vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1.0)" }}
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: OVERLAYS.depthDarkOverlay,
              opacity: hovered ? 0.22 : 0.1,
            }}
          />

          {/* Bottom gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: OVERLAYS.depthTopSoft,
              opacity: hovered ? 1 : 0.6,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Category badge */}
          <motion.div
            className="absolute left-4 top-4"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            <span
              className="rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md"
              style={{
                background: OVERLAYS.glassLight,
                color: UI.text.accent,
                border: `1px solid ${OVERLAYS.borderWhiteStrong}`,
              }}
            >
              {image.category}
            </span>
          </motion.div>

          {/* Zoom icon */}
          <motion.div
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md"
            style={{
              background: OVERLAYS.glassLight,
              color: UI.text.dark,
              border: `1px solid ${OVERLAYS.borderWhiteStrong}`,
            }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.25, ease: "backOut" }}
            aria-hidden="true"
          >
            <ZoomIn className="h-4 w-4" />
          </motion.div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <motion.div
              className="mb-2.5 h-[2.5px] rounded-full"
              style={{ background: UI.button.primary }}
              animate={{ width: hovered ? "40px" : "0px" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              aria-hidden="true"
            />
            <h3
              className="text-lg font-semibold leading-tight tracking-tight sm:text-xl"
              style={{ color: COLORS.white, fontFamily: FONT_FAMILY.heading }}
            >
              {image.title}
            </h3>
            <p
              className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: OVERLAYS.borderSkyStrong }}
            >
              {image.category}
            </p>
          </div>
        </div>
      </MagneticCard>
    </motion.div>
  )
})

// ── Lightbox ──────────────────────────────────────────────

function Lightbox({
  image,
  images,
  onClose,
  onNavigate,
}: {
  image: GalleryImage
  images: readonly GalleryImage[]
  onClose: () => void
  onNavigate: (dir: "prev" | "next") => void
}) {
  const currentIndex = useMemo(
    () => images.findIndex((item) => item.id === image.id),
    [images, image.id]
  )

  // ── Keyboard navigation ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onNavigate("prev")
      if (e.key === "ArrowRight") onNavigate("next")
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onNavigate])

  // ── Focus trap ──
  const lightboxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    lightboxRef.current?.focus()
    return () => previouslyFocused?.focus()
  }, [])

  // ── Swipe gesture (touch & mouse drag) ──
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const SWIPE_THRESHOLD = 60
      if (info.offset.x < -SWIPE_THRESHOLD) onNavigate("next")
      else if (info.offset.x > SWIPE_THRESHOLD) onNavigate("prev")
    },
    [onNavigate]
  )

  // ── Direct thumbnail jump (fixed: no setTimeout loop) ──
  const jumpTo = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentIndex) return
      onNavigate(targetIndex > currentIndex ? "next" : "prev")
      // For non-adjacent thumbnails, we schedule multiple steps cleanly
      const steps = Math.abs(targetIndex - currentIndex) - 1
      if (steps > 0) {
        const dir = targetIndex > currentIndex ? "next" : "prev"
        for (let i = 1; i <= steps; i++) {
          setTimeout(() => onNavigate(dir), i * 60)
        }
      }
    },
    [currentIndex, onNavigate]
  )

  return (
    <motion.div
      ref={lightboxRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${image.title}`}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-50 flex items-center justify-center outline-none"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: OVERLAYS.glassDarker, backdropFilter: "blur(20px)" }}
        aria-hidden="true"
      />

      {/* Close button */}
      <motion.button
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-all md:right-7 md:top-7"
        style={{
          background: OVERLAYS.borderWhiteSubtle,
          color: COLORS.white,
          borderColor: OVERLAYS.borderWhiteMedium,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.18 }}
        onClick={onClose}
        whileHover={{ background: OVERLAYS.borderWhiteMedium }}
        whileTap={{ scale: 0.9 }}
        aria-label="Close gallery"
      >
        <X className="h-5 w-5" />
      </motion.button>

      {/* Main image panel */}
      <motion.div
        className="relative z-10 w-full max-w-5xl px-14 md:px-20"
        initial={{ scale: 0.88, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: -16 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <div
          className="overflow-hidden rounded-[2rem]"
          style={{
            boxShadow: SHADOWS.showcaseDeep,
            border: `1px solid ${OVERLAYS.borderWhiteSubtle}`,
          }}
        >
          {/* Animated image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={image.id}
              initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={1000}
                height={650}
                priority
                className="max-h-[65vh] w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <div
            className="flex items-end justify-between gap-4 px-6 py-5"
            style={{
              background: COLORS.panelBg,
              borderTop: `1px solid ${COLORS.panelBorder}`,
            }}
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
                style={{ color: UI.text.dark, fontFamily: FONT_FAMILY.heading }}
              >
                {image.title}
              </h3>
            </div>
            <span
              className="flex-shrink-0 font-mono text-sm"
              style={{ color: UI.text.accent }}
              aria-label={`Image ${currentIndex + 1} of ${images.length}`}
            >
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          role="listbox"
          aria-label="Image thumbnails"
          className="scrollbar-hide mt-4 flex justify-center gap-2 overflow-x-auto pb-1"
        >
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              role="option"
              aria-selected={img.id === image.id}
              aria-label={`Jump to ${img.title}`}
              className="relative flex-shrink-0 overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2"
              style={{
                // @ts-ignore
                "--tw-outline-color": UI.button.primary,
                width: 60,
                height: 42,
                outline:
                  img.id === image.id
                    ? `2px solid ${UI.button.primary}`
                    : "2px solid transparent",
                outlineOffset: 2,
                opacity: img.id === image.id ? 1 : 0.45,
                transition: "opacity 0.2s",
              }}
              onClick={() => jumpTo(i)}
              whileHover={{ opacity: 0.9, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
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
          className={`absolute ${dir === "prev" ? "left-4 md:left-6" : "right-4 md:right-6"
            } top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition-all`}
          style={{
            background: OVERLAYS.borderWhiteFaint,
            color: COLORS.white,
            borderColor: OVERLAYS.borderWhiteMedium,
          }}
          initial={{ opacity: 0, x: dir === "prev" ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22 }}
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(dir)
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: UI.button.primary,
            borderColor: UI.button.primary,
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

// ── Gallery (main export) ─────────────────────────────────

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [lightboxId, setLightboxId] = useState<number | null>(null)
  const [layout, setLayout] = useState<Layout>("grid")

  const filtered = useMemo(
    () =>
      selectedCategory === "All"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  )

  const lightboxImage = useMemo(
    () => filtered.find((item) => item.id === lightboxId) ?? null,
    [filtered, lightboxId]
  )

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      if (lightboxId == null) return
      const index = filtered.findIndex((item) => item.id === lightboxId)
      const next =
        dir === "prev"
          ? wrap(index - 1, filtered.length)
          : wrap(index + 1, filtered.length)
      setLightboxId(filtered[next].id)
    },
    [lightboxId, filtered]
  )

  const counts = useMemo(
    () =>
      CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
        acc[cat] =
          cat === "All"
            ? GALLERY_IMAGES.length
            : GALLERY_IMAGES.filter((item) => item.category === cat).length
        return acc
      }, {}),
    []
  )

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar{display:none}
            .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
            .custom-scrollbar::-webkit-scrollbar{height:8px}
            .custom-scrollbar::-webkit-scrollbar-track{background:${OVERLAYS.white02};border-radius:8px}
            .custom-scrollbar::-webkit-scrollbar-thumb{background:${OVERLAYS.white15};border-radius:8px}
            .custom-scrollbar::-webkit-scrollbar-thumb:hover{background:${OVERLAYS.white25}}
            .custom-scrollbar{scrollbar-width:thin;scrollbar-color:${OVERLAYS.white15} ${OVERLAYS.white02}}
          `,
        }}
      />

      <section
        id="gallery"
        aria-label="Photo gallery"
        className="relative overflow-hidden px-4 py-24 md:py-32"
        style={{ background: UI.section.dark, fontFamily: FONT_FAMILY.sans }}
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
            <ScrollShineText
              as="h2"
              className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{ color: UI.text.light, fontFamily: FONT_FAMILY.heading }}
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
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={active}
                    className="rounded-full px-5 py-2 text-sm font-bold transition-colors"
                    style={{
                      color: active ? COLORS.white : UI.text.muted,
                      background: active ? UI.button.primary : UI.card.darkSoft,
                      border: `1px solid ${active ? UI.button.primary : UI.border.soft}`,
                    }}
                    whileHover={{
                      scale: 1.04,
                      backgroundColor: active ? UI.button.primaryHover : UI.card.light,
                      color: active ? COLORS.white : UI.text.dark,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {cat}
                    <span
                      className="ml-2 font-mono text-[10px] opacity-65"
                      aria-label={`${counts[cat]} items`}
                    >
                      {counts[cat]}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Grid / List toggle */}
            <div
              role="group"
              aria-label="Choose layout"
              className="hidden items-center gap-1 rounded-full border p-1 md:flex"
              style={{ background: UI.card.darkSoft, borderColor: UI.border.soft }}
            >
              {([["grid", Grid3X3], ["list", LayoutList]] as const).map(
                ([itemLayout, Icon]) => {
                  const active = layout === itemLayout
                  return (
                    <motion.button
                      key={itemLayout}
                      onClick={() => setLayout(itemLayout)}
                      aria-pressed={active}
                      className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                      style={{
                        background: active ? UI.button.primary : "transparent",
                        color: active ? COLORS.white : UI.text.muted,
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
              ${layout === "list" ? "custom-scrollbar" : "scrollbar-hide"}
              flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6
              ${layout === "list"
                ? "md:gap-6"
                : "md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-3"}
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
            aria-hidden="true"
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
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="h-px max-w-[80px] flex-1" style={{ background: UI.border.soft }} />
            <span
              className="flex items-center gap-2 font-mono text-xs"
              style={{ color: UI.text.muted }}
            >
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
            </span>
            <div className="h-px max-w-[80px] flex-1" style={{ background: UI.border.soft }} />
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxId != null && lightboxImage != null && (
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