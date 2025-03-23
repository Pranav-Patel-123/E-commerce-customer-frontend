"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Menu, LogOut, User, X } from "lucide-react"
import { jwtDecode } from "jwt-decode" // Named import from "jwt-decode"
import AuthModal from "../app/auth/page" // The modal component

const Header = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Checks token on mount to determine login status
  useEffect(() => {
    checkLoginStatus()
  }, [])

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded: any = jwtDecode(token)
        const isTokenValid = decoded.exp * 1000 > Date.now()
        setIsLoggedIn(isTokenValid)
        if (!isTokenValid) {
          localStorage.removeItem("token")
        }
      } catch (error) {
        console.error("Invalid token:", error)
        localStorage.removeItem("token")
        setIsLoggedIn(false)
      }
    }
  }

  // Logs user out and redirects to homepage
  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      <header className="bg-white text-black shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="ml-2 text-3xl font-bold text-black">Poonam Hardware</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              </form>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-black hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-black hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-black hover:text-blue-600 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-black hover:text-blue-600 transition-colors">
                Contact
              </Link>

              {/* Show cart & orders only if logged in */}
              {isLoggedIn && (
                <>
                  <Link href="/cart" className="relative">
                    <ShoppingCart className="h-6 w-6 text-black hover:text-blue-600 transition-colors" />
                    {/* <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span> */}
                  </Link>
                  <Link href="/orders" className="text-black hover:text-blue-600 transition-colors">
                    Orders
                  </Link>
                </>
              )}

              {/* Login or Logout */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="px-4 space-y-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              </form>

              <Link href="/products" className="block py-2 text-black hover:text-blue-600">
                Products
              </Link>
              <Link href="/categories" className="block py-2 text-black hover:text-blue-600">
                Categories
              </Link>
              <Link href="/about" className="block py-2 text-black hover:text-blue-600">
                About Us
              </Link>
              <Link href="/contact" className="block py-2 text-black hover:text-blue-600">
                Contact
              </Link>

              {isLoggedIn && (
                <>
                  <Link href="/cart" className="block py-2 text-black hover:text-blue-600">
                    Cart
                  </Link>
                  <Link href="/orders" className="block py-2 text-black hover:text-blue-600">
                    Orders
                  </Link>
                </>
              )}

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAuth(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full mt-2 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal: When closed, re-check login status */}
      {showAuth && (
        <AuthModal
          closeModal={() => {
            setShowAuth(false)
            checkLoginStatus()
          }}
        />
      )}
    </>
  )
}

export default Header

