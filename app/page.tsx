import { Metadata } from 'next';
import Hero from "@/components/hero"
import About from "@/components/about"
import Features from "@/components/features"
import CTA from "@/components/cta"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Insights from "@/components/insights"
import { pageSEO } from "@/lib/seo/config"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = {
  ...generateSEOMetadata(pageSEO.home.en),
  other: {
    'script:ld+json': [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "PETential",
        "description": "Pet breed matching platform helping users find their perfect companion",
        "url": "https://petential.es"
      }),
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "PETential",
        "description": "Find your perfect pet match with our intelligent breed matching quiz",
        "url": "https://petential.es"
      })
    ]
  }
};

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
