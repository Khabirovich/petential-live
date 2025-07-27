import Hero from "@/components/hero"
import About from "@/components/about"
import Features from "@/components/features"
import CTA from "@/components/cta"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Insights from "@/components/insights"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Features />
      <CTA />
      <Testimonials />
      <FAQ />
      <Insights />
    </main>
  )
}
