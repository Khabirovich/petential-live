import { BlogArticle } from '../data/blog-articles'

// Blog storage utilities for managing articles
export async function getBlogArticles(): Promise<BlogArticle[]> {
  if (typeof window === 'undefined') {
    // Return empty array for server-side rendering to avoid webpack issues
    return []
  }
  
  try {
    // Fetch from backend API
    const response = await fetch('/api/blog')
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`)
    }
    
    const data = await response.json()
    if (data.status === 'success') {
      // If no articles in backend, try to migrate from localStorage
      if (data.articles.length === 0) {
        await tryMigrateFromLocalStorage()
        // Fetch again after potential migration
        const retryResponse = await fetch('/api/blog')
        if (retryResponse.ok) {
          const retryData = await retryResponse.json()
          if (retryData.status === 'success') {
            return retryData.articles
          }
        }
      }
      return data.articles
    } else {
      throw new Error(data.message || 'Failed to fetch articles')
    }
  } catch (error) {
    console.error('Error fetching blog articles from API:', error)
    
    // Try to get from localStorage as fallback
    const localArticles = getLocalStorageArticles()
    if (localArticles.length > 0) {
      console.log(`Found ${localArticles.length} articles in localStorage, attempting migration...`)
      await tryMigrateFromLocalStorage()
      return localArticles
    }
    
    // Final fallback to empty array to avoid webpack issues
    return []
  }
}

// Helper function to get articles from localStorage
function getLocalStorageArticles(): BlogArticle[] {
  if (typeof window === 'undefined') return []
  
  // Skip if already migrated
  if (localStorage.getItem('articles-migrated') === 'true') {
    console.log('📌 Articles already migrated to backend, skipping localStorage check')
    return []
  }
  
  // Check multiple localStorage keys where articles might be stored
  const possibleKeys = ['blog-articles', 'blog-articles-cache', 'articles', 'blogArticles']
  let allArticles: BlogArticle[] = []
  
  for (const key of possibleKeys) {
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        const articles = JSON.parse(stored)
        if (Array.isArray(articles) && articles.length > 0) {
          // Validate that these look like blog articles
          const validArticles = articles.filter(article => 
            article && 
            typeof article === 'object' && 
            article.title && 
            article.content && 
            article.author
          )
          
          if (validArticles.length > 0) {
            console.log(`🔍 Found ${validArticles.length} valid articles in localStorage key: ${key}`)
            allArticles = [...allArticles, ...validArticles]
          }
        }
      } catch (error) {
        console.error(`Error parsing localStorage key ${key}:`, error)
      }
    }
  }
  
  // Remove duplicates based on ID or title
  const uniqueArticles = allArticles.filter((article, index, self) => 
    index === self.findIndex(a => 
      (a.id && article.id && a.id === article.id) || 
      (a.title === article.title && a.author === article.author)
    )
  )
  
  if (uniqueArticles.length > 0) {
    console.log(`🎉 Total unique articles found in localStorage: ${uniqueArticles.length}`)
    uniqueArticles.forEach((article, index) => {
      console.log(`   ${index + 1}. "${article.title}" by ${article.author}`)
    })
  }
  
  return uniqueArticles
}

// Helper function to migrate articles from localStorage to backend
async function tryMigrateFromLocalStorage(): Promise<void> {
  if (typeof window === 'undefined') return
  
  const localArticles = getLocalStorageArticles()
  if (localArticles.length === 0) return
  
  console.log(`🚀 AUTOMATIC MIGRATION: Found ${localArticles.length} articles in localStorage - migrating to backend...`)
  
  // Show user-friendly notification
  if (localArticles.length > 0) {
    const notification = document.createElement('div')
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      background: #4caf50; color: white; padding: 15px 20px;
      border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-family: Arial, sans-serif; font-size: 14px; max-width: 300px;
    `
    notification.innerHTML = `
      <strong>🔄 Recovering Your Articles</strong><br>
      Found ${localArticles.length} articles in browser storage.<br>
      Migrating to permanent backend storage...
    `
    document.body.appendChild(notification)
    
    let migrated = 0
    let failed = 0
    
    for (const article of localArticles) {
      try {
        console.log(`📝 Migrating: "${article.title}"`)
        
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(article),
        })
        
        if (response.ok) {
          const result = await response.json()
          if (result.status === 'success') {
            migrated++
            console.log(`✅ Successfully migrated: "${article.title}"`)
          } else {
            console.log(`⚠️ Article "${article.title}" already exists or was updated: ${result.message}`)
            migrated++ // Count as successful since article is preserved
          }
        } else {
          console.error(`❌ Failed to migrate "${article.title}": HTTP ${response.status}`)
          failed++
        }
      } catch (error) {
        console.error(`❌ Error migrating "${article.title}":`, error)
        failed++
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // Update notification with results
    notification.style.background = migrated > 0 ? '#4caf50' : '#f44336'
    notification.innerHTML = `
      <strong>✅ Migration Complete!</strong><br>
      Successfully migrated: ${migrated} articles<br>
      ${failed > 0 ? `Failed: ${failed} articles<br>` : ''}
      Your articles are now permanently saved!
    `
    
    console.log(`🎉 MIGRATION COMPLETE!`)
    console.log(`✅ Successfully migrated: ${migrated} articles`)
    console.log(`❌ Failed to migrate: ${failed} articles`)
    
    if (migrated > 0) {
      console.log(`🔄 Articles are now permanently stored on the backend!`)
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 5000)
      
      // Mark localStorage articles as migrated
      localStorage.setItem('articles-migrated', 'true')
      localStorage.setItem('migration-date', new Date().toISOString())
    }
  }
}

