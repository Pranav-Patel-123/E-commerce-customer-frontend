import Hero from "@/components/Hero"
import Categories from "@/components/Categories"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import FeaturedProducts from "@/components/FeaturedProducts"
import Testimonials from "@/components/Testimonials"
import Newsletter from "@/components/Newsletter"
import TrustBadges from "@/components/TrustBadges"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
        <TrustBadges />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

