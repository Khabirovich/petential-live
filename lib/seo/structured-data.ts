export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PETential",
    "description": "Pet breed matching platform helping users find their perfect companion",
    "url": "https://petential.es",
    "logo": {
      "@type": "ImageObject",
      "url": "https://petential.es/images/logo.png",
      "width": 200,
      "height": 200
    },
    "sameAs": [
      "https://twitter.com/petential",
      "https://facebook.com/petential",
      "https://instagram.com/petential"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://petential.es/contact"
    }
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PETential",
    "description": "Find your perfect pet match with our intelligent breed matching quiz",
    "url": "https://petential.es",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://petential.es/breeds?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateQuizSchema(petType: 'dog' | 'cat') {
  const petTypeLabel = petType === 'dog' ? 'Dog' : 'Cat';

  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": `${petTypeLabel} Breed Compatibility Quiz`,
    "description": `Take our ${petType} breed quiz to find breeds that match your lifestyle and preferences`,
    "url": `https://petential.es/quiz/${petType}`,
    "author": {
      "@type": "Organization",
      "name": "PETential"
    },
    "about": {
      "@type": "Thing",
      "name": `${petTypeLabel} Breeds`,
      "description": `Information about ${petType} breeds and their characteristics`
    },
    "educationalLevel": "Beginner",
    "timeRequired": "PT5M"
  };
}

export function generateBreedSchema(breedName: string, petType: 'dog' | 'cat', breedData: any) {
  const petTypeLabel = petType === 'dog' ? 'Dog' : 'Cat';

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${breedName} ${petTypeLabel} Breed Information`,
    "description": `Complete guide to the ${breedName} ${petType} breed including characteristics, temperament, and care requirements`,
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
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://petential.es/breed/${petType}/${encodeURIComponent(breedName)}`
    },
    "about": {
      "@type": "Animal",
      "name": breedName,
      "species": petType === 'dog' ? 'Canis lupus familiaris' : 'Felis catus'
    },
    "keywords": [
      breedName,
      `${breedName} breed`,
      `${breedName} ${petType}`,
      `${breedName} characteristics`,
      `${breedName} temperament`,
      `${petType} breeds`
    ].join(', ')
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Find Your Perfect Pet Breed Match",
    "description": "Step-by-step guide to finding the perfect pet breed using PETential's matching system",
    "image": "https://petential.es/images/how-to-guide.jpg",
    "totalTime": "PT10M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Internet connection"
      },
      {
        "@type": "HowToSupply",
        "name": "5-10 minutes of time"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "PETential Quiz System"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Choose Pet Type",
        "text": "Select whether you're looking for a dog or cat breed match",
        "url": "https://petential.es/quiz"
      },
      {
        "@type": "HowToStep",
        "name": "Answer Quiz Questions",
        "text": "Complete our comprehensive questionnaire about your lifestyle, experience, and preferences",
        "url": "https://petential.es/quiz"
      },
      {
        "@type": "HowToStep",
        "name": "Review Your Matches",
        "text": "Get personalized breed recommendations with compatibility scores",
        "url": "https://petential.es/results"
      },
      {
        "@type": "HowToStep",
        "name": "Learn About Breeds",
        "text": "Explore detailed information about your matched breeds",
        "url": "https://petential.es/breeds"
      }
    ]
  };
}