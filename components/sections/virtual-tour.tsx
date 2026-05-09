"use client"

import { useState, useRef, Suspense, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html, useTexture } from "@react-three/drei"
import { Eye, ChevronLeft, ChevronRight } from "lucide-react"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import * as THREE from "three"

function PanoramaSphere({ url }: { url: string }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        setTexture(tex)
      },
      undefined,
      (err) => {
        console.error("Error loading 360 texture:", err)
        setError(true)
      }
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
          <div className="w-8 h-8 rounded-full border-2 border-t-[#C8A96E] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C8A96E]">
            Loading 360°...
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

export function Room3D({ roomType }: { roomType: string }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
    }
  })

  const roomColors: Record<string, string> = {
    ac: "#C8A96E",
    "non-ac": "#C8A96E",
    dormitory: "#C8A96E",
    junior: "#C8A96E",
  }

  const color = roomColors[roomType] || "#C8A96E"

  return (
    <group ref={meshRef}>
      {/* Room Base */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial color="#1a2332" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 1, -2]}>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial color="#0f1c2e" />
      </mesh>
      <mesh position={[-3, 1, 0]}>
        <boxGeometry args={[0.2, 4, 4]} />
        <meshStandardMaterial color="#0f1c2e" />
      </mesh>

      {/* Beds based on room type */}
      {roomType === "ac" && (
        <mesh position={[-1, -0.3, 0]}>
          <boxGeometry args={[2, 0.4, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      )}
      {roomType === "non-ac" && (
        <>
          <mesh position={[-1, -0.3, -0.8]}>
            <boxGeometry args={[2, 0.4, 0.8]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[-1, -0.3, 0.8]}>
            <boxGeometry args={[2, 0.4, 0.8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </>
      )}
      {roomType === "dormitory" && (
        <>
          {[-1.5, -0.5, 0.5, 1.5].map((z, i) => (
            <mesh key={i} position={[-1, -0.3, z]}>
              <boxGeometry args={[1.5, 0.4, 0.6]} />
              <meshStandardMaterial color={color} />
            </mesh>
          ))}
        </>
      )}
      {roomType === "junior" && (
        <mesh position={[-1, -0.3, 0]}>
          <boxGeometry args={[2.5, 0.4, 1.5]} />
          <meshStandardMaterial color={color} />
        </mesh>
      )}

      {/* Desk */}
      <mesh position={[1.5, -0.5, -1]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#2a3a4e" />
      </mesh>
      {/* Chair */}
      <mesh position={[1.5, -0.2, -0.3]}>
        <boxGeometry args={[0.4, 0.6, 0.4]} />
        <meshStandardMaterial color="#1e2d3d" />
      </mesh>
      {/* Window */}
      <mesh position={[2.9, 0.5, 0]}>
        <boxGeometry args={[0.1, 2, 1.5]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Interactive Hotspots */}
      <Html position={[-1, 0.5, 0]} center>
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform"
          style={{ background: `${color}40`, border: `1px solid ${color}80`, backdropFilter: "blur(6px)" }}>
          <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: color }} />
        </div>
      </Html>
      <Html position={[1.5, 0, -1]} center>
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform"
          style={{ background: `${color}40`, border: `1px solid ${color}80`, backdropFilter: "blur(6px)" }}>
          <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: color }} />
        </div>
      </Html>
    </group>
  )
}

