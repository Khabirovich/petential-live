/**
 * Migration script to move existing blog data from JSON files to Supabase
 * 
 * Run this script after setting up your Supabase project:
 * npx ts-node scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface LegacyBlogArticle {
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

interface LegacyBlogData {
  articles: LegacyBlogArticle[]
  lastUpdated: string
}

async function migrateBlogData() {
  console.log('🚀 Starting blog data migration...')
  
  // Read existing blog data
  const blogDataPath = path.join(process.cwd(), 'data', 'blog-data.json')
  
  if (!fs.existsSync(blogDataPath)) {
    console.log('⚠️  No existing blog data found at:', blogDataPath)
    return
  }
  
  try {
    const blogDataRaw = fs.readFileSync(blogDataPath, 'utf-8')
    const blogData: LegacyBlogData = JSON.parse(blogDataRaw)
    
    console.log(`📚 Found ${blogData.articles.length} articles to migrate`)
    
    // Migrate each article
    for (const article of blogData.articles) {
      console.log(`📄 Migrating: "${article.title}"`)
      
      // Transform legacy data to new schema
      const migratedArticle = {
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        author: article.author,
        publish_date: article.publishDate,
        read_time: article.readTime,
        category: article.category,
        image_url: article.image,
        tags: article.tags
      }
      
      // Insert into Supabase
      const { error } = await supabase
        .from('blog_articles')
        .insert([migratedArticle])
      
      if (error) {
        if (error.code === '23505') {
          console.log(`   ⚠️  Article "${article.title}" already exists, skipping...`)
        } else {
          console.error(`   ❌ Error migrating "${article.title}":`, error.message)
        }
      } else {
        console.log(`   ✅ Successfully migrated "${article.title}"`)
      }
    }
    
    console.log('🎉 Blog data migration completed!')
    
  } catch (error) {
    console.error('❌ Error during migration:', error)
  }
}

async function migrateUserData() {
  console.log('🚀 Starting user data migration...')
  
  // Read existing user data
  const userDataPath = path.join(process.cwd(), 'data', 'user-data.json')
  
  if (!fs.existsSync(userDataPath)) {
    console.log('⚠️  No existing user data found at:', userDataPath)
    return
  }
  
  try {
    const userDataRaw = fs.readFileSync(userDataPath, 'utf-8')
    const userData = JSON.parse(userDataRaw)
    
    // Migrate contact submissions
    if (userData.contacts && userData.contacts.length > 0) {
      console.log(`📞 Found ${userData.contacts.length} contact submissions to migrate`)
      
      for (const contact of userData.contacts) {
        const { error } = await supabase
          .from('contact_submissions')
          .insert([{
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
            created_at: contact.timestamp
          }])
        
        if (error) {
          console.error('   ❌ Error migrating contact:', error.message)
        } else {
          console.log(`   ✅ Migrated contact from ${contact.email}`)
        }
      }
    }
    
    // Migrate newsletter subscriptions
    if (userData.newsletters && userData.newsletters.length > 0) {
      console.log(`📧 Found ${userData.newsletters.length} newsletter subscriptions to migrate`)
      
      for (const newsletter of userData.newsletters) {
        const { error } = await supabase
          .from('newsletter_subscriptions')
          .insert([{
            email: newsletter.email,
            created_at: newsletter.timestamp
          }])
        
        if (error) {
          if (error.code === '23505') {
            console.log(`   ⚠️  Newsletter subscription for ${newsletter.email} already exists, skipping...`)
          } else {
            console.error(`   ❌ Error migrating newsletter subscription:`, error.message)
          }
        } else {
          console.log(`   ✅ Migrated newsletter subscription for ${newsletter.email}`)
        }
      }
    }
    
    // Migrate feedback submissions
    if (userData.feedback && userData.feedback.length > 0) {
      console.log(`💬 Found ${userData.feedback.length} feedback submissions to migrate`)
      
      for (const feedback of userData.feedback) {
        const { error } = await supabase
          .from('feedback_submissions')
          .insert([{
            name: feedback.name,
            email: feedback.email,
            feedback_type: feedback.feedback_type,
            rating: feedback.rating,
            features_used: feedback.features_used,
            message: feedback.message,
            suggestions: feedback.suggestions,
            allow_follow_up: feedback.allow_follow_up,
            newsletter_signup: feedback.newsletter_signup,
            created_at: feedback.timestamp
          }])
        
        if (error) {
          console.error('   ❌ Error migrating feedback:', error.message)
        } else {
          console.log(`   ✅ Migrated feedback from ${feedback.name || 'Anonymous'}`)
        }
      }
    }
    
    console.log('🎉 User data migration completed!')
    
  } catch (error) {
    console.error('❌ Error during user data migration:', error)
  }
}

async function main() {
  console.log('🏗️  PETential Database Migration')
  console.log('================================')
  
  // Test connection
  const { data, error } = await supabase.from('blog_articles').select('count').single()
  if (error) {
    console.error('❌ Failed to connect to Supabase:', error.message)
    console.error('Please check your environment variables and database setup')
    process.exit(1)
  }
  
  console.log('✅ Connected to Supabase successfully')
  
  // Run migrations
  await migrateBlogData()
  await migrateUserData()
  
  console.log('\n🎊 All migrations completed successfully!')
  console.log('\n📝 Next steps:')
  console.log('1. Test your admin panel to create/edit articles')
  console.log('2. Test contact forms to ensure submissions are saved')
  console.log('3. Check your Supabase dashboard to verify data')
  console.log('4. Consider backing up your JSON files and removing them')
}

// Run the migration
main().catch(console.error)
