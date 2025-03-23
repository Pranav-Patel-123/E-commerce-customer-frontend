"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CreditCard, ShoppingBag, Check, ChevronRight, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Payment Information
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",

    // Order Notes
    notes: "",
  })

  // Mock cart items
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Professional Drill Set",
      price: 129.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: "2",
      name: "Premium Toolbox",
      price: 79.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 2,
    },
    {
      id: "3",
      name: "Measuring Tape Set",
      price: 24.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      // Validate shipping information
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode
      ) {
        alert("Please fill in all required fields")
        return
      }

      // Move to payment step
      setStep(2)
      window.scrollTo(0, 0)
    } else if (step === 2) {
      // Validate payment information
      if (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        alert("Please fill in all payment details")
        return
      }

      // Move to confirmation step
      setStep(3)
      window.scrollTo(0, 0)
    } else {
      // Place order
      alert("Order placed successfully!")
      router.push("/order-confirmation")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div className={`flex flex-col items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="mt-2 text-sm font-medium">Shipping</span>
              </div>

              <div className={`flex-grow border-t-2 mx-4 ${step >= 2 ? "border-blue-600" : "border-gray-200"}`}></div>

              <div className={`flex flex-col items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="mt-2 text-sm font-medium">Payment</span>
              </div>

              <div className={`flex-grow border-t-2 mx-4 ${step >= 3 ? "border-blue-600" : "border-gray-200"}`}></div>

              <div className={`flex flex-col items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  <Check className="h-5 w-5" />
                </div>
                <span className="mt-2 text-sm font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {step === 1 && (
                  <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-semibold">Shipping Information</h2>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Order Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Special instructions for delivery"
                        ></textarea>
                      </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50">
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => router.push("/cart")}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Return to Cart
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                        >
                          Continue to Payment
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-semibold">Payment Information</h2>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="flex items-center justify-center bg-blue-50 text-blue-700 p-4 rounded-lg mb-6">
                        <Lock className="h-5 w-5 mr-2" />
                        <span>Your payment information is secure and encrypted</span>
                      </div>

                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50">
                      <div className="flex justify-between">
                        <button type="button" onClick={() => setStep(1)} className="text-blue-600 hover:text-blue-800">
                          Back to Shipping
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                        >
                          Review Order
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <div>
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-semibold">Order Confirmation</h2>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
                        <Check className="h-5 w-5 mr-2" />
                        <span>Please review your order details before placing your order.</span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Shipping Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p>{formData.address}</p>
                          <p>
                            {formData.city}, {formData.state} {formData.zipCode}
                          </p>
                          <p>{formData.country}</p>
                          <p>{formData.email}</p>
                          <p>{formData.phone}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
                        <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                          <span>Credit Card ending in {formData.cardNumber.slice(-4)}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                        <div className="divide-y border rounded-lg overflow-hidden">
                          {cartItems.map((item) => (
                            <div key={item.id} className="p-4 flex items-center">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg mr-4"
                              />
                              <div className="flex-grow">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50">
                      <div className="flex justify-between">
                        <button type="button" onClick={() => setStep(2)} className="text-blue-600 hover:text-blue-800">
                          Back to Payment
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

