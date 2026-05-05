import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import SmoothScroll from "@/components/shared/smooth-scroll"
import { cn } from "@/lib/utils"
import { COLORS } from "@/lib/theme"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Atmiya Vidhya Dham | Harisaurabh Hostel",
  description:
    "A value-centered student residence for focused study, cultural grounding, and everyday comfort.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        inter.variable,
        fontMono.variable,
        "font-sans"
      )}
      style={
        {
          "--color-navy": COLORS.navy,
          "--color-teal": COLORS.teal,
          "--color-sky": COLORS.sky,
          "--color-beige": COLORS.beige,
          "--color-white": COLORS.white,
        } as React.CSSProperties
      }
    >
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <ThemeProvider>
          <SmoothScroll>
            <div
              className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.018]"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <filter id="global-noise">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect
                  width="100%"
                  height="100%"
                  filter="url(#global-noise)"
                  opacity="0.35"
                />
              </svg>
            </div>

            <main className="relative min-h-screen">{children}</main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}