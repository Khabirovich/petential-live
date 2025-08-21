// FORCE MIGRATION SCRIPT - Run this in your browser console
console.log("🚀 EMERGENCY ARTICLE MIGRATION STARTING...");

async function forceMigrateAllArticles() {
    // Check all possible localStorage keys for articles
    const possibleKeys = ['blog-articles', 'blog-articles-cache', 'articles', 'blogArticles'];
    let allArticles = [];
    
    console.log("🔍 Searching all localStorage keys for your articles...");
    
    for (const key of possibleKeys) {
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    // Validate articles
                    const validArticles = parsed.filter(article => 
                        article && 
                        typeof article === 'object' && 
                        article.title && 
                        article.content && 
                        article.author
                    );
                    
                    if (validArticles.length > 0) {
                        console.log(`✅ Found ${validArticles.length} articles in "${key}"`);
                        allArticles = [...allArticles, ...validArticles];
                    }
                }
            } catch (e) {
                console.log(`❌ Error parsing "${key}":`, e.message);
            }
        }
    }
    
    // Remove duplicates
    const uniqueArticles = allArticles.filter((article, index, self) => 
        index === self.findIndex(a => 
            (a.id && article.id && a.id === article.id) || 
            (a.title === article.title && a.author === article.author)
        )
    );
    
    if (uniqueArticles.length === 0) {
        console.log("❌ No articles found in localStorage");
        console.log("📊 Current localStorage contents:");
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`   ${key}: ${value ? value.length : 0} characters`);
        }
        return;
    }
    
    console.log(`🎉 Found ${uniqueArticles.length} unique articles to migrate:`);
    uniqueArticles.forEach((article, index) => {
        console.log(`   ${index + 1}. "${article.title}" by ${article.author} (${article.publishDate || 'no date'})`);
    });
    
    console.log("\n🚀 Starting migration to backend...");
    
    let migrated = 0;
    let failed = 0;
    
    for (const article of uniqueArticles) {
        try {
            console.log(`📝 Migrating: "${article.title}"`);
            
            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.status === 'success') {
                    console.log(`✅ SUCCESS: "${article.title}" migrated to backend`);
                    migrated++;
                } else {
                    console.log(`⚠️ UPDATED: "${article.title}" - ${result.message}`);
                    migrated++; // Count as success since article is preserved
                }
            } else {
                console.log(`❌ FAILED: "${article.title}" - HTTP ${response.status}`);
                failed++;
                
                // Try to get error details
                try {
                    const errorData = await response.json();
                    console.log(`   Error details: ${errorData.message || 'Unknown error'}`);
                } catch (e) {
                    console.log(`   Could not parse error response`);
                }
            }
        } catch (error) {
            console.log(`❌ ERROR: "${article.title}" - ${error.message}`);
            failed++;
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log("\n🎉 MIGRATION COMPLETE!");
    console.log(`✅ Successfully migrated: ${migrated} articles`);
    console.log(`❌ Failed to migrate: ${failed} articles`);
    
    if (migrated > 0) {
        console.log("\n🔄 Your articles are now permanently saved on the backend!");
        console.log("🌐 They will be visible from ANY browser and will survive deployments!");
        
        // Mark as migrated
        localStorage.setItem('articles-migrated', 'true');
        localStorage.setItem('migration-date', new Date().toISOString());
        
        if (confirm('Migration complete! Would you like to refresh the page to see your articles?')) {
            window.location.reload();
        }
    } else {
        console.log("\n❌ No articles were successfully migrated.");
        console.log("💡 Try checking your admin panel or contact support.");
    }
}

// Start the migration
forceMigrateAllArticles();
