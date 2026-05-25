"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { UI, FONT_FAMILY } from "@/lib/theme"

export default function VideoLaunch() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      video.loop = true
      // Try to start playback as soon as it's ready
      video
        .play()
        .catch(() => {
          // Ignore autoplay errors (browser restrictions)
        })
    }

    if (video.readyState >= 1) {
      handleLoadedMetadata()
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata)
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [])

  // Reveal transformations
  // We keep the video full screen but fade it out and move it up at the very end
  const opacity = useTransform(scrollYProgress, [0.9, 0.98], [1, 0])
  const y = useTransform(scrollYProgress, [0.95, 1], ["0%", "-100%"])
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 1.05]) // Subtle zoom in as you scroll

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] w-full"
      style={{ zIndex: 100, background: UI.section.dark }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        <motion.div
          style={{
            opacity,
            y,
            scale,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
          }}
          className="pointer-events-auto"
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            muted
            playsInline
            preload="metadata"
            autoPlay
            loop
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Subtle Overlay to match the Hero's dark aesthetic */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* Scroll Progress Indicator (Cinematic) */}
          <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2">
            <div className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase">
              Intro Scene
            </div>
            <div className="w-48 h-[1px] bg-white/10 relative">
              <motion.div
                style={{
                  width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                }}
                className="absolute inset-y-0 left-0 bg-white/60"
              />
            </div>
          </div>

          {/* Title Reveal based on Scroll Progress */}
          <motion.div
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0, 0.1, 0.3, 0.4],
                [0, 1, 1, 0]
              ),
              scale: useTransform(scrollYProgress, [0, 0.4], [0.95, 1.05]),
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="text-white/60 text-xs font-black uppercase tracking-[0.6em] mb-4">
              Atmiya Vidhya Dham
            </h2>
            <h1
              className="text-white text-6xl md:text-8xl font-bold tracking-tight"
              style={{ fontFamily: FONT_FAMILY.heading }}
            >
              Experience the Journey
            </h1>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 1 }}
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-white/60 text-[10px] font-black tracking-[0.4em] uppercase">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
