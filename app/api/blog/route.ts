import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '../../../lib/database/blog-service'
import { BlogArticle } from '../../../lib/supabase'

// GET - Retrieve all blog articles
export async function GET() {
  try {
    const articles = await BlogService.getAllArticles()
    
    // Transform database fields to match frontend expectations
    const transformedArticles = articles.map(article => ({
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
    }))
    
    return NextResponse.json({
      status: 'success',
      articles: transformedArticles,
      lastUpdated: new Date().toISOString()
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
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    // Check if article with this slug already exists
    const existingArticle = await BlogService.getArticleById(slug)
    if (existingArticle) {
      // Update existing article instead of creating new one
      const updatedArticle = await BlogService.updateArticle(slug, {
        title,
        excerpt,
        content: content.replace(/\n/g, '<br>'),
        author,
        category: category || 'Pet Care',
        read_time: readTime || '5 min read',
        image_url: image || null,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [])
      })
      
      return NextResponse.json({
        status: 'success',
        message: 'Existing article updated successfully',
        article: updatedArticle
      })
    }
    
    // Create new article
    const newArticle = await BlogService.createArticle({
      id: slug,
      title,
      excerpt,
      content: content.replace(/\n/g, '<br>'),
      author,
      publish_date: new Date().toISOString().split('T')[0],
      read_time: readTime || '5 min read',
      category: category || 'Pet Care',
      image_url: image || null,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [])
    })
    
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
    
    // Update article
    const updatedArticle = await BlogService.updateArticle(id, {
      title,
      excerpt,
      content: content.replace(/\n/g, '<br>'),
      author,
      read_time: readTime || '5 min read',
      category: category || 'Pet Care',
      image_url: image || null,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [])
    })
    
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
    
    // Get article before deleting for response
    const article = await BlogService.getArticleById(id)
    if (!article) {
      return NextResponse.json(
        { status: 'error', message: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Delete article
    await BlogService.deleteArticle(id)
    
    return NextResponse.json({
      status: 'success',
      message: 'Blog article deleted successfully',
      deletedArticle: article
    })
    
  } catch (error) {
    console.error('Error deleting blog article:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to delete blog article' },
      { status: 500 }
    )
  }
}