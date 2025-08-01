'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft } from 'lucide-react';
import { getBreedImageWithFallback } from '@/lib/breed-images';
import { useLanguage } from '@/lib/i18n/context';

interface BreedDetails {
  pet_type: string;
  breed_name: string;
  breed_data: any;
  images: string[];
  description: string;
}

interface Props {
  petType: 'dog' | 'cat';
  breedName: string;
}

export default function BreedDetailsClient({ petType, breedName }: Props) {
  const router = useRouter();
  const { language } = useLanguage();

  const [breedDetails, setBreedDetails] = useState<BreedDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreedDetails = async () => {
      try {
        setIsLoading(true);
        
        // Get current language from hook (primary) or localStorage (fallback)
        const currentLanguage = language || (typeof window !== 'undefined' 
          ? localStorage.getItem('preferred-language') || 'en' 
          : 'en');
        
        console.log('🌐 Language from hook:', language);
        console.log('🌐 Current language used:', currentLanguage);
        console.log('📦 localStorage preferred-language:', typeof window !== 'undefined' ? localStorage.getItem('preferred-language') : 'SSR');
        
        // Import API service dynamically to avoid SSR issues
        const { apiService } = await import('@/lib/api');
        const data = await apiService.getBreedDetails(petType, breedName, currentLanguage);
        
        console.log('📊 API Response:', data);
        setBreedDetails(data);
      } catch (error) {
        console.error('Error fetching breed details:', error);
        setError(language === 'es' ? 'Error al cargar detalles de la raza. Por favor intenta de nuevo.' : 'Failed to load breed details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (petType && breedName) {
      fetchBreedDetails();
    }
  }, [petType, breedName, language]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{language === 'es' ? 'Cargando detalles de la raza...' : 'Loading breed details...'}</span>
      </div>
    );
  }

  if (error || !breedDetails) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => router.back()}
          className="btn-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  const breedKey = petType === 'dog' ? 'Dog Breeds' : 'Cat Breeds';

  // Define the specific characteristics to show for dogs (in both languages)
  const allowedDogCharacteristics = {
    en: [
      'Dog Friendly',
      'Dog Size',
      'Drooling Level',
      'Exercise Needs',
      'Grooming Level',
      'Guarding Level',
      'Hyperalergic (1 - no, 2 - yes)', // Shows Yes/No only
      'Kid-Friendly',
      'Owner Experience',
      'Tendency To Bark Or Howl',
      'Tolerates Being Alone',
      'Training Level',
      'Walk Activity'
    ],
    es: [
      'Amigable con Perros',
      'Tamaño del Perro',
      'Nivel de Babeo',
      'Necesidades de Ejercicio',
      'Nivel de Aseo',
      'Nivel de Guardia',
      'Hipoalergénico', // Shows Yes/No only
      'Amigable con Niños',
      'Experiencia del Propietario',
      'Tendencia a Ladrar o Aullar',
      'Tolera Estar Solo',
      'Nivel de Entrenamiento',
      'Actividad de Paseo'
    ]
  };

  const currentAllowedCharacteristics = allowedDogCharacteristics[language] || allowedDogCharacteristics.en;

  const characteristics = Object.entries(breedDetails.breed_data)
    .filter(([key, value]) => {
      if (key === breedKey) return false;
      if (key === '№') return false; // Filter out the № characteristic
      if (typeof value !== 'number') return false;
      if (petType === 'dog') {
        return currentAllowedCharacteristics.includes(key);
      }
      return true; // For cats, show all numeric characteristics except № and breed name
    })
    .map(([key, value]) => ({ key, value: value as number }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'es' ? 'Volver a Resultados' : 'Back to Results'}
        </button>

        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-bold text-gray-900">{breedDetails.breed_name}</h1>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {petType.charAt(0).toUpperCase() + petType.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">{language === 'es' ? 'Foto' : 'Photo'}</h2>
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={getBreedImageWithFallback(breedDetails.breed_name, petType)}
              alt={breedDetails.breed_name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = petType === 'dog'
                  ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=face'
                  : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=face';
              }}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Characteristics */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'es' ? 'Características de la Raza' : 'Breed Characteristics'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {characteristics.map(({ key, value }) => {
                  // Special handling for Hyperalergic/Hipoalergénico field
                  const isHyperalergic = key === 'Hyperalergic (1 - no, 2 - yes)' || key === 'Hipoalergénico';

                  // Clean display name without any numbers or special characters
                  let displayName = key;
                  if (isHyperalergic) {
                    displayName = language === 'es' ? 'Hipoalergénico' : 'Hypoallergenic';
                  } else {
                    // For Spanish, use the key as-is since it's already translated
                    // For English, clean up the display name
                    if (language === 'es') {
                      displayName = key;
                    } else {
                      displayName = key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase())
                        .trim();
                    }
                  }

                  return (
                    <div key={key} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">
                        {displayName}
                      </span>
                      {isHyperalergic ? (
                        <span className="text-sm text-gray-600 font-medium">
                          {value === 1 ? 'No' : 'Yes'}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(value / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">{value}/5</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Generated Description */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'es' ? 'Acerca de Esta Raza' : 'About This Breed'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: breedDetails.description }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 text-center space-x-4">
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