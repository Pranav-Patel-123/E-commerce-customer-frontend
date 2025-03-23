"use client"

import { useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle, Truck, Calendar, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OrderConfirmationPage() {
  const router = useRouter()

  // Generate a random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000)

  // Get current date and estimated delivery date (7 days from now)
  const currentDate = new Date()
  const deliveryDate = new Date(currentDate)
  deliveryDate.setDate(deliveryDate.getDate() + 7)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 text-center border-b">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
              <p className="text-gray-600">Your order has been received and is now being processed.</p>
            </div>

            <div className="p-8">
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex flex-col sm:flex-row justify-between mb-6">
                  <div>
                    <p className="text-gray-600 text-sm">Order Number</p>
                    <p className="font-semibold"># {orderNumber}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <p className="text-gray-600 text-sm">Order Date</p>
                    <p className="font-semibold">{formatDate(currentDate)}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Payment Method</p>
                    <p className="font-semibold">Credit Card (•••• 1234)</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <p className="text-gray-600 text-sm">Estimated Delivery</p>
                    <p className="font-semibold">{formatDate(deliveryDate)}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                <div className="relative">
                  <div className="absolute left-5 top-0 h-full border-l-2 border-gray-200"></div>

                  <div className="mb-8 flex">
                    <div className="flex-shrink-0 bg-green-500 rounded-full h-10 w-10 flex items-center justify-center z-10">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-6">
                      <h3 className="font-semibold">Order Confirmed</h3>
                      <p className="text-gray-600 text-sm">Your order has been placed.</p>
                      <p className="text-gray-500 text-xs">{formatDate(currentDate)}</p>
                    </div>
                  </div>

                  <div className="mb-8 flex">
                    <div className="flex-shrink-0 bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center z-10">
                      <ShoppingBag className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-6">
                      <h3 className="font-semibold text-gray-600">Processing</h3>
                      <p className="text-gray-600 text-sm">Your order is being prepared.</p>
                    </div>
                  </div>

                  <div className="mb-8 flex">
                    <div className="flex-shrink-0 bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center z-10">
                      <Truck className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-6">
                      <h3 className="font-semibold text-gray-600">Shipped</h3>
                      <p className="text-gray-600 text-sm">Your order has been shipped.</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center z-10">
                      <Calendar className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-6">
                      <h3 className="font-semibold text-gray-600">Delivered</h3>
                      <p className="text-gray-600 text-sm">Estimated delivery date: {formatDate(deliveryDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-6">A confirmation email has been sent to your email address.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push("/orders")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Order Status
                  </button>
                  <button
                    onClick={() => router.push("/products")}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Continue Shopping
                  </button>
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

