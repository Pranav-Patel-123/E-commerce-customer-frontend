"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ArrowRight } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL // Ensure this is set in your env variables

interface Category {
  _id: string
  name: string
  image: string
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/categories`)
        setCategories(res.data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Browse our extensive collection of products by category to find exactly what you need.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 transform hover:-translate-y-1 flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                      <img
                        src={category.image || "/placeholder.svg?height=100&width=100"}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">Quality products for all your needs</p>
                    <div className="mt-auto">
                      <span className="text-blue-600 flex items-center justify-center">
                        Browse Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {categories.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">No categories found. Please check back later.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CategoriesPage

