"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/utils"

interface ProductCardProps {
  product: {
    _id: string
    name: string
    price: number
    images: string[]
    description?: string
    rating: number
    category?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg?height=300&width=300",
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleClick = () => {
    router.push(`/products/${product._id}`)
  }

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
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={product.images?.[0] || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
        </button>
        {product.category && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.category}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center mb-2">
          {renderRatingStars(product.rating)}
          <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
        </div>

        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description || "Quality hardware product for your needs."}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-bold text-xl">{formatCurrency(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

