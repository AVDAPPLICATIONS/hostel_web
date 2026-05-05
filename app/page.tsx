"use client"

import { useEffect } from "react"
import Navbar from "@/components/layout/navbar"
import Hero from "@/components/sections/hero"
import QuickLinks from "@/components/sections/quick-links"
import CampusPreview from "@/components/sections/campus-preview"

import Features from "@/components/sections/features"
import Rooms from "@/components/sections/rooms"
import VirtualTour from "@/components/sections/virtual-tour"
import Arrival from "@/components/sections/arrival"
import Gallery from "@/components/sections/gallery"
import Reviews from "@/components/sections/reviews"
import Contact from "@/components/sections/contact"
import Footer from "@/components/layout/footer"
import ScrollProgress from "@/components/layout/scroll-progress"
import FloatingElements from "@/components/layout/floating-elements"

export default function Home() {  
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || typeof document === "undefined") return

    // Set smooth scroll behavior
    if (document.documentElement) {
      document.documentElement.style.scrollBehavior = "smooth"
    }

    // Custom cursor implementation with proper checks
    let cursor: HTMLDivElement | null = null
    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null

    try {
      cursor = document.createElement("div")
      cursor.className = "custom-cursor"
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(200, 169, 110, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
      `

      if (document.body) {
        document.body.appendChild(cursor)
      }

      mouseMoveHandler = (e: MouseEvent) => {
        if (cursor) {
          cursor.style.left = e.clientX - 10 + "px"
          cursor.style.top = e.clientY - 10 + "px"
        }
      }

      document.addEventListener("mousemove", mouseMoveHandler)
    } catch (error) {
      console.warn("Could not create custom cursor:", error)
    }

    return () => {
      try {
        if (mouseMoveHandler) {
          document.removeEventListener("mousemove", mouseMoveHandler)
        }
        if (cursor && document.body && document.body.contains(cursor)) {
          document.body.removeChild(cursor)
        }
      } catch (error) {
        console.warn("Error cleaning up cursor:", error)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#060d16] overflow-x-hidden">
      <ScrollProgress />
      <FloatingElements />
      <Navbar />
      <main>
        <Hero />
        <QuickLinks />
        <CampusPreview />

        <Features />
        <Rooms />
        <VirtualTour />
        <Arrival />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
