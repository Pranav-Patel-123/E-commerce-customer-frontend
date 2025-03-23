"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Minus, Plus, Trash2, ArrowLeft, CreditCard, ShoppingCart } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  image?: string
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const router = useRouter()

  // Load cart items and customer ID on mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(storedCartItems)

    const storedCustomerId = localStorage.getItem("customer_id")
    setCustomerId(storedCustomerId)
  }, [])

  const updateQuantity = (id: string, change: number) => {
    const updatedCart = cartItems
      .map((item) => (item._id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item))
      .filter((item) => item.quantity > 0)

    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15.0
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  // Handle Checkout
  const handleCheckout = async () => {
    setError("")
    setSuccess("")

    if (!customerId) {
      setError("You must be logged in to checkout!")
      setTimeout(() => router.push("/auth"), 1500)
      return
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty!")
      return
    }

    setLoading(true)
    try {
      const orderData = {
        customer_id: customerId,
        items: cartItems.map((item) => ({
          product_id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total_price: total,
      }

      const response = await axios.post(`${API_URL}/orders/`, orderData)

      if (response.status === 200 || response.status === 201) {
        setSuccess("Order placed successfully!")
        localStorage.removeItem("cart")
        setCartItems([])
        setTimeout(() => router.push("/orders"), 1500)
      } else {
        throw new Error("Failed to place order. Please try again.")
      }
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error processing order.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">{error}</div>}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">{success}</div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items yet.</p>
              <button
                onClick={() => router.push("/products")}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                  </div>

                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item._id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ShoppingCart className="h-8 w-8 text-gray-400" />
                          )}
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>

                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item._id, -1)}
                              className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-3 min-w-[2rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, 1)}
                              className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-0 flex flex-col items-end">
                          <span className="font-bold text-lg mb-2">${(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-red-600 hover:text-red-800 transition-colors flex items-center"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                  </div>

                  <div className="p-6 space-y-4">
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

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-6"
                      disabled={loading}
                    >
                      <CreditCard className="h-5 w-5" />
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>

                    <button
                      onClick={() => router.push("/products")}
                      className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mt-3"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Cart

