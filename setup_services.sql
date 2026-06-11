-- Create the services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  icon TEXT,
  image TEXT,
  short_desc TEXT,
  long_desc TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  faq JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS) for the table
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access on services
CREATE POLICY "Allow public read access on services" 
  ON services 
  FOR SELECT 
  TO public 
  USING (true);

-- Create policy to allow all operations for authenticated users (Admin Panel) on services
CREATE POLICY "Allow full access to authenticated users on services" 
  ON services 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('service_images', 'service_images', true)
ON CONFLICT (id) DO NOTHING;

-- Setup RLS for the storage bucket
-- Allow public to read images
CREATE POLICY "Public Access" 
  ON storage.objects 
  FOR SELECT 
  TO public 
  USING (bucket_id = 'service_images');

-- Allow authenticated admins to upload/update/delete images
CREATE POLICY "Admin Upload Access" 
  ON storage.objects 
  FOR ALL 
  TO authenticated 
  USING (bucket_id = 'service_images')
  WITH CHECK (bucket_id = 'service_images');
