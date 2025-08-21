// Article Recovery Script
// Run this in your browser console to recover localStorage articles

console.log("🔍 Searching for stored articles in localStorage...");

// Check for articles in localStorage
const storedArticles = localStorage.getItem('blog-articles');
const cachedArticles = localStorage.getItem('blog-articles-cache');

let articlesToRecover = [];

if (storedArticles) {
    try {
        const parsed = JSON.parse(storedArticles);
        if (Array.isArray(parsed) && parsed.length > 0) {
            articlesToRecover = [...articlesToRecover, ...parsed];
            console.log(`✅ Found ${parsed.length} articles in 'blog-articles'`);
        }
    } catch (e) {
        console.log("❌ Error parsing 'blog-articles':", e);
    }
}

if (cachedArticles) {
    try {
        const parsed = JSON.parse(cachedArticles);
        if (Array.isArray(parsed) && parsed.length > 0) {
            // Merge without duplicates
            const existing = articlesToRecover.map(a => a.id);
            const newArticles = parsed.filter(a => !existing.includes(a.id));
            articlesToRecover = [...articlesToRecover, ...newArticles];
            console.log(`✅ Found ${newArticles.length} additional articles in cache`);
        }
    } catch (e) {
        console.log("❌ Error parsing cached articles:", e);
    }
}

if (articlesToRecover.length === 0) {
    console.log("❌ No articles found in localStorage. They might be stored elsewhere or already migrated.");
    
    // Check all localStorage keys for any blog-related data
    console.log("🔍 Checking all localStorage keys for blog data...");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('blog') || key.includes('article'))) {
            console.log(`📝 Found potential blog data in key: ${key}`);
            try {
                const data = localStorage.getItem(key);
                console.log(`   Content preview: ${data.substring(0, 200)}...`);
            } catch (e) {
                console.log(`   Error reading key: ${e}`);
            }
        }
    }
} else {
    console.log(`🎉 Found ${articlesToRecover.length} articles to recover!`);
    
    // Show preview of articles
    articlesToRecover.forEach((article, index) => {
        console.log(`${index + 1}. "${article.title}" by ${article.author} (${article.publishDate})`);
    });
    
    console.log("\n🚀 Starting recovery process...");
    
    // Function to recover articles to backend
    async function recoverArticles() {
        let recovered = 0;
        let failed = 0;
        
        for (const article of articlesToRecover) {
            try {
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
                        console.log(`✅ Recovered: "${article.title}"`);
                        recovered++;
                    } else {
                        console.log(`⚠️ Partial success: "${article.title}" - ${result.message}`);
                        failed++;
                    }
                } else {
                    console.log(`❌ Failed: "${article.title}" - HTTP ${response.status}`);
                    failed++;
                }
            } catch (error) {
                console.log(`❌ Error recovering "${article.title}":`, error);
                failed++;
            }
            
            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log(`\n🎉 Recovery complete!`);
        console.log(`✅ Recovered: ${recovered} articles`);
        console.log(`❌ Failed: ${failed} articles`);
        
        if (recovered > 0) {
            console.log(`\n🔄 Refreshing page to show recovered articles...`);
            setTimeout(() => window.location.reload(), 2000);
        }
    }
    
    // Start recovery
    recoverArticles();
}
