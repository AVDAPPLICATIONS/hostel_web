"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { OVERLAYS } from "@/lib/theme"

export default function IntroVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        
        // If the video section comes fully into view and hasn't been watched yet
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7 && !hasPlayed) {
          setIsLocked(true)
          
          // Lock the scroll to make it a "compulsory watch"
          document.body.style.overflow = "hidden"
          
          if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e))
          }
        }
      },
      { threshold: [0.7] }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      // Cleanup on unmount
      document.body.style.overflow = "auto"
    }
  }, [hasPlayed])

  const handleVideoEnd = () => {
    setHasPlayed(true)
    setIsLocked(false)
    document.body.style.overflow = "auto"
  }

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[#080e18]"
    >
      <div className="h-full w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/intro.mp4"
          className="h-full w-full object-cover"
          preload="auto"
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#080e18]" />

        {/* Skip Button for User Experience */}
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 right-12 z-50"
            >
              <button
                onClick={handleVideoEnd}
                className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/10 hover:text-white"
                style={{
                  border: `1px solid ${OVERLAYS.borderWhiteMedium}`,
                  backdropFilter: "blur(4px)"
                }}
              >
                Skip Intro
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
