import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Define the blog data structure
interface BlogArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: string
  category: string
  image: string
  tags: string[]
}

interface BlogData {
  articles: BlogArticle[]
  lastUpdated: string
}

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-data.json')

// Ensure data directory exists
function ensureDataDirectory(): void {
  const dataDir = path.dirname(BLOG_DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read blog data from file
function readBlogData(): BlogData {
  ensureDataDirectory()
  
  try {
    if (fs.existsSync(BLOG_DATA_FILE)) {
      const data = fs.readFileSync(BLOG_DATA_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading blog data:', error)
  }
  
  // Return default structure if file doesn't exist or error occurred
  return {
    articles: [],
    lastUpdated: new Date().toISOString()
  }
}

// Write blog data to file
function writeBlogData(blogData: BlogData): void {
  ensureDataDirectory()
  
  try {
    blogData.lastUpdated = new Date().toISOString()
    fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(blogData, null, 2))
  } catch (error) {
    console.error('Error writing blog data:', error)
    throw error
  }
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

// GET - Retrieve all blog articles
export async function GET() {
  try {
    const blogData = readBlogData()
    return NextResponse.json({
      status: 'success',
      articles: blogData.articles,
      lastUpdated: blogData.lastUpdated
    })
  } catch (error) {
    console.error('Error getting blog articles:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to retrieve blog articles' },
      { status: 500 }
    )
  }
}

// POST - Create new blog article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, author, category, readTime, image, tags } = body
    
    // Validate required fields
    if (!title || !excerpt || !content || !author) {
      return NextResponse.json(
        { status: 'error', message: 'Title, excerpt, content, and author are required' },
        { status: 400 }
      )
    }
    
    // Read existing data
    const blogData = readBlogData()
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    // Check if article with this slug already exists - if so, update instead of creating
    const existingArticle = blogData.articles.find(article => article.id === slug)
    if (existingArticle) {
      // Update existing article instead of failing
      const updatedArticle: BlogArticle = {
        ...existingArticle,
        title,
        excerpt,
        content: content.replace(/\n/g, '<br>'),
        author,
        category: category || 'Pet Care',
        readTime: readTime || '5 min read',
        image: image || existingArticle.image || '/images/placeholder-pet.svg',
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [])
      }
      
      const articleIndex = blogData.articles.findIndex(article => article.id === slug)
      blogData.articles[articleIndex] = updatedArticle
      
      writeBlogData(blogData)
      
      return NextResponse.json({
        status: 'success',
        message: 'Existing article updated successfully',
        article: updatedArticle
      })
    }
    
    // Create new article
    const newArticle: BlogArticle = {
      id: slug,
      title,
      excerpt,
      content: content.replace(/\n/g, '<br>'),
      author,
      publishDate: new Date().toISOString().split('T')[0],
      readTime: readTime || '5 min read',
      category: category || 'Pet Care',
      image: image || '/images/placeholder-pet.svg',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [])
    }
    
    // Add to beginning of articles array
    blogData.articles.unshift(newArticle)
    
    // Save to file
    writeBlogData(blogData)
    
    return NextResponse.json({
      status: 'success',
      message: 'Blog article created successfully',
      article: newArticle
    })
    
  } catch (error) {
    console.error('Error creating blog article:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to create blog article' },
      { status: 500 }
    )
  }
}

// PUT - Update existing blog article
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, excerpt, content, author, category, readTime, image, tags } = body
    
    // Validate required fields
    if (!id || !title || !excerpt || !content || !author) {
      return NextResponse.json(
        { status: 'error', message: 'ID, title, excerpt, content, and author are required' },
        { status: 400 }
      )
    }
    
    // Read existing data
    const blogData = readBlogData()
    
    // Find article to update
    const articleIndex = blogData.articles.findIndex(article => article.id === id)
    if (articleIndex === -1) {
      return NextResponse.json(
        { status: 'error', message: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Update article
    const updatedArticle: BlogArticle = {
      id,
      title,
      excerpt,
      content: content.replace(/\n/g, '<br>'),
      author,
      publishDate: blogData.articles[articleIndex].publishDate, // Keep original publish date
      readTime: readTime || '5 min read',
      category: category || 'Pet Care',
      image: image || '/images/placeholder-pet.svg',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [])
    }
    
    blogData.articles[articleIndex] = updatedArticle
    
    // Save to file
    writeBlogData(blogData)
    
    return NextResponse.json({
      status: 'success',
      message: 'Blog article updated successfully',
      article: updatedArticle
    })
    
  } catch (error) {
    console.error('Error updating blog article:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to update blog article' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog article
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'Article ID is required' },
        { status: 400 }
      )
    }
    
    // Read existing data
    const blogData = readBlogData()
    
    // Find article to delete
    const articleIndex = blogData.articles.findIndex(article => article.id === id)
    if (articleIndex === -1) {
      return NextResponse.json(
        { status: 'error', message: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Remove article
    const deletedArticle = blogData.articles.splice(articleIndex, 1)[0]
    
    // Save to file
    writeBlogData(blogData)
    
    return NextResponse.json({
      status: 'success',
      message: 'Blog article deleted successfully',
      deletedArticle
    })
    
  } catch (error) {
    console.error('Error deleting blog article:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to delete blog article' },
      { status: 500 }
    )
  }
}