// Synchronous version for backward compatibility (will be deprecated)
export function getBlogArticlesSync(): BlogArticle[] {
  if (typeof window === 'undefined') {
    return []
  }
  
  // Return cached articles for immediate use
  const stored = localStorage.getItem('blog-articles-cache')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Error parsing cached articles:', error)
    }
  }
  
  // Fallback to empty array
  return []
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

export async function addBlogArticle(article: BlogArticle): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    // Handle image processing
    let processedArticle = { ...article }
    
    if (article.image && article.image.startsWith('data:image/')) {
      // Check image size - now supporting up to 10MB
      if (article.image.length > 15000000) { // ~10MB base64 limit
        console.warn('Image is extremely large (>10MB), using placeholder instead')
        processedArticle.image = '/images/placeholder-pet.svg'
        
        // Show user-friendly notification
        const notification = document.createElement('div')
        notification.style.cssText = `
          position: fixed; top: 20px; right: 20px; z-index: 10000;
          background: #ff9800; color: white; padding: 15px 20px;
          border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          font-family: Arial, sans-serif; font-size: 14px; max-width: 300px;
        `
        notification.innerHTML = `
          <strong>⚠️ Image Too Large</strong><br>
          Using placeholder image. Please use images under 10MB.
        `
        document.body.appendChild(notification)
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 5000)
      } else if (article.image.length > 2000000) { // ~1.5MB base64
        // Try to compress very large images (>1.5MB) for better performance
        try {
          const compressed = await compressBase64Image(article.image, 0.7)
          processedArticle.image = compressed
          console.log(`Successfully compressed large image from ${Math.round(article.image.length / 1024)}KB to ${Math.round(compressed.length / 1024)}KB`)
        } catch (error) {
          console.warn('Failed to compress large image, using original:', error)
          // Keep original image if compression fails
        }
      } else {
        // Accept images up to 1.5MB without compression
        console.log(`Accepting image of size: ${Math.round(article.image.length / 1024)}KB`)
      }
    }
    
    // Send to backend API
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processedArticle),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create article (${response.status}): ${errorText}`)
    }
    
    const data = await response.json()
    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to create article')
    }
    
    console.log('✅ Article created successfully:', data.message)
    
    // Update local cache
    const currentArticles = await getBlogArticles()
    localStorage.setItem('blog-articles-cache', JSON.stringify(currentArticles))
    
  } catch (error) {
    console.error('Error adding blog article:', error)
    
    // Show user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    if (errorMessage.includes('too large') || errorMessage.includes('10MB')) {
      throw new Error('Image is too large. Please use an image smaller than 10MB.')
    } else if (errorMessage.includes('Network')) {
      throw new Error('Network error. Please check your connection and try again.')
    } else {
      throw new Error(`Failed to save article: ${errorMessage}`)
    }
  }
}

export async function updateBlogArticle(id: string, updatedArticle: BlogArticle): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    // Compress image if it's base64 and too large
    let processedArticle = { ...updatedArticle }
    if (updatedArticle.image && updatedArticle.image.startsWith('data:image/') && updatedArticle.image.length > 100000) {
      try {
        const compressed = await compressBase64Image(updatedArticle.image, 0.6)
        processedArticle.image = compressed
      } catch (error) {
        console.warn('Failed to compress image for article:', updatedArticle.id, error)
        // Use original image if compression fails
      }
    }
    
    // Send to backend API
    const response = await fetch('/api/blog', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processedArticle),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to update article: ${response.status}`)
    }
    
    const data = await response.json()
    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to update article')
    }
    
    // Update local cache
    const currentArticles = await getBlogArticles()
    localStorage.setItem('blog-articles-cache', JSON.stringify(currentArticles))
    
  } catch (error) {
    console.error('Error updating blog article:', error)
    throw error
  }
}

export async function deleteBlogArticle(id: string): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    // Send to backend API
    const response = await fetch(`/api/blog?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error(`Failed to delete article: ${response.status}`)
    }
    
    const data = await response.json()
    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to delete article')
    }
    
    // Update local cache
    const currentArticles = await getBlogArticles()
    localStorage.setItem('blog-articles-cache', JSON.stringify(currentArticles))
    
  } catch (error) {
    console.error('Error deleting blog article:', error)
    throw error
  }
}

export async function getBlogArticleById(id: string): Promise<BlogArticle | undefined> {
  if (typeof window === 'undefined') {
    return undefined
  }
  
  try {
    // Fetch specific article from backend API
    const response = await fetch(`/api/blog/${encodeURIComponent(id)}`)
    if (!response.ok) {
      if (response.status === 404) {
        return undefined
      }
      throw new Error(`Failed to fetch article: ${response.status}`)
    }
    
    const data = await response.json()
    if (data.status === 'success') {
      return data.article
    } else {
      throw new Error(data.message || 'Failed to fetch article')
    }
  } catch (error) {
    console.error('Error fetching blog article by ID:', error)
    
    // Fallback to searching in all articles
    const articles = await getBlogArticles()
    return articles.find(article => article.id === id)
  }
}

// Initialize with default articles - now handled by backend
export async function initializeBlogStorage(): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    // Just refresh the cache from the backend
    const articles = await getBlogArticles()
    localStorage.setItem('blog-articles-cache', JSON.stringify(articles))
  } catch (error) {
    console.error('Error initializing blog storage:', error)
  }
}

// Force refresh articles from backend (useful for development)
export async function refreshBlogArticles(): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    // Clear cache and fetch fresh data from backend
    localStorage.removeItem('blog-articles-cache')
    const articles = await getBlogArticles()
    localStorage.setItem('blog-articles-cache', JSON.stringify(articles))
  } catch (error) {
    console.error('Error refreshing blog articles:', error)
  }
}

// Clear localStorage cache
export function clearBlogCache(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('blog-articles-cache')
  localStorage.removeItem('blog-data-version')
}