"use client"

import { motion, useScroll } from "framer-motion"
import { COLORS } from "@/lib/theme"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.teal}, ${COLORS.sky})`,
      }}
    />
  )
}
