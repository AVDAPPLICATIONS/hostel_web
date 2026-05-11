"use client"

import type React from "react"
import { useState, useEffect, useId } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import indianGeoData from "@/lib/indian-geo-data.json"
import { City, State as CSCState } from "country-state-city"
import {
  ArrowRight,
  Loader2,
  Sparkles,
  User,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Users,
  Star,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
} from "lucide-react"
import confetti from "canvas-confetti"
import { COLORS, UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"

// ── Static data ───────────────────────────────────────────
const fields = [
  { name: "firstName",      label: "First Name",        placeholder: "Rahul",            required: true, icon: User },
  { name: "middleName",     label: "Middle Name",       placeholder: "Father Name",                      icon: User },
  { name: "lastName",       label: "Last Name",         placeholder: "Patel",                            icon: User },
  { name: "contactNo",      label: "Contact No",        placeholder: "+91 98765 43210",                  icon: Phone },
  { name: "fatherContactNo",label: "Father Contact No", placeholder: "+91 98765 43210",                  icon: Phone },
  { name: "state",          label: "State",             placeholder: "Select State",                     icon: Building2 },
  { name: "district",       label: "District",          placeholder: "Select District",                  icon: Building2 },
  { name: "city",           label: "City",              placeholder: "Enter or Select City",             icon: MapPin },
  { name: "school",         label: "College / School",  placeholder: "Select College",                   icon: GraduationCap },
  { name: "course",         label: "Course",            placeholder: "B.Tech",                           icon: BookOpen },
  { name: "semester",       label: "Semester",          placeholder: "Select Semester",                  icon: CalendarDays },
  { name: "reference",      label: "Reference",         placeholder: "Friend, Family, etc.",             icon: Users },
] as const

const collegeOptions = [
  "Dharmsinh Desai University (DDU)", "Sardar Patel University (SPU)",
  "Charotar University of Science and Technology (CHARUSAT)", "Anand Agricultural University (AAU)",
  "Institute of Rural Management Anand (IRMA)", "Birla Vishvakarma Mahavidyalaya (BVM)",
  "G. H. Patel College of Engineering & Technology (GCET)", "A. D. Patel Institute of Technology (ADIT)",
  "Chandubhai S. Patel Institute of Technology (CSPIT)", "Madhuben and Bhanubhai Patel Institute of Technology (MBIT)",
  "Devang Patel Institute of Advance Technology and Research (DEPSTAR)", "Pramukhswami Medical College",
  "N. D. Desai Medical College & Hospital", "J. S. Ayurveda Mahavidyalaya", "Dinsha Patel College of Nursing",
  "Anand Homeopathic Medical College and Research Institute", "Anand Pharmacy College",
  "B. N. Patel Institute of Paramedical and Science", "V. P. and R. P. T. P. Science College",
  "Natubhai V. Patel College of Pure and Applied Sciences (NVPAS)", "M. B. Patel Science College",
  "Anand Commerce College", "J. & J. College of Science", "C. B. Patel Arts College",
  "Shri I. V. Patel College of Commerce", "Smt. T. J. Patel Commerce College",
  "Uni Trust Surajba Mahila Arts College", "SEMCOM", "ARIBAS",
  "C Z Patel College of Business & Management", "N V Patel College of Pure & Applied Sciences",
  "V P Science College", "M. S. Bhagat & C. S. Sonawala Law College",
  "Motilal Nehru Law College", "Brahmarshi Sanskrit Mahavidyalaya",
].sort()

const semesterOptions = [
  "1st Semester", "2nd Semester", "3rd Semester", "4th Semester",
  "5th Semester", "6th Semester", "7th Semester", "8th Semester",
]

const courseOptions = [
  "B.Tech", "M.Tech", "BCA", "MCA", "BBA", "MBA", "B.Com", "M.Com",
  "B.Pharm", "MBBS", "BDS", "Physiotherapy", "Paramedical", "Arts", "Diploma",
]

const referenceOptions = [
  "Friend", "Family", "Social Media", "Google Search", "Newspaper", "Alumni", "College Recommendation",
]

// ── react-select shared styles ────────────────────────────
const buildSelectStyles = (isFocused: boolean) => ({
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "52px",
    borderRadius: "0.75rem",
    background: "#fff",
    border: state.isFocused ? `1.5px solid ${UI.button.primary}` : "1.5px solid transparent",
    boxShadow: state.isFocused
      ? `0 0 0 4px rgba(200,217,230,0.85), 0 4px 20px rgba(0,0,0,0.03)`
      : "0 2px 12px rgba(0,0,0,0.04)",
    paddingLeft: "2.6rem",
    transition: "all 0.25s ease",
    cursor: "pointer",
    "&:hover": { borderColor: state.isFocused ? UI.button.primary : "transparent" },
  }),
  valueContainer: (base: any) => ({ ...base, padding: "0 8px" }),
  input:        (base: any) => ({ ...base, fontSize: "15px", color: UI.text.dark, margin: 0, padding: 0 }),
  singleValue:  (base: any) => ({ ...base, fontSize: "15px", color: UI.text.dark }),
  placeholder:  (base: any) => ({ ...base, color: "#94a3b8", fontSize: "15px" }),
  menu:         (base: any) => ({
    ...base, borderRadius: "0.75rem", boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
    overflow: "hidden", border: "none", zIndex: 50,
  }),
  option:       (base: any, state: any) => ({
    ...base,
    background: state.isSelected ? UI.button.primary : state.isFocused ? "#f1f5f9" : "white",
    color: state.isSelected ? "white" : UI.text.dark,
    fontSize: "14px", fontWeight: state.isSelected ? "600" : "400",
    cursor: "pointer", padding: "12px 16px",
    "&:active": { background: UI.button.primary },
  }),
  dropdownIndicator: (base: any) => ({ ...base, color: UI.text.dark, "&:hover": { color: UI.button.primary } }),
  indicatorSeparator: () => ({ display: "none" }),
})

