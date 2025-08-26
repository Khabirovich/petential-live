/**
 * Simple migration script to move your existing articles to Supabase
 * Run with: node scripts/migrate-articles.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function migrateArticles() {
  console.log('🚀 Starting Article Migration...\n');

  // Initialize Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables');
    console.log('Make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Read existing blog data
  const blogDataPath = path.join(process.cwd(), 'data', 'blog-data.json');
  
  if (!fs.existsSync(blogDataPath)) {
    console.log('⚠️  No existing blog articles found to migrate');
    return;
  }

  try {
    const blogDataRaw = fs.readFileSync(blogDataPath, 'utf-8');
    const blogData = JSON.parse(blogDataRaw);
    
    console.log(`📚 Found ${blogData.articles.length} articles to migrate\n`);

    let successCount = 0;
    let skipCount = 0;

    // Migrate each article
    for (const article of blogData.articles) {
      process.stdout.write(`📄 Migrating: "${article.title}" ... `);
      
      // Transform to new schema
      const migratedArticle = {
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        author: article.author,
        publish_date: article.publishDate,
        read_time: article.readTime,
        category: article.category,
        image_url: article.image, // Map 'image' field to 'image_url' in database
        tags: article.tags
      };
      
      // Insert into Supabase
      const { error } = await supabase
        .from('blog_articles')
        .insert([migratedArticle]);
      
      if (error) {
        if (error.code === '23505') {
          console.log('SKIPPED (already exists)');
          skipCount++;
        } else {
          console.log(`ERROR: ${error.message}`);
        }
      } else {
        console.log('SUCCESS ✅');
        successCount++;
      }
    }
    
    console.log('\n🎉 Migration completed!');
    console.log(`✅ ${successCount} articles migrated successfully`);
    console.log(`⚠️  ${skipCount} articles skipped (already existed)`);
    
    if (successCount > 0) {
      console.log('\n📋 Your articles are now in Supabase database!');
      console.log('   You can view them in your Supabase dashboard → Table Editor → blog_articles');
      console.log('   Test your admin panel: npm run dev → /admin');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  }
}

migrateArticles();
