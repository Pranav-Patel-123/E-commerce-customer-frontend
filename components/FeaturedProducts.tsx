"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Star, ShoppingCart, Heart } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  rating: number
  inStock: boolean
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/featured`)
        setProducts(res.data.slice(0, 4)) // Show only 4 featured products
      } catch (error) {
        console.error("Failed to fetch featured products:", error)
        // Use placeholder data if API fails
        setProducts([
          {
            _id: "1",
            name: "Professional Drill Set",
            description: "High-performance drill with multiple attachments",
            price: 129.99,
            image: "/placeholder.svg?height=300&width=300",
            rating: 4.8,
            inStock: true,
          },
          {
            _id: "2",
            name: "Premium Toolbox",
            description: "Durable toolbox with multiple compartments",
            price: 79.99,
            image: "/placeholder.svg?height=300&width=300",
            rating: 4.5,
            inStock: true,
          },
          {
            _id: "3",
            name: "Measuring Tape Set",
            description: "Precision measuring tapes in various sizes",
            price: 24.99,
            image: "/placeholder.svg?height=300&width=300",
            rating: 4.7,
            inStock: true,
          },
          {
            _id: "4",
            name: "Power Saw",
            description: "Heavy-duty power saw for professional use",
            price: 199.99,
            image: "/placeholder.svg?height=300&width=300",
            rating: 4.9,
            inStock: false,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading featured products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-cover" />
              <button
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Out of Stock
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center mb-2">
                {renderRatingStars(product.rating)}
                <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
              </div>

              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

              <div className="flex justify-between items-center">
                <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    product.inStock
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  } transition-colors`}
                  disabled={!product.inStock}
                  onClick={() => product.inStock && router.push(`/products/${product._id}`)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Sold Out"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => router.push("/products")}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View All Products
        </button>
      </div>
    </div>
  )
}

