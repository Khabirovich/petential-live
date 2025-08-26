/**
 * Fix images in migrated articles
 * Run this after migration to restore image URLs
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function fixImages() {
  console.log('🖼️  Fixing article images...\n');

  // Initialize Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Read original blog data to get image URLs
    const blogDataPath = path.join(process.cwd(), 'data', 'blog-data.json');
    
    if (!fs.existsSync(blogDataPath)) {
      console.log('⚠️  No original blog data found');
      return;
    }

    const blogDataRaw = fs.readFileSync(blogDataPath, 'utf-8');
    const blogData = JSON.parse(blogDataRaw);
    
    console.log(`🔍 Checking ${blogData.articles.length} articles for images...\n`);

    let fixedCount = 0;

    // Fix each article's image
    for (const article of blogData.articles) {
      if (article.image) {
        process.stdout.write(`🖼️  Fixing image for: "${article.title}" ... `);
        
        const { error } = await supabase
          .from('blog_articles')
          .update({ image_url: article.image })
          .eq('id', article.id);
        
        if (error) {
          console.log(`ERROR: ${error.message}`);
        } else {
          console.log('SUCCESS ✅');
          fixedCount++;
        }
      } else {
        console.log(`⚠️  No image for: "${article.title}"`);
      }
    }
    
    console.log('\n🎉 Image fix completed!');
    console.log(`✅ ${fixedCount} article images restored`);
    
    if (fixedCount > 0) {
      console.log('\n📋 Images should now appear in your admin panel and blog pages');
      console.log('   Check: http://localhost:3000/admin');
    }

  } catch (error) {
    console.error('❌ Image fix failed:', error.message);
  }
}

fixImages();
