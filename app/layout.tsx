import type React from "react"
import type { Metadata, Viewport } from "next"
import {
  Inter,
  JetBrains_Mono,
  DM_Sans,
  Cormorant_Garamond,
} from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import SmoothScroll from "@/components/shared/smooth-scroll"
import { cn } from "@/lib/utils"
import { COLORS } from "@/lib/theme"

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

/* ── Constants ──────────────────────────────────────────────────────────── */

const SITE_NAME = "Atmiya Vidya Dham"
const SITE_URL = "https://avdvvn.org"
const DESCRIPTION =
  "A value-centered student residence in Vallabh Vidyanagar, Gujarat — offering comfortable rooms, community living, and a focused environment for academic excellence."

/* ── Metadata ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Student Residence`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Atmiya Vidya Dham",
    "Harisaurabh Hostel",
    "student hostel Gujarat",
    "Vallabh Vidyanagar hostel",
    "ADIT hostel",
    "VV Nagar hostel",
    "boys hostel Anand",
    "student residence Gujarat",
    "engineering hostel Gujarat",
    "AVD hostel",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Student Residence`,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Campus — Vallabh Vidyanagar, Gujarat`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Student Residence`,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: COLORS.navy,
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
}

/* ── Structured Data (JSON-LD) ──────────────────────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE_NAME,
  alternateName: "Harisaurabh Hostel",
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: "+919712977261",
  email: "harisaurabh.hostel@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Atmiya Marg, Bakrol Road",
    addressLocality: "Vallabh Vidyanagar",
    addressRegion: "Gujarat",
    postalCode: "388120",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.543,
    longitude: 72.923,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "AC Rooms", value: true },
    { "@type": "LocationFeatureSpecification", name: "24/7 Medical Support", value: true },
    { "@type": "LocationFeatureSpecification", name: "Mess & Dining Hall", value: true },
    { "@type": "LocationFeatureSpecification", name: "Prayer Hall", value: true },
    { "@type": "LocationFeatureSpecification", name: "Sports Facilities", value: true },
    { "@type": "LocationFeatureSpecification", name: "Laundry Services", value: true },
  ],
}

/* ── Layout ─────────────────────────────────────────────────────────────── */

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
        dmSans.variable,
        cormorant.variable,
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
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground tracking-wide">
        <ThemeProvider>
          <SmoothScroll>
            <main className="relative min-h-screen">{children}</main>
          </SmoothScroll>
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
