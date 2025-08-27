import { Metadata } from 'next';
import { generateBreedSEO } from '@/lib/seo/config';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import BreedDetailsClient from './BreedDetailsClient';

interface Props {
  params: { petType: string; breedName: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const petType = params.petType as 'dog' | 'cat';
  const breedName = decodeURIComponent(params.breedName);

  if (petType !== 'dog' && petType !== 'cat') {
    return generateSEOMetadata({
      title: 'Breed Not Found | PETential',
      description: 'The requested breed page was not found.',
    });
  }

  const seoConfig = generateBreedSEO(breedName, petType, 'en');
  const metadata = generateSEOMetadata(seoConfig);

  // Add simplified JSON-LD for breed page
  return {
    ...metadata,
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${breedName} ${petType.charAt(0).toUpperCase() + petType.slice(1)} Breed Information`,
        "description": `Complete guide to the ${breedName} ${petType} breed including characteristics, temperament, and care requirements`,
        "url": `https://petential.es/breed/${petType}/${encodeURIComponent(breedName)}`,
        "isPartOf": {
          "@type": "WebSite",
          "name": "PETential",
          "url": "https://petential.es"
        },
        "about": {
          "@type": "Thing",
          "name": breedName,
          "description": `${breedName} ${petType} breed characteristics and information`
        }
      })
    }
  };
}

export default function BreedDetailsPage({ params }: Props) {
  const petType = params.petType as 'dog' | 'cat';
  const breedName = decodeURIComponent(params.breedName);
  
  if (petType !== 'dog' && petType !== 'cat') {
    return <div>Breed not found</div>;
  }

  return <BreedDetailsClient petType={petType} breedName={breedName} />;
}
