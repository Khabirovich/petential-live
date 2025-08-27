import { Metadata } from 'next';
import { SEOConfig } from './config';

export function generateMetadata(seoConfig: SEOConfig, baseUrl: string = 'https://petential.es'): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    openGraph,
    twitter,
  } = seoConfig;

  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: canonicalUrl,
      siteName: 'PETential',
      images: [
        {
          url: openGraph?.image || '/images/social/og-image.png',
          width: 1200,
          height: 630,
          alt: openGraph?.title || title,
        }
      ],
      locale: 'en_US',
      type: (openGraph?.type as any) || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: twitter?.title || title,
      description: twitter?.description || description,
      images: [twitter?.image || '/images/social/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

