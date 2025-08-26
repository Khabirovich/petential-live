/**
 * Simple script to test Supabase connection
 * Run with: node scripts/test-supabase-connection.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testConnection() {
  console.log('🧪 Testing Supabase Connection...\n');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local');
    return;
  }

  if (!supabaseKey) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    return;
  }

  console.log('✅ Environment variables found');
  console.log(`📍 URL: ${supabaseUrl}`);
  console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...`);

  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client created');

    // Test connection by checking tables
    console.log('\n🔍 Testing database connection...');
    
    const { data, error } = await supabase
      .from('blog_articles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('\n🚨 Common issues:');
      console.log('   1. Check if you ran the SQL schema in Supabase');
      console.log('   2. Verify your API key is correct');
      console.log('   3. Make sure RLS policies are set up');
      return;
    }

    console.log('✅ Database connection successful!');
    
    // Check if we can read existing articles from JSON
    const fs = require('fs');
    const path = require('path');
    const blogDataPath = path.join(process.cwd(), 'data', 'blog-data.json');
    
    if (fs.existsSync(blogDataPath)) {
      const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
      console.log(`\n📚 Found ${blogData.articles.length} existing articles to migrate`);
      console.log('   Articles:');
      blogData.articles.forEach((article, index) => {
        console.log(`   ${index + 1}. ${article.title}`);
      });
    } else {
      console.log('\n📝 No existing blog articles found');
    }

    console.log('\n🎉 Connection test completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Run migration to save your articles: npm run migrate');
    console.log('   2. Test admin panel: npm run dev → /admin');
    console.log('   3. Add environment variables to Vercel and Railway');

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

testConnection();
