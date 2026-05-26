"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react"
import { COLORS, UI, SHADOWS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"

const InstagramIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const CONTACT = {
  email: "harisaurabh.hostel@gmail.com",
  phones: [
    { name: "Sharadbhai", number: "+919712977261" },
    { name: "Vinitbhai", number: "+919925004164" },
  ],
  address:
    "Atmiya Vidya Dham, Atmiya Marg, Near Vidyanagar Dist., Bakrol Rd, Vallabh Vidyanagar, Gujarat 388120",
  mapLink: "https://maps.google.com/?q=Atmiya+Vidya+Dham+Bakrol",
}

const SOCIAL_LINKS = [
  { icon: InstagramIcon, link: "https://www.instagram.com/harisaurabhhostel?igsh=Y2t3dmcxaWs4a3E4", label: "Instagram" },
  { icon: FacebookIcon, link: "#", label: "Facebook" },
  { icon: MessageCircle, link: "https://wa.me/919712977261", label: "WhatsApp" },
]

const QUICK_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Rooms", href: "#rooms" },
  { name: "Virtual Tour", href: "#virtual-tour" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
]

const SERVICES = [
  "AC & Non-AC Rooms",
  "Dormitory Accommodation",
  "24/7 Medical Support",
  "Mess & Dining",
  "Prayer Hall",
  "Laundry Services",
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return
    try {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } catch (e) {
      console.warn("Scroll error:", e)
    }
  }

  return (
    <>
      <footer
        className="relative overflow-hidden"
        style={{ background: UI.section.dark, fontFamily: FONT_FAMILY.sans }}
      >
        {/* Ambient glow removed for seamless transition */}



        <div className="container mx-auto max-w-7xl px-4 pb-8 md:pb-14">

          {/* ── 4-Column Grid ── */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_0.9fr_1.3fr_1fr] lg:gap-10 xl:gap-14">

            {/* ── Brand ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="mb-6 flex items-center gap-3.5">
                <motion.div
                  className="flex flex-shrink-0 items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Atmiya Vidya Dham logo"
                    width={44}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </motion.div>

                <div>
                  <h3
                    className="text-[1.55rem] font-semibold leading-none tracking-wide"
                    style={{ color: UI.text.light, fontFamily: FONT_FAMILY.heading }}
                  >
                    Atmiya Vidya Dham
                  </h3>
                </div>
              </div>

              <p
                className="mb-6 max-w-[340px] text-sm leading-[1.85]"
                style={{ color: OVERLAYS.textWhite75 }}
              >
                A secure, value-driven environment for students — built on care, community,
                and purpose. Your home away from home.
              </p>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("#contact")}
                className="group mb-8 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-black"
                style={{
                  background: OVERLAYS.tealSubtle,
                  color: COLORS.sky,
                  border: `1px solid ${OVERLAYS.tealBorder}`,
                }}
              >
                Enquire Now
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.button>

              <div className="flex gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all"
                      style={{
                        background: UI.card.darkSoft,
                        borderColor: UI.border.soft,
                        color: OVERLAYS.textWhite75,
                      }}
                      whileHover={{
                        y: -3,
                        scale: 1.08,
                        backgroundColor: COLORS.teal,
                        color: COLORS.white,
                        borderColor: COLORS.teal,
                      }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* ── Quick Links ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <FooterTitle>Quick Links</FooterTitle>
              <ul className="space-y-0.5">
                {QUICK_LINKS.map((link, i) => (
                  <li key={link.name}>
                    <motion.button
                      onClick={() => scrollToSection(link.href)}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium"
                      style={{ color: OVERLAYS.textWhite75 }}
                      whileHover={{
                        x: 4,
                        color: UI.text.light,
                        backgroundColor: OVERLAYS.hoverLightBg,
                      }}
                    >
                      <span
                        className="flex-shrink-0 font-mono text-[9px] font-black tracking-widest"
                        style={{ color: OVERLAYS.tealMuted }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.name}
                      <ArrowUpRight className="ml-auto h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Contact Info ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <FooterTitle>Contact Info</FooterTitle>
              <div className="space-y-3.5">
                <FooterContactLink
                  href={`mailto:${CONTACT.email}`}
                  icon={Mail}
                  label="Email"
                  text={CONTACT.email}
                />
                {CONTACT.phones.map((phone) => (
                  <FooterContactLink
                    key={phone.number}
                    href={`tel:${phone.number}`}
                    icon={Phone}
                    label={phone.name}
                    text={phone.number}
                  />
                ))}

                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: OVERLAYS.tealLight,
                      color: COLORS.teal,
                      border: `1px solid ${OVERLAYS.tealBorderLight}`,
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="mb-1 text-[9px] font-black uppercase tracking-[0.18em]"
                      style={{ color: COLORS.teal, opacity: 0.7 }}
                    >
                      Address
                    </p>
                    <p
                      className="text-[12px] leading-[1.7]"
                      style={{ color: OVERLAYS.textWhite75 }}
                    >
                      {CONTACT.address}
                    </p>
                    <motion.a
                      href={CONTACT.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold"
                      style={{ color: COLORS.teal }}
                      whileHover={{ x: 3 }}
                    >
                      View on Map
                      <ArrowUpRight className="h-3 w-3" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Services ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <FooterTitle>Our Services</FooterTitle>
              <ul className="space-y-1">
                {SERVICES.map((service) => (
                  <motion.li
                    key={service}
                    className="flex cursor-default items-center gap-3 rounded-lg px-3 py-2 text-sm"
                    style={{ color: OVERLAYS.textWhite75 }}
                    whileHover={{
                      x: 4,
                      color: UI.text.light,
                      backgroundColor: OVERLAYS.borderSkySubtle,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: COLORS.teal, opacity: 0.65 }}
                    />
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* ── Bottom Bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-14 border-t pt-7"
            style={{ borderColor: UI.border.soft }}
          >
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs tracking-wide" style={{ color: OVERLAYS.textWhite75 }}>
                © {new Date().getFullYear()} Atmiya Vidya Dham. All rights reserved.
              </p>

              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.22em]"
                style={{
                  background: UI.card.darkSoft,
                  color: OVERLAYS.textWhite75,
                  border: `1px solid ${OVERLAYS.borderSkyGlow}`,
                }}
              >
                Crafted with
                <Heart
                  className="h-2.5 w-2.5"
                  style={{ fill: COLORS.teal, color: COLORS.teal }}
                />
                care
              </span>
            </div>
          </motion.div>

        </div>
      </footer>
    </>
  )
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-5 text-[10px] font-black uppercase tracking-[0.26em]"
      style={{ color: COLORS.teal }}
    >
      {children}
    </h3>
  )
}

function FooterContactLink({
  href,
  icon: Icon,
  label,
  text,
}: {
  href: string
  icon: React.ElementType
  label: string
  text: string
}) {
  return (
    <motion.a
      href={href}
      className="flex items-start gap-3 text-sm transition-all"
      style={{ color: OVERLAYS.textWhite75 }}
      whileHover={{ x: 4, color: UI.text.light }}
    >
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
        style={{
          background: OVERLAYS.tealLight,
          color: COLORS.teal,
          border: `1px solid ${OVERLAYS.tealBorderLight}`,
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p
          className="mb-0.5 text-[9px] font-black uppercase tracking-[0.18em]"
          style={{ color: COLORS.teal, opacity: 0.7 }}
        >
          {label}
        </p>
        <span className="block truncate text-[12px]">{text}</span>
      </div>
    </motion.a>
  )
}
