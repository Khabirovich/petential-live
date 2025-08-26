-- Fix RLS policies to allow migration
-- Run this in your Supabase SQL Editor

-- Temporarily disable RLS for migration
ALTER TABLE blog_articles DISABLE ROW LEVEL SECURITY;

-- Or if you want to keep RLS, create a policy that allows public inserts temporarily
-- ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
-- 
-- DROP POLICY IF EXISTS "Blog articles are editable by authenticated users" ON blog_articles;
-- 
-- CREATE POLICY "Allow public inserts for migration" ON blog_articles
--   FOR INSERT WITH CHECK (true);

-- After migration is complete, you can re-enable the original policies with:
-- 
-- DROP POLICY IF EXISTS "Allow public inserts for migration" ON blog_articles;
-- 
-- CREATE POLICY "Blog articles are editable by authenticated users" ON blog_articles
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- 
-- CREATE POLICY "Blog articles are updatable by authenticated users" ON blog_articles
--   FOR UPDATE USING (auth.role() = 'authenticated');
-- 
-- CREATE POLICY "Blog articles are deletable by authenticated users" ON blog_articles
--   FOR DELETE USING (auth.role() = 'authenticated');
