"use client"

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  Suspense,
} from "react"
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
  Eye,
} from "lucide-react"
import Image from "next/image"
import { COLORS, UI, SHADOWS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"

// ── Constants ─────────────────────────────────────────────

const PANORAMA_PATH = "/room360.jpg"
const AUTO_ADVANCE_MS = 5200
const INNER_SLIDE_MS = 4500

const ROOMS = [
  {
    id: 1,
    category: "Premium",
    label: "01",
    title: "A/C Room",
    tagline: "Maximum comfort, zero compromise.",
    description:
      "Spacious air-conditioned rooms designed for deep focus and restful nights — because great academics start with great sleep.",
    images: ["/ac-room/1.jpg", "/ac-room/2.jpg", "/ac-room/3.jpg", "/ac-room/4.jpg"],
    features: [
      "2 Sharing", "Attached Bathroom", "Smart AC",
      "Personal Wardrobe", "Study Table", "Laundry Bag",
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
    images: ["/non-ac-room/2.jpg", "/non-ac-room/1.jpg"],
    features: [
      "2 Sharing", "Attached Bathroom", "Ventilated",
      "Personal Wardrobe", "Study Table", "Laundry Bag",
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
    images: [
      "https://www.avdvvn.org/assets/images/d1.jpg",
      "/dormitory/1.jpg",
      "/dormitory/2.jpg",
    ],
    features: [
      "6 Sharing", "Attached Bathroom", "Spacious",
      "Personal Wardrobe", "Study Table", "Laundry Bag",
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
    images: [
      "https://www.avdvvn.org/assets/images/jr1.jpg",
      "/junior-room/1.jpg",
      "/junior-room/2.jpg",
    ],
    features: ["3 Sharing", "Personal Wardrobe", "Study Table", "Laundry Bag"],
    tourAvailable: true,
  },
] as const

type Room = (typeof ROOMS)[number]
type ViewMode = "photo" | "360"

// Map lowercase feature names → icons. Using `Record<string, React.ElementType>`
// avoids the unsafe `any` on the original.
const FEATURE_ICONS: Record<string, React.ElementType> = {
  "2 sharing": Users,
  "3 sharing": Users,
  "6 sharing": Users,
  "attached bathroom": Bath,
  "smart ac": Wind,
  ventilated: Wind,
  spacious: Maximize2,
  "personal wardrobe": Shirt,
  "study table": BookOpen,
  "laundry bag": Shirt,
}

function getFeatureIcon(feature: string): React.ElementType {
  return FEATURE_ICONS[feature.toLowerCase().trim()] ?? Sparkles
}

// ── PanoramaSphere ────────────────────────────────────────

function PanoramaSphere({ url }: { url: string }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        setTexture(tex)
      },
      undefined,
      () => setError(true),
    )
  }, [url])

  if (error) {
    return (
      <Html center>
        <div className="whitespace-nowrap rounded-md bg-black/60 px-3 py-2 text-xs font-bold text-red-400">
          Failed to load 360° image
        </div>
      </Html>
    )
  }

  if (!texture) {
    return (
      <Html center>
        <LoadingSpinner label="Loading 360°…" />
      </Html>
    )
  }

  return (
    <mesh>
      <sphereGeometry args={[10, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

// ── LoadingSpinner (shared UI) ────────────────────────────

function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-b-transparent border-l-transparent border-r-transparent"
        style={{ borderTopColor: COLORS.teal }}
        role="status"
        aria-label={label}
      />
      <span
        className="text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: COLORS.teal }}
        aria-hidden
      >
        {label}
      </span>
    </div>
  )
}

// ── ViewToggle ────────────────────────────────────────────

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div
      className="absolute right-5 top-5 z-30 flex items-center gap-1 rounded-full p-1 backdrop-blur-md"
      style={{
        background: OVERLAYS.glassDark,
        border: `1px solid ${OVERLAYS.borderWhiteSoft}`,
      }}
      role="group"
      aria-label="Image view mode"
    >
      {(["photo", "360"] as const).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className="flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            background: mode === m ? UI.button.primary : "transparent",
            color: mode === m ? COLORS.white : OVERLAYS.white60,
          }}
          aria-pressed={mode === m}
        >
          {m === "360" && <Eye className="h-3 w-3" aria-hidden />}
          {m === "360" ? "360°" : "Photo"}
        </button>
      ))}
    </div>
  )
}

