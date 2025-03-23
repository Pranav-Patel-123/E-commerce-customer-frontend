"use client"

import { useState, useEffect } from "react"
import { useLocalStorage } from "./use-local-storage"

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", [])
  const [subtotal, setSubtotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // Calculate subtotal and item count whenever cart changes
    const newSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const newItemCount = cart.reduce((count, item) => count + item.quantity, 0)

    setSubtotal(newSubtotal)
    setItemCount(newItemCount)
  }, [cart])

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingItemIndex = prevCart.findIndex((item) => item._id === product._id)

      if (existingItemIndex >= 0) {
        // If it exists, increase the quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // If it doesn't exist, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return

    setCart((prevCart) => prevCart.map((item) => (item._id === id ? { ...item, quantity } : item)))
  }

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return {
    cart,
    subtotal,
    itemCount,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  }
}

