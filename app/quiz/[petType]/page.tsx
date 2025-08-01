import { Metadata } from 'next';
import { generateQuizSEO } from '@/lib/seo/config';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { generateQuizSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import QuizPageClient from './QuizPageClient';

interface Props {
  params: { petType: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const petType = params.petType as 'dog' | 'cat';
  
  if (petType !== 'dog' && petType !== 'cat') {
    return generateSEOMetadata({
      title: 'Quiz Not Found | PETential',
      description: 'The requested quiz page was not found.',
    });
  }

  const seoConfig = generateQuizSEO(petType, 'en');
  return generateSEOMetadata(seoConfig);
}

export default function QuizPage({ params }: Props) {
  const petType = params.petType as 'dog' | 'cat';
  
  if (petType !== 'dog' && petType !== 'cat') {
    return <div>Quiz not found</div>;
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://petential.es' },
    { name: 'Quiz', url: 'https://petential.es/quiz' },
    { name: `${petType.charAt(0).toUpperCase() + petType.slice(1)} Quiz`, url: `https://petential.es/quiz/${petType}` }
  ];

  return (
    <>
      <JsonLdScript data={generateQuizSchema(petType)} />
      <JsonLdScript data={generateBreadcrumbSchema(breadcrumbs)} />
      <QuizPageClient petType={petType} />
    </>
  );
}