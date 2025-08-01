import { Metadata } from 'next';
import { pageSEO } from "@/lib/seo/config"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = generateSEOMetadata(pageSEO.contact.en);

export default function ContactPage() {
  return <ContactPageClient />;
}
