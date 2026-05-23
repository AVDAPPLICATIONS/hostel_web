"use client"

import { useEffect } from "react"
import Navbar from "@/components/layout/navbar"
import Hero from "@/components/sections/hero"
import IntroVideo from "@/components/sections/intro-video"
import QuickLinks from "@/components/sections/quick-links"
import CampusPreview from "@/components/sections/campus-preview"

import Features from "@/components/sections/features"
import Rooms from "@/components/sections/rooms"

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
  }, [])

  return (
    <div className="min-h-screen bg-[#F5EFEB] overflow-x-hidden">
      <ScrollProgress />
      <FloatingElements />
      <Navbar />
      <main>
        <Hero />
        <QuickLinks />
        <CampusPreview />

        <Features />
        <Rooms />

        <Arrival />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
