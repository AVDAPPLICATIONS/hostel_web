"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react"

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

const ACCENT = "#C8A96E"

const CONTACT = {
  email: "harisaurabh.hostel@gmail.com",
  phones: [
    { name: "Sharadbhai", number: "+919712977261" },
    { name: "Vinitbhai", number: "+919925004164" },
  ],
  address: `Atmiya Vidya Dham, Atmiya Marg, Near Vidyanagar Dist., Bakrol Rd, Vallabh Vidyanagar, Gujarat 388120`,
  mapLink: "https://maps.google.com/?q=Atmiya+Vidya+Dham+Bakrol",
}

const SOCIAL_LINKS = [
  { icon: InstagramIcon, link: "#", label: "Instagram" },
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
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #060d16 0%, #0a1220 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top rule */}
      <div
        className="h-px opacity-[0.06]"
        style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }}
      />

      <div className="container mx-auto px-4 py-16 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}
              >
                <Image
                  src="/logo.png"
                  alt="Atmiya Vidya Dham logo"
                  width={34}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-lg font-black text-white tracking-tighter uppercase">AVD</span>
                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">
                  Atmiya Vidya Dham
                </span>
              </div>
            </div>

            <p className="text-white/30 text-sm leading-relaxed mb-6 max-w-xs">
              Comfort & Peace for Students. A secure, value-driven environment designed for focused living and personal growth.
            </p>

            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 text-white/40 hover:text-white"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${ACCENT}20`
                    e.currentTarget.style.borderColor = `${ACCENT}40`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                  }}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: ACCENT }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/35 hover:text-white text-sm transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: ACCENT }}
            >
              Contact Info
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-white/35 hover:text-white text-sm transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                <span className="truncate">{CONTACT.email}</span>
              </a>

              {CONTACT.phones.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:${phone.number}`}
                  className="flex items-center gap-3 text-white/35 hover:text-white text-sm transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                  <span>
                    {phone.name}: {phone.number}
                  </span>
                </a>
              ))}

              <div className="flex items-start gap-3 text-white/35 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                <div>
                  <p className="leading-relaxed">{CONTACT.address}</p>
                  <a
                    href={CONTACT.mapLink}
                    target="_blank"
                    className="text-xs mt-1 inline-block hover:underline transition-colors"
                    style={{ color: ACCENT }}
                  >
                    View on Map →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: ACCENT }}
            >
              Our Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2 text-white/35 text-sm">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-white/20 text-xs tracking-wide">
              © {new Date().getFullYear()} Atmiya Vidya Dham. All rights reserved.
            </span>
            <span className="text-white/15 text-[10px] tracking-widest uppercase">
              Crafted with care
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