// ── ImagePanel ────────────────────────────────────────────

interface ImagePanelProps {
  room: Room
  innerIdx: number
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onPrev: () => void
  onNext: () => void
  onDotClick: (i: number) => void
}

function ImagePanel({
  room,
  innerIdx,
  viewMode,
  onViewModeChange,
  onPrev,
  onNext,
  onDotClick,
}: ImagePanelProps) {
  return (
    <div
      className="relative min-h-[300px] h-full overflow-hidden md:min-h-[400px] lg:min-h-[460px]"
      aria-label={`${room.title} image`}
      role="region"
    >
      <ViewToggle mode={viewMode} onChange={onViewModeChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${room.id}-${viewMode}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {viewMode === "360" ? (
            <PanoramaView />
          ) : (
            <PhotoView
              room={room}
              innerIdx={innerIdx}
              onDotClick={onDotClick}
            />
          )}

          {/* Watermark number */}
          <div
            className="pointer-events-none absolute bottom-0 left-2 select-none text-[120px] font-black leading-none opacity-[0.12] md:text-[170px]"
            style={{
              color: COLORS.white,
              fontFamily: FONT_FAMILY.heading,
              lineHeight: 0.82,
            }}
            aria-hidden
          >
            {room.label}
          </div>

          {/* Mobile nav arrows */}
          <div className="absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 justify-between lg:hidden">
            {(["prev", "next"] as const).map((dir) => (
              <motion.button
                key={dir}
                onClick={dir === "prev" ? onPrev : onNext}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{
                  background: OVERLAYS.glassDark,
                  color: COLORS.white,
                  border: `1px solid ${OVERLAYS.borderWhiteSoft}`,
                }}
                aria-label={dir === "prev" ? "Previous room" : "Next room"}
              >
                {dir === "prev"
                  ? <ChevronLeft className="h-5 w-5" aria-hidden />
                  : <ChevronRight className="h-5 w-5" aria-hidden />}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── PanoramaView ──────────────────────────────────────────

function PanoramaView() {
  return (
    <div className="absolute inset-0" style={{ background: COLORS.cinematicDark }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <ambientLight intensity={0.8} />
        <Suspense
          fallback={
            <Html center>
              <LoadingSpinner label="Loading 360°…" />
            </Html>
          }
        >
          <PanoramaSphere url={PANORAMA_PATH} />
        </Suspense>
        <OrbitControls
          enableZoom
          enablePan={false}
          maxDistance={10}
          minDistance={0.1}
          autoRotate={false}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex justify-center">
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
          aria-hidden
        >
          Drag to look around
        </motion.span>
      </div>
    </div>
  )
}

// ── PhotoView ─────────────────────────────────────────────

interface PhotoViewProps {
  room: Room
  innerIdx: number
  onDotClick: (i: number) => void
}

function PhotoView({ room, innerIdx, onDotClick }: PhotoViewProps) {
  return (
    <>
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${room.id}-${innerIdx}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={room.images[innerIdx]}
              alt={`${room.title} — view ${innerIdx + 1} of ${room.images.length}`}
              fill
              className="object-cover"
              priority={innerIdx === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      {room.images.length > 1 && (
        <div
          className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-1.5"
          role="tablist"
          aria-label="Image slides"
        >
          {room.images.map((_, j) => (
            <button
              key={j}
              role="tab"
              aria-selected={j === innerIdx}
              aria-label={`Go to image ${j + 1}`}
              onClick={() => onDotClick(j)}
              className="h-1 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              style={{
                width: j === innerIdx ? 20 : 5,
                background:
                  j === innerIdx
                    ? OVERLAYS.borderWhiteRest
                    : OVERLAYS.borderSkyLight,
              }}
            />
          ))}
        </div>
      )}

      {/* Depth gradients */}
      <div className="absolute inset-0 z-10" style={{ background: OVERLAYS.depthLeft }} aria-hidden />
      <div className="absolute inset-0 z-10" style={{ background: OVERLAYS.depthTopMild }} aria-hidden />
    </>
  )
}

// ── FeatureChip ───────────────────────────────────────────

interface FeatureChipProps {
  feature: string
  index: number
}

function FeatureChip({ feature, index }: FeatureChipProps) {
  const Icon = getFeatureIcon(feature)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
      className="flex items-center gap-2.5"
    >
      <Icon className="h-4 w-4 flex-shrink-0" style={{ color: COLORS.teal }} aria-hidden />
      <span className="text-[12px] font-semibold" style={{ color: COLORS.navy }}>
        {feature}
      </span>
    </motion.div>
  )
}

// ── ContentPanel ──────────────────────────────────────────

interface ContentPanelProps {
  room: Room
}

function ContentPanel({ room }: ContentPanelProps) {
  return (
    <div
      className="flex flex-col justify-between p-7 sm:p-9 lg:p-11"
      style={{
        background: COLORS.panelBg,
        borderLeft: `1px solid ${UI.border.lighter}`,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${room.id}-content`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-full flex-col"
        >
          {/* Room identity */}
          <div>
            <h3
              className="text-[2.4rem] font-semibold leading-[1.05] md:text-[2.8rem]"
              style={{ color: UI.text.dark, fontFamily: FONT_FAMILY.heading }}
            >
              {room.title}
            </h3>

            <p
              className="mt-2 text-[1.05rem] font-semibold leading-snug"
              style={{ color: UI.text.accent, fontFamily: FONT_FAMILY.heading }}
            >
              {room.tagline}
            </p>

            <p
              className="mt-3.5 text-sm leading-[1.85]"
              style={{ color: COLORS.softNavy, opacity: 0.72 }}
            >
              {room.description}
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full" style={{ background: UI.border.lighter }} aria-hidden />

          {/* Feature chips */}
          <div className="grid grid-cols-2 gap-2" aria-label="Room features">
            {room.features.map((feature, i) => (
              <FeatureChip key={feature} feature={feature} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full" style={{ background: UI.border.lighter }} aria-hidden />

          {/* CTA */}
          <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
            <AnimatedButton
              whileHover={{ scale: 1.04, y: -2, backgroundColor: UI.button.primaryHover }}
              whileTap={{ scale: 0.96 }}
              className="group flex flex-1 items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              style={{
                background: UI.button.primary,
                color: COLORS.white,
                boxShadow: SHADOWS.buttonPrimary,
              }}
              aria-label={`Enquire about the ${room.title}`}
            >
              Enquire Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300" aria-hidden />
            </AnimatedButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── RoomTabs ──────────────────────────────────────────────

interface RoomTabsProps {
  active: number
  onSelect: (i: number) => void
  onInteractionStart: () => void
  onInteractionEnd: () => void
  tabsScrollRef: React.RefObject<HTMLDivElement>
}

function RoomTabs({
  active,
  onSelect,
  onInteractionStart,
  onInteractionEnd,
  tabsScrollRef,
}: RoomTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      viewport={{ once: true }}
      className="mb-8 flex justify-center px-4"
    >
      <div
        ref={tabsScrollRef}
        className="no-scrollbar inline-flex gap-1 overflow-x-auto rounded-[1.5rem] p-1.5"
        style={{
          background: OVERLAYS.darkCardMedium,
          boxShadow: SHADOWS.insetTabs,
          border: `1px solid ${OVERLAYS.borderWhiteFaint}`,
        }}
        role="tablist"
        aria-label="Room type"
        onTouchStart={onInteractionStart}
        onTouchEnd={onInteractionEnd}
        onMouseEnter={onInteractionStart}
        onMouseLeave={onInteractionEnd}
      >
        {ROOMS.map((item, index) => {
          const isActive = index === active
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              data-tab={index}
              onClick={() => onSelect(index)}
              className="group relative flex min-w-[110px] flex-col items-center gap-1 whitespace-nowrap rounded-2xl px-5 py-3 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:min-w-[130px] md:px-6 md:py-3.5"
              style={{ color: isActive ? COLORS.white : UI.text.muted }}
            >
              {/* Sliding active background */}
              {isActive && (
                <motion.div
                  layoutId="activeRoomTab"
                  className="absolute inset-0 z-0 rounded-2xl"
                  style={{
                    background: UI.button.primary,
                    boxShadow: SHADOWS.buttonPrimary,
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover background for inactive */}
              {!isActive && (
                <div
                  className="absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: OVERLAYS.darkCardSoft }}
                  aria-hidden
                />
              )}

              <span
                className="relative z-10 text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-300 group-hover:text-white"
                style={{ opacity: isActive ? 0.9 : 0.6 }}
              >
                {item.label}
              </span>
              <span className="relative z-10 text-[14px] font-bold leading-tight transition-all duration-300 group-hover:scale-105 group-hover:text-white md:text-[15px]">
                {item.title}
              </span>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

// ── Rooms (main) ──────────────────────────────────────────

export default function Rooms() {
  const [active, setActive] = useState(0)
  const [innerIdx, setInnerIdx] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>("photo")
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const tabsScrollRef = useRef<HTMLDivElement>(null)

  const sectionInView = useInView(sectionRef, { amount: 0.15 })
  const room = ROOMS[active]

  // Detect mobile via media query (no resize listener needed)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Reset state when room changes
  useEffect(() => {
    setViewMode("photo")
    setInnerIdx(0)
  }, [active])

  // Auto-cycle inner images
  useEffect(() => {
    if (viewMode !== "photo" || room.images.length <= 1) return
    const t = setInterval(
      () => setInnerIdx((p) => (p + 1) % room.images.length),
      INNER_SLIDE_MS,
    )
    return () => clearInterval(t)
  }, [room.images.length, viewMode, active])

  // Auto-advance rooms on mobile
  const next = useCallback(
    () => setActive((p) => (p + 1) % ROOMS.length),
    [],
  )
  const prev = useCallback(
    () => setActive((p) => (p - 1 + ROOMS.length) % ROOMS.length),
    [],
  )

  useEffect(() => {
    if (!isMobile || !sectionInView || isUserInteracting) return
    const id = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [isMobile, sectionInView, isUserInteracting, next])

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (!isMobile) return
    const el = tabsScrollRef.current
    if (!el) return
    const tab = el.querySelector<HTMLElement>(`[data-tab="${active}"]`)
    if (tab) {
      el.scrollTo({
        left: tab.offsetLeft - el.clientWidth / 2 + tab.clientWidth / 2,
        behavior: "smooth",
      })
    }
  }, [active, isMobile])

  const handleInteractionStart = useCallback(() => setIsUserInteracting(true), [])
  const handleInteractionEnd = useCallback(() => setIsUserInteracting(false), [])
  const handleViewModeChange = useCallback((m: ViewMode) => setViewMode(m), [])
  const handleDotClick = useCallback((i: number) => setInnerIdx(i), [])
  const handleTabSelect = useCallback((i: number) => setActive(i), [])

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`,
        }}
      />

      <section
        id="rooms"
        ref={sectionRef}
        className="relative overflow-hidden py-24 md:py-36"
        style={{ background: UI.section.dark, fontFamily: FONT_FAMILY.sans }}
        aria-labelledby="rooms-heading"
      >
        <div className="container mx-auto max-w-[1400px] px-4">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mb-12 text-center md:mb-14"
          >
            <ScrollShineText
              as="h2"
              id="rooms-heading"
              className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{ color: UI.text.light, fontFamily: FONT_FAMILY.heading }}
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

          {/* ── Tab Row ── */}
          <RoomTabs
            active={active}
            onSelect={handleTabSelect}
            onInteractionStart={handleInteractionStart}
            onInteractionEnd={handleInteractionEnd}
            tabsScrollRef={tabsScrollRef}
          />

          {/* ── Showcase Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
            style={{
              boxShadow: SHADOWS.showcaseSoft,
              border: `1px solid ${OVERLAYS.borderWhiteSubtle}`,
            }}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
          >
            <div className="grid lg:grid-cols-[3fr_2fr]">
              <ImagePanel
                room={room}
                innerIdx={innerIdx}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                onPrev={prev}
                onNext={next}
                onDotClick={handleDotClick}
              />
              <ContentPanel room={room} />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}