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

// GET - Retrieve specific blog article by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'Article ID is required' },
        { status: 400 }
      )
    }
    
    const blogData = readBlogData()
    const article = blogData.articles.find(article => article.id === id)
    
    if (!article) {
      return NextResponse.json(
        { status: 'error', message: 'Article not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      status: 'success',
      article
    })
    
  } catch (error) {
    console.error('Error getting blog article:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to retrieve blog article' },
      { status: 500 }
    )
  }
}
