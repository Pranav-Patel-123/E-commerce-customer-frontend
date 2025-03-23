"use client"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  const router = useRouter()

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=500&width=500')",
            backgroundSize: "50px",
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your One-Stop Hardware Solution
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-lg">
              Quality tools and equipment for professionals and DIY enthusiasts. Discover our premium selection of
              hardware products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/products")}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => router.push("/categories")}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </button>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Hardware tools collection"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-bold">
                New Arrivals!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

