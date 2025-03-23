import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      role: "Professional Contractor",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "I've been using tools from Poonam Hardware for over 5 years now. The quality and durability are unmatched. Their customer service is also exceptional.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "DIY Enthusiast",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "As someone who loves DIY projects, finding the right tools is essential. Poonam Hardware has everything I need, and their staff is always helpful with recommendations.",
      rating: 4,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Construction Manager",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "For our construction company, reliability is key. Poonam Hardware consistently delivers high-quality products that stand up to the demands of our job sites. Their extensive inventory means we can find everything in one place.",
      rating: 5,
    },
  ]

  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with
            Poonam Hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">{renderRatingStars(testimonial.rating)}</div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

