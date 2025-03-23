import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Users, Award, Clock, PenToolIcon as Tool } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Poonam Hardware</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your trusted partner for quality hardware solutions since 1995. We're committed to providing the best
              tools and equipment for professionals and DIY enthusiasts.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our store"
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Poonam Hardware was founded in 1995 with a simple mission: to provide high-quality hardware products
                  at fair prices with exceptional customer service. What started as a small family-owned store has grown
                  into a trusted name in the hardware industry.
                </p>
                <p className="text-gray-700 mb-4">
                  Our founder, Mr. Poonam Singh, began with a passion for tools and a vision to create a one-stop shop
                  for all hardware needs. His dedication to quality and customer satisfaction has been the cornerstone
                  of our business philosophy.
                </p>
                <p className="text-gray-700">
                  Today, we continue to uphold these values while embracing modern technology to enhance the shopping
                  experience for our customers. Whether you're a professional contractor or a weekend DIY enthusiast,
                  we're here to help you find the right tools for the job.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">
                  We source only the best products from trusted manufacturers to ensure durability and performance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
                <p className="text-gray-600">
                  Our knowledgeable staff is always ready to assist you with expert advice and personalized
                  recommendations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Tool className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We stay updated with the latest tools and technologies to offer modern solutions for every project.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                <p className="text-gray-600">
                  Count on us for consistent quality, timely delivery, and dependable after-sales support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={`/placeholder.svg?height=300&width=400&text=Team Member ${i}`}
                    alt={`Team Member ${i}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">Team Member {i}</h3>
                    <p className="text-blue-600 mb-4">Position Title</p>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