const tourOptions = [
  {
    id: "ac",
    label: "01",
    title: "A/C Room",
    description: "Spacious air-conditioned room with split AC, designed for maximum comfort and deep study focus.",
    duration: "3 min",
    image: "https://www.avdvvn.org/assets/images/final_room%202.jpg",
    highlights: ["Air Conditioning", "Attached Bathroom", "Study Table", "Personal Wardrobe"],
    accent: "#C8A96E",
  },
  {
    id: "non-ac",
    label: "02",
    title: "Non-AC Room",
    description: "Well-ventilated room with premium furniture, balcony access, and all essential amenities.",
    duration: "4 min",
    image: "https://www.avdvvn.org/assets/images/final%20room%204.jpg",
    highlights: ["Study Table", "Personal Wardrobe", "Balcony", "Ventilated"],
    accent: "#C8A96E",
  },
  {
    id: "dormitory",
    label: "03",
    title: "Dormitory",
    description: "Spacious shared living that fosters community, friendships, and collaborative learning.",
    duration: "5 min",
    image: "https://www.avdvvn.org/assets/images/d1.jpg",
    highlights: ["6 Sharing", "Spacious Layout", "Attached Bathroom", "Common Area"],
    accent: "#C8A96E",
  },
  {
    id: "junior",
    label: "04",
    title: "Junior Room",
    description: "Dedicated spaces for high school students with extra supervision and care for young minds.",
    duration: "4 min",
    image: "https://www.avdvvn.org/assets/images/jr1.jpg",
    highlights: ["3 Sharing", "Study Environment", "Supervised", "Personal Wardrobe"],
    accent: "#C8A96E",
  },
]

