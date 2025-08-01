import { Metadata } from 'next';
import { pageSEO } from "@/lib/seo/config"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"
import ResultsPageClient from './ResultsPageClient';

export const metadata: Metadata = generateSEOMetadata(pageSEO.results.en);

export default function ResultsPage() {
  return <ResultsPageClient />;
}