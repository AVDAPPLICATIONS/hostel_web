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
            <main className="relative min-h-screen">{children}</main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}