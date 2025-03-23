"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Key, Building, FileText, Check } from "lucide-react"
import Cookies from "js-cookie" // Import js-cookie to handle cookies


type AuthModalProps = {
  closeModal: () => void
}

const AuthModal = ({ closeModal }: AuthModalProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [gstRequired, setGstRequired] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gst_required: false,
    gst_number: "",
    company_name: "",
    billing_address: "",
  })

  // Toggles input fields in registration form
  const handleGstToggle = () => {
    setGstRequired(!gstRequired)
    setFormData({
      ...formData,
      gst_required: !gstRequired,
      gst_number: "",
      company_name: "",
      billing_address: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Submit form: Login or Register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const endpoint = isLogin ? "/customer-auth/login" : "/customer-auth/register"
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || "Authentication failed")
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token)
      localStorage.setItem("customer_id", data.customer_id)

      // Store token in HttpOnly cookie using js-cookie (for client-side access)
      Cookies.set("token", data.token, {
        expires: 1, // 1 day expiry
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      
      setSuccess(`${isLogin ? "Login" : "Registration"} successful!`)

      // Redirect to homepage after successful login/registration
      setTimeout(() => {
        closeModal() // close modal
        router.push("/") // redirect
      }, 800)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-4">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={closeModal}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Welcome Back" : "Create an Account"}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex items-center">
            <Check className="h-4 w-4 mr-2" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field for registration only */}
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          {/* Email & Password (common for both) */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* GST Toggle & Fields for registration only */}
          {!isLogin && (
            <>
              <div className="flex items-center space-x-2 py-2">
                <input
                  type="checkbox"
                  id="gst-toggle"
                  checked={gstRequired}
                  onChange={handleGstToggle}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="gst-toggle" className="text-sm text-gray-700">
                  Do you need a GST bill?
                </label>
              </div>

              {gstRequired && (
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="gst_number"
                      placeholder="GST Number"
                      value={formData.gst_number}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="company_name"
                      placeholder="Company Name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      name="billing_address"
                      placeholder="Billing Address"
                      value={formData.billing_address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle Form Type */}
        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="text-blue-600 hover:text-blue-800 font-medium" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthModal

