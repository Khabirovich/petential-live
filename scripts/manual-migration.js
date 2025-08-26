/**
 * Manual migration script that creates articles one by one through your API
 * This bypasses RLS by using your existing API routes
 */

const fs = require('fs');
const path = require('path');

async function manualMigration() {
  console.log('🚀 Starting Manual Migration via API...\n');

  // Read existing blog data
  const blogDataPath = path.join(process.cwd(), 'data', 'blog-data.json');
  
  if (!fs.existsSync(blogDataPath)) {
    console.log('⚠️  No existing blog articles found');
    return;
  }

  try {
    const blogDataRaw = fs.readFileSync(blogDataPath, 'utf-8');
    const blogData = JSON.parse(blogDataRaw);
    
    console.log(`📚 Found ${blogData.articles.length} articles to migrate\n`);

    let successCount = 0;
    let skipCount = 0;

    // Start local server message
    console.log('🖥️  Make sure your local server is running:');
    console.log('   npm run dev (in another terminal)');
    console.log('   Then press Enter to continue...');
    
    // Wait for user to press Enter
    process.stdin.setRawMode(true);
    await new Promise(resolve => {
      process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        resolve();
      });
    });

    console.log('\n📡 Migrating via API...\n');

    // Migrate each article via API
    for (const article of blogData.articles) {
      process.stdout.write(`📄 Migrating: "${article.title}" ... `);
      
      try {
        const response = await fetch('http://localhost:3000/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            author: article.author,
            category: article.category,
            readTime: article.readTime,
            image: article.image,
            tags: article.tags
          })
        });

        const result = await response.json();
        
        if (response.ok) {
          console.log('SUCCESS ✅');
          successCount++;
        } else {
          console.log(`ERROR: ${result.message}`);
        }
      } catch (error) {
        console.log(`ERROR: ${error.message}`);
      }
    }
    
    console.log('\n🎉 Migration completed!');
    console.log(`✅ ${successCount} articles migrated successfully`);
    console.log(`⚠️  ${skipCount} articles skipped`);
    
    if (successCount > 0) {
      console.log('\n📋 Check your admin panel: http://localhost:3000/admin');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  }
}

manualMigration();
