import { Metadata } from 'next';
import { pageSEO } from "@/lib/seo/config"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = generateSEOMetadata(pageSEO.about.en);

export default function AboutPage() {
  return <AboutPageClient />;
}
