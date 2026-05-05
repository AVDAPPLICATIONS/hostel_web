"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react"
import { UI } from "@/lib/theme"

const InstagramIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
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
  { icon: InstagramIcon, link: "#", label: "Instagram" },
  { icon: FacebookIcon, link: "#", label: "Facebook" },
  {
    icon: MessageCircle,
    link: "https://wa.me/919712977261",
    label: "WhatsApp",
  },
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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          `,
        }}
      />

      <footer
        className="relative overflow-hidden"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Top Rule */}
        <div
          className="h-px"
          style={{ background: UI.border.soft }}
        />

        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1.2fr_0.9fr] lg:gap-10">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="mb-6 flex items-center gap-4">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: UI.card.light,
                    border: `1px solid ${UI.border.white}`,
                    boxShadow: UI.shadow.light,
                  }}
                  whileHover={{
                    scale: 1.06,
                    rotate: 3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Atmiya Vidya Dham logo"
                    width={40}
                    height={30}
                    className="h-8 w-auto object-contain"
                  />
                </motion.div>

                <div>
                  <h3
                    className="text-2xl font-semibold leading-none"
                    style={{
                      color: UI.text.light,
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    AVD
                  </h3>
                  <p
                    className="mt-1 text-[10px] font-black uppercase tracking-[0.22em]"
                    style={{ color: UI.text.muted }}
                  >
                    Atmiya Vidya Dham
                  </p>
                </div>
              </div>

              <p
                className="mb-7 max-w-sm text-sm leading-7"
                style={{ color: UI.text.muted }}
              >
                Comfort & Peace for Students. A secure, value-driven environment
                designed for focused living and personal growth.
              </p>

              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon

                  return (
                    <motion.a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-2xl border transition-all"
                      style={{
                        background: UI.card.darkSoft,
                        borderColor: UI.border.soft,
                        color: UI.text.muted,
                      }}
                      whileHover={{
                        y: -3,
                        scale: 1.06,
                        backgroundColor: UI.button.primary,
                        color: UI.button.primaryText,
                        borderColor: UI.button.primary,
                      }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              <FooterTitle>Quick Links</FooterTitle>

              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.name}>
                    <motion.button
                      onClick={() => scrollToSection(link.href)}
                      className="group flex items-center gap-2 text-sm font-medium transition-all"
                      style={{ color: UI.text.muted }}
                      whileHover={{
                        x: 4,
                        color: UI.text.light,
                      }}
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              <FooterTitle>Contact Info</FooterTitle>

              <div className="space-y-4">
                <FooterContactLink
                  href={`mailto:${CONTACT.email}`}
                  icon={Mail}
                  text={CONTACT.email}
                />

                {CONTACT.phones.map((phone) => (
                  <FooterContactLink
                    key={phone.number}
                    href={`tel:${phone.number}`}
                    icon={Phone}
                    text={`${phone.name}: ${phone.number}`}
                  />
                ))}

                <div className="flex items-start gap-3 text-sm">
                  <div
                    className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: UI.card.darkSoft,
                      color: UI.text.accent,
                      border: `1px solid ${UI.border.soft}`,
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div>
                    <p
                      className="leading-7"
                      style={{ color: UI.text.muted }}
                    >
                      {CONTACT.address}
                    </p>

                    <motion.a
                      href={CONTACT.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold"
                      style={{ color: UI.text.accent }}
                      whileHover={{ x: 3 }}
                    >
                      View on Map
                      <ArrowUpRight className="h-3 w-3" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              <FooterTitle>Our Services</FooterTitle>

              <ul className="space-y-3">
                {SERVICES.map((service) => (
                  <motion.li
                    key={service}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: UI.text.muted }}
                    whileHover={{ x: 4, color: UI.text.light }}
                  >
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: UI.text.accent }}
                    />
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-14 border-t pt-6"
            style={{ borderColor: UI.border.soft }}
          >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <span
                className="text-xs tracking-wide"
                style={{ color: UI.text.muted }}
              >
                © {new Date().getFullYear()} Atmiya Vidya Dham. All rights
                reserved.
              </span>

              <span
                className="rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em]"
                style={{
                  background: UI.card.darkSoft,
                  color: UI.text.muted,
                  border: `1px solid ${UI.border.soft}`,
                }}
              >
                Crafted with care
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-5 text-[10px] font-black uppercase tracking-[0.24em]"
      style={{ color: UI.text.accent }}
    >
      {children}
    </h3>
  )
}

function FooterContactLink({
  href,
  icon: Icon,
  text,
}: {
  href: string
  icon: React.ElementType
  text: string
}) {
  return (
    <motion.a
      href={href}
      className="flex items-center gap-3 text-sm transition-all"
      style={{ color: UI.text.muted }}
      whileHover={{
        x: 4,
        color: UI.text.light,
      }}
    >
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
        style={{
          background: UI.card.darkSoft,
          color: UI.text.accent,
          border: `1px solid ${UI.border.soft}`,
        }}
      >
        <Icon className="h-4 w-4" />
      </div>

      <span className="truncate">{text}</span>
    </motion.a>
  )
}