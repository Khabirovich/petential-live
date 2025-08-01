export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
  jsonLd?: any;
}

export const defaultSEO: SEOConfig = {
  title: 'PETential - Find Your Perfect Pet Match',
  description: 'Find your perfect pet match with PETential\'s personalized quiz system for dogs and cats. Get breed recommendations based on your lifestyle and preferences.',
  keywords: ['pet matching', 'dog breeds', 'cat breeds', 'pet quiz', 'breed finder', 'pet compatibility'],
  openGraph: {
    title: 'PETential - Find Your Perfect Pet Match',
    description: 'Find your perfect pet match with PETential\'s personalized quiz system for dogs and cats',
    image: '/images/social/og-image.png',
    type: 'website',
  },
  twitter: {
    title: 'PETential - Find Your Perfect Pet Match',
    description: 'Find your perfect pet match with PETential\'s personalized quiz system for dogs and cats',
    image: '/images/social/og-image.png',
  },
};

export const pageSEO = {
  home: {
    en: {
      title: 'PETential - Find Your Perfect Pet Match | Dog & Cat Breed Quiz',
      description: 'Discover your ideal pet breed with our intelligent matching quiz. Get personalized recommendations for dogs and cats based on your lifestyle, experience, and preferences.',
      keywords: ['pet matching quiz', 'dog breed finder', 'cat breed finder', 'pet compatibility test', 'best pet breeds', 'pet adoption guide'],
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PETential",
        "description": "Pet breed matching application",
        "url": "https://petential.es",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Web Browser"
      }
    },
    es: {
      title: 'PETential - Encuentra tu Mascota Perfecta | Quiz de Razas de Perros y Gatos',
      description: 'Descubre la raza de mascota ideal con nuestro quiz inteligente. Obtén recomendaciones personalizadas para perros y gatos basadas en tu estilo de vida y preferencias.',
      keywords: ['quiz de mascotas', 'buscador de razas de perros', 'buscador de razas de gatos', 'test de compatibilidad de mascotas', 'mejores razas de mascotas', 'guía de adopción de mascotas'],
    }
  },
  quiz: {
    en: {
      title: 'Pet Breed Quiz - Start Your Perfect Match Journey | PETential',
      description: 'Take our comprehensive pet breed quiz to find your perfect companion. Answer questions about your lifestyle, experience, and preferences to get matched with ideal dog or cat breeds.',
      keywords: ['pet quiz', 'breed quiz', 'dog quiz', 'cat quiz', 'pet matching test', 'breed compatibility quiz'],
    },
    es: {
      title: 'Quiz de Razas de Mascotas - Comienza tu Búsqueda Perfecta | PETential',
      description: 'Realiza nuestro quiz completo de razas de mascotas para encontrar tu compañero perfecto. Responde preguntas sobre tu estilo de vida y preferencias para encontrar razas ideales.',
      keywords: ['quiz de mascotas', 'quiz de razas', 'quiz de perros', 'quiz de gatos', 'test de mascotas', 'quiz de compatibilidad de razas'],
    }
  },
  results: {
    en: {
      title: 'Your Pet Breed Match Results | PETential',
      description: 'Discover your personalized pet breed recommendations based on your quiz responses. Find the perfect dog or cat breed that matches your lifestyle and preferences.',
      keywords: ['pet breed results', 'breed recommendations', 'pet matching results', 'dog breed matches', 'cat breed matches'],
    },
    es: {
      title: 'Resultados de tu Compatibilidad con Razas | PETential',
      description: 'Descubre tus recomendaciones personalizadas de razas de mascotas basadas en tus respuestas del quiz. Encuentra la raza perfecta que coincida con tu estilo de vida.',
      keywords: ['resultados de razas de mascotas', 'recomendaciones de razas', 'resultados de compatibilidad', 'razas de perros compatibles', 'razas de gatos compatibles'],
    }
  },
  about: {
    en: {
      title: 'About PETential - Your Pet Matching Expert | PETential',
      description: 'Learn about PETential\'s mission to help you find the perfect pet breed match. Discover our intelligent matching algorithm and commitment to responsible pet ownership.',
      keywords: ['about petential', 'pet matching service', 'breed matching algorithm', 'pet adoption help', 'responsible pet ownership'],
    },
    es: {
      title: 'Acerca de PETential - Tu Experto en Compatibilidad de Mascotas | PETential',
      description: 'Conoce la misión de PETential de ayudarte a encontrar la raza de mascota perfecta. Descubre nuestro algoritmo inteligente y compromiso con la tenencia responsable.',
      keywords: ['acerca de petential', 'servicio de compatibilidad de mascotas', 'algoritmo de compatibilidad', 'ayuda adopción mascotas', 'tenencia responsable mascotas'],
    }
  },
  breeds: {
    en: {
      title: 'Dog & Cat Breed Directory | Complete Breed Guide | PETential',
      description: 'Explore our comprehensive directory of dog and cat breeds. Learn about characteristics, temperament, care requirements, and find the perfect breed for your lifestyle.',
      keywords: ['dog breeds directory', 'cat breeds directory', 'breed characteristics', 'pet breed guide', 'breed information'],
    },
    es: {
      title: 'Directorio de Razas de Perros y Gatos | Guía Completa | PETential',
      description: 'Explora nuestro directorio completo de razas de perros y gatos. Aprende sobre características, temperamento, cuidados y encuentra la raza perfecta para ti.',
      keywords: ['directorio razas perros', 'directorio razas gatos', 'características razas', 'guía razas mascotas', 'información razas'],
    }
  },
  contact: {
    en: {
      title: 'Contact PETential - Get Help Finding Your Perfect Pet | PETential',
      description: 'Get in touch with PETential for questions about pet breed matching, our quiz, or general pet advice. We\'re here to help you find your perfect companion.',
      keywords: ['contact petential', 'pet advice', 'breed matching help', 'pet questions', 'customer support'],
    },
    es: {
      title: 'Contacta PETential - Obtén Ayuda Encontrando tu Mascota Perfecta | PETential',
      description: 'Ponte en contacto con PETential para preguntas sobre compatibilidad de razas, nuestro quiz, o consejos generales sobre mascotas.',
      keywords: ['contactar petential', 'consejos mascotas', 'ayuda compatibilidad razas', 'preguntas mascotas', 'soporte cliente'],
    }
  },
  blog: {
    en: {
      title: 'Pet Care Blog - Expert Tips & Breed Guides | PETential',
      description: 'Read expert articles about pet care, breed guides, training tips, and everything you need to know about responsible pet ownership.',
      keywords: ['pet care blog', 'pet training tips', 'breed guides', 'pet health', 'pet advice articles'],
    },
    es: {
      title: 'Blog de Cuidado de Mascotas - Consejos Expertos y Guías | PETential',
      description: 'Lee artículos expertos sobre cuidado de mascotas, guías de razas, consejos de entrenamiento y todo lo que necesitas saber sobre tenencia responsable.',
      keywords: ['blog cuidado mascotas', 'consejos entrenamiento mascotas', 'guías razas', 'salud mascotas', 'artículos consejos mascotas'],
    }
  }
};

