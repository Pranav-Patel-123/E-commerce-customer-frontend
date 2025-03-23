import { Shield, Truck, CreditCard, RotateCcw } from "lucide-react"

export default function TrustBadges() {
  const badges = [
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Secure Shopping",
      description: "Your data is protected with industry-leading encryption",
    },
    {
      icon: <Truck className="h-10 w-10 text-blue-600" />,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-blue-600" />,
      title: "Secure Payment",
      description: "Multiple payment options available",
    },
    {
      icon: <RotateCcw className="h-10 w-10 text-blue-600" />,
      title: "Easy Returns",
      description: "30-day money-back guarantee",
    },
  ]

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="mb-4">{badge.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{badge.title}</h3>
              <p className="text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

