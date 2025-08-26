import { createClient } from '@supabase/supabase-js'

// Environment variables for Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface BlogArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publish_date: string
  read_time: string
  category: string
  image_url: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string | null
  email: string
  subject: string | null
  message: string
  created_at: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  created_at: string
}

export interface FeedbackSubmission {
  id: string
  name: string | null
  email: string | null
  feedback_type: string | null
  rating: string | null
  features_used: string[]
  message: string | null
  suggestions: string | null
  allow_follow_up: boolean
  newsletter_signup: boolean
  created_at: string
}
