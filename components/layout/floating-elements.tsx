"use client"

import { OVERLAYS } from "@/lib/theme"

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Static ambient orbs — no animation to keep GPU free */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: OVERLAYS.tealSoft,
          filter: "blur(80px)",
          right: "10%",
          top: "15%",
        }}
      />
      <div
        className="absolute w-[360px] h-[360px] rounded-full"
        style={{
          background: OVERLAYS.glassSubtle,
          filter: "blur(60px)",
          left: "5%",
          bottom: "25%",
        }}
      />
    </div>
  )
}
