import Head from 'next/head';
import { JsonLdScript } from '@/lib/seo/metadata';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: any;
  noIndex?: boolean;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd,
  noIndex = false
}: SEOHeadProps) {
  const baseUrl = 'https://petential.es';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage || '/images/social/og-image.png';

  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={fullCanonical} />
        
        {/* Open Graph */}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        <meta property="og:url" content={fullCanonical} />
        <meta property="og:type" content={ogType} />
        <meta property="og:image" content={`${baseUrl}${fullOgImage}`} />
        <meta property="og:site_name" content="PETential" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@petential" />
        <meta name="twitter:creator" content="@petential" />
        {title && <meta name="twitter:title" content={title} />}
        {description && <meta name="twitter:description" content={description} />}
        <meta name="twitter:image" content={`${baseUrl}${fullOgImage}`} />
        
        {/* Additional SEO tags */}
        <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
        <meta name="googlebot" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://api.thedogapi.com" />
        <link rel="dns-prefetch" href="https://api.thecatapi.com" />
      </Head>
      
      {/* JSON-LD structured data */}
      {jsonLd && <JsonLdScript data={jsonLd} />}
    </>
  );
}