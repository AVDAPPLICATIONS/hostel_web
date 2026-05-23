"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BedDouble,
  Mail,
  Phone,
  User,
} from "lucide-react"
import { UI } from "@/lib/theme"

const steps = [
  {
    id: 1,
    title: "Stay Details",
    description: "Choose dates and room type",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Personal Info",
    description: "Enter your contact details",
    icon: Users,
  },
  {
    id: 3,
    title: "Confirmation",
    description: "Review and confirm booking",
    icon: CreditCard,
  },
]

export default function Booking() {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    name: "",
    email: "",
    phone: "",
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1800))

    setIsSubmitting(false)
    setStep(4)
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const inputClass =
    "mt-2 h-12 rounded-2xl border-0 px-4 text-sm outline-none focus-visible:ring-0"

  const selectClass =
    "mt-2 block h-12 w-full rounded-2xl border-0 px-4 text-sm outline-none transition-all"

  const inputStyle = {
    background: UI.card.white,
    color: UI.text.dark,
    border: `1.5px solid ${UI.border.light}`,
    boxShadow: UI.shadow.light,
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          `,
        }}
      />

      <section
        id="booking"
        className="relative overflow-hidden px-4 py-24 md:py-32"
        style={{
          background: UI.section.dark,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="container relative z-10 mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="mb-14 text-center md:mb-16"
          >
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em]"
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
              <Sparkles size={14} />
              Smart Booking System
            </motion.div>

            <h2
              className="text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{
                color: UI.text.light,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Book Your{" "}
              <motion.span
                className="inline-block"
                style={{ color: UI.text.muted }}
                animate={{
                  opacity: [0.75, 1, 0.75],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Stay
              </motion.span>
            </h2>

            <p
              className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed md:text-lg"
              style={{ color: UI.text.muted }}
            >
              Secure your spot at Atmiya Vidya Dham with a simple, guided, and
              clean booking process.
            </p>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl rounded-common p-1"
            style={{
              background: UI.card.soft,
              boxShadow: UI.shadow.card,
            }}
          >
            <Card
              className="overflow-hidden rounded-common border-0 shadow-none"
              style={{
                background: UI.card.light,
                border: `1px solid ${UI.border.white}`,
              }}
            >
              <CardContent className="p-6 md:p-10">
                {step !== 4 && (
                  <>
                    {/* Card Top */}
                    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <span
                          className="mb-3 inline-flex rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em]"
                          style={{
                            background: UI.card.soft,
                            color: UI.text.accent,
                          }}
                        >
                          Step {step} of 3
                        </span>

                        <h3
                          className="text-3xl font-semibold leading-tight md:text-4xl"
                          style={{
                            color: UI.text.dark,
                            fontFamily: "'Cormorant Garamond', serif",
                          }}
                        >
                          {step === 1 && "Select Dates & Room"}
                          {step === 2 && "Personal Information"}
                          {step === 3 && "Review Booking"}
                        </h3>

                        <p
                          className="mt-2 text-sm leading-6"
                          style={{ color: UI.text.accent }}
                        >
                          {step === 1 &&
                            "Choose your preferred dates and room type."}
                          {step === 2 &&
                            "Add your personal contact information."}
                          {step === 3 &&
                            "Review the details before confirmation."}
                        </p>
                      </div>

                      {/* Progress Indicator */}
                      <div className="grid grid-cols-3 gap-3">
                        {steps.map((item) => {
                          const Icon = item.icon
                          const active = step >= item.id

                          return (
                            <motion.div
                              key={item.id}
                              className="min-w-[110px] rounded-2xl p-3 text-center"
                              style={{
                                background: active
                                  ? UI.card.white
                                  : UI.card.soft,
                                border: `1.5px solid ${
                                  active ? UI.button.primary : UI.border.white
                                }`,
                                boxShadow: active ? UI.shadow.light : "none",
                              }}
                              animate={{
                                y: active ? -2 : 0,
                                scale: active ? 1.02 : 1,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 22,
                              }}
                            >
                              <div
                                className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl"
                                style={{
                                  background: active
                                    ? UI.button.primary
                                    : UI.card.light,
                                  color: active
                                    ? UI.button.primaryText
                                    : UI.text.dark,
                                }}
                              >
                                {step > item.id ? (
                                  <CheckCircle size={17} />
                                ) : (
                                  <Icon size={17} />
                                )}
                              </div>

                              <p
                                className="text-[11px] font-bold"
                                style={{ color: UI.text.dark }}
                              >
                                {item.title}
                              </p>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    <div
                      className="mb-8 h-1.5 overflow-hidden rounded-full"
                      style={{ background: UI.card.soft }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: UI.button.primary }}
                        initial={false}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        transition={{
                          duration: 0.45,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </>
                )}

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="space-y-7"
                    >
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <Label
                            htmlFor="checkIn"
                            style={{ color: UI.text.dark }}
                            className="font-bold"
                          >
                            Check-in Date
                          </Label>
                          <Input
                            type="date"
                            id="checkIn"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleInputChange}
                            className={inputClass}
                            style={inputStyle}
                            required
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="checkOut"
                            style={{ color: UI.text.dark }}
                            className="font-bold"
                          >
                            Check-out Date
                          </Label>
                          <Input
                            type="date"
                            id="checkOut"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleInputChange}
                            className={inputClass}
                            style={inputStyle}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <Label
                            htmlFor="guests"
                            style={{ color: UI.text.dark }}
                            className="font-bold"
                          >
                            Number of Guests
                          </Label>
                          <select
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleInputChange}
                            className={selectClass}
                            style={inputStyle}
                          >
                            {[1, 2, 3, 4].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "Guest" : "Guests"}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Label
                            htmlFor="roomType"
                            style={{ color: UI.text.dark }}
                            className="font-bold"
                          >
                            Room Type
                          </Label>
                          <select
                            id="roomType"
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleInputChange}
                            className={selectClass}
                            style={inputStyle}
                            required
                          >
                            <option value="">Select Room Type</option>
                            <option value="ac">AC Room</option>
                            <option value="non-ac">Non-AC Room</option>
                            <option value="dormitory">Dormitory</option>
                            <option value="junior">Junior Students Room</option>
                          </select>
                        </div>
                      </div>

                      <motion.div
                        className="rounded-3xl p-5"
                        style={{
                          background: UI.card.soft,
                          border: `1px solid ${UI.border.white}`,
                        }}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl"
                            style={{
                              background: UI.button.primary,
                              color: UI.button.primaryText,
                            }}
                          >
                            <BedDouble size={22} />
                          </div>

                          <div>
                            <h4
                              className="font-black"
                              style={{ color: UI.text.dark }}
                            >
                              Room preference
                            </h4>
                            <p
                              className="mt-1 text-sm leading-6"
                              style={{ color: UI.text.accent }}
                            >
                              Select the option that best fits your stay. Final
                              room allocation may depend on availability.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <Button
                        onClick={nextStep}
                        className="h-14 w-full rounded-2xl text-base font-black"
                        style={{
                          background: UI.button.primary,
                          color: UI.button.primaryText,
                          boxShadow: UI.shadow.soft,
                        }}
                        disabled={
                          !formData.checkIn ||
                          !formData.checkOut ||
                          !formData.roomType
                        }
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Continue to Personal Info
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="space-y-7"
                    >
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <Label
                            htmlFor="name"
                            style={{ color: UI.text.dark }}
                            className="font-bold"
                          >
                            Full Name
                          </Label>

                          <div className="relative">
                            <User
                              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                              style={{ color: UI.text.accent }}
                            />
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`${inputClass} pl-11`}
                              style={inputStyle}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="email"
                            style={{ color: UI.text.dark }}
                            className="font-bold"
                          >
                            Email Address
                          </Label>

                          <div className="relative">
                            <Mail
                              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                              style={{ color: UI.text.accent }}
                            />
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`${inputClass} pl-11`}
                              style={inputStyle}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          style={{ color: UI.text.dark }}
                          className="font-bold"
                        >
                          Phone Number
                        </Label>

                        <div className="relative">
                          <Phone
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                            style={{ color: UI.text.accent }}
                          />
                          <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`${inputClass} pl-11`}
                            style={inputStyle}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="h-14 flex-1 rounded-2xl bg-transparent text-base font-black"
                          style={{
                            borderColor: UI.button.primary,
                            color: UI.text.dark,
                          }}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>

                        <Button
                          onClick={nextStep}
                          className="h-14 flex-1 rounded-2xl text-base font-black"
                          style={{
                            background: UI.button.primary,
                            color: UI.button.primaryText,
                            boxShadow: UI.shadow.soft,
                          }}
                          disabled={
                            !formData.name || !formData.email || !formData.phone
                          }
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Continue to Review
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="space-y-7"
                    >
                      <div
                        className="rounded-3xl p-6"
                        style={{
                          background: UI.card.white,
                          border: `1.5px solid ${UI.border.light}`,
                          boxShadow: UI.shadow.light,
                        }}
                      >
                        <h3
                          className="mb-5 text-xl font-black"
                          style={{ color: UI.text.dark }}
                        >
                          Booking Summary
                        </h3>

                        <div className="space-y-3 text-sm">
                          {[
                            ["Room Type", formData.roomType || "-"],
                            ["Check-in", formData.checkIn || "-"],
                            ["Check-out", formData.checkOut || "-"],
                            ["Guests", String(formData.guests)],
                            ["Name", formData.name || "-"],
                            ["Email", formData.email || "-"],
                            ["Phone", formData.phone || "-"],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0"
                              style={{ borderColor: UI.border.light }}
                            >
                              <span style={{ color: UI.text.accent }}>
                                {label}
                              </span>
                              <span
                                className="text-right font-bold"
                                style={{ color: UI.text.dark }}
                              >
                                {value}
                              </span>
                            </div>
                          ))}

                          <div
                            className="mt-5 rounded-2xl p-4"
                            style={{
                              background: UI.card.soft,
                            }}
                          >
                            <div className="flex items-center justify-between text-lg font-black">
                              <span style={{ color: UI.text.dark }}>
                                Total Amount
                              </span>
                              <span style={{ color: UI.text.accent }}>
                                ₹12,000
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="h-14 flex-1 rounded-2xl bg-transparent text-base font-black"
                          style={{
                            borderColor: UI.button.primary,
                            color: UI.text.dark,
                          }}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>

                        <Button
                          onClick={() => handleSubmit()}
                          disabled={isSubmitting}
                          className="h-14 flex-1 rounded-2xl text-base font-black"
                          style={{
                            background: UI.button.primary,
                            color: UI.button.primaryText,
                            boxShadow: UI.shadow.soft,
                          }}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          {isSubmitting ? "Processing..." : "Confirm Booking"}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 16,
                      }}
                      className="flex min-h-[480px] flex-col items-center justify-center py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -18 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                        }}
                        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full"
                        style={{
                          background: UI.card.soft,
                          color: UI.text.accent,
                          border: `1.5px solid ${UI.border.white}`,
                        }}
                      >
                        <CheckCircle className="h-12 w-12" />
                      </motion.div>

                      <h3
                        className="text-4xl font-semibold md:text-5xl"
                        style={{
                          color: UI.text.dark,
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        Booking Confirmed!
                      </h3>

                      <p
                        className="mx-auto mt-4 max-w-lg text-sm leading-7 md:text-base"
                        style={{ color: UI.text.accent }}
                      >
                        Your reservation has been confirmed. You&apos;ll receive
                        a confirmation email shortly with all the details.
                      </p>

                      <div
                        className="my-7 rounded-2xl px-5 py-4 text-sm"
                        style={{
                          background: UI.card.white,
                          border: `1.5px solid ${UI.border.light}`,
                          color: UI.text.dark,
                        }}
                      >
                        <strong>Booking ID:</strong>{" "}
                        AVD
                        {Math.random()
                          .toString(36)
                          .substr(2, 9)
                          .toUpperCase()}
                      </div>

                      <Button
                        className="h-14 rounded-2xl px-8 text-base font-black"
                        style={{
                          background: UI.button.primary,
                          color: UI.button.primaryText,
                          boxShadow: UI.shadow.soft,
                        }}
                      >
                        Download Confirmation
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  )
}