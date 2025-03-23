"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { ArrowRight } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL // Ensure this is set in your env variables

interface Category {
  _id: string
  name: string
  image: string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/categories`)
        setCategories(res.data.slice(0, 6)) // Show only the first 6 categories
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl text-black mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
        <button
          onClick={() => router.push("/categories")}
          className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
        >
          View all categories
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => router.push(`/categories/${category._id}`)}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <span className="text-center font-medium text-gray-800">{category.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View More Button */}
      <div className="mt-8 text-center md:hidden">
        <button
          onClick={() => router.push("/categories")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
        >
          View More Categories
        </button>
      </div>
    </div>
  )
}

export default Categories

