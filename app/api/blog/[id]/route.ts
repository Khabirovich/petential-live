import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '../../../../lib/database/blog-service'

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
    
    const article = await BlogService.getArticleById(id)
    
    if (!article) {
      return NextResponse.json(
        { status: 'error', message: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Transform database fields to match frontend expectations
    const transformedArticle = {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      publishDate: article.publish_date,
      readTime: article.read_time,
      category: article.category,
      image: article.image_url, // Map image_url to image for frontend
      tags: article.tags
    }
    
    return NextResponse.json({
      status: 'success',
      article: transformedArticle
    })
    
  } catch (error) {
    console.error('Error getting blog article:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to retrieve blog article' },
      { status: 500 }
    )
  }
}