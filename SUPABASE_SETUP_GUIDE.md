# 🚀 Supabase Setup Guide for PETential

This guide will help you migrate your PETential blog and contact system from JSON files to Supabase database.

## 📋 Prerequisites

- [ ] Supabase account (sign up at [supabase.com](https://supabase.com))
- [ ] Node.js and npm installed
- [ ] Your existing PETential project

## Step 1: Create Supabase Project

1. **Go to [Supabase Dashboard](https://app.supabase.com)**
2. **Click "New Project"**
3. **Choose your organization**
4. **Enter project details:**
   - Name: `petential-database`
   - Database Password: (choose a strong password)
   - Region: Choose closest to your users
5. **Click "Create new project"**
6. **Wait for setup to complete (~2 minutes)**

## Step 2: Get Your API Keys

1. **In your Supabase dashboard, go to Settings → API**
2. **Copy these values:**
   - Project URL: `https://your-project-id.supabase.co`
   - `anon` `public` key: (long string starting with `eyJ...`)

## Step 3: Setup Database Schema

1. **In Supabase dashboard, go to SQL Editor**
2. **Click "New Query"**
3. **Copy the contents from** `supabase/migrations/001_initial_schema.sql`
4. **Run the query**
5. **Verify tables were created** in Database → Tables

You should see these tables:
- `blog_articles`
- `contact_submissions` 
- `newsletter_subscriptions`
- `feedback_submissions`

## Step 4: Configure Environment Variables

1. **Copy `env.example` to `.env.local`:**
   ```bash
   cp env.example .env.local
   ```

2. **Edit `.env.local` with your Supabase credentials:**
   ```bash
   # Replace with your actual values
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Keep your existing API keys
   DOG_API_KEY=your-existing-dog-api-key
   CAT_API_KEY=your-existing-cat-api-key  
   OPENAI_API_KEY=your-existing-openrouter-key
   ```

## Step 5: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## Step 6: Migrate Existing Data (Optional)

If you have existing blog articles and user data to migrate:

1. **Compile the migration script:**
   ```bash
   npx tsc scripts/migrate-to-supabase.ts --target es2020 --module commonjs --outDir dist
   ```

2. **Run the migration:**
   ```bash
   node dist/scripts/migrate-to-supabase.js
   ```

**Note:** This will copy your existing JSON data to Supabase. Your original files will remain unchanged.

## Step 7: Test Your Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the admin panel:**
   - Go to `http://localhost:3000/admin`
   - Login with your admin password
   - Try creating a new blog article
   - Check if it appears in your Supabase dashboard

3. **Test contact forms:**
   - Go to your contact page
   - Submit a test message
   - Check the `contact_submissions` table in Supabase

4. **Test newsletter signup:**
   - Try subscribing to the newsletter
   - Check the `newsletter_subscriptions` table in Supabase

## Step 8: Deploy with Environment Variables

### For Vercel:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### For Railway:
Add the environment variables in your Railway dashboard under Variables.

## 🔒 Security Notes

1. **Row Level Security (RLS) is enabled** on all tables
2. **Public users can:** Submit contacts, subscribe to newsletter
3. **Authenticated users can:** Manage blog articles, view submissions
4. **The `anon` key is safe to expose** in your frontend code

## 🎯 What This Setup Gives You

### ✅ **Blog Management**
- Create, edit, delete articles through admin panel
- All articles stored in PostgreSQL database
- Full-text search capabilities
- Automatic timestamps

### ✅ **Contact Management** 
- All contact form submissions saved to database
- Admin panel to view and manage contacts
- Newsletter subscription management
- Feedback collection (ready to implement)

### ✅ **Scalability**
- PostgreSQL database (no more JSON file limits)
- Built-in backup and restoration
- Real-time subscriptions available
- Automatic scaling

### ✅ **Admin Features**
- `/admin/dashboard` - Manage blog articles
- `/admin/create` - Create new articles  
- `/admin/contacts` - View contact submissions and newsletter subscribers
- `/admin/edit/[id]` - Edit existing articles

## 🔧 Troubleshooting

### "Failed to connect to Supabase"
- Check your environment variables are correct
- Verify your Supabase project is running
- Make sure you're using the `anon` key, not the `service_role` key

### "Articles not saving"
- Check browser console for errors
- Verify your database schema was created correctly
- Test the API endpoints directly: `/api/blog`

### "Contact forms not working"
- Test the API endpoint: `/api/contact`
- Check if RLS policies are blocking inserts
- Verify the table structure matches the code

## 📚 Next Steps

1. **Backup your JSON files** (keep them safe)
2. **Test all functionality thoroughly**
3. **Consider setting up automated backups** in Supabase
4. **Implement image storage** using Supabase Storage (optional)
5. **Add real-time features** if desired

## 🆘 Need Help?

- Check [Supabase Documentation](https://supabase.com/docs)
- Review the code in `/lib/database/` for service functions
- Test API endpoints using the browser Network tab
- Check your Supabase dashboard logs

---

**Congratulations!** 🎉 Your PETential app now has a powerful, scalable database backend that can handle unlimited blog articles and user submissions!
