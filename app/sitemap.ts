import { MetadataRoute } from 'next'

// Import breed data
import dogBreeds from '../data/breeds.json'
import catBreeds from '../data/cats_breeds.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://petential.es'
  
  // Static pages with different priorities and change frequencies
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/quiz', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/breeds', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
    { url: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/pet-care-guide', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/training-tips', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/nutrition-guide', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/how-to-choose-pet', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/insurance', priority: 0.4, changeFrequency: 'quarterly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const }
  ]

  // Generate sitemap entries for static pages with proper dates
  const staticEntries = staticPages.map((page) => {
    // Use different dates for different page types to simulate realistic updates
    const now = new Date()
    let lastModified = new Date(now)

    if (page.changeFrequency === 'daily') {
      lastModified.setHours(now.getHours() - Math.floor(Math.random() * 24))
    } else if (page.changeFrequency === 'weekly') {
      lastModified.setDate(now.getDate() - Math.floor(Math.random() * 7))
    } else if (page.changeFrequency === 'monthly') {
      lastModified.setDate(now.getDate() - Math.floor(Math.random() * 30))
    } else {
      lastModified.setMonth(now.getMonth() - Math.floor(Math.random() * 6))
    }

    return {
      url: `${baseUrl}${page.url}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }
  })

  // Generate breed pages from actual data with realistic dates
  const dogBreedEntries = dogBreeds.map((breed: any, index: number) => {
    const breedDate = new Date()
    breedDate.setDate(breedDate.getDate() - (index % 90)) // Spread updates over 3 months

    return {
      url: `${baseUrl}/breed/dog/${encodeURIComponent(breed['Dog Breeds'])}`,
      lastModified: breedDate,
      changeFrequency: 'quarterly' as const,
      priority: 0.5, // Lower priority for individual breed pages
    }
  })

  const catBreedEntries = catBreeds.map((breed: any, index: number) => {
    const breedDate = new Date()
    breedDate.setDate(breedDate.getDate() - (index % 90)) // Spread updates over 3 months

    return {
      url: `${baseUrl}/breed/cat/${encodeURIComponent(breed['Cat Breeds'])}`,
      lastModified: breedDate,
      changeFrequency: 'quarterly' as const,
      priority: 0.5, // Lower priority for individual breed pages
    }
  })

  // Quiz pages - high priority as they're conversion pages
  const quizEntries = [
    {
      url: `${baseUrl}/quiz/dog`,
      lastModified: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Last week
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz/cat`,
      lastModified: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Last week
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