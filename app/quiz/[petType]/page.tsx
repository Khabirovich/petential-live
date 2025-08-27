import { Metadata } from 'next';
import { generateQuizSEO } from '@/lib/seo/config';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
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
  const metadata = generateSEOMetadata(seoConfig);

  // Add simplified JSON-LD for quiz
  return {
    ...metadata,
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${petType.charAt(0).toUpperCase() + petType.slice(1)} Breed Quiz`,
        "description": `Take our ${petType} breed compatibility quiz to find your perfect match`,
        "url": `https://petential.es/quiz/${petType}`,
        "isPartOf": {
          "@type": "WebSite",
          "name": "PETential",
          "url": "https://petential.es"
        }
      })
    }
  };
}

export default function QuizPage({ params }: Props) {
  const petType = params.petType as 'dog' | 'cat';
  
  if (petType !== 'dog' && petType !== 'cat') {
    return <div>Quiz not found</div>;
  }

  return <QuizPageClient petType={petType} />;
}