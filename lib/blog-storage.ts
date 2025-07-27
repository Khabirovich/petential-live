import { BlogArticle } from '../data/blog-articles'

// Blog storage utilities for managing articles
export function getBlogArticles(): BlogArticle[] {
  if (typeof window === 'undefined') {
    // Return default articles for server-side rendering
    const { blogArticles } = require('../data/blog-articles')
    return blogArticles
  }
  
  // Always load fresh articles from data file and merge with localStorage
  const { blogArticles: defaultArticles } = require('../data/blog-articles')
  const stored = localStorage.getItem('blog-articles')
  
  if (stored) {
    try {
      const storedArticles = JSON.parse(stored)
      
      // Check if we have fewer articles in storage than in default data
      // This means new articles were added to the data file
      if (storedArticles.length < defaultArticles.length) {
        // Find new articles that aren't in storage
        const newArticles = defaultArticles.filter(
          (defaultArticle: BlogArticle) => !storedArticles.some((stored: BlogArticle) => stored.id === defaultArticle.id)
        )
        
        // Merge new articles with stored ones
        const mergedArticles = [...newArticles, ...storedArticles]
        saveBlogArticles(mergedArticles)
        return mergedArticles
      }
      
      return storedArticles
    } catch (error) {
      console.error('Error parsing stored articles:', error)
      // Fallback to default articles if parsing fails
      saveBlogArticles(defaultArticles)
      return defaultArticles
    }
  }
  
  // Return default articles if none stored and initialize localStorage
  saveBlogArticles(defaultArticles)
  return defaultArticles
}

// Compress base64 image to reduce size
function compressBase64Image(base64String: string, quality: number = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = function() {
      // Calculate new dimensions (max 800px width)
      const maxWidth = 800
      const maxHeight = 600
      let { width, height } = img
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
      resolve(compressedBase64)
    }
    
    img.src = base64String
  })
}

// Check if localStorage has enough space
function getLocalStorageSize(): number {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length
    }
  }
  return total
}

export async function saveBlogArticles(articles: BlogArticle[]): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    // Compress images in articles if they're base64 and too large
    const processedArticles = await Promise.all(
      articles.map(async (article) => {
        if (article.image && article.image.startsWith('data:image/') && article.image.length > 100000) {
          // Compress large base64 images
          try {
            const compressed = await compressBase64Image(article.image, 0.6)
            return { ...article, image: compressed }
          } catch (error) {
            console.warn('Failed to compress image for article:', article.id, error)
            return article
          }
        }
        return article
      })
    )
    
    const dataString = JSON.stringify(processedArticles)
    
    // Check if the data will fit in localStorage (5MB limit)
    if (dataString.length > 4.5 * 1024 * 1024) { // 4.5MB safety margin
      throw new Error('Data too large for localStorage')
    }
    
    localStorage.setItem('blog-articles', dataString)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorName = error instanceof Error ? error.name : 'Error'
    
    if (errorName === 'QuotaExceededError' || errorMessage.includes('quota exceeded') || errorMessage.includes('Data too large')) {
      console.error('LocalStorage quota exceeded. Attempting to save without images...')
      
      // Fallback: Save articles without base64 images
      const articlesWithoutImages = articles.map(article => ({
        ...article,
        image: article.image && article.image.startsWith('data:') ? '' : article.image
      }))
      
      try {
        localStorage.setItem('blog-articles', JSON.stringify(articlesWithoutImages))
        alert('Warning: Images were too large to save. Please use smaller images (under 500KB recommended).')
      } catch (fallbackError) {
        console.error('Failed to save even without images:', fallbackError)
        alert('Failed to save articles. Please try refreshing the page and using smaller images.')
      }
    } else {
      console.error('Error saving blog articles:', error)
      alert('Failed to save articles. Please try again.')
    }
  }
}

export async function addBlogArticle(article: BlogArticle): Promise<void> {
  const articles = getBlogArticles()
  articles.unshift(article) // Add to beginning
  await saveBlogArticles(articles)
}

export async function updateBlogArticle(id: string, updatedArticle: BlogArticle): Promise<void> {
  const articles = getBlogArticles()
  const index = articles.findIndex(article => article.id === id)
  if (index !== -1) {
    articles[index] = updatedArticle
    await saveBlogArticles(articles)
  }
}

export function deleteBlogArticle(id: string): void {
  const articles = getBlogArticles()
  const filtered = articles.filter(article => article.id !== id)
  saveBlogArticles(filtered)
}

export function getBlogArticleById(id: string): BlogArticle | undefined {
  const articles = getBlogArticles()
  return articles.find(article => article.id === id)
}

// Initialize with default articles if localStorage is empty
export function initializeBlogStorage(): void {
  if (typeof window === 'undefined') return
  
  const stored = localStorage.getItem('blog-articles')
  if (!stored) {
    // Load default articles and save to localStorage
    const { blogArticles } = require('../data/blog-articles')
    saveBlogArticles(blogArticles)
  }
}

// Force refresh articles from data file (useful for development)
export function refreshBlogArticles(): void {
  if (typeof window === 'undefined') return
  
  const { blogArticles } = require('../data/blog-articles')
  saveBlogArticles(blogArticles)
}