"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
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
} from "lucide-react"
import confetti from "canvas-confetti"
import { COLORS, UI } from "@/lib/theme"
import ScrollShineText from "@/components/shared/scroll-shine-text"
import ScrollRevealCard from "@/components/shared/scroll-reveal-card"

const fields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Rahul",
    required: true,
    icon: User,
  },
  {
    name: "middleName",
    label: "Middle Name",
    placeholder: "Father Name",
    icon: User,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Patel",
    icon: User,
  },
  {
    name: "contactNo",
    label: "Contact No",
    placeholder: "+91 98765 43210",
    icon: Phone,
  },
  {
    name: "fatherContactNo",
    label: "Father Contact No",
    placeholder: "+91 98765 43210",
    icon: Phone,
  },
  {
    name: "city",
    label: "City",
    placeholder: "Ahmedabad",
    icon: MapPin,
  },
  {
    name: "district",
    label: "District",
    placeholder: "Ahmedabad",
    icon: Building2,
  },
  {
    name: "state",
    label: "State",
    placeholder: "Gujarat",
    icon: Building2,
  },
  {
    name: "school",
    label: "College / School",
    placeholder: "Select College",
    icon: GraduationCap,
  },
  {
    name: "course",
    label: "Course",
    placeholder: "B.Tech",
    icon: BookOpen,
  },
  {
    name: "semester",
    label: "Semester",
    placeholder: "1st Semester",
    icon: CalendarDays,
  },
  {
    name: "reference",
    label: "Reference",
    placeholder: "Friend, Family, etc.",
    icon: Users,
  },
] as const

const locationData: Record<string, Record<string, string[]>> = {
  "Gujarat": {
    "Anand": ["Anand", "Vallabh Vidyanagar", "Karamsad", "Borsad", "Khambhat", "Petlad", "Sojitra", "Tarapur", "Umreth"],
    "Ahmedabad": ["Ahmedabad", "Bavla", "Daskroi", "Detroj", "Dhandhuka", "Dholka", "Mandal", "Sanand", "Viramgam"],
    "Vadodara": ["Vadodara", "Dabhoi", "Karjan", "Padra", "Savli", "Sinor", "Waghodia", "Desar"],
    "Surat": ["Surat", "Bardoli", "Choryasi", "Kamrej", "Mahuva", "Mandvi", "Olpad", "Palsana", "Umarpada"],
    "Rajkot": ["Rajkot", "Gondal", "Jetpur", "Dhoraji", "Kotda Sangani", "Lodhika", "Paddhari", "Upleta"],
    "Kheda": ["Nadiad", "Matar", "Vaso", "Mahudha", "Kheda"]
  },
  "Maharashtra": {
    "Mumbai": ["Mumbai City", "Mumbai Suburban"],
    "Pune": ["Pune City", "Pimpri-Chinchwad", "Baramati", "Junnar", "Khed", "Maval"],
    "Nagpur": ["Nagpur City", "Kamptee", "Hingna", "Katol", "Savner"]
  },
  "Rajasthan": {
    "Jaipur": ["Jaipur", "Amber", "Bassi", "Chaksu", "Chomu"],
    "Udaipur": ["Udaipur", "Girwa", "Gogunda", "Jhadol", "Kherwara"],
    "Jodhpur": ["Jodhpur", "Bilara", "Luni", "Osian", "Phalodi"]
  }
};

