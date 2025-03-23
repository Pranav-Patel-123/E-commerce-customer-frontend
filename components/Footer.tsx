"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send this to your API
      console.log("Subscribing email:", email)
      setSubscribed(true)
      setEmail("")

      // Reset the subscribed message after 3 seconds
      setTimeout(() => {
        setSubscribed(false)
      }, 3000)
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          <div>
            <h3 className="font-bold text-xl mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">Your trusted partner for quality hardware solutions since 1995.</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-400 hover:text-white transition-colors">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">Contact</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 Hardware Street</p>
              <p className="mb-2">Industrial Area, City</p>
              <p className="mb-2">Phone: (555) 123-4567</p>
              <p className="mb-2">
                Email:{" "}
                <a href="mailto:info@hardwarehub.com" className="hover:text-white transition-colors">
                  info@hardwarehub.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to receive updates on new products and special promotions.</p>
            <form onSubmit={handleSubscribe}>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
            {subscribed && <p className="text-green-400 mt-2">Thank you for subscribing!</p>}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Poonam Hardware. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/shipping-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

