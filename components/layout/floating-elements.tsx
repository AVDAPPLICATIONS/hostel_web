"use client"

import { motion } from "framer-motion"

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle gold dust particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "rgba(200, 169, 110, 0.2)",
            left: `${15 + i * 18}%`,
            top: `${25 + i * 12}%`,
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Ambient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-[200px]"
        style={{
          background: "rgba(200, 169, 110, 0.03)",
          right: "10%",
          top: "20%",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full blur-[150px]"
        style={{
          background: "rgba(142, 180, 212, 0.03)",
          left: "5%",
          bottom: "30%",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
