"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, MapPin, User, GraduationCap, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import confetti from "canvas-confetti"

const ACCENT = "#C8A96E"

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
    fatherContactNo: "",
    city: "",
    district: "",
    state: "",
    school: "",
    course: "",
    semester: "",
    reference: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)
      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#C8A96E", "#fbbf24", "#1D3557"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#4ade80", "#C8A96E", "#fbbf24"],
      })
    }, 250)

    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      contactNo: "",
      fatherContactNo: "",
      city: "",
      district: "",
      state: "",
      school: "",
      course: "",
      semester: "",
      reference: "",
    })

    setTimeout(() => setSubmitted(false), 4000)
  }

  // Reusable styled input
  const FormInput = ({
    name,
    label,
    placeholder,
    type = "text",
    required = false,
    colSpan,
  }: {
    name: string
    label: string
    placeholder: string
    type?: string
    required?: boolean
    colSpan?: string
  }) => (
    <div className={`space-y-2 ${colSpan ?? ""}`}>
      <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 ml-1">
        {label}
        {required && (
          <span className="ml-1" style={{ color: ACCENT }}>
            *
          </span>
        )}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name as keyof typeof formData]}
          onChange={handleInputChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          required={required}
          className="w-full bg-white/[0.04] text-white text-sm placeholder:text-white/20 rounded-xl px-4 py-3.5 outline-none transition-all duration-300"
          style={{
            border: `1px solid ${
              focusedField === name ? `${ACCENT}60` : "rgba(255,255,255,0.08)"
            }`,
            boxShadow:
              focusedField === name
                ? `0 0 0 3px ${ACCENT}15, 0 8px 25px -8px ${ACCENT}20`
                : "none",
          }}
        />
        {/* Focus accent line */}
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
          style={{ background: ACCENT }}
          animate={{ scaleX: focusedField === name ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  )

  // Section header
  const SectionHeader = ({
    icon: Icon,
    title,
    step,
  }: {
    icon: React.ElementType
    title: string
    step: string
  }) => (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/20 font-mono">
          {step}
        </span>
        <div className="w-3 h-px bg-white/10" />
        <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/50">
          {title}
        </h4>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <section
        id="contact"
        className="relative py-24 md:py-36 overflow-hidden"
        style={{
          background: "linear-gradient(170deg, #060d16 0%, #0d1b2a 50%, #091520 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
            style={{ background: ACCENT }}
          />
          <div
            className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl"
            style={{ background: "#7BA7BC" }}
          />
        </div>

        {/* Top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-[0.08]"
          style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }}
        />

        <div className="relative container mx-auto px-4 max-w-4xl">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-14 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A96E]" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                Admission
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A96E]" />
            </motion.div>

            <h2
              className="text-5xl md:text-7xl font-semibold text-white mb-5 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Enquire{" "}
              <em className="not-italic" style={{ color: ACCENT }}>
                Now
              </em>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Fill in your details and our team will reach out to guide you through the admission process.
            </p>
          </motion.div>

          {/* ── Form Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            viewport={{ once: true }}
            className="relative rounded-[28px] md:rounded-[36px] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: `0 40px 100px -30px ${ACCENT}12`,
            }}
          >
            {/* Accent glow top */}
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-3xl opacity-[0.06]"
              style={{ background: ACCENT }}
            />

            {/* Form header bar */}
            <div
              className="relative px-8 md:px-12 py-7 md:py-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className="text-2xl md:text-3xl font-semibold text-white mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    ENQUIRY FORM
                  </h3>
                  <p className="text-white/30 text-xs md:text-sm font-light">
                    Please fill in all the details carefully
                  </p>
                </div>
                <div
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}20` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span
                    className="text-[9px] font-bold tracking-[0.15em] uppercase"
                    style={{ color: ACCENT }}
                  >
                    Open for Admission
                  </span>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="relative px-8 md:px-12 py-8 md:py-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: `${ACCENT}15`, border: `2px solid ${ACCENT}30` }}
                    >
                      <CheckCircle2 className="w-9 h-9" style={{ color: ACCENT }} />
                    </motion.div>
                    <h3
                      className="text-3xl md:text-4xl font-semibold text-white mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Registration Successful
                    </h3>
                    <p className="text-white/40 text-base max-w-md mx-auto">
                      Thank you for your interest in AVD. Our team will contact you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      <FormInput
                        name="firstName"
                        label="First Name (Student Name)"
                        placeholder="e.g. Rahul"
                        required
                      />
                      <FormInput
                        name="middleName"
                        label="Middle Name (Father Name)"
                        placeholder="Full Name"
                        required
                      />
                      <FormInput
                        name="lastName"
                        label="Last Name (Surname)"
                        placeholder="e.g. Patel"
                        required
                      />
                      <FormInput
                        name="contactNo"
                        label="Contact No."
                        placeholder="+91 00000 00000"
                        type="tel"
                        required
                      />
                      <FormInput
                        name="fatherContactNo"
                        label="Father's Contact No."
                        placeholder="+91 00000 00000"
                        type="tel"
                        required
                      />
                      <FormInput
                        name="city"
                        label="City / Village"
                        placeholder="City"
                        required
                      />
                      <FormInput
                        name="district"
                        label="District"
                        placeholder="District"
                        required
                      />
                      <FormInput
                        name="state"
                        label="State"
                        placeholder="State"
                        required
                      />
                      <FormInput
                        name="school"
                        label="School / College"
                        placeholder="Current Institution"
                        required
                      />
                      <FormInput
                        name="course"
                        label="Course / Std"
                        placeholder="e.g. B.Tech / 12th"
                        required
                      />
                      <FormInput
                        name="semester"
                        label="Semester"
                        placeholder="e.g. 1st Sem"
                      />
                      <FormInput
                        name="reference"
                        label="Reference"
                        placeholder="How did you hear about us?"
                      />
                    </div>



                    {/* Submit */}
                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full relative group flex items-center justify-center gap-3 py-4 md:py-5 rounded-2xl font-semibold text-base md:text-lg overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: ACCENT,
                          color: "#0a1220",
                          boxShadow: `0 16px 40px -10px ${ACCENT}50`,
                        }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2.5 relative z-10">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2.5 relative z-10">
                            Submit Registration
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                      </motion.button>

                      <p className="text-center text-white/20 text-[10px] tracking-wide mt-4">
                        By submitting, you agree to be contacted for admission purposes.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bottom counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="h-px flex-1 max-w-[80px] bg-white/[0.06]" />
            <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-medium">
              AVD Admissions 2026
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-white/[0.06]" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
