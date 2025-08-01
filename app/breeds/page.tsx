import { Metadata } from 'next';
import { pageSEO } from "@/lib/seo/config"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"
import BreedsPageClient from './BreedsPageClient';

export const metadata: Metadata = generateSEOMetadata(pageSEO.breeds.en);

export default function BreedsPage() {
  return <BreedsPageClient />;
}
