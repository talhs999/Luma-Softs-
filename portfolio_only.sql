-- Create the portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  featured_image TEXT,
  client TEXT,
  duration TEXT,
  technologies TEXT[],
  description TEXT,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  testimonial TEXT,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS) for portfolio
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to prevent errors if run multiple times)
DROP POLICY IF EXISTS "Allow public read access on portfolio" ON portfolio;
DROP POLICY IF EXISTS "Allow full access to authenticated users on portfolio" ON portfolio;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on portfolio" 
  ON portfolio FOR SELECT TO public USING (true);

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow full access to authenticated users on portfolio" 
  ON portfolio FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create a storage bucket for portfolio images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio_images', 'portfolio_images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the portfolio bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Insert" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio_images');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio_images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio_images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio_images' AND auth.role() = 'authenticated');

-- Insert 10 Sample Portfolio Projects (Uses ON CONFLICT to prevent duplicates if run twice)
INSERT INTO portfolio (slug, title, category, featured_image, client, duration, technologies, description, challenge, solution, results, testimonial) VALUES
('tech-corp-redesign', 'Corporate Website Redesign', 'Web Development', '/web-dev.png', 'TechCorp Inc.', '4 Weeks', ARRAY['Next.js', 'Tailwind', 'Supabase'], 'A complete website overhaul for a leading tech company, transforming their outdated site into a modern, high-performance platform.', 'The client had a slow, outdated WordPress site that was not mobile-friendly and had poor SEO rankings.', 'We rebuilt the entire site using Next.js for blazing performance, implemented responsive design, and optimized for search engines.', 'Page load time reduced by 70%, organic traffic increased by 45%, and bounce rate dropped by 30%.', 'Luma Softs completely transformed our web presence. The new site is fast, modern, and our clients love it.'),
('style-hub-ecommerce', 'Fashion eCommerce Platform', 'eCommerce', '/web-dev.png', 'StyleHub', '6 Weeks', ARRAY['Shopify', 'React', 'Stripe'], 'A premium online store for a fashion brand with custom product pages, dynamic filters, and integrated payment solutions.', 'The brand needed an online store that reflected their premium image while supporting high traffic during sales events.', 'Custom Shopify theme with optimized product pages, integrated Stripe payments, and a scalable infrastructure.', 'Revenue increased by 120% in the first quarter. Cart abandonment reduced by 25%.', 'The store looks amazing and works flawlessly. Sales are through the roof!'),
('service-first-ai', 'AI Customer Support Bot', 'AI Solutions', '/ai-software.png', 'ServiceFirst', '3 Weeks', ARRAY['Gemini AI', 'Next.js', 'Node.js'], 'An intelligent chatbot that handles customer inquiries 24/7, reducing support ticket volume and response times.', 'The client was overwhelmed with repetitive customer queries, leading to slow response times and unhappy customers.', 'Built a custom AI chatbot using Gemini AI that understands context, answers FAQs, and escalates complex issues to human agents.', 'Support ticket volume reduced by 60%. Average response time went from 4 hours to under 30 seconds.', 'This bot handles 60% of our queries automatically. It is a game changer for our support team.'),
('pay-quick-fintech', 'FinTech Mobile Application', 'Mobile Apps', '/ai-software.png', 'PayQuick', '10 Weeks', ARRAY['React Native', 'PostgreSQL', 'Node.js'], 'A cross-platform mobile banking app with secure transactions, real-time notifications, and biometric authentication.', 'Building a secure, user-friendly financial application that works seamlessly on both Android and iOS.', 'Developed with React Native for cross-platform consistency, implemented bank-grade security, and integrated real-time push notifications.', '50K+ downloads in the first month. 4.8-star rating on both app stores.', 'The app exceeded our expectations in both design and functionality. Our users love it.'),
('green-leaf-branding', 'Complete Brand Identity', 'Graphic Design', '/ui-ux.png', 'GreenLeaf Organics', '2 Weeks', ARRAY['Illustrator', 'Photoshop', 'Figma'], 'A full branding package including logo, color palette, typography, stationery, and social media kit for an organic food startup.', 'A new startup needed a complete brand identity that conveys trust, nature, and premium quality.', 'Created a comprehensive brand identity system with a nature-inspired logo, earthy color palette, and consistent visual language.', 'Brand recognition increased significantly. The client launched with a cohesive, professional image from day one.', 'They captured our brand essence perfectly. Every piece of collateral looks world-class.'),
('data-pulse-dashboard', 'SaaS Dashboard UI/UX', 'UI/UX Design', '/ui-ux.png', 'DataPulse Analytics', '5 Weeks', ARRAY['Figma', 'React', 'D3.js'], 'A comprehensive analytics dashboard design with interactive data visualizations, dark mode, and responsive layouts.', 'Complex data needed to be presented in an intuitive, actionable format for non-technical users.', 'Designed an clean, modern dashboard with interactive charts, customizable widgets, and a seamless dark mode experience.', 'User engagement increased by 80%. Client onboarding time reduced by 40%.', 'The dashboard is beautiful and our users can finally make sense of their data without training.'),
('health-track-app', 'Healthcare Tracking Portal', 'Web Development', '/web-dev.png', 'MediCare Systems', '8 Weeks', ARRAY['React', 'Node.js', 'MongoDB'], 'A secure patient portal for tracking medical history, upcoming appointments, and lab results in real-time.', 'The clinic struggled with missed appointments and patients losing paper prescriptions.', 'Developed a HIPAA-compliant portal with SMS reminders, digital prescriptions, and an intuitive dashboard.', 'Missed appointments dropped by 45%. Patient satisfaction scores reached an all-time high.', 'Our patients love the convenience of the new portal. It has streamlined our entire operation.'),
('social-reach-marketing', 'Digital Marketing Campaign', 'Digital Marketing', '/ui-ux.png', 'GrowthWave', '4 Weeks', ARRAY['Google Ads', 'Facebook Ads', 'Analytics'], 'A comprehensive digital marketing campaign focused on lead generation and brand awareness for a B2B service.', 'The client was struggling to acquire high-quality B2B leads through traditional marketing channels.', 'Implemented highly targeted LinkedIn and Google Ads campaigns, optimized landing pages, and set up A/B testing.', 'Generated 500+ qualified leads in the first month with a 3x return on ad spend (ROAS).', 'Luma Softs transformed our lead generation pipeline. The ROI has been incredible.'),
('inventory-sync-erp', 'Custom ERP System', 'Software Development', '/ai-software.png', 'Global Logistics', '12 Weeks', ARRAY['Next.js', 'Python', 'PostgreSQL'], 'A cloud-based Enterprise Resource Planning system to sync inventory across multiple warehouses globally.', 'Disjointed systems caused stockouts, delayed shipments, and inaccurate financial reporting.', 'Built a centralized ERP with real-time inventory tracking, automated reordering, and advanced reporting modules.', 'Reduced stockouts by 90% and improved order fulfillment speed by 35%.', 'The ERP system has given us unprecedented visibility into our supply chain.'),
('smart-home-iot', 'Smart Home App Interface', 'UI/UX Design', '/ui-ux.png', 'NextGen Living', '6 Weeks', ARRAY['Figma', 'Prototyping', 'User Testing'], 'A sleek, dark-themed mobile app interface for controlling IoT smart home devices like lights, thermostats, and locks.', 'The client had complex hardware but an outdated, confusing app that frustrated users.', 'Redesigned the entire user flow, focusing on one-tap actions, intuitive controls, and a beautiful dark mode UI.', 'App store rating increased from 2.5 to 4.7 stars. Support calls regarding app usage dropped by 80%.', 'The new design is stunning. It finally feels like a truly premium smart home experience.')
ON CONFLICT (slug) DO NOTHING;
