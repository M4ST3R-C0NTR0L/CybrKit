import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"

/**
 * Landing page component
 * Assembles all landing page sections
 */
export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
    </div>
  )
}