// ── FormInput ─────────────────────────────────────────────
const FormInput = ({
  name, label, placeholder, required = false, index, icon: Icon,
  value, isFocused, onChange, onFocus, onBlur, options, disabled, isCreatable = false,
}: {
  name: string; label: string; placeholder: string; required?: boolean; index: number
  icon: React.ElementType; value: string; isFocused: boolean
  onChange: (val: string) => void; onFocus: () => void; onBlur: () => void
  options?: readonly string[] | string[]; disabled?: boolean; isCreatable?: boolean
}) => {
  const instanceId = useId()
  const styles = buildSelectStyles(isFocused)
  const selectOptions = options?.map((o) => ({ label: o, value: o })) ?? []
  const currentValue = value ? { label: value, value } : null

  return (
    <motion.div
      className="space-y-1.5"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.04, ease: "easeOut" }}
    >
      <label htmlFor={name} className="block text-[13px] font-semibold tracking-wide" style={{ color: COLORS.navy }}>
        {label}{required && <span style={{ color: UI.text.accent }}> *</span>}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 transition-colors duration-200"
          style={{ color: isFocused ? UI.button.primary : COLORS.softNavy }}
        />

        {options ? (
          isCreatable ? (
            <CreatableSelect
              instanceId={instanceId} id={name} isDisabled={disabled}
              options={selectOptions} value={currentValue}
              onChange={(v: any) => onChange(v?.value ?? "")}
              onFocus={onFocus} onBlur={onBlur} placeholder={placeholder}
              styles={styles} classNamePrefix="rs"
            />
          ) : (
            <Select
              instanceId={instanceId} id={name} isDisabled={disabled}
              options={selectOptions} value={currentValue}
              onChange={(v: any) => onChange(v?.value ?? "")}
              onFocus={onFocus} onBlur={onBlur} placeholder={placeholder}
              styles={styles} classNamePrefix="rs"
            />
          )
        ) : (
          <input
            id={name} name={name} type="text" required={required}
            placeholder={placeholder} value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus} onBlur={onBlur}
            className="w-full rounded-xl py-[14px] pl-12 pr-4 text-[15px] outline-none transition-all duration-250 placeholder:text-slate-400"
            style={{
              background: "#fff",
              color: UI.text.dark,
              border: `1.5px solid ${isFocused ? UI.button.primary : "transparent"}`,
              boxShadow: isFocused
                ? "0 0 0 4px rgba(200,217,230,0.85), 0 4px 20px rgba(0,0,0,0.03)"
                : "0 2px 12px rgba(0,0,0,0.04)",
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

// ── Benefits shown in the left panel ─────────────────────
const benefits = [
  { icon: ShieldCheck,    text: "Safe & supervised 24/7 environment" },
  { icon: HeartHandshake, text: "Mentorship & spiritual guidance" },
  { icon: Lightbulb,      text: "Academic focus with 14+ amenities" },
  { icon: Star,           text: "500+ students, 5-star rated" },
]

// ── Main component ────────────────────────────────────────
export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "",
    contactNo: "", fatherContactNo: "",
    city: "", district: "", state: "",
    school: "", course: "", semester: "", reference: "",
  })
  const [isSubmitting, setIsSubmitting]   = useState(false)
  const [submitted,    setSubmitted]      = useState(false)
  const [focusedField, setFocusedField]   = useState<string | null>(null)
  const [districtsList, setDistrictsList] = useState<string[]>([])
  const [citiesList,    setCitiesList]    = useState<string[]>([])

  const statesList = Object.keys(indianGeoData).sort()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!formData.state) { setDistrictsList([]); setCitiesList([]); return }
    const raw = (indianGeoData as Record<string, string[]>)[formData.state] ?? []
    setDistrictsList([...raw].sort())
    const match = CSCState.getStatesOfCountry("IN").find(
      (s) => s.name.toLowerCase() === formData.state.toLowerCase()
    )
    if (match) {
      setCitiesList(City.getCitiesOfState("IN", match.isoCode).map((c) => c.name).sort())
    } else {
      setCitiesList([])
    }
  }, [formData.state])

  const handleValueChange = (field: string, val: string) => {
    if (field === "state") {
      setFormData((p) => ({ ...p, state: val, district: "", city: "" }))
    } else if (field === "district") {
      setFormData((p) => ({ ...p, district: val, city: "" }))
    } else {
      setFormData((p) => ({ ...p, [field]: val }))
    }
  }

  const fireConfetti = () => {
    confetti({
      particleCount: 100, spread: 80,
      origin: { y: 0.55 },
      colors: [COLORS.navy, COLORS.teal, COLORS.sky, COLORS.beige, COLORS.white],
      scalar: 1.2,
    })
    setTimeout(() => {
      confetti({ particleCount: 55, angle: 65, spread: 52, origin: { x: 0.08, y: 0.62 }, colors: [COLORS.teal, COLORS.sky, "#fff"] })
      confetti({ particleCount: 55, angle: 115, spread: 52, origin: { x: 0.92, y: 0.62 }, colors: [COLORS.navy, COLORS.teal, COLORS.sky] })
    }, 250)
    setTimeout(() => {
      confetti({ particleCount: 40, spread: 120, gravity: 0.65, origin: { y: 0.2 }, colors: [COLORS.sky, "#fff", COLORS.beige] })
    }, 650)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1800))
    setIsSubmitting(false)
    setSubmitted(true)
    fireConfetti()
    setTimeout(() => {
      setSubmitted(false)
      const msg = "Thank you for your enquiry. Our team will contact you shortly."
      const phone = formData.fatherContactNo.replace(/\D/g, "")
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank")
    }, 3800)
  }

  if (!mounted) {
    return <section id="contact" className="min-h-screen py-20" style={{ background: UI.section.dark }} />
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: UI.section.dark, fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="container mx-auto max-w-7xl px-4">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{ background: UI.card.darkSoft, color: UI.text.muted, border: "1px solid rgba(200,217,230,0.12)" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={13} />
            Student Enquiry
          </motion.div>

          <ScrollShineText
            as="h2"
            className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
            style={{ color: UI.text.light, fontFamily: "'Cormorant Garamond', serif" }}
          >
            Enquire Now
          </ScrollShineText>

          <p
            className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed md:text-lg"
            style={{ color: UI.text.muted }}
          >
            Fill in your details and our team will reach out to you within 24 hours.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[5fr_7fr]">

          {/* ── Left: Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2rem] p-8 lg:sticky lg:top-24 lg:p-10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(200,217,230,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p
              className="mb-3 text-[10px] font-black uppercase tracking-[0.28em]"
              style={{ color: UI.text.accent }}
            >
              Admissions Open
            </p>

            <h3
              className="mb-4 text-3xl font-semibold leading-[1.12] md:text-4xl"
              style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Begin Your Chapter at AVD
            </h3>

            <p
              className="mb-8 text-sm leading-[1.85]"
              style={{ color: COLORS.sky, opacity: 0.75 }}
            >
              The right environment shapes the right future. Join hundreds of
              students who found their academic home — and a lifelong family —
              at Atmiya Vidya Dham.
            </p>

            {/* Benefits */}
            <div className="mb-8 space-y-3">
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(86,124,141,0.18)", border: "1px solid rgba(86,124,141,0.25)" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: COLORS.sky }} />
                  </div>
                  <span className="text-[13px] font-medium" style={{ color: COLORS.sky, opacity: 0.85 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 gap-3 rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[
                { value: "500+",  label: "Happy Students" },
                { value: "14+",   label: "Amenities" },
                { value: "5 ★",   label: "Alumni Rating" },
                { value: "24/7",  label: "Support" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-xl font-black md:text-2xl"
                    style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: COLORS.sky, opacity: 0.6 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2rem] p-1"
            style={{ background: UI.card.soft, boxShadow: "0 40px 100px rgba(0,0,0,0.38)" }}
          >
            <div
              className="rounded-[1.75rem] p-6 md:p-8"
              style={{ background: UI.card.light, border: `1px solid ${UI.border.white}` }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success State ── */
                  <motion.div
                    key="success"
                    className="relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden px-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Radial background glow */}
                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        width: 400, height: 400,
                        background: `radial-gradient(circle, rgba(86,124,141,0.13) 0%, transparent 70%)`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.1, ease: "easeOut" }}
                    />

                    {/* SVG: ring + checkmark */}
                    <motion.div
                      className="relative mb-7"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                    >
                      <svg viewBox="0 0 100 100" width="112" height="112">
                        {/* Soft inner fill */}
                        <circle cx="50" cy="50" r="44" fill="rgba(86,124,141,0.09)" />

                        {/* Glow ring (blurred, fades out as main ring draws) */}
                        <motion.circle
                          cx="50" cy="50" r="44"
                          fill="none"
                          stroke={COLORS.teal}
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray="277"
                          transform="rotate(-90 50 50)"
                          style={{ filter: "blur(4px)" }}
                          initial={{ strokeDashoffset: 277, opacity: 0.4 }}
                          animate={{ strokeDashoffset: 0, opacity: 0 }}
                          transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        />

                        {/* Main ring */}
                        <motion.circle
                          cx="50" cy="50" r="44"
                          fill="none"
                          stroke={COLORS.teal}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="277"
                          transform="rotate(-90 50 50)"
                          initial={{ strokeDashoffset: 277 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        />

                        {/* Checkmark */}
                        <motion.path
                          d="M30 51 L43 64 L70 37"
                          fill="none"
                          stroke={COLORS.teal}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="62"
                          initial={{ strokeDashoffset: 62 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.48, delay: 0.95, ease: "easeOut" }}
                        />
                      </svg>

                      {/* Sparkle burst dots */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                        <motion.div
                          key={deg}
                          className="pointer-events-none absolute rounded-full"
                          style={{
                            width: 6, height: 6,
                            background: i % 2 === 0 ? COLORS.teal : COLORS.sky,
                            left: "50%", top: "50%",
                          }}
                          initial={{ x: -3, y: -3, scale: 0, opacity: 0 }}
                          animate={{
                            x: Math.cos((deg * Math.PI) / 180) * 70 - 3,
                            y: Math.sin((deg * Math.PI) / 180) * 70 - 3,
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{ delay: 1.1 + i * 0.04, duration: 0.55, ease: "easeOut" }}
                        />
                      ))}
                    </motion.div>

                    {/* Heading */}
                    <motion.h3
                      className="text-3xl font-black md:text-4xl"
                      style={{ color: UI.text.dark, fontFamily: "'Cormorant Garamond', serif" }}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Enquiry Submitted!
                    </motion.h3>

                    {/* Subtext */}
                    <motion.p
                      className="mt-2 max-w-[260px] text-sm leading-relaxed"
                      style={{ color: UI.text.accent }}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Our team will contact you within 24 hours.
                    </motion.p>

                    {/* WhatsApp redirect pill */}
                    <motion.div
                      className="mt-6 flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-[0.18em]"
                      style={{
                        background: "rgba(86,124,141,0.10)",
                        color: COLORS.teal,
                        border: "1px solid rgba(86,124,141,0.22)",
                      }}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.55, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: COLORS.teal }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                      />
                      Redirecting to WhatsApp…
                    </motion.div>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Personal Info group */}
                    <div>
                      <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: UI.text.accent }}>
                        Personal Information
                      </p>
                      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                        {fields.slice(0, 5).map((field, i) => {
                          return (
                            <FormInput
                              key={field.name} name={field.name} label={field.label}
                              placeholder={field.placeholder} required={"required" in field ? (field as any).required : false}
                              icon={field.icon} index={i}
                              value={formData[field.name as keyof typeof formData]}
                              isFocused={focusedField === field.name}
                              onChange={(v) => handleValueChange(field.name, v)}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                            />
                          )
                        })}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full" style={{ background: UI.border.lighter }} />

                    {/* Location group */}
                    <div>
                      <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: UI.text.accent }}>
                        Location
                      </p>
                      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                        {fields.slice(5, 8).map((field, i) => {
                          let opts: string[] | undefined
                          let disabled = false
                          if (field.name === "state")    { opts = statesList; }
                          if (field.name === "district") { opts = districtsList; disabled = !formData.state }
                          if (field.name === "city")     { opts = citiesList;    disabled = !formData.district }
                          return (
                            <FormInput
                              key={field.name} name={field.name} label={field.label}
                              placeholder={field.placeholder} icon={field.icon} index={5 + i}
                              value={formData[field.name as keyof typeof formData]}
                              isFocused={focusedField === field.name}
                              onChange={(v) => handleValueChange(field.name, v)}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                              options={opts} disabled={disabled} isCreatable
                            />
                          )
                        })}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full" style={{ background: UI.border.lighter }} />

                    {/* Academic group */}
                    <div>
                      <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: UI.text.accent }}>
                        Academic Details
                      </p>
                      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                        {fields.slice(8).map((field, i) => {
                          let opts: string[] | undefined
                          let isCreatable = false
                          if (field.name === "school")    { opts = collegeOptions;   isCreatable = true }
                          if (field.name === "course")    { opts = courseOptions;    isCreatable = true }
                          if (field.name === "semester")  { opts = semesterOptions }
                          if (field.name === "reference") { opts = referenceOptions; isCreatable = true }
                          return (
                            <FormInput
                              key={field.name} name={field.name} label={field.label}
                              placeholder={field.placeholder} icon={field.icon} index={8 + i}
                              value={formData[field.name as keyof typeof formData]}
                              isFocused={focusedField === field.name}
                              onChange={(v) => handleValueChange(field.name, v)}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                              options={opts} isCreatable={isCreatable}
                            />
                          )
                        })}
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl py-4 text-[15px] font-black transition-all disabled:cursor-not-allowed disabled:opacity-70 md:py-[18px]"
                      style={{
                        background: UI.button.primary,
                        color: "#fff",
                        boxShadow: "0 12px 32px rgba(86,124,141,0.38)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Processing…
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
