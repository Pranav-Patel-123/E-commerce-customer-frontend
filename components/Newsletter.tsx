"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send this to your API
      console.log("Newsletter subscription:", email)
      setSubscribed(true)
      setEmail("")

      // Reset the subscribed message after 3 seconds
      setTimeout(() => {
        setSubscribed(false)
      }, 3000)
    }
  }

  return (
    <div className="py-16 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">
            Subscribe to our newsletter to receive updates on new products, special offers, and DIY tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              Subscribe
              <Send className="ml-2 h-5 w-5" />
            </button>
          </form>

          {subscribed && (
            <p className="mt-4 text-blue-200">Thank you for subscribing! You'll receive our next newsletter soon.</p>
          )}
        </div>
      </div>
    </div>
  )
}

