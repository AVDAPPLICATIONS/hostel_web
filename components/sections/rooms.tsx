"use client"

import { useEffect, useRef, useState, Suspense } from "react"
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
import { COLORS, UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"

const rooms = [
  {
    id: 1,
    category: "Premium",
    label: "01",
    title: "A/C Room",
    tagline: "Maximum comfort, zero compromise.",
    description:
      "Spacious air-conditioned rooms designed for deep focus and restful nights — because great academics start with great sleep.",
    image: "/ac-room/1.jpg",
    images: [
      "/ac-room/1.jpg",
      "/ac-room/2.jpg",
      "/ac-room/3.jpg",
      "/ac-room/4.jpg",
    ],
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
    image: "/non-ac-room/2.jpg",
    images: [
      "/non-ac-room/2.jpg",
      "/non-ac-room/1.jpg",
    ],
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
    images: [
      "https://www.avdvvn.org/assets/images/d1.jpg",
      "/dormitory/1.jpg",
      "/dormitory/2.jpg",
    ],
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
    images: [
      "https://www.avdvvn.org/assets/images/jr1.jpg",
      "/junior-room/1.jpg",
      "/junior-room/2.jpg",
    ],
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
  ventilated: Wind,
  spacious: Maximize2,
  "personal wardrobe": Shirt,
  "study table": BookOpen,
  "laundry bag": Shirt,
}

function getFeatureIcon(feature: string) {
  return FEATURE_ICONS[feature.toLowerCase().trim()] || Sparkles
}

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
      () => setError(true)
    )
  }, [url])

  if (error) {
    return (
      <Html center>
        <div className="text-red-400 text-xs font-bold bg-black/60 px-3 py-2 rounded-md whitespace-nowrap">
          Failed to load 360° image
        </div>
      </Html>
    )
  }

  if (!texture) {
    return (
      <Html center>
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-t-[#567C8D] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#567C8D]">
            Loading 360°…
          </span>
        </div>
      </Html>
    )
  }

  return (
    <mesh>
      <sphereGeometry args={[10, 60, 40]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  )
}

export default function Rooms() {
  const [active, setActive] = useState(0)
  const [innerIdx, setInnerIdx] = useState(0)
  const [viewMode, setViewMode] = useState<"photo" | "360">("photo")
  const sectionRef = useRef<HTMLDivElement>(null)
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const sectionInView = useInView(sectionRef, { amount: 0.15 })
  const room = rooms[active]

  useEffect(() => {
    setViewMode("photo")
    setInnerIdx(0)
  }, [active])

  // Cycle inner images if more than one exists
  useEffect(() => {
    if (viewMode !== "photo" || room.images.length <= 1) return
    const t = setInterval(() => {
      setInnerIdx(prev => (prev + 1) % room.images.length)
    }, 4500)
    return () => clearInterval(t)
  }, [room.images.length, viewMode, active])

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

  const next = () => setActive((p) => (p + 1) % rooms.length)
  const prev = () => setActive((p) => (p - 1 + rooms.length) % rooms.length)

  // Auto-advance on mobile
  useEffect(() => {
    if (!isMobile || !sectionInView || isUserInteracting) return
    const id = window.setInterval(next, 5200)
    return () => window.clearInterval(id)
  }, [isMobile, sectionInView, isUserInteracting])

  // Keep active tab visible on mobile
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
        style={{ background: UI.section.dark, fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="container mx-auto max-w-[1400px] px-4">

          {/* ── Header ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mb-12 text-center md:mb-14"
          >
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{ background: UI.card.darkSoft, color: UI.text.muted, border: "1px solid rgba(200,217,230,0.12)" }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={13} />
              Accommodation
            </motion.div>

            <ScrollShineText
              as="h2"
              className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{ color: UI.text.light, fontFamily: "'Cormorant Garamond', serif" }}
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

          {/* ── Tab Row ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="mb-7 flex justify-center"
          >
            <div
              ref={tabsScrollRef}
              className="no-scrollbar inline-flex gap-1.5 overflow-x-auto rounded-2xl p-1.5"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onTouchStart={() => setIsUserInteracting(true)}
              onTouchEnd={() => setIsUserInteracting(false)}
              onMouseEnter={() => setIsUserInteracting(true)}
              onMouseLeave={() => setIsUserInteracting(false)}
            >
              {rooms.map((item, index) => {
                const isActive = index === active
                return (
                  <motion.button
                    key={item.id}
                    data-tab={index}
                    onClick={() => setActive(index)}
                    whileTap={{ scale: 0.96 }}
                    className="relative flex min-w-[100px] flex-col items-center gap-0.5 whitespace-nowrap rounded-xl px-5 py-3 transition-all duration-300"
                    style={{
                      background: isActive ? UI.button.primary : "transparent",
                      color: isActive ? "#fff" : UI.text.muted,
                    }}
                  >
                    <span className="text-[9px] font-black uppercase tracking-[0.22em] opacity-70">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold leading-tight">
                      {item.title}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* ── Showcase Card ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
            style={{
              boxShadow: "0 40px 100px rgba(0,0,0,0.38)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
            onTouchStart={() => setIsUserInteracting(true)}
            onTouchEnd={() => setIsUserInteracting(false)}
            onMouseEnter={() => setIsUserInteracting(true)}
            onMouseLeave={() => setIsUserInteracting(false)}
          >
            <div className="grid lg:grid-cols-[3fr_2fr]">

              {/* ── Image Panel ── */}
              <div className="relative min-h-[340px] overflow-hidden md:min-h-[500px] lg:min-h-[640px]">

                {/* Photo / 360 toggle */}
                <div
                  className="absolute right-5 top-5 z-30 flex items-center gap-1 rounded-full p-1 backdrop-blur-md"
                  style={{
                    background: "rgba(10,18,30,0.60)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <button
                    onClick={() => setViewMode("photo")}
                    className="cursor-pointer rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all duration-300"
                    style={{
                      background: viewMode === "photo" ? UI.button.primary : "transparent",
                      color: viewMode === "photo" ? "#fff" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    Photo
                  </button>
                  <button
                    onClick={() => setViewMode("360")}
                    className="flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all duration-300"
                    style={{
                      background: viewMode === "360" ? UI.button.primary : "transparent",
                      color: viewMode === "360" ? "#fff" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    <Eye className="h-3 w-3" />
                    360°
                  </button>
                </div>

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
                      <div className="absolute inset-0 bg-[#060d18]">
                        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
                          <ambientLight intensity={0.8} />
                          <Suspense
                            fallback={
                              <Html center>
                                <div className="flex flex-col items-center gap-2">
                                  <div className="w-8 h-8 rounded-full border-2 border-t-[#567C8D] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#567C8D]">
                                    Loading 360°…
                                  </span>
                                </div>
                              </Html>
                            }
                          >
                            <PanoramaSphere url="/room360.jpg" />
                          </Suspense>
                          <OrbitControls enableZoom enablePan={false} maxDistance={10} minDistance={0.1} autoRotate={false} />
                        </Canvas>
                        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex justify-center">
                          <motion.span
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
                          >
                            Drag to look around
                          </motion.span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
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
                                alt={`${room.title} aspect ${innerIdx + 1}`}
                                fill
                                className="object-cover"
                                priority
                              />
                            </motion.div>
                          </AnimatePresence>
                        </motion.div>

                        {/* Internal Sub-dots if multiple pictures exist */}
                        {room.images.length > 1 && (
                          <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center gap-1.5">
                            {room.images.map((_, j) => (
                              <div 
                                key={j}
                                className="h-1 rounded-full transition-all duration-300"
                                style={{ 
                                  width: j === innerIdx ? 20 : 5,
                                  background: j === innerIdx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"
                                }}
                              />
                            ))}
                          </div>
                        )}

                        {/* depth gradients */}
                        <div
                          className="absolute inset-0 z-10"
                          style={{ background: "linear-gradient(135deg, rgba(10,18,30,0.30) 0%, transparent 55%)" }}
                        />
                        <div
                          className="absolute inset-0 z-10"
                          style={{ background: "linear-gradient(to top, rgba(10,18,30,0.70) 0%, transparent 55%)" }}
                        />
                      </>
                    )}

                    {/* Category badge */}
                    <div className="absolute left-5 top-5">
                      <span
                        className="inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] backdrop-blur-md"
                        style={{
                          background: "rgba(10,18,30,0.55)",
                          color: COLORS.sky,
                          border: "1px solid rgba(255,255,255,0.14)",
                        }}
                      >
                        {room.category}
                      </span>
                    </div>

                    {/* Giant watermark number */}
                    <div
                      className="pointer-events-none absolute bottom-0 left-2 select-none text-[120px] font-black leading-none opacity-[0.12] md:text-[170px]"
                      style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", lineHeight: 0.82 }}
                    >
                      {room.label}
                    </div>

                    {/* Progress dots */}
                    <div className="absolute bottom-5 right-5 flex items-center gap-2">
                      {rooms.map((_, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setActive(i)}
                          className="h-1.5 rounded-full"
                          style={{
                            width: i === active ? 28 : 8,
                            background: i === active ? UI.button.primary : "rgba(255,255,255,0.40)",
                          }}
                          whileHover={{ scale: 1.25 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Room ${i + 1}`}
                        />
                      ))}
                    </div>

                    {/* Mobile nav arrows */}
                    <div className="absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 justify-between lg:hidden">
                      <motion.button
                        onClick={prev}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md"
                        style={{ background: "rgba(10,18,30,0.55)", color: "#fff", border: "1px solid rgba(255,255,255,0.14)" }}
                        aria-label="Previous room"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        onClick={next}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md"
                        style={{ background: "rgba(10,18,30,0.55)", color: "#fff", border: "1px solid rgba(255,255,255,0.14)" }}
                        aria-label="Next room"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Content Panel ── */}
              <div
                className="flex flex-col justify-between p-7 sm:p-9 lg:p-11"
                style={{ background: "#FAFBFC", borderLeft: `1px solid ${UI.border.lighter}` }}
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
                      <span
                        className="mb-3 inline-block text-[10px] font-black uppercase tracking-[0.28em]"
                        style={{ color: UI.text.accent }}
                      >
                        {room.category} Room
                      </span>

                      <h3
                        className="text-[2.4rem] font-semibold leading-[1.05] md:text-[2.8rem]"
                        style={{
                          color: UI.text.dark,
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        {room.title}
                      </h3>

                      <p
                        className="mt-2 text-[1.05rem] font-semibold leading-snug"
                        style={{
                          color: UI.text.accent,
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
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
                    <div
                      className="my-6 h-px w-full"
                      style={{ background: UI.border.lighter }}
                    />

                    {/* Feature chips */}
                    <div className="grid grid-cols-2 gap-2">
                      {room.features.map((feature, i) => {
                        const Icon = getFeatureIcon(feature)
                        return (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                            style={{
                              background: "#F1F5F9",
                              border: "1px solid #E2E8F0",
                            }}
                          >
                            <div
                              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                              style={{ background: COLORS.softSky, color: COLORS.teal }}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span
                              className="text-[12px] font-semibold"
                              style={{ color: COLORS.navy }}
                            >
                              {feature}
                            </span>
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Divider */}
                    <div
                      className="my-6 h-px w-full"
                      style={{ background: UI.border.lighter }}
                    />

                    {/* CTA */}
                    <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex flex-1 items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-black transition-all"
                        style={{
                          background: UI.button.primary,
                          color: "#fff",
                          boxShadow: "0 12px 32px rgba(86,124,141,0.38)",
                        }}
                      >
                        Enquire Now
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>

                      {room.tourAvailable && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                              style={{ background: UI.button.primary }}
                            />
                            <span
                              className="relative inline-flex h-2 w-2 rounded-full"
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
<<<<<<< HEAD

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
                                  border: "none",
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
=======
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
>>>>>>> f75f139a85d9390175831a90464687d83a49d1c0
              </div>
            </div>

            {/* ── Bottom Bar (desktop) ── */}
            <div
              className="hidden items-center justify-between px-10 py-4 lg:flex"
              style={{
                background: "#F5F8FA",
                borderTop: "1px solid #E2E8F0",
              }}
            >
              {/* Prev / Next */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={prev}
                  whileHover={{ scale: 1.1, backgroundColor: UI.button.primary, color: "#fff" }}
                  whileTap={{ scale: 0.93 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all"
                  style={{ background: "#EEF2F5", borderColor: "#D8E1E8", color: COLORS.navy }}
                  aria-label="Previous room"
                >
                  <ChevronLeft className="h-4 w-4" />
                </motion.button>
                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.1, backgroundColor: UI.button.primary, color: "#fff" }}
                  whileTap={{ scale: 0.93 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all"
                  style={{ background: "#EEF2F5", borderColor: "#D8E1E8", color: COLORS.navy }}
                  aria-label="Next room"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Counter */}
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: COLORS.softTeal }}
              >
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(rooms.length).padStart(2, "0")}
              </span>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {rooms.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-1.5 rounded-full"
                    style={{
                      width: i === active ? 24 : 8,
                      background: i === active ? UI.button.primary : "#CBD5E0",
                    }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Go to room ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
