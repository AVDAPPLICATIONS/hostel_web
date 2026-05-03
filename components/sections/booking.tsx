"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Users, CreditCard, CheckCircle } from "lucide-react"

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setStep(4) // Success step
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-slate-100 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-[#1D3557]/10 backdrop-blur-sm rounded-full text-[#1D3557] font-medium text-sm border border-[#1D3557]/20 mb-4"
          >
            🎯 Smart Booking System
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Book Your{" "}
            <span className="text-[#1D3557]">Stay</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Secure your spot at Atmiya Vidya Dham with our simple and secure booking process. Real-time availability and
            instant confirmation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-2xl bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-800">
                  {step === 1 && "Select Dates & Room"}
                  {step === 2 && "Personal Information"}
                  {step === 3 && "Payment Details"}
                  {step === 4 && "Booking Confirmed!"}
                </CardTitle>

                {/* Progress Indicator */}
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber
                          ? "bg-[#1D3557] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <Input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <Input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="roomType">Room Type</Label>
                      <select
                        id="roomType"
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

                  <Button
                    onClick={nextStep}
                    className="w-full bg-[#1D3557] hover:bg-slate-800 text-white"
                    disabled={!formData.checkIn || !formData.checkOut || !formData.roomType}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Continue to Personal Info
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="flex-1 bg-[#1D3557] hover:bg-slate-800 text-white"
                      disabled={!formData.name || !formData.email || !formData.phone}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Continue to Payment
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Room Type:</span>
                        <span className="font-medium">{formData.roomType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium">{formData.checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-medium">{formData.checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-medium">{formData.guests}</span>
                      </div>
                      <div className="border-t pt-2 mt-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total Amount:</span>
                          <span className="text-blue-600">₹12,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input type="text" id="expiry" placeholder="MM/YY" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input type="text" id="cvv" placeholder="123" className="mt-1" required />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-[#1D3557] hover:bg-slate-800 text-white"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Processing..." : "Complete Booking"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-6">
                    Your reservation has been confirmed. You'll receive a confirmation email shortly with all the
                    details.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600">
                      <strong>Booking ID:</strong> AVD{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>
                  <Button className="bg-[#1D3557] hover:bg-slate-800 text-white">
                    Download Confirmation
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
