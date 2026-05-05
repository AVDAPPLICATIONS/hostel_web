"use client"

import { motion } from "framer-motion"
import { MapPin, Crown, Landmark } from "lucide-react"

const highlights = [
  {
    id: 1,
    icon: MapPin,
    title: "MAP & DIRECTIONS",
    description:
      "Situated in the outskirts of Vallabh Vidhyanagar near the Bakrol gate, the AVD campus is known for it's visible and inherent beauty. Approx every education institutes are few Km's away from this beautiful campus. It is easy for a commuter to reach here with different means of transportation available.",
    action: "LEARN MORE",
    href: "#arrival",
  },
  {
    id: 2,
    icon: Crown,
    title: "SERVICES & ACCOMODATIONS",
    description:
      "We always try to provide the best and suitable facilities for our students. 24*7 Basic Medical help, Regular rooms cleaning, Green campus, healthy environment, quality food, access to sports resources, TV room, Study room, and much more.",
    action: "LEARN MORE",
    href: "#rooms",
  },
  {
    id: 3,
    icon: Landmark,
    title: "GREAT HIGHLIGHTS",
    description:
      "We always try to create a friendly environment for students. Various sports tournaments are organized every year Including Sports day. We always try to induce new and interesting events that everyone can participate in and cherish every single moment. Stage event, Drama are a few of the highlights.",
    action: "LEARN MORE",
    href: "#gallery",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export default function QuickLinks() {
  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return
    try {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.warn("Error scrolling to section:", error)
    }
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `,
        }}
      />
      
      <section className="relative z-20 py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative flex flex-col items-center text-center p-8 lg:p-12 rounded-[28px] overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top, rgba(200,169,110,0.08) 0%, transparent 70%)"
                  }}
                />

                {/* Icon wrapper */}
                <div 
                  className="w-16 h-16 mb-8 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                  style={{
                    background: "rgba(200,169,110,0.1)",
                    border: "1px solid rgba(200,169,110,0.2)",
                  }}
                >
                  <item.icon className="w-8 h-8" style={{ color: "#C8A96E" }} />
                </div>

                {/* Content */}
                <h3 
                  className="text-2xl lg:text-3xl font-semibold text-white mb-6 tracking-wide uppercase transition-colors duration-300 group-hover:text-[#C8A96E]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.title}
                </h3>

                <p 
                  className="text-white/40 text-sm leading-loose font-light mb-10 flex-grow max-w-sm mx-auto"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.description}
                </p>

                {/* Action button */}
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="relative overflow-hidden px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 w-full sm:w-auto"
                  style={{
                    color: "#C8A96E",
                    background: "rgba(200,169,110,0.05)",
                    border: "1px solid rgba(200,169,110,0.3)",
                  }}
                >
                  <span className="relative z-10 group-hover:text-[#060d16] transition-colors duration-300">{item.action}</span>
                  <div 
                    className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"
                    style={{ background: "#C8A96E" }}
                  />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
