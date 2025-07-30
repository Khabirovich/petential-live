import { MetadataRoute } from 'next'

// Import breed data
import dogBreeds from '../data/breeds.json'
import catBreeds from '../data/cats_breeds.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://petential.es'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/breeds',
    '/quiz',
    '/blog',
    '/contact',
    '/insurance',
    '/pet-care-guide',
    '/training-tips',
    '/nutrition-guide',
    '/privacy',
    '/terms',
    '/cookies'
  ]

  // Generate sitemap entries for static pages
  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))

  // Generate breed pages from actual data
  const dogBreedEntries = dogBreeds.map((breed: any) => ({
    url: `${baseUrl}/breed/dog/${encodeURIComponent(breed['Dog Breeds'])}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const catBreedEntries = catBreeds.map((breed: any) => ({
    url: `${baseUrl}/breed/cat/${encodeURIComponent(breed['Cat Breeds'])}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Quiz pages
  const quizEntries = [
    {
      url: `${baseUrl}/quiz/dog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz/cat`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ]

  return [
    ...staticEntries,
    ...quizEntries,
    ...dogBreedEntries,
    ...catBreedEntries
  ]
}