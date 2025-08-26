import { supabase, BlogArticle } from '../supabase'

// Blog article database operations
export class BlogService {
  
  // Get all blog articles (sorted by publish date)
  static async getAllArticles(): Promise<BlogArticle[]> {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .order('publish_date', { ascending: false })

      if (error) {
        console.error('Error fetching blog articles:', error)
        throw new Error(`Failed to fetch blog articles: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllArticles:', error)
      throw error
    }
  }

  // Get single blog article by ID
  static async getArticleById(id: string): Promise<BlogArticle | null> {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // Article not found
        }
        console.error('Error fetching blog article:', error)
        throw new Error(`Failed to fetch blog article: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in getArticleById:', error)
      throw error
    }
  }

  // Create new blog article
  static async createArticle(articleData: Omit<BlogArticle, 'created_at' | 'updated_at'>): Promise<BlogArticle> {
    try {
      // Generate slug from title if no ID provided
      const slug = articleData.id || this.generateSlug(articleData.title)
      
      const { data, error } = await supabase
        .from('blog_articles')
        .insert([{
          ...articleData,
          id: slug,
          publish_date: new Date().toISOString().split('T')[0]
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating blog article:', error)
        throw new Error(`Failed to create blog article: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in createArticle:', error)
      throw error
    }
  }

  // Update existing blog article
  static async updateArticle(id: string, articleData: Partial<BlogArticle>): Promise<BlogArticle> {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .update(articleData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating blog article:', error)
        throw new Error(`Failed to update blog article: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in updateArticle:', error)
      throw error
    }
  }

  // Delete blog article
  static async deleteArticle(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting blog article:', error)
        throw new Error(`Failed to delete blog article: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in deleteArticle:', error)
      throw error
    }
  }

  // Search articles by title, content, or tags
  static async searchArticles(query: string): Promise<BlogArticle[]> {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.cs.{${query}}`)
        .order('publish_date', { ascending: false })

      if (error) {
        console.error('Error searching blog articles:', error)
        throw new Error(`Failed to search blog articles: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in searchArticles:', error)
      throw error
    }
  }

  // Get articles by category
  static async getArticlesByCategory(category: string): Promise<BlogArticle[]> {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('category', category)
        .order('publish_date', { ascending: false })

      if (error) {
        console.error('Error fetching articles by category:', error)
        throw new Error(`Failed to fetch articles by category: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getArticlesByCategory:', error)
      throw error
    }
  }

  // Helper function to generate slug from title
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
}
