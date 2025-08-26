import { supabase, ContactSubmission, NewsletterSubscription, FeedbackSubmission } from '../supabase'

// Contact and user data database operations
export class ContactService {
  
  // Create contact submission
  static async createContactSubmission(submissionData: {
    name?: string
    email: string
    subject?: string
    message: string
  }): Promise<ContactSubmission> {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([submissionData])
        .select()
        .single()

      if (error) {
        console.error('Error creating contact submission:', error)
        throw new Error(`Failed to submit contact form: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in createContactSubmission:', error)
      throw error
    }
  }

  // Get all contact submissions (admin only)
  static async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching contact submissions:', error)
        throw new Error(`Failed to fetch contact submissions: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllContactSubmissions:', error)
      throw error
    }
  }

  // Delete contact submission
  static async deleteContactSubmission(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting contact submission:', error)
        throw new Error(`Failed to delete contact submission: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in deleteContactSubmission:', error)
      throw error
    }
  }
}

export class NewsletterService {
  
  // Subscribe to newsletter
  static async subscribeToNewsletter(email: string): Promise<NewsletterSubscription> {
    try {
      // Check if email is already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscriptions')
        .select('id')
        .eq('email', email)
        .single()

      if (existing) {
        throw new Error('Email is already subscribed to the newsletter')
      }

      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }])
        .select()
        .single()

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('Email is already subscribed to the newsletter')
        }
        console.error('Error subscribing to newsletter:', error)
        throw new Error(`Failed to subscribe to newsletter: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in subscribeToNewsletter:', error)
      throw error
    }
  }

  // Get all newsletter subscriptions (admin only)
  static async getAllSubscriptions(): Promise<NewsletterSubscription[]> {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching newsletter subscriptions:', error)
        throw new Error(`Failed to fetch newsletter subscriptions: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllSubscriptions:', error)
      throw error
    }
  }

  // Unsubscribe from newsletter
  static async unsubscribeFromNewsletter(email: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .delete()
        .eq('email', email)

      if (error) {
        console.error('Error unsubscribing from newsletter:', error)
        throw new Error(`Failed to unsubscribe from newsletter: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in unsubscribeFromNewsletter:', error)
      throw error
    }
  }
}

export class FeedbackService {
  
  // Create feedback submission
  static async createFeedbackSubmission(feedbackData: {
    name?: string
    email?: string
    feedback_type?: string
    rating?: string
    features_used?: string[]
    message?: string
    suggestions?: string
    allow_follow_up?: boolean
    newsletter_signup?: boolean
  }): Promise<FeedbackSubmission> {
    try {
      const { data, error } = await supabase
        .from('feedback_submissions')
        .insert([feedbackData])
        .select()
        .single()

      if (error) {
        console.error('Error creating feedback submission:', error)
        throw new Error(`Failed to submit feedback: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in createFeedbackSubmission:', error)
      throw error
    }
  }

  // Get all feedback submissions (admin only)
  static async getAllFeedbackSubmissions(): Promise<FeedbackSubmission[]> {
    try {
      const { data, error } = await supabase
        .from('feedback_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching feedback submissions:', error)
        throw new Error(`Failed to fetch feedback submissions: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllFeedbackSubmissions:', error)
      throw error
    }
  }

  // Delete feedback submission
  static async deleteFeedbackSubmission(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('feedback_submissions')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting feedback submission:', error)
        throw new Error(`Failed to delete feedback submission: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in deleteFeedbackSubmission:', error)
      throw error
    }
  }
}
