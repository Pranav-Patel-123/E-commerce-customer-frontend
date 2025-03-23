"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  exp: number
  customer_id: string
  [key: string]: any
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token")
      const storedCustomerId = localStorage.getItem("customer_id")

      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token)
          const isTokenValid = decoded.exp * 1000 > Date.now()

          if (isTokenValid) {
            setIsLoggedIn(true)
            setCustomerId(storedCustomerId || decoded.customer_id)
          } else {
            // Token expired
            localStorage.removeItem("token")
            localStorage.removeItem("customer_id")
            setIsLoggedIn(false)
            setCustomerId(null)
          }
        } catch (error) {
          // Invalid token
          console.error("Invalid token:", error)
          localStorage.removeItem("token")
          localStorage.removeItem("customer_id")
          setIsLoggedIn(false)
          setCustomerId(null)
        }
      } else {
        setIsLoggedIn(false)
        setCustomerId(null)
      }

      setLoading(false)
    }

    checkLoginStatus()
  }, [])

  const login = (token: string, id: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("customer_id", id)
    setIsLoggedIn(true)
    setCustomerId(id)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("customer_id")
    setIsLoggedIn(false)
    setCustomerId(null)
    router.push("/")
  }

  return { isLoggedIn, customerId, loading, login, logout }
}

