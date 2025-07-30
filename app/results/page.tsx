'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { getBreedImageWithFallback } from '@/lib/breed-images';

interface Breed {
  name: string;
  score: number;
  image: string;
}

interface Results {
  pet_type: string;
  breeds: Breed[];
  high_match: Breed[];
  medium_match: Breed[];
  low_match: Breed[];
}

export default function ResultsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get breed image from local folder
  const getBreedImage = (breedName: string, petType: string): string => {
    return getBreedImageWithFallback(breedName, petType as 'dog' | 'cat');
  };

  useEffect(() => {
    // Get results from localStorage (set by quiz)
    const quizResults = localStorage.getItem('quizResults');
    if (quizResults) {
      try {
        const data = JSON.parse(quizResults);
        setResults(data);

        // Set local images for all breeds
        if (data.breeds && data.breeds.length > 0) {
          const updatedBreeds = data.breeds.map((breed: Breed) => ({
            ...breed,
            image: getBreedImage(breed.name, data.pet_type)
          }));

          setResults({
            ...data,
            breeds: updatedBreeds,
            high_match: updatedBreeds.slice(0, 3),
            medium_match: updatedBreeds.slice(3, 6),
            low_match: updatedBreeds.slice(6, 9)
          });
        } else {
          setResults(data);
        }
      } catch (error) {
        console.error('Failed to parse results:', error);
        setError(language === 'es' ? 'Error al cargar resultados. Por favor intenta hacer el quiz de nuevo.' : 'Failed to load results. Please try taking the quiz again.');
      }
    } else {
      setError('No quiz results found. Please take the quiz first.');
    }
    setIsLoading(false);
  }, []);

  const getCompatibilityLevel = (breed: Breed, results: Results) => {
    if (results.high_match.some(b => b.name === breed.name)) return 'high';
    if (results.medium_match.some(b => b.name === breed.name)) return 'medium';
    return 'low';
  };

  const getCompatibilityLabel = (level: string) => {
    if (language === 'es') {
      switch (level) {
        case 'high': return 'Excelente Compatibilidad';
        case 'medium': return 'Buena Compatibilidad';
        default: return 'Compatibilidad Regular';
      }
    } else {
      switch (level) {
        case 'high': return 'Excellent Match';
        case 'medium': return 'Good Match';
        default: return 'Fair Match';
      }
    }
  };

  const getCompatibilityColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{language === 'es' ? 'Cargando tus resultados...' : 'Loading your results...'}</span>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{language === 'es' ? 'Error' : 'Error'}</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => router.push('/quiz')}
          className="btn-primary"
        >
          {language === 'es' ? 'Repetir Quiz' : 'Take Quiz Again'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'es'
            ? `Tus Razas de ${results.pet_type === 'dog' ? 'Perro' : 'Gato'} Compatibles`
            : `Your ${results.pet_type.charAt(0).toUpperCase() + results.pet_type.slice(1)} Breed Matches`
          }
        </h1>
        <p className="text-xl text-gray-600">
          {language === 'es'
            ? 'Basado en tus respuestas, hemos encontrado las siguientes razas que mejor coinciden con tus preferencias y estilo de vida.'
            : 'Based on your responses, we\'ve found the following breeds that best match your preferences and lifestyle.'
          }
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {results.breeds.map((breed, index) => {
          const level = getCompatibilityLevel(breed, results);
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{breed.name}</CardTitle>
                  <Badge className={getCompatibilityColor(level)}>
                    {Math.round(breed.score)}%
                  </Badge>
                </div>
                <Badge variant="outline" className="w-fit">
                  {getCompatibilityLabel(level)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <img
                    src={breed.image}
                    alt={`${breed.name} breed`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = results.pet_type === 'dog'
                        ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=face'
                        : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=face';
                    }}
                  />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full ${level === 'high' ? 'bg-green-500' :
                      level === 'medium' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}
                    style={{ width: `${breed.score}%` }}
                  />
                </div>
                <button
                  className="btn-secondary w-full"
                  onClick={() => router.push(`/breed/${results.pet_type}/${encodeURIComponent(breed.name)}`)}
                >
                  {language === 'es' ? 'Saber Más' : 'Learn More'}
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Compatibility Guide */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compatibility Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">{language === 'es' ? 'Excelente Compatibilidad (80%+)' : 'Excellent Match (80%+)'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium">{language === 'es' ? 'Buena Compatibilidad (60-79%)' : 'Good Match (60-79%)'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
              <span className="text-sm font-medium">{language === 'es' ? 'Compatibilidad Regular (Menos del 60%)' : 'Fair Match (Below 60%)'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="text-center space-x-4">
        <button
          onClick={() => router.push('/quiz')}
          className="btn-primary"
        >
          {language === 'es' ? 'Repetir Quiz' : 'Take Quiz Again'}
        </button>
        <button
          onClick={() => router.push('/')}
          className="btn-secondary"
        >
          {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        </button>
      </div>
    </div>
  );
}