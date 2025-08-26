-- Enable RLS (Row Level Security)
-- Create blog_articles table
CREATE TABLE blog_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  category TEXT NOT NULL DEFAULT 'Pet Care',
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscriptions table
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback_submissions table
CREATE TABLE feedback_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  feedback_type TEXT,
  rating TEXT,
  features_used TEXT[],
  message TEXT,
  suggestions TEXT,
  allow_follow_up BOOLEAN DEFAULT FALSE,
  newsletter_signup BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_articles_category ON blog_articles(category);
CREATE INDEX idx_blog_articles_publish_date ON blog_articles(publish_date DESC);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX idx_feedback_submissions_created_at ON feedback_submissions(created_at DESC);

-- Enable RLS on all tables
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_articles (public read, authenticated write)
CREATE POLICY "Blog articles are viewable by everyone" ON blog_articles
  FOR SELECT USING (true);

CREATE POLICY "Blog articles are editable by authenticated users" ON blog_articles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Blog articles are updatable by authenticated users" ON blog_articles
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Blog articles are deletable by authenticated users" ON blog_articles
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for contact submissions (insert only for public, read for authenticated)
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Contact submissions are viewable by authenticated users" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for newsletter subscriptions
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Newsletter subscriptions are viewable by authenticated users" ON newsletter_subscriptions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for feedback submissions
CREATE POLICY "Anyone can submit feedback" ON feedback_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Feedback submissions are viewable by authenticated users" ON feedback_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at for blog_articles
CREATE TRIGGER update_blog_articles_updated_at BEFORE UPDATE ON blog_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