const collegeOptions = [
  "BVM - Birla Vishvakarma Mahavidyalaya",
  "GCET - G.H. Patel College of Engineering",
  "ADIT - A.D. Patel Institute of Technology",
  "MBIT - Madhuben & Bhanubhai Patel Inst. of Tech",
  "SEMCOM",
  "ARIBAS",
  "C Z Patel College of Business & Management",
  "N V Patel College of Pure & Applied Sciences",
  "V P Science College",
  "D P Bhabhu Arts College",
  "DDU - Dharmsinh Desai University",
  "DDIT",
  "M.B. Patel Science College",
  "J.S. Ayurved Mahavidyalaya"
];

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  index,
  icon: Icon,
  value,
  isFocused,
  onChange,
  onFocus,
  onBlur,
  options,
  disabled,
}: {
  name: string
  label: string
  placeholder: string
  type?: string
  required?: boolean
  index: number
  icon: React.ElementType
  value: string
  isFocused: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onFocus: () => void
  onBlur: () => void
  options?: readonly string[] | string[]
  disabled?: boolean
}) => (
  <motion.div
    className="space-y-2"
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.45,
      delay: 0.35 + index * 0.045,
      ease: "easeOut",
    }}
  >
    <label
      htmlFor={name}
      className="block text-sm font-semibold tracking-wide"
      style={{ color: UI.text.dark }}
    >
      {label}
      {required && <span style={{ color: UI.text.accent }}> *</span>}
    </label>

    <motion.div whileFocus={{ scale: 1.012 }} className="relative">
      <Icon
        size={19}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
        style={{
          color: isFocused ? UI.text.accent : UI.text.dark,
        }}
      />

      {options ? (
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          className="w-full appearance-none rounded-2xl py-3.5 pl-12 pr-10 outline-none transition-all duration-300 disabled:opacity-50"
          style={{
            background: `${UI.card.white} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232D507B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 16px center`,
            color: value ? UI.text.dark : "#94a3b8",
            border: `1.5px solid ${isFocused ? UI.button.primary : UI.border.light
              }`,
            boxShadow:
              isFocused
                ? `0 0 0 4px rgba(200, 217, 230, 0.9), ${UI.shadow.light}`
                : UI.shadow.light,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ color: UI.text.dark }}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-slate-400"
          style={{
            background: UI.card.white,
            color: UI.text.dark,
            border: `1.5px solid ${isFocused ? UI.button.primary : UI.border.light
              }`,
            boxShadow:
              isFocused
                ? `0 0 0 4px rgba(200, 217, 230, 0.9), ${UI.shadow.light}`
                : UI.shadow.light,
          }}
        />
      )}
    </motion.div>
  </motion.div>
)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "state") {
      setFormData(prev => ({ ...prev, state: value, district: "", city: "" }))
    } else if (name === "district") {
      setFormData(prev => ({ ...prev, district: value, city: "" }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1800))

    setIsSubmitting(false)
    setSubmitted(true)

    confetti({
      particleCount: 120,
      spread: 85,
      colors: [
        COLORS.navy,
        COLORS.teal,
        COLORS.sky,
        COLORS.beige,
        COLORS.white,
      ],
    })

    setTimeout(() => {
      setSubmitted(false)
      // Construct WhatsApp message
      const message = `Thank you for your enquiry. Our team will contact you shortly.`

      // Clean phone number (remove non-digits)
      const cleanPhone = formData.fatherContactNo.replace(/\D/g, "")
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`

      window.open(whatsappUrl, "_blank")
    }, 2000)
  }


  return (
    <section
      id="contact"
      className="min-h-screen px-4 py-16 md:py-20"
      style={{ background: UI.section.dark }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-10 text-center md:mb-12"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold"
            style={{
              background: UI.card.light,
              color: UI.text.accent,
              border: `1px solid ${UI.border.white}`,
              boxShadow: UI.shadow.light,
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles size={15} />
            Student Enquiry Form
          </motion.span>

          <ScrollShineText
            as="h2"
            className="text-5xl font-black tracking-tight md:text-7xl justify-center text-center"
            style={{ color: UI.text.light }}
          >
            Enquire Now
          </ScrollShineText>

          <motion.div
            className="mx-auto mt-5 h-1 rounded-full"
            style={{ background: UI.button.primary }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          />

          <motion.p
            className="mx-auto mt-5 max-w-xl text-base md:text-lg"
            style={{ color: UI.text.muted }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
          >
            Fill in your details and our team will contact you soon.
          </motion.p>
        </motion.div>

        <ScrollRevealCard
          className="relative mx-auto max-w-5xl rounded-[2rem] p-1"
          delay={0.2}
        >
          <div
            className="rounded-[1.8rem] p-6 md:p-10"
            style={{
              background: UI.card.light,
              border: `1px solid ${UI.border.white}`,
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 12,
                    }}
                  >
                    <CheckCircle2
                      size={76}
                      style={{ color: UI.text.accent }}
                    />
                  </motion.div>

                  <motion.h3
                    className="mt-5 text-3xl font-black"
                    style={{ color: UI.text.dark }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    Registration Successful
                  </motion.h3>

                  <motion.p
                    className="mt-2 text-base"
                    style={{ color: UI.text.accent }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    We’ll contact you soon.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="mb-2 text-center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                  >
                    <h3
                      className="text-2xl font-black md:text-3xl"
                      style={{ color: UI.text.dark }}
                    >
                      Fill Your Details
                    </h3>

                    <p
                      className="mt-2 text-sm md:text-base"
                      style={{ color: UI.text.accent }}
                    >
                      Please enter your contact and academic information below.
                    </p>
                  </motion.div>

                  <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                    {fields.map((field, index) => {
                      let options: string[] | undefined = undefined
                      let disabled = false

                      if (field.name === "state") {
                        options = Object.keys(locationData)
                      } else if (field.name === "district") {
                        options = formData.state ? Object.keys(locationData[formData.state] || {}) : []
                        disabled = !formData.state
                      } else if (field.name === "city") {
                        options = (formData.state && formData.district)
                          ? (locationData[formData.state]?.[formData.district] || [])
                          : []
                        disabled = !formData.district
                      } else if (field.name === "semester") {
                        options = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"]
                      } else if (field.name === "school") {
                        options = collegeOptions
                      }

                      return (
                        <FormInput
                          key={field.name}
                          name={field.name}
                          label={field.label}
                          placeholder={field.placeholder}
                          icon={field.icon}
                          index={index}
                          value={formData[field.name as keyof typeof formData]}
                          isFocused={focusedField === field.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          options={options}
                          disabled={disabled}
                        />
                      )
                    })}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.015,
                      y: -2,
                      backgroundColor: UI.button.primaryHover,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-base font-black transition disabled:cursor-not-allowed disabled:opacity-70 md:py-5"
                    style={{
                      background: UI.button.primary,
                      color: UI.button.primaryText,
                      boxShadow: UI.shadow.soft,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={22} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <ArrowRight
                          size={22}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ScrollRevealCard>
      </div>
    </section>
  )
}