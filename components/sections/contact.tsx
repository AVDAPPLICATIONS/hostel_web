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
import { COLORS, UI, OVERLAYS, SHADOWS, FONT_FAMILY } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import { AnimatedButton } from "@/components/ui/animated-button"

// ── Static data ───────────────────────────────────────────
const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Location" },
  { id: 3, title: "Academic Details" },
]

const fields = [
  { name: "firstName", label: "First Name", placeholder: "Rahul", required: true, icon: User },
  { name: "middleName", label: "Middle Name", placeholder: "Father Name", icon: User },
  { name: "lastName", label: "Last Name", placeholder: "Patel", icon: User },
  { name: "contactNo", label: "Contact No", placeholder: "+91 98765 43210", required: true, icon: Phone },
  { name: "fatherContactNo", label: "Father Contact No", placeholder: "+91 98765 43210", icon: Phone },
  { name: "state", label: "State", placeholder: "Select State", required: true, icon: Building2 },
  { name: "district", label: "District", placeholder: "Select District", required: true, icon: Building2 },
  { name: "city", label: "City", placeholder: "Enter or Select City", required: true, icon: MapPin },
  { name: "school", label: "College / School", placeholder: "Select College", required: true, icon: GraduationCap },
  { name: "course", label: "Course", placeholder: "B.Tech", required: true, icon: BookOpen },
  { name: "semester", label: "Semester", placeholder: "Select Semester", required: true, icon: CalendarDays },
  { name: "reference", label: "Reference", placeholder: "Friend, Family, etc.", icon: Users },
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
    borderRadius: UI.radius.md,
    background: COLORS.white,
    border: state.isFocused ? `1.5px solid ${UI.button.primary}` : "1.5px solid transparent",
    boxShadow: state.isFocused ? SHADOWS.inputFocus : SHADOWS.inputRest,
    paddingLeft: "2.6rem",
    transition: "all 0.25s ease",
    cursor: "pointer",
    "&:hover": { borderColor: state.isFocused ? UI.button.primary : "transparent" },
  }),
  valueContainer: (base: any) => ({ ...base, padding: "0 8px" }),
  input: (base: any) => ({ ...base, fontSize: "15px", color: UI.text.dark, margin: 0, padding: 0 }),
  singleValue: (base: any) => ({ ...base, fontSize: "15px", color: UI.text.dark }),
  placeholder: (base: any) => ({ ...base, color: "#94a3b8", fontSize: "15px" }),
  menu: (base: any) => ({
    ...base, borderRadius: UI.radius.md, boxShadow: SHADOWS.menuDropdown,
    overflow: "hidden", border: "none", zIndex: 50,
  }),
  option: (base: any, state: any) => ({
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
            className="w-full py-[14px] pl-12 pr-4 text-[15px] outline-none transition-all duration-250 placeholder:text-slate-400"
            style={{
              borderRadius: UI.radius.md,
              background: COLORS.white,
              color: UI.text.dark,
              border: `1.5px solid ${isFocused ? UI.button.primary : "transparent"}`,
              boxShadow: isFocused ? SHADOWS.inputFocus : SHADOWS.inputRest,
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

// ── Benefits shown in the left panel ─────────────────────
const benefits = [
  { icon: ShieldCheck, text: "Safe & supervised 24/7 environment" },
  { icon: HeartHandshake, text: "Mentorship & spiritual guidance" },
  { icon: Lightbulb, text: "Academic focus with 14+ amenities" },
  { icon: Star, text: "500+ students, 5-star rated" },
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [districtsList, setDistrictsList] = useState<string[]>([])
  const [citiesList, setCitiesList] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const statesList = Object.keys(indianGeoData).sort()

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName.trim()) {
        alert("Please enter your First Name")
        return
      }
      if (!formData.contactNo.trim()) {
        alert("Please enter your Contact Number")
        return
      }
    }
    if (currentStep === 2) {
      if (!formData.state) {
        alert("Please select your State")
        return
      }
      if (!formData.district) {
        alert("Please select your District")
        return
      }
      if (!formData.city.trim()) {
        alert("Please select or enter your City")
        return
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

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
      confetti({ particleCount: 55, angle: 65, spread: 52, origin: { x: 0.08, y: 0.62 }, colors: [COLORS.teal, COLORS.sky, COLORS.white] })
      confetti({ particleCount: 55, angle: 115, spread: 52, origin: { x: 0.92, y: 0.62 }, colors: [COLORS.navy, COLORS.teal, COLORS.sky] })
    }, 250)
    setTimeout(() => {
      confetti({ particleCount: 40, spread: 120, gravity: 0.65, origin: { y: 0.2 }, colors: [COLORS.sky, COLORS.white, COLORS.beige] })
    }, 650)
  }

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e && e.preventDefault) e.preventDefault()
    if (isSubmitting || submitted) return

    // Validate Step 1
    if (!formData.firstName.trim()) {
      setCurrentStep(1)
      alert("Please enter your First Name")
      return
    }
    if (!formData.contactNo.trim()) {
      setCurrentStep(1)
      alert("Please enter your Contact Number")
      return
    }

    // Validate Step 2
    if (currentStep >= 2) {
      if (!formData.state) {
        setCurrentStep(2)
        alert("Please select your State")
        return
      }
      if (!formData.district) {
        setCurrentStep(2)
        alert("Please select your District")
        return
      }
      if (!formData.city.trim()) {
        setCurrentStep(2)
        alert("Please select or enter your City")
        return
      }
    }

    // Validate Step 3
    if (currentStep === 3) {
      if (!formData.school.trim()) {
        alert("Please select or enter your College / School")
        return
      }
      if (!formData.course.trim()) {
        alert("Please select or enter your Course")
        return
      }
      if (!formData.semester.trim()) {
        alert("Please select your Semester")
        return
      }
    }

    if (currentStep < totalSteps) {
      nextStep()
      return
    }
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1800))
    setIsSubmitting(false)
    setSubmitted(true)
    fireConfetti()
    setTimeout(() => {
      setSubmitted(false)
      setCurrentStep(1)
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
      style={{ background: UI.section.dark, fontFamily: FONT_FAMILY.sans }}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <ScrollShineText
            as="h2"
            className="block justify-center text-center text-5xl font-semibold leading-[1.05] md:text-7xl"
            style={{ color: UI.text.light, fontFamily: FONT_FAMILY.heading }}
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

        <div className="mx-auto grid max-w-6xl items-start gap-6">
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="overflow-hidden p-1"
            style={{ borderRadius: UI.radius.common, background: UI.card.soft, boxShadow: SHADOWS.showcaseDeep }}
          >
            <div
              className="p-6 md:p-8"
              style={{ borderRadius: UI.radius.common, background: UI.card.light, border: `1px solid ${UI.border.white}` }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden px-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        width: 400, height: 400,
                        background: `radial-gradient(circle, ${OVERLAYS.tealSubtle} 0%, transparent 70%)`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.1, ease: "easeOut" }}
                    />

                    <motion.div
                      className="relative mb-7"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                    >
                      <svg viewBox="0 0 100 100" width="112" height="112">
                        <circle cx="50" cy="50" r="44" fill={OVERLAYS.tealSoft} />
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
                    </motion.div>

                    <motion.h3
                      className="text-3xl font-black md:text-4xl"
                      style={{ color: UI.text.dark, fontFamily: FONT_FAMILY.heading }}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Enquiry Submitted!
                    </motion.h3>

                    <motion.p
                      className="mt-2 max-w-[260px] text-sm leading-relaxed"
                      style={{ color: UI.text.accent }}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Our team will contact you within 24 hours.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-10 flex items-center justify-between relative px-2">
                      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2" style={{ background: UI.border.lighter, zIndex: 0 }} />
                      <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 transition-all duration-500 ease-in-out" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`, background: UI.button.primary, zIndex: 0 }} />
                      
                      {steps.map((step) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center">
                          <motion.div
                            initial={false}
                            animate={{
                              backgroundColor: currentStep >= step.id ? UI.button.primary : COLORS.white,
                              borderColor: currentStep >= step.id ? UI.button.primary : UI.border.lighter,
                              color: currentStep >= step.id ? COLORS.white : "#94a3b8",
                              boxShadow: currentStep >= step.id ? SHADOWS.buttonPrimary : "none",
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-[15px] font-bold transition-colors duration-300"
                          >
                            {step.id}
                          </motion.div>
                          <span
                            className="absolute -bottom-7 w-max text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 hidden sm:block"
                            style={{ color: currentStep >= step.id ? UI.text.dark : UI.text.muted }}
                          >
                            {step.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 overflow-visible px-1 pb-2 min-h-[360px]">
                      <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: UI.text.accent }}>
                              Personal Information
                            </p>
                            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                              {fields.slice(0, 5).map((field, i) => (
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
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: UI.text.accent }}>
                              Location
                            </p>
                            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                              {fields.slice(5, 8).map((field, i) => {
                                let opts: string[] | undefined
                                let disabled = false
                                if (field.name === "state") { opts = statesList; }
                                if (field.name === "district") { opts = districtsList; disabled = !formData.state }
                                if (field.name === "city") { opts = citiesList; disabled = !formData.district }
                                return (
                                  <FormInput
                                    key={field.name} name={field.name} label={field.label}
                                    placeholder={field.placeholder} icon={field.icon} index={i}
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
                          </motion.div>
                        )}

                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: UI.text.accent }}>
                              Academic Details
                            </p>
                            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                              {fields.slice(8).map((field, i) => {
                                let opts: string[] | undefined
                                let isCreatable = false
                                if (field.name === "school") { opts = collegeOptions; isCreatable = true }
                                if (field.name === "course") { opts = courseOptions; isCreatable = true }
                                if (field.name === "semester") { opts = semesterOptions }
                                if (field.name === "reference") { opts = referenceOptions; isCreatable = true }
                                return (
                                  <FormInput
                                    key={field.name} name={field.name} label={field.label}
                                    placeholder={field.placeholder} icon={field.icon} index={i}
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-8 flex gap-4 pt-4">
                      {currentStep > 1 && (
                        <AnimatedButton
                          type="button"
                          onClick={prevStep}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          className="flex w-full items-center justify-center gap-3 rounded-full py-4 text-[15px] font-black transition-all md:py-[18px]"
                          variant="secondary"
                        >
                          Back
                        </AnimatedButton>
                      )}
                      
                      {currentStep < totalSteps ? (
                        <AnimatedButton
                          type="button"
                          onClick={nextStep}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          className="group flex w-full items-center justify-center gap-3 rounded-full py-4 text-[15px] font-black transition-all md:py-[18px]"
                          style={{
                            boxShadow: SHADOWS.buttonPrimary,
                          }}
                        >
                          Next Step
                          <ArrowRight size={20} className="transition-transform duration-300" />
                        </AnimatedButton>
                      ) : (
                        <AnimatedButton
                          type="submit"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          className="group flex w-full items-center justify-center gap-3 rounded-full py-4 text-[15px] font-black transition-all disabled:cursor-not-allowed disabled:opacity-70 md:py-[18px]"
                          style={{
                            boxShadow: SHADOWS.buttonPrimary,
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
                              <ArrowRight size={20} className="transition-transform duration-300" />
                            </>
                          )}
                        </AnimatedButton>
                      )}
                    </div>
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
