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
import { JsonLdScript } from "@/components/seo/JsonLdScript"
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateHowToSchema 
} from "@/lib/seo/structured-data"

export const metadata: Metadata = generateSEOMetadata(pageSEO.home.en);

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={pageSEO.home.en.jsonLd} />
      <JsonLdScript data={generateOrganizationSchema()} />
      <JsonLdScript data={generateWebsiteSchema()} />
      <JsonLdScript data={generateHowToSchema()} />
      <main>
        <Hero />
        <About />
        <Features />
        <CTA />
        <Testimonials />
        <FAQ />
        <Insights />
      </main>
    </>
  )
}
