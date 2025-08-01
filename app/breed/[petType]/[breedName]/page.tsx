import { Metadata } from 'next';
import { generateBreedSEO } from '@/lib/seo/config';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { generateBreedSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';
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
  return generateSEOMetadata(seoConfig);
}

export default function BreedDetailsPage({ params }: Props) {
  const petType = params.petType as 'dog' | 'cat';
  const breedName = decodeURIComponent(params.breedName);
  
  if (petType !== 'dog' && petType !== 'cat') {
    return <div>Breed not found</div>;
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://petential.es' },
    { name: 'Breeds', url: 'https://petential.es/breeds' },
    { name: `${petType.charAt(0).toUpperCase() + petType.slice(1)} Breeds`, url: `https://petential.es/breeds?tab=${petType}s` },
    { name: breedName, url: `https://petential.es/breed/${petType}/${encodeURIComponent(breedName)}` }
  ];

  return (
    <>
      <JsonLdScript data={generateBreedSchema(breedName, petType, {})} />
      <JsonLdScript data={generateBreadcrumbSchema(breadcrumbs)} />
      <BreedDetailsClient petType={petType} breedName={breedName} />
    </>
  );
}
