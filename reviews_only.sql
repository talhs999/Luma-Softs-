-- Create the reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS) for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access on reviews" ON reviews;
DROP POLICY IF EXISTS "Allow full access to authenticated users on reviews" ON reviews;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on reviews" 
  ON reviews FOR SELECT TO public USING (true);

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow full access to authenticated users on reviews" 
  ON reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert existing testimonials as seed data
INSERT INTO reviews (name, role, text, rating, time) VALUES
('Ahmed Khan', 'CEO, TechVentures', 'Luma Softs transformed our online presence. Their team delivered a stunning website with seamless functionality. Highly recommended!', 5, '2 weeks ago'),
('Sarah Mitchell', 'Founder, BrandHive', 'The AI chatbot integration doubled our customer engagement. Professional team with exceptional communication.', 5, '1 month ago'),
('Omar Farooq', 'Director, ScaleUp Inc.', 'From concept to launch, the experience was flawless. The admin panel makes managing our content effortless.', 5, '3 months ago'),
('Jessica Wong', 'Marketing Head', 'The UI/UX design they did for our app is world-class. User retention has increased by 40% since the redesign.', 5, '4 months ago'),
('Bilal Tariq', 'E-Commerce Owner', 'They built our Shopify store from scratch and integrated all local payment gateways. Sales are booming!', 5, '5 months ago'),
('David Chen', 'Startup Founder', 'Fast delivery and great code quality. Luma Softs is our go-to tech partner for all custom software needs.', 5, '6 months ago'),
('Ayesha Noor', 'Operations Manager', 'The custom CRM they developed saved us hundreds of hours of manual work. Brilliant team of engineers.', 5, '8 months ago');