export function generateBreedSEO(breedName: string, petType: 'dog' | 'cat', language: 'en' | 'es' = 'en'): SEOConfig {
  const petTypeLabel = language === 'es' 
    ? (petType === 'dog' ? 'Perro' : 'Gato')
    : (petType === 'dog' ? 'Dog' : 'Cat');
  
  const breedLabel = language === 'es' ? 'Raza' : 'Breed';
  
  if (language === 'es') {
    return {
      title: `${breedName} - Información Completa de la Raza de ${petTypeLabel} | PETential`,
      description: `Descubre todo sobre la raza ${breedName}. Características, temperamento, cuidados, compatibilidad y más información detallada sobre esta raza de ${petType === 'dog' ? 'perro' : 'gato'}.`,
      keywords: [`${breedName}`, `raza ${breedName}`, `${breedName} ${petType === 'dog' ? 'perro' : 'gato'}`, `características ${breedName}`, `cuidados ${breedName}`, `temperamento ${breedName}`],
      canonical: `/breed/${petType}/${encodeURIComponent(breedName)}`,
      openGraph: {
        title: `${breedName} - Información de la Raza | PETential`,
        description: `Información completa sobre la raza ${breedName}: características, temperamento, cuidados y compatibilidad.`,
        type: 'article',
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${breedName} - Información de la Raza de ${petTypeLabel}`,
        "description": `Información completa sobre la raza ${breedName}`,
        "author": {
          "@type": "Organization",
          "name": "PETential"
        },
        "publisher": {
          "@type": "Organization",
          "name": "PETential",
          "logo": {
            "@type": "ImageObject",
            "url": "https://petential.es/images/logo.png"
          }
        }
      }
    };
  }

  return {
    title: `${breedName} ${breedLabel} - Complete ${petTypeLabel} ${breedLabel} Guide | PETential`,
    description: `Discover everything about the ${breedName} ${petType} breed. Learn about characteristics, temperament, care requirements, compatibility, and detailed breed information.`,
    keywords: [`${breedName}`, `${breedName} breed`, `${breedName} ${petType}`, `${breedName} characteristics`, `${breedName} care`, `${breedName} temperament`],
    canonical: `/breed/${petType}/${encodeURIComponent(breedName)}`,
    openGraph: {
      title: `${breedName} ${breedLabel} Guide | PETential`,
      description: `Complete guide to the ${breedName} ${petType} breed: characteristics, temperament, care requirements, and compatibility information.`,
      type: 'article',
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${breedName} ${petTypeLabel} ${breedLabel} Guide`,
      "description": `Complete guide to the ${breedName} ${petType} breed`,
      "author": {
        "@type": "Organization",
        "name": "PETential"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PETential",
        "logo": {
          "@type": "ImageObject",
          "url": "https://petential.es/images/logo.png"
        }
      }
    }
  };
}

export function generateQuizSEO(petType: 'dog' | 'cat', language: 'en' | 'es' = 'en'): SEOConfig {
  const petTypeLabel = language === 'es' 
    ? (petType === 'dog' ? 'Perros' : 'Gatos')
    : (petType === 'dog' ? 'Dog' : 'Cat');
  
  if (language === 'es') {
    return {
      title: `Quiz de Razas de ${petTypeLabel} - Encuentra tu Compañero Perfecto | PETential`,
      description: `Realiza nuestro quiz especializado para ${petType === 'dog' ? 'perros' : 'gatos'} y descubre qué razas son más compatibles contigo. Obtén recomendaciones personalizadas basadas en tu estilo de vida.`,
      keywords: [`quiz ${petType === 'dog' ? 'perros' : 'gatos'}`, `razas de ${petType === 'dog' ? 'perros' : 'gatos'}`, `test compatibilidad ${petType === 'dog' ? 'perros' : 'gatos'}`, `buscador razas ${petType === 'dog' ? 'perros' : 'gatos'}`],
      canonical: `/quiz/${petType}`,
      openGraph: {
        title: `Quiz de Razas de ${petTypeLabel} | PETential`,
        description: `Encuentra la raza de ${petType === 'dog' ? 'perro' : 'gato'} perfecta para ti con nuestro quiz personalizado.`,
        type: 'website',
      }
    };
  }

  return {
    title: `${petTypeLabel} Breed Quiz - Find Your Perfect Companion | PETential`,
    description: `Take our specialized ${petType} breed quiz and discover which breeds are most compatible with you. Get personalized recommendations based on your lifestyle and preferences.`,
    keywords: [`${petType} quiz`, `${petType} breeds`, `${petType} breed test`, `${petType} compatibility quiz`, `${petType} breed finder`],
    canonical: `/quiz/${petType}`,
    openGraph: {
      title: `${petTypeLabel} Breed Quiz | PETential`,
      description: `Find the perfect ${petType} breed for you with our personalized quiz.`,
      type: 'website',
    }
  };
}