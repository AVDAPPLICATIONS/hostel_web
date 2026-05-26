"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react"
import { COLORS, OVERLAYS, FONT_FAMILY } from "@/lib/theme"

/* ── Social icon SVGs ───────────────────────────────────────────────────── */

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

/* ── Data ───────────────────────────────────────────────────────────────── */

const CONTACT = {
  email: "harisaurabh.hostel@gmail.com",
  phones: [
    { name: "Sharadbhai", number: "+91 97129 77261", raw: "+919712977261" },
    { name: "Vinitbhai",  number: "+91 99250 04164", raw: "+919925004164" },
  ],
  address: "Atmiya Marg, Bakrol Rd, Vallabh Vidyanagar, Gujarat 388120",
  mapLink: "https://maps.google.com/?q=Atmiya+Vidya+Dham+Bakrol",
}

const QUICK_LINKS = [
  { name: "Home",         href: "#home" },
  { name: "Rooms",        href: "#rooms" },
  { name: "Virtual Tour", href: "#virtual-tour" },
  { name: "Gallery",      href: "#gallery" },
  { name: "Reviews",      href: "#reviews" },
  { name: "Contact",      href: "#contact" },
]

const SOCIALS = [
  { Icon: InstagramIcon, href: "https://www.instagram.com/harisaurabhhostel?igsh=Y2t3dmcxaWs4a3E4", label: "Instagram" },
  { Icon: FacebookIcon,  href: "#",                                    label: "Facebook"  },
  { Icon: MessageCircle, href: "https://wa.me/919712977261",            label: "WhatsApp"  },
]

/* ── Helpers ────────────────────────────────────────────────────────────── */

function scrollTo(href: string) {
  if (typeof document === "undefined") return
  try {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
  } catch {/* noop */}
}

/* ── Footer ─────────────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer
      style={{
        background: COLORS.darkerNavy,
        fontFamily: FONT_FAMILY.sans,
        borderTop: `1px solid ${OVERLAYS.borderWhiteFaint}`,
      }}
    >
      <div className="container mx-auto max-w-6xl px-6 pt-16 pb-8">

        {/* ── Top section: brand left, links right ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.8fr_1fr_1.4fr] lg:gap-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logo.png" alt="AVD" width={40} height={28} className="h-7 w-auto" />
              <span
                className="text-xl font-semibold tracking-wide"
                style={{ color: COLORS.white, fontFamily: FONT_FAMILY.heading }}
              >
                Atmiya Vidya Dham
              </span>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed" style={{ color: OVERLAYS.textWhite75 }}>
              A value-centered student residence in Vallabh Vidyanagar — where academics,
              community, and character grow together.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    background: OVERLAYS.glassSoft,
                    border: `1px solid ${OVERLAYS.borderWhiteFaint}`,
                    color: OVERLAYS.textWhite75,
                  }}
                  whileHover={{
                    backgroundColor: COLORS.teal,
                    borderColor: COLORS.teal,
                    color: COLORS.white,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.18 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <p
              className="mb-4 text-[10px] font-black uppercase tracking-[0.22em]"
              style={{ color: "#6B7B8D" }}
            >
              Navigation
            </p>
            <ul className="space-y-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group w-full py-1.5 text-left text-sm transition-colors duration-200"
                    style={{ color: OVERLAYS.textWhite75 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = COLORS.white }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = OVERLAYS.textWhite75 }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <p
              className="mb-4 text-[10px] font-black uppercase tracking-[0.22em]"
              style={{ color: "#6B7B8D" }}
            >
              Get in Touch
            </p>
            <div className="space-y-3.5">

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-start gap-2.5 text-sm transition-colors duration-200 hover:text-white"
                style={{ color: OVERLAYS.textWhite75 }}
              >
                <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: COLORS.teal }} />
                <span className="break-all">{CONTACT.email}</span>
              </a>

              {CONTACT.phones.map((p) => (
                <a
                  key={p.raw}
                  href={`tel:${p.raw}`}
                  className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: OVERLAYS.textWhite75 }}
                >
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" style={{ color: COLORS.teal }} />
                  <span>{p.name} — {p.number}</span>
                </a>
              ))}

              <div
                className="flex items-start gap-2.5 text-sm"
                style={{ color: OVERLAYS.textWhite75 }}
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: COLORS.teal }} />
                <div>
                  <span className="leading-relaxed">{CONTACT.address}</span>
                  <a
                    href={CONTACT.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1 text-xs font-semibold transition-colors duration-200 hover:opacity-80"
                    style={{ color: "#6B7B8D" }}
                  >
                    View on Map <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div
          className="mt-12 mb-6 h-px"
          style={{ background: OVERLAYS.borderWhiteFaint }}
        />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-2 text-[11.5px] sm:flex-row" style={{ color: OVERLAYS.white45 }}>
          <span>&copy; {new Date().getFullYear()} Atmiya Vidya Dham. All rights reserved.</span>
          <span>Vallabh Vidyanagar, Gujarat, India</span>
        </div>

      </div>
    </footer>
  )
}