export default function VirtualTour() {
  const [selectedRoom, setSelectedRoom] = useState("ac")
  const currentRoom = tourOptions.find((room) => room.id === selectedRoom)!
  const currentIdx = tourOptions.findIndex((r) => r.id === selectedRoom)

  const goPrev = () => {
    const idx = (currentIdx - 1 + tourOptions.length) % tourOptions.length
    setSelectedRoom(tourOptions[idx].id)
  }
  const goNext = () => {
    const idx = (currentIdx + 1) % tourOptions.length
    setSelectedRoom(tourOptions[idx].id)
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      `,
        }}
      />

      <section
        id="virtual-tour"
        className="relative py-24 md:py-36 overflow-hidden"
        style={{
          background: "linear-gradient(170deg, #060d16 0%, #0d1b2a 50%, #091520 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000"
            style={{ background: currentRoom.accent }}
          />
          <div
            className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl"
            style={{ background: "#7BA7BC" }}
          />
        </div>

        {/* Top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-[0.08]"
          style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }}
        />

        <div className="relative container mx-auto px-4 max-w-7xl">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
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
                Virtual Tour
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A96E]" />
            </motion.div>

            <ScrollShineText
              as="h2"
              className="text-5xl md:text-7xl font-semibold text-white mb-5 leading-[1.05] justify-center text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Explore Our Rooms
            </ScrollShineText>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Discover every detail of your future home — pick a room type and explore in 3D.
            </p>
          </motion.div>

          {/* ── Main Layout ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-[28px] md:rounded-[36px] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: `0 40px 100px -30px ${currentRoom.accent}18`,
              transition: "box-shadow 0.8s ease",
            }}
          >
            <div className="flex flex-col lg:flex-row min-h-[550px] md:min-h-[620px]">
              {/* Left — 3D Canvas */}
              <div className="relative w-full lg:w-[58%] h-[350px] md:h-[420px] lg:h-auto overflow-hidden bg-[#080e18]">
                {/* 3D Scene */}
                <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
                  <ambientLight intensity={0.8} />
                  <Suspense
                    fallback={
                      <Html center>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full border-2 border-t-[#C8A96E] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C8A96E]">
                            Loading 360°...
                          </span>
                        </div>
                      </Html>
                    }
                  >
                    <PanoramaSphere url="/room360.jpg" />
                  </Suspense>
                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    maxDistance={10}
                    minDistance={0.1}
                    autoRotate={false}
                  />
                </Canvas>

                {/* Overlays */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#080e18]/60 via-transparent to-[#080e18]/30" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-[#0a1220]/40" />

                {/* Room number watermark */}
                <div
                  className="absolute top-6 left-7 select-none pointer-events-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(64px, 10vw, 100px)",
                    fontWeight: 700,
                    color: "white",
                    opacity: 0.06,
                    lineHeight: 1,
                  }}
                >
                  {currentRoom.label}
                </div>

                {/* Center interaction hint */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `${currentRoom.accent}20`,
                        border: `1px solid ${currentRoom.accent}40`,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Eye className="w-5 h-5" style={{ color: currentRoom.accent }} />
                    </div>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-white/30">
                      Drag to explore
                    </span>
                  </motion.div>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10">
                  <div>
                    <span
                      className="text-[9px] tracking-[0.25em] uppercase font-bold block mb-1"
                      style={{ color: currentRoom.accent }}
                    >
                      3D Preview
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-semibold text-white"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {currentRoom.title}
                    </h3>
                  </div>

                  <div
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
                    style={{
                      background: `${currentRoom.accent}20`,
                      border: `1px solid ${currentRoom.accent}35`,
                    }}
                  >
                    <Eye className="w-3 h-3" style={{ color: currentRoom.accent }} />
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: currentRoom.accent }}
                    >
                      {currentRoom.duration} tour
                    </span>
                  </div>
                </div>

                {/* Nav arrows over image (mobile) */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20 lg:hidden">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={goPrev}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 bg-black/30 backdrop-blur-md text-white/60"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={goNext}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 bg-black/30 backdrop-blur-md text-white/60"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Right — Room Selector + Details */}
              <div
                className="w-full lg:w-[42%] p-7 md:p-10 flex flex-col"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="mb-8">
                  <h3
                    className="text-xl md:text-2xl font-semibold text-white mb-1.5"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Choose Room Type
                  </h3>
                  <p className="text-white/30 text-xs font-light">
                    Select a room to explore its 3D model and features
                  </p>
                </div>

                {/* Room list */}
                <div className="space-y-2.5 flex-1">
                  {tourOptions.map((room) => {
                    const active = selectedRoom === room.id
                    return (
                      <motion.button
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left relative rounded-2xl overflow-hidden transition-all duration-300"
                        style={{
                          background: active ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${active ? `${room.accent}40` : "rgba(255,255,255,0.05)"}`,
                          boxShadow: active ? `0 8px 30px -10px ${room.accent}20` : "none",
                        }}
                      >
                        {active && (
                          <motion.div
                            layoutId="tourTabBar"
                            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                            style={{ background: room.accent }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}

                        <div className="px-5 py-4 pl-6">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2.5">
                              <span
                                className="text-[9px] font-bold tracking-[0.2em] uppercase font-mono"
                                style={{ color: active ? room.accent : "rgba(255,255,255,0.2)" }}
                              >
                                {room.label}
                              </span>
                              <span
                                className="font-medium text-sm"
                                style={{ color: active ? "white" : "rgba(255,255,255,0.45)" }}
                              >
                                {room.title}
                              </span>
                            </div>
                            <span
                              className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                              style={{
                                background: active ? `${room.accent}20` : "rgba(255,255,255,0.04)",
                                color: active ? room.accent : "rgba(255,255,255,0.25)",
                                border: `1px solid ${active ? `${room.accent}30` : "rgba(255,255,255,0.06)"}`,
                              }}
                            >
                              {room.duration}
                            </span>
                          </div>
                          <p
                            className="text-xs leading-relaxed line-clamp-2"
                            style={{ color: active ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)" }}
                          >
                            {room.description}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Highlights */}
                <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span
                    className="text-[9px] font-bold tracking-[0.2em] uppercase block mb-3"
                    style={{ color: currentRoom.accent }}
                  >
                    Highlights
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {currentRoom.highlights.map((h, i) => (
                      <motion.div
                        key={h}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.35 }}
                        className="flex items-center gap-2"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: currentRoom.accent }}
                        />
                        <span className="text-white/45 text-xs font-medium">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom counter */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px] bg-white/[0.06]" />
            <span className="text-white/20 text-xs font-mono tracking-widest">
              {currentIdx + 1} / {tourOptions.length} rooms
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-white/[0.06]" />
          </div>
        </div>
      </section>
    </>
  )
}
