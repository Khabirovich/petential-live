# 🚀 Quick Supabase Setup (10 minutes)

Follow these exact steps to connect your Supabase database and save your existing articles.

## Step 1: Get Supabase Credentials (2 minutes)

1. **Go to your Supabase project**: https://app.supabase.com
2. **Click on Settings** (in left sidebar)
3. **Click on API**
4. **Copy these 2 values:**
   ```
   Project URL: https://your-project-id.supabase.co
   anon public key: eyJ0eXAiOiJKV1Q...very-long-string
   ```

## Step 2: Setup Local Environment (1 minute)

1. **Create `.env.local` file** in your project root:
   ```bash
   cd petential-live
   cp env.local.example .env.local
   ```

2. **Edit `.env.local` file** and replace with your actual values:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1Q...your-actual-long-key

   # Keep your existing API keys as they are
   DOG_API_KEY=your-existing-dog-api-key
   CAT_API_KEY=your-existing-cat-api-key
   OPENAI_API_KEY=your-existing-openrouter-key
   ```

## Step 3: Install Dependencies (1 minute)

```bash
npm install @supabase/supabase-js dotenv
```

## Step 4: Test Connection (1 minute)

```bash
npm run test-db
```

**Expected output:**
```
✅ Environment variables found
✅ Supabase client created
✅ Database connection successful!
📚 Found X existing articles to migrate
```

**If you get errors:**
- Check your URL and API key are correct
- Make sure you ran the SQL schema in Supabase

## Step 5: Migrate Your Articles (1 minute)

```bash
npm run migrate
```

**Expected output:**
```
📚 Found X articles to migrate
📄 Migrating: "Article 1" ... SUCCESS ✅
📄 Migrating: "Article 2" ... SUCCESS ✅
🎉 Migration completed!
```

## Step 6: Test Admin Panel (1 minute)

```bash
npm run dev
```

1. Go to `http://localhost:3000/admin`
2. Login with your password
3. You should see your articles!
4. Try creating a new article

## Step 7: Deploy Environment Variables

### For Vercel (Frontend):

```bash
# In your terminal:
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your URL when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  
# Paste your API key when prompted

# Redeploy
vercel --prod
```

### For Railway (Backend):

1. **Go to your Railway dashboard**
2. **Click on your project**
3. **Go to Variables tab**
4. **Add these variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ0eXAiOiJKV1Q...your-long-key
   ```
5. **Railway will automatically redeploy**

## Step 8: Test Live Site (1 minute)

1. **Visit your live site**: https://petential.es/admin
2. **Login and test creating an article**
3. **Test contact form**: https://petential.es/contact
4. **Check submissions**: https://petential.es/admin/contacts

## 🎉 Done!

Your database is now connected! Here's what works:

- ✅ **Blog articles**: Create, edit, delete through admin panel
- ✅ **Contact forms**: All submissions saved to database  
- ✅ **Newsletter**: Subscriptions tracked in database
- ✅ **Admin panel**: View all user data and manage content

## 🆘 Troubleshooting

### "Connection failed"
- Double-check your Supabase URL and API key
- Make sure you ran the SQL schema in your Supabase project

### "Articles not showing"
- Run `npm run migrate` to move articles to database
- Check Supabase dashboard → Table Editor → blog_articles

### "Admin panel not working"
- Make sure environment variables are set in both Vercel and Railway
- Check browser console for errors

### Need help?
- Check Supabase dashboard logs
- Test API endpoints: `/api/blog`, `/api/contact`
- Verify your .env.local file has correct values
