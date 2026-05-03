"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return

    const updateScrollProgress = () => {
      try {
        if (document.documentElement) {
          const scrollPx = document.documentElement.scrollTop
          const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
          const scrolled = winHeightPx > 0 ? scrollPx / winHeightPx : 0
          setScrollProgress(scrolled)
        }
      } catch (error) {
        console.warn("Error updating scroll progress:", error)
      }
    }

    updateScrollProgress()
    window.addEventListener("scroll", updateScrollProgress, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        scaleX: scrollProgress,
        background: "linear-gradient(90deg, #C8A96E, #e8d5a8, #C8A96E)",
      }}
      initial={{ scaleX: 0 }}
    />
  )
}
