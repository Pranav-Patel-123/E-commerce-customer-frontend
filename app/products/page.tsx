"use client"

import { useState } from "react"
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import axios from "axios"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Star, ShoppingCart, Heart } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

type Product = {
  _id: string
  name: string
  price: number
  images: string[]
  category: string
  rating: number
  description?: string
}

const fetchProducts = async () => {
  const { data } = await axios.get<Product[]>(`${API_URL}/products/products`)
  return data
}

function ProductsListContent() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSort, setSelectedSort] = useState("Newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const productsPerPage = 12

  const categories = ["All", "Tools", "Nuts & Bolts", "Bearings", "Chains", "Pipes & Fittings", "Welding"]
  const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Most Popular"]

  // Filtering
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sorting
  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (selectedSort) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Most Popular":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Check if the product is already in the cart
    const existingItem = existingCart.find((item: Product) => item._id === product._id)

    if (existingItem) {
      existingItem.quantity += 1 // Increase quantity
    } else {
      existingCart.push({ ...product, quantity: 1 }) // Add new item with quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(existingCart))
    alert(`${product.name} added to cart!`)
  }

  const addToWishlist = (product: Product) => {
    // Implementation would go here
    alert(`${product.name} added to wishlist!`)
  }

  // Pagination
  const totalPages = Math.ceil((sortedProducts?.length || 0) / productsPerPage)
  const currentProducts = sortedProducts?.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 px-6 rounded-xl mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        <p className="text-xl max-w-3xl">
          Browse our extensive collection of high-quality hardware products for all your needs.
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Filters</h2>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory("All")
                setSearchQuery("")
              }}
              className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-12 bg-red-50 rounded-xl">
              <p className="text-red-600">Error fetching products. Please try again later.</p>
            </div>
          )}

          {!isLoading && !isError && currentProducts?.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600">No products found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}

          {!isLoading && !isError && currentProducts && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={product.images?.length > 0 ? product.images[0] : "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={() => addToWishlist(product)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      {renderRatingStars(product.rating)}
                      {/* <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span> */}
                      <span className="ml-2 text-sm text-gray-600">
                        {typeof product.rating === "number" ? product.rating.toFixed(1) : "N/A"}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description || "Quality hardware product for your needs."}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductsList() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <ProductsListContent />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

