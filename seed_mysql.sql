-- ================================================================
-- SYSTEM SETTINGS
-- ================================================================
CREATE TABLE IF NOT EXISTS app_settings (
  setting_key VARCHAR(255) PRIMARY KEY,
  setting_value VARCHAR(255) NOT NULL
);

DELETE FROM app_settings WHERE setting_key = 'auto_blog_enabled';
INSERT INTO app_settings (setting_key, setting_value) VALUES ('auto_blog_enabled', 'true');

-- ================================================================
-- BLOGS
-- ================================================================
CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  date VARCHAR(100),
  description TEXT,
  content LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELETE FROM blogs;

INSERT INTO blogs (slug, title, category, date, description, content) VALUES
('website-cost-in-karachi-2026', 'How Much Does a Website Cost in Karachi? Complete 2026 Price Guide', 'Web Development', 'June 15, 2026', 'Thinking of taking your business online? Find out the exact cost of building a website in Karachi, from simple landing pages to full e-commerce stores.', 'If you run a business in Karachi, whether it''s a shop in Tariq Road or an agency in Shahrah-e-Faisal, you know that having an online presence is no longer optional. But the first question every business owner asks is: *"Website banana kitna mehnga hai?"* (How much does a website cost?)\n\nIn this guide, we break down the real costs of web development in Karachi for 2026, so you know exactly what you are paying for.\n\n## 1. Domain & Hosting (The Foundation)\nBefore anyone writes a single line of code, you need a name (Domain) and space (Hosting). \n- **Domain (.com or .pk):** Rs. 3,500 - Rs. 6,000 per year.\n- **Good Quality Hosting:** Rs. 10,000 - Rs. 25,000 per year.\n*Beware of agencies offering "Rs. 2,000 hosting"* - your site will crash when traffic increases!\n\n## 2. Basic Business Website (Rs. 40,000 - Rs. 80,000)\nIf you need a 4-5 page website to showcase your services (Home, About, Services, Contact), this is the budget. It usually includes a responsive design, WhatsApp integration, and a contact form.\n\n## 3. Custom E-Commerce Store (Rs. 100,000 - Rs. 300,000+)\nFor selling products online (like clothing, electronics, or food), you need a store. The cost depends on the platform:\n- **Shopify/WooCommerce:** Starts from Rs. 80,000.\n- **Custom React/Next.js Store:** Starts from Rs. 150,000 (Best for speed and large inventory).\n\n## 4. Maintenance & SEO (The Hidden Costs)\nBuilding a website is just step one. To rank on Google and keep it secure, you need monthly maintenance and SEO.\n- **SEO Services in Karachi:** Rs. 30,000 - Rs. 100,000/month.\n\n## Conclusion\nDon''t fall for "5,000 ki website" scams. A cheap website hurts your brand and drives customers away. At **Luma Softs**, we provide premium, high-speed websites tailored for Pakistani businesses. Contact us today for a free consultation!'),
('google-my-business-setup-karachi', 'How to Set Up Google My Business for Karachi Business Owners', 'Local SEO', 'June 10, 2026', 'Want customers from your neighborhood to find you easily? Learn how to rank your business on Google Maps in Karachi.', 'Imagine someone in Malir searching for "best restaurant near me" or someone in DHA searching for "plumber in Karachi." If your business doesn''t show up on Google Maps, you are losing money to your competitors.\n\nThis is where **Local SEO** and **Google My Business (GMB)** come in. \n\n## Step 1: Claim Your Business Profile\nGo to google.com/business and sign in. Enter your exact business name. Make sure it matches what''s written on your signboard.\n\n## Step 2: Set the Exact Karachi Address\nGoogle relies heavily on accurate locations. Whether you are in Gulshan-e-Iqbal, Malir, or Clifton, drop the pin exactly on your shop or office. If you don''t have a physical store, you can select "Service Area Business" and choose Karachi.\n\n## Step 3: Add High-Quality Photos\nPakistani consumers love to see what they are buying. Upload bright, clear photos of your storefront, your products, and your team. Profiles with photos get 42% more requests for directions.\n\n## Step 4: Get Local Reviews\nReviews are the secret weapon for Local SEO. Ask your happy customers to leave a 5-star review. You can even send them a direct WhatsApp link to review your business. Reply to *every* review, even the bad ones, in a professional manner.\n\n## Step 5: Optimize for Urdu/Roman Urdu Keywords\nMany people in Karachi search using Roman Urdu (e.g., "Sasta laptop kahan se milega Karachi"). Include these natural phrases in your business description and Q&A section.\n\nNeed help dominating local search in Karachi? **Luma Softs** specializes in Local SEO that brings foot traffic to your door.'),
('how-to-rank-on-google-first-page-pakistan', 'How to Rank on Google First Page - Complete SEO Guide for Pakistan 2026', 'SEO', 'June 5, 2026', 'Stop paying for ads forever. Learn the exact SEO strategies to rank your Pakistani business on page one of Google.', 'Getting to the first page of Google is the ultimate goal for any business. In Pakistan, the competition is growing, but with the right SEO strategy, you can easily outrank older businesses. Here is the 2026 guide to SEO in Pakistan.\n\n## 1. Fast Loading Speeds (Crucial for Pakistan)\nMobile internet in Pakistan can sometimes be slow. If your website takes more than 3 seconds to load, the user will leave. Google penalizes slow websites. We build sites using **Next.js**, which guarantees blazing fast speeds even on 3G connections.\n\n## 2. Target the Right Keywords\nDon''t just target "Shoes." Target "Buy men''s leather shoes in Karachi." Long-tail keywords have less competition and bring buyers who are ready to purchase. Use tools like Google Keyword Planner to see what Pakistanis are actually searching for.\n\n## 3. High-Quality, Helpful Content\nGoogle''s new AI algorithms prioritize content that actually helps the user. Write detailed blogs answering common questions your local clients ask. \n\n## 4. Quality Backlinks\nA backlink is when another website links to yours. It acts as a "vote of confidence." Get featured in local Pakistani business directories, news sites, or partner with other local businesses to exchange links.\n\n## 5. Mobile-First Optimization\nOver 70% of web traffic in Pakistan comes from mobile phones. Your site must look and work perfectly on a smartphone. \n\nSEO takes 3 to 6 months to show results, but once you rank, the traffic is free and consistent. Ready to take the #1 spot? Let **Luma Softs** handle your SEO strategy.'),
('facebook-ads-pakistan-500-rs-day', 'How to Run Facebook Ads in Pakistan - Start with Just Rs. 500/Day', 'Digital Marketing', 'May 28, 2026', 'Think Facebook Ads are too expensive? Learn how small businesses in Karachi are generating leads with just Rs. 500 a day.', '"Facebook ads mere business ke liye nahi hain, budget nahi hai." (Facebook ads aren''t for my business, I don''t have the budget.) \n\nThis is the biggest myth among small business owners in Pakistan. You don''t need millions of rupees. You can start generating real leads for just Rs. 500 a day. Here''s how.\n\n## 1. Stop Using the "Boost Post" Button\nThe blue "Boost Post" button is a trap. It gets you likes, but rarely sales. Instead, use the **Facebook Ads Manager**. It gives you deep targeting options and better control over your budget.\n\n## 2. Hyper-Local Targeting\nIf you run a salon in Malir, don''t show your ads to people in Lahore. Drop a pin on your location and set a 5km radius. Your Rs. 500 will go much further because you are only targeting people who can actually visit you.\n\n## 3. Focus on Video Ads\nPakistani audiences engage heavily with video content. You don''t need a professional camera. A simple smartphone video showing your product or explaining your service in Urdu/Hindi works wonders. It builds trust instantly.\n\n## 4. Use WhatsApp as Your Destination\nInstead of sending traffic to a website, run "Send WhatsApp Message" ads. People in Pakistan prefer chatting on WhatsApp before making a purchase. This allows you to close the sale personally.\n\n## 5. Test and Learn\nSpend Rs. 500 for 3 days. See what works. If an ad gets good messages, increase the budget. If not, turn it off and try a new video or image.\n\nWant professional help managing your ad spend? **Luma Softs** runs high-converting ad campaigns that maximize your ROI.'),
('grow-business-using-ai-pakistan', 'How to Grow Your Business Using AI - Guide for Pakistani Entrepreneurs', 'AI & Technology', 'May 20, 2026', 'Artificial Intelligence isn''t just for Silicon Valley. Learn how local businesses in Pakistan are using AI to save time and increase sales.', 'Artificial Intelligence (AI) is the biggest technological shift since the internet. But how can a local business in Karachi or Lahore actually use it to make money? \n\n## 1. 24/7 AI Customer Support on WhatsApp\nCustomers message at 2 AM asking for prices. If you reply the next morning, they''ve already bought from someone else. An AI Chatbot can instantly reply to WhatsApp messages, answer FAQs, and even take orders while you sleep.\n\n## 2. Creating Content with ChatGPT\nStruggling to write captions for your Instagram posts or descriptions for your products? Use ChatGPT. You can prompt it: *"Write an engaging Instagram caption in Roman Urdu for my new winter jacket collection."* You will get a ready-to-post caption in seconds.\n\n## 3. Automated Follow-Ups\nAI tools can connect to your CRM and automatically send emails or WhatsApp messages to customers who abandoned their carts or haven''t purchased in a while. \n\n## 4. Better Ad Targeting\nPlatforms like Meta (Facebook/Instagram) use machine learning algorithms. By feeding them the right data, their AI will automatically find the people most likely to buy your specific product.\n\n## The Luma Softs Advantage\nAt **Luma Softs**, we specialize in integrating AI into your existing business workflows. From custom chatbots to workflow automation, we help you do more with less effort.'),
('custom-software-vs-ready-made-pakistan', 'Why Your Business Needs Custom Software in Pakistan', 'Web Development', 'May 10, 2026', 'Are you using Excel sheets to run your business? Discover why custom software is the key to scaling your operations in Pakistan.', 'Many businesses in Pakistan still rely on WhatsApp groups, Excel sheets, and manual registers to manage their operations. While this works initially, it becomes impossible to scale.\n\nHere is why investing in custom software is a game-changer:\n\n## 1. Perfect Fit for Your Workflow\nReady-made software like QuickBooks or Shopify are great, but they force you to change how your business works. Custom software is built around *your* specific rules and processes.\n\n## 2. No Monthly Subscription Fees\nSaaS platforms charge you per user, per month in US Dollars. As the Dollar rate fluctuates, your costs increase. With custom software, you pay a one-time development fee and own the product completely.\n\n## 3. High Level Security\nWhen you use off-the-shelf software, you are sharing a server with thousands of other companies. A custom-built system gives you complete control over your data, ensuring your customer records remain private.\n\nStop managing your business on paper. Let **Luma Softs** build a custom ERP, CRM, or management system tailored for your specific needs.'),
('top-payment-gateways-pakistan-2026', 'Top 5 E-Commerce Payment Gateways in Pakistan for 2026', 'E-Commerce', 'May 5, 2026', 'Setting up an online store? Learn about the best payment gateways in Pakistan that offer smooth transactions and low fees.', 'Cash on Delivery (COD) still dominates the Pakistani e-commerce market, but online payments are rapidly growing. If you want to scale your online store, you must offer seamless digital payment options.\n\nHere are the top payment gateways in Pakistan for 2026:\n\n## 1. Safepay\nSafepay is one of the best choices for developers and merchants. It offers seamless integration with WooCommerce and Shopify, accepting credit/debit cards with high security and excellent customer support.\n\n## 2. JazzCash & EasyPaisa\nFor the masses, JazzCash and EasyPaisa are essential. Not everyone has a Visa or Mastercard. Integrating mobile wallets ensures you don''t lose customers who prefer mobile banking.\n\n## 3. PayFast\nPayFast allows customers to pay via bank accounts, mobile wallets, and debit/credit cards. It is highly secure and authorized by the State Bank of Pakistan.\n\n## 4. NIFT ePay\nNIFT ePay is an excellent option for direct bank transfers. It allows customers to pay directly from their bank accounts without needing a debit card.\n\nNeed help integrating these gateways into your website? **Luma Softs** specializes in secure e-commerce development.'),
('social-media-marketing-trends-pakistan', 'Social Media Marketing Trends in Pakistan You Need to Know', 'Digital Marketing', 'April 28, 2026', 'Stay ahead of your competitors by leveraging the latest social media marketing trends working in Pakistan right now.', 'The digital landscape in Pakistan is evolving faster than ever. What worked on Facebook two years ago no longer works today. To stay relevant, you need to adapt to these new trends.\n\n## 1. Short-Form Video is King\nTikTok, Instagram Reels, and YouTube Shorts have completely taken over. Pakistani audiences have shorter attention spans. If you want engagement, you must create 30-second to 60-second vertical videos showcasing your products.\n\n## 2. Influencer Micro-Marketing\nInstead of paying huge amounts to massive celebrities, brands are now working with "Micro-influencers" (people with 5k to 20k followers). They charge less, but their audience is highly targeted and trusts their recommendations.\n\n## 3. Conversational Commerce\nPeople don''t want to fill out long forms on websites. They want to buy directly through WhatsApp or Instagram DMs. Setting up an AI Chatbot on Meta platforms is no longer a luxury, it''s a necessity.\n\nAt **Luma Softs**, we run data-driven social media campaigns that focus on actual ROI, not just likes.'),
('mobile-app-vs-website-what-to-build', 'Mobile App vs Website: What Should You Build First?', 'Tech Advice', 'April 20, 2026', 'Confused between building a mobile app or a website for your startup? Read this before making an expensive mistake.', 'Every startup founder in Pakistan asks this question: *"Should I build a Mobile App or a Website first?"*\n\nThe answer depends on your business model, budget, and target audience.\n\n## When to Build a Website First\nFor 90% of businesses, a mobile-responsive website is the best starting point. \n- **Cost-Effective:** Websites are faster and cheaper to build than apps.\n- **Discoverability:** People search for services on Google. A website helps you rank on search engines (SEO).\n- **Universal Access:** Anyone with a browser can access it without downloading anything.\n\n## When to Build a Mobile App\nYou should build an app if your business relies on daily usage and native phone features.\n- **Examples:** Ride-hailing (Careem), Food Delivery (Foodpanda), or Fitness trackers.\n- Apps allow you to send Push Notifications and access the phone''s camera and GPS easily.\n\n## The Best of Both Worlds: Web Apps (PWA)\nA Progressive Web App looks and feels exactly like a mobile app but runs in the browser. It saves cost while providing an app-like experience.\n\nNot sure what''s best for you? Book a free consultation with **Luma Softs** and let our experts guide you.');

-- ================================================================
-- LUMASOFTS - COMPLETE REAL DATA SEED FILE
-- Ye aapki ORIGINAL website ka pura data hai
-- phpMyAdmin: lumasoft_db select karo â†’ SQL tab â†’ paste â†’ Go
-- ================================================================

SET NAMES utf8mb4;

-- ================================================================
-- 16 REAL SERVICES (Original + 3D Modeling)
-- ================================================================
DELETE FROM services;

INSERT INTO services (slug, title, icon, image, short_desc, long_desc, features, benefits, faq) VALUES

('web-development', 'Web Development', 'Monitor', '/Services Images/Web development.png',
'Custom websites, landing pages, business sites, and portfolio websites built with modern frameworks.',
'We design and develop high-performance websites that look stunning and drive results. Whether you need a simple landing page or a complex corporate website, our team delivers pixel-perfect solutions using Next.js, React, and modern web standards.',
'["Custom Websites","Business Websites","Corporate Websites","Landing Pages","Portfolio Websites"]',
'["Fast Loading Speed","SEO Optimized","Mobile Responsive","Modern Design","Easy to Manage"]',
'[{"q":"How long does it take to build a website?","a":"Typically 2-4 weeks depending on complexity."},{"q":"Do you provide hosting?","a":"Yes, we can help set up hosting on platforms like Vercel, AWS, or your preferred provider."}]'),

('ecommerce-development', 'eCommerce Development', 'ShoppingCart', '/Services Images/Ecomerce development.png',
'WooCommerce, Shopify, and custom online stores with payment integration and checkout optimization.',
'Launch your online store with a platform that converts visitors into customers. We build beautiful, fast, and secure eCommerce solutions with seamless payment gateways and inventory management.',
'["WooCommerce Stores","Shopify Development","Custom eCommerce","Payment Integration","Inventory Management"]',
'["Higher Conversion Rates","Secure Payments","Easy Product Management","Mobile Shopping","Analytics Dashboard"]',
'[{"q":"Which platform do you recommend?","a":"It depends on your needs â€” Shopify for simplicity, WooCommerce for flexibility, or custom for full control."},{"q":"Can you integrate payment gateways?","a":"Yes, we integrate Stripe, PayPal, JazzCash, EasyPaisa, and more."}]'),

('wordpress-development', 'WordPress Development', 'FileText', '/Services Images/Wordpress Development.png',
'Custom WordPress themes, plugins, and fully managed WordPress websites for businesses and blogs.',
'Harness the power of the world''s most popular CMS. We build fast, secure, and custom WordPress websites tailored to your exact needs, including theme development, plugin integration, and performance optimization.',
'["Custom Theme Development","Plugin Integration","Speed Optimization","Security Setup","Ongoing Maintenance"]',
'["Easy Content Management","Highly Customizable","SEO Friendly","Secure & Reliable","Mobile Responsive"]',
'[{"q":"Can you design a custom theme for my brand?","a":"Yes, we design and develop custom WordPress themes from scratch to match your brand identity perfectly."},{"q":"Do you offer maintenance services?","a":"We provide complete ongoing maintenance, security updates, and backups for WordPress websites."}]'),

('software-development', 'Software Development', 'Settings', '/Services Images/Software development.png',
'Custom CRM, ERP systems, management tools, and SaaS applications built for your business needs.',
'We build robust, scalable software that streamlines your operations. From CRM and ERP systems to complete SaaS platforms, we architect solutions that grow with your business.',
'["Custom CRM","ERP Systems","Management Systems","SaaS Applications","API Development"]',
'["Streamlined Operations","Data-Driven Decisions","Scalable Architecture","Custom Workflows","Cloud-Based"]',
'[{"q":"Can you build a custom CRM?","a":"Absolutely. We build tailored CRM solutions that fit your exact business workflow."},{"q":"What technologies do you use?","a":"Node.js, Next.js, MySQL, and cloud platforms like AWS."}]'),

('mobile-app-development', 'Mobile App Development', 'Smartphone', '/Services Images/Mobile development.png',
'Native and cross-platform Android & iOS mobile applications with intuitive user experiences.',
'Reach your audience on every device with professionally crafted mobile applications. We build native Android, iOS, and cross-platform apps using React Native and Flutter.',
'["Android Apps","iOS Apps","Cross-Platform Apps","App Store Deployment","Push Notifications"]',
'["Native Performance","Offline Capability","Intuitive UX","App Store Ready","Ongoing Support"]',
'[{"q":"Do you build for both Android and iOS?","a":"Yes, we build native apps for each platform or cross-platform apps that work on both."},{"q":"How long does app development take?","a":"Typically 6-12 weeks depending on features and complexity."}]'),

('ui-ux-design', 'UI/UX Design', 'Target', '/Services Images/UIUX design.png',
'Web and mobile UI design, wireframes, prototypes, and user experience optimization.',
'Great products start with great design. We create intuitive, visually stunning interfaces that users love, backed by research-driven UX principles and modern design systems.',
'["Web UI Design","Mobile UI Design","Wireframes","Prototypes","Design Systems"]',
'["Better User Retention","Consistent Branding","Accessibility","Faster Development","Data-Driven Design"]',
'[{"q":"What tools do you use?","a":"We use Figma for design and prototyping, along with Adobe Creative Suite."},{"q":"Do you conduct user research?","a":"Yes, we can conduct user interviews, surveys, and usability testing."}]'),

('graphic-design', 'Graphic Design', 'Brush', '/Services Images/Graphic design.png',
'Logo design, brand identity, social media graphics, and professional marketing materials.',
'Make a lasting impression with professional graphic design. From logos and brand identity to social media content and marketing collateral, we create visuals that communicate your brand story.',
'["Logo Design","Brand Identity","Social Media Design","Marketing Materials","Print Design"]',
'["Professional Branding","Consistent Identity","Higher Engagement","Print & Digital Ready","Quick Turnaround"]',
'[{"q":"How many logo concepts do you provide?","a":"We typically provide 3-5 initial concepts with unlimited revisions on the selected design."},{"q":"Can you create a full brand identity?","a":"Yes â€” logos, color palettes, typography, brand guidelines, stationery, and social media kits."}]'),

('digital-marketing', 'Digital Marketing', 'LineChart', '/Services Images/Digital Marketing.png',
'SEO, social media marketing, content marketing, and paid advertising strategies.',
'Grow your online presence and reach more customers with data-driven digital marketing. We create and execute strategies across SEO, social media, content, and paid advertising.',
'["SEO Optimization","Social Media Marketing","Content Marketing","Paid Advertising","Analytics & Reporting"]',
'["Increased Traffic","Better ROI","Brand Awareness","Lead Generation","Measurable Results"]',
'[{"q":"How long before I see results from SEO?","a":"SEO typically shows meaningful results within 3-6 months of consistent effort."},{"q":"Do you manage social media accounts?","a":"Yes, we offer full social media management including content creation, scheduling, and engagement."}]'),

('ai-automation', 'AI & Automation', 'Bot', '/Services Images/AI automation.png',
'Custom AI chatbots, workflow automation, and intelligent software integration.',
'Leverage the power of AI to automate repetitive tasks and engage customers 24/7. We build custom chatbots, integrate OpenAI APIs, and automate workflows using Zapier and Make.',
'["AI Chatbots","Workflow Automation","API Integration","Data Analysis","Custom AI Models"]',
'["24/7 Customer Support","Reduced Manual Work","Higher Efficiency","Scalable Solutions","Cost Savings"]',
'[{"q":"Can you train AI on my business data?","a":"Yes, we build chatbots trained specifically on your company documents, website, and data."},{"q":"What systems can you automate?","a":"We can connect and automate CRM, email marketing, support tickets, and accounting systems."}]'),

('copywriting', 'Copywriting', 'FileText', '/Services Images/Copy writing.png',
'Persuasive website copy, sales funnels, and SEO-optimized blog posts.',
'Great design needs great words. We write compelling, conversion-focused copy that speaks to your audience and ranks well on search engines.',
'["Website Copy","Sales Funnels","SEO Blogs","Email Campaigns","Ad Copy"]',
'["Higher Conversions","Better SEO","Clear Brand Voice","Engaging Content","More Sales"]',
'[{"q":"Do you write SEO-optimized content?","a":"Yes, all our web copy and blog posts are optimized for search engines."},{"q":"Can you help with email marketing?","a":"Absolutely, we write full email sequences and newsletters."}]'),

('custom-apis', 'Custom APIs', 'Plug', '/Services Images/Custom Api.png',
'Robust REST and GraphQL API development for seamless system integrations.',
'Connect your systems and scale your architecture with custom-built APIs. We develop secure, fast, and documented APIs to power your web and mobile applications.',
'["REST APIs","GraphQL APIs","Third-party Integrations","API Documentation","Secure Endpoints"]',
'["Seamless Integration","Scalable Architecture","Secure Data Transfer","Developer Friendly","High Performance"]',
'[{"q":"What technologies do you use for APIs?","a":"We primarily use Node.js, Express, Next.js, and Python."},{"q":"Do you provide API documentation?","a":"Yes, we provide detailed Swagger/OpenAPI documentation."}]'),

('video-editing', 'Video Editing', 'Video', '/Services Images/Video Editing.png',
'Professional video editing, motion graphics, and social media reels.',
'Capture attention with high-quality video content. We edit promotional videos, YouTube content, corporate videos, and short-form reels for TikTok and Instagram.',
'["Promo Videos","Social Media Reels","Motion Graphics","Color Grading","Audio Mixing"]',
'["Higher Engagement","Professional Look","Brand Awareness","Platform Optimized","Quick Turnaround"]',
'[{"q":"Do you edit reels and TikToks?","a":"Yes, we specialize in high-retention short-form content."},{"q":"Can you add motion graphics?","a":"Yes, we can add custom animations, lower thirds, and visual effects."}]'),

('cloud-devops', 'Cloud & DevOps', 'Cloud', '/Services Images/Cloud Dveops.png',
'AWS/Azure architecture, CI/CD pipelines, and server infrastructure scaling.',
'Ensure your applications are always fast and available. We design cloud architectures on AWS and Google Cloud, set up Docker/Kubernetes clusters, and automate deployments with CI/CD pipelines.',
'["Cloud Architecture","CI/CD Pipelines","Docker & Kubernetes","Server Migration","24/7 Monitoring"]',
'["Zero Downtime","Automatic Scaling","Enhanced Security","Cost Optimization","Faster Deployments"]',
'[{"q":"Which cloud providers do you support?","a":"We primarily work with AWS, Google Cloud Platform (GCP), and Vercel."},{"q":"Can you migrate our existing servers?","a":"Yes, we offer complete, zero-downtime server migration services."}]'),

('cybersecurity', 'Cybersecurity', 'Shield', '/Services Images/Cyber Security.png',
'Penetration testing, vulnerability assessments, and secure infrastructure design.',
'Protect your business and your customers data from modern threats. We provide comprehensive security audits, penetration testing, and implementation of secure protocols across your tech stack.',
'["Penetration Testing","Security Audits","Data Encryption","Compliance (GDPR/HIPAA)","Malware Removal"]',
'["Data Protection","Risk Mitigation","Regulatory Compliance","Customer Trust","System Integrity"]',
'[{"q":"Do you offer compliance audits?","a":"Yes, we help ensure your systems are compliant with GDPR, HIPAA, and other standards."},{"q":"What if we have already been hacked?","a":"We offer emergency incident response and malware removal services."}]'),

('qa-testing', 'QA & Testing', 'Search', '/Services Images/QA Testing.png',
'Automated testing, manual QA, performance profiling, and bug tracking.',
'Deliver flawless software to your users. Our QA engineers rigorously test your applications across devices and browsers, finding and fixing edge-case bugs before they reach production.',
'["Automated Testing","Manual Testing","Performance Testing","API Testing","Cross-Browser QA"]',
'["Flawless UX","Fewer Crashes","Faster Load Times","Higher Quality","Cost Savings"]',
'[{"q":"Do you use automated testing tools?","a":"Yes, we use Cypress, Selenium, and Jest for automated test coverage."},{"q":"Can you test an app built by another agency?","a":"Absolutely. We offer independent QA services for existing projects."}]'),

('3d-modeling', '3D Modeling & Animation', 'Monitor', '',
'High-quality 3D models, product rendering, and immersive animations for diverse industries.',
'Bring your ideas to life with our premium 3D modeling and animation services. We create realistic product renderings, architectural visualizations, and custom 3D assets that captivate your audience and elevate your brand''s visual identity.',
'["Product 3D Rendering","Architectural Visualization","Character Modeling","3D Animation & Walkthroughs","Game Assets & Environments"]',
'["Photorealistic Quality","Enhanced Visual Appeal","Faster Prototyping","Cost-Effective Marketing","Engaging User Experience"]',
'[{"q":"What software do you use for 3D?","a":"We use Blender, Cinema 4D, and 3ds Max for modeling, rendering, and animation."},{"q":"Can you create product renders for eCommerce?","a":"Yes, we create photorealistic 3D product renders that are often more cost-effective than traditional photography."}]');


-- ================================================================
-- 6 PORTFOLIO PROJECTS (Original website se)
-- ================================================================
DELETE FROM portfolio;

INSERT INTO portfolio (slug, title, category, featured_image, client, duration, technologies, description, challenge, solution, results, testimonial, live_url) VALUES

('corporate-website-redesign', 'Corporate Website Redesign', 'Web Development',
'/web-dev.png', 'TechVentures Inc.', '4 Weeks',
'["Next.js","Tailwind CSS","MySQL"]',
'A complete website overhaul for a leading tech company, transforming their outdated site into a modern, high-performance platform.',
'The client had a slow, outdated WordPress site that was not mobile-friendly and had poor SEO rankings.',
'We rebuilt the entire site using Next.js for blazing performance, implemented responsive design, and optimized for search engines.',
'Page load time reduced by 70%, organic traffic increased by 45%, and bounce rate dropped by 30%.',
'Luma Softs completely transformed our web presence. The new site is fast, modern, and our clients love it.',
'#'),

('ecommerce-fashion-store', 'Fashion eCommerce Platform', 'eCommerce',
'/web-dev.png', 'StyleHub', '6 Weeks',
'["Shopify","Custom Theme","Stripe"]',
'A premium Shopify store for a fashion brand with custom product pages, dynamic filters, and integrated payment solutions.',
'The brand needed an online store that reflected their premium image while supporting high traffic during sales events.',
'Custom Shopify theme with optimized product pages, integrated Stripe payments, and a scalable infrastructure.',
'Revenue increased by 120% in the first quarter. Cart abandonment reduced by 25%.',
'The store looks amazing and works flawlessly. Sales are through the roof!',
'#'),

('ai-customer-support-bot', 'AI Customer Support Bot', 'AI Solutions',
'/ai-software.png', 'ServiceFirst', '3 Weeks',
'["Gemini AI","Next.js","Node.js"]',
'An intelligent chatbot that handles customer inquiries 24/7, reducing support ticket volume and response times.',
'The client was overwhelmed with repetitive customer queries, leading to slow response times and unhappy customers.',
'Built a custom AI chatbot using Gemini AI that understands context, answers FAQs, and escalates complex issues to human agents.',
'Support ticket volume reduced by 60%. Average response time went from 4 hours to under 30 seconds.',
'This bot handles 60% of our queries automatically. It has been a game changer for our support team.',
'#'),

('fintech-mobile-app', 'FinTech Mobile Application', 'Mobile Apps',
'/ai-software.png', 'PayQuick', '10 Weeks',
'["React Native","Node.js","PostgreSQL"]',
'A cross-platform mobile banking app with secure transactions, real-time notifications, and biometric authentication.',
'Building a secure, user-friendly financial application that works seamlessly on both Android and iOS.',
'Developed with React Native for cross-platform consistency, implemented bank-grade security, and integrated real-time push notifications.',
'50K+ downloads in the first month. 4.8-star rating on both app stores.',
'The app exceeded our expectations in both design and functionality. Our users love it.',
'#'),

('brand-identity-startup', 'Complete Brand Identity', 'Graphic Design',
'/ui-ux.png', 'GreenLeaf Organics', '2 Weeks',
'["Adobe Illustrator","Photoshop","Figma"]',
'A full branding package including logo, color palette, typography, stationery, and social media kit for an organic food startup.',
'A new startup needed a complete brand identity that conveys trust, nature, and premium quality.',
'Created a comprehensive brand identity system with a nature-inspired logo, earthy color palette, and consistent visual language across all touchpoints.',
'Brand recognition increased significantly. The client launched with a cohesive, professional image from day one.',
'They captured our brand''s essence perfectly. Every piece of collateral looks world-class.',
'#'),

('saas-dashboard-design', 'SaaS Dashboard UI/UX', 'UI/UX Design',
'/ui-ux.png', 'DataPulse Analytics', '5 Weeks',
'["Figma","React","D3.js"]',
'A comprehensive analytics dashboard design with interactive data visualizations, dark mode, and responsive layouts.',
'Complex data needed to be presented in an intuitive, actionable format for non-technical users.',
'Designed a clean, modern dashboard with interactive charts, customizable widgets, and a seamless dark mode experience.',
'User engagement increased by 80%. Average session duration doubled. Client onboarding time reduced by 40%.',
'The dashboard is beautiful and our users can finally make sense of their data without training.',
'#');


-- ================================================================
-- REVIEWS (Pehle wali site me reviews database se aate the)
-- Ye 3 sample reviews hain - aap admin panel se real wale add karein
-- ================================================================
DELETE FROM reviews;

INSERT INTO reviews (name, role, company, rating, text, image, time) VALUES
('Muhammad Usman', 'CEO', 'TechVentures Inc.', 5,
'Luma Softs ne hamare liye ek kamaal ki website banayi. Kaam professional tha aur deadlines pe poora hua. Hum bahut khush hain result se!',
NULL, '2 months ago'),

('Ayesha Malik', 'Marketing Head', 'StyleHub', 5,
'Our eCommerce store is now generating 40% more revenue since Luma Softs redesigned it. Highly professional team with excellent communication throughout.',
NULL, '1 month ago'),

('Tariq Khan', 'Founder', 'ServiceFirst', 5,
'The AI chatbot they built for us handles 60% of our customer queries automatically. Best investment we have made for our business. Absolutely recommend Luma Softs!',
NULL, '3 weeks ago');


-- ================================================================
-- TEAM MEMBERS (Real 4 Members)
-- ================================================================
DELETE FROM team_members;

INSERT INTO team_members (name, role, image_url, details, instagram, linkedin, twitter) VALUES

('Talha Khan', 'Founder', '/talha.jpg',
'Talha Khan is the visionary founder of Luma Softs. With a passion for technology and innovation, he drives the company forward, building world-class digital solutions for clients across the globe.',
NULL, NULL, NULL),

('Mustufa Ali', 'Co-Founder', '/mustafa.jpg',
'Mustufa Ali is the Co-Founder of Luma Softs. He plays a key role in business strategy, client relations, and ensuring every project is delivered with the highest standards of quality.',
NULL, NULL, NULL),

('Arhum Noman', 'Graphic Designer & Developer', NULL,
'Arhum brings creativity and technical skill together. He specializes in graphic design and web development, crafting visually stunning and functionally powerful digital experiences.',
NULL, NULL, NULL),

('Khizar Noman', 'Web Developer & Learner', NULL,
'Khizar is a passionate web developer and continuous learner at Luma Softs. He works on building responsive, modern web applications and is always expanding his skill set in the latest technologies.',
NULL, NULL, NULL);

-- ================================================================
-- DONE! Pura Real Data:
-- Services: 16 | Portfolio: 6 | Reviews: 3 | Team: 4
-- Photos: Talha (/talha.jpg) | Mustafa (/mustafa.jpg)
-- Arham & Khizar ki photos: Admin Panel se upload karein
-- ================================================================
-- EMAIL SUBSCRIBERS
-- ================================================================
CREATE TABLE IF NOT EXISTS email_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_subscribed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- BLOG UPDATES (Add Backlinks & New Markdown Blogs)
-- ================================================================

-- 1. Append Backlinks to all existing blogs
UPDATE blogs 
SET content = CONCAT(content, '\n\n---\n\n> [!TIP]\n> *Need professional help scaling your business online? Explore our [Web Development Services](/services/web-development) or [Contact Us](/contact) today to get a free technical consultation from Luma Softs!*')
WHERE content NOT LIKE '%[Contact Us](/contact)%';

-- 2. Insert 5 New Highly-Formatted Blogs
INSERT IGNORE INTO blogs (slug, title, category, date, description, content) VALUES
('single-page-vs-multi-page-website', 'Single Page vs Multi Page Website — What''s Right for Your Business?', 'Web Design & Development', 'June 19, 2026', 'Trying to decide between a single page or multi-page website for your Pakistani business? Learn the pros and cons of each.', 'When building a website for your business in Karachi or Lahore, you will face a critical choice: **Single Page** or **Multi-Page**?\n\n![Website Design Options](/Services Images/Web development.png)\n\n## What is a Single Page Website?\nA single-page website puts all your information (About, Services, Portfolio, Contact) on one long scrolling page. \n\n**Pros:**\n*   **Fast & Mobile Friendly:** Perfect for mobile users who prefer scrolling over clicking.\n*   **High Conversion:** Guides the user directly to a call-to-action (like a WhatsApp button).\n*   **Cost Effective:** Generally cheaper to design and develop.\n\n## What is a Multi-Page Website?\nA multi-page website has separate pages for each section (e.g., `/about`, `/services`, `/contact`).\n\n**Pros:**\n*   **Better SEO:** You can rank different pages for different keywords on Google.\n*   **Scalable:** You can easily add more services or products later.\n*   **Professional Trust:** Looks more established for large corporations or software houses.\n\n## Which One Should You Choose?\nIf you are a startup, freelancer, or run a single-product campaign, go for a Single Page. If you are a corporate agency or e-commerce store, you absolutely need a Multi-Page site.\n\n---\n\n> [!IMPORTANT]\n> *Still confused? Let our experts guide you. Check out our [Web Development Services](/services/web-development) or [Contact Us](/contact) for a free consultation with Luma Softs!*'),

('seo-vs-paid-ads-pakistan', 'SEO vs Paid Ads — Which Gives Better ROI in Pakistan?', 'SEO & Google Ranking', 'June 19, 2026', 'Should you invest in SEO or run Facebook Ads in Pakistan? We compare the long-term ROI of both strategies.', 'Every business owner in Pakistan wants more customers. But should you spend your budget on **SEO (Search Engine Optimization)** or **Paid Ads (Facebook/Google Ads)**?\n\n![SEO vs Paid Ads](/Services Images/Digital Marketing.png)\n\n## The Truth About Paid Ads\nWhen you run Facebook or Google Ads, you get traffic *instantly*. If you spend Rs. 1000 today, you might get 10 messages today. \n**The Catch:** The moment you stop paying, the traffic stops completely. It''s like renting a shop.\n\n## The Power of SEO\nSEO is the process of ranking your website naturally on Google''s first page. It takes 3 to 6 months to see results.\n**The Benefit:** Once you rank, the traffic is 100% FREE. You don''t pay for clicks. It''s like owning your own shop. \n\n## Which gives Better ROI?\nIn Pakistan, Paid Ads are great for quick sales (e.g., selling clothes on Eid). But for long-term B2B services, real estate, or software development, SEO provides a much higher Return On Investment.\n\n**Pro Strategy:** Use Paid Ads for your first 3 months to generate cash flow, while simultaneously investing in SEO. Once SEO kicks in, reduce your ad spend!\n\n---\n\n> [!TIP]\n> *Ready to dominate Google? Explore our [Digital Marketing Services](/services/digital-marketing) or [Contact Luma Softs](/contact) to start your SEO journey.*'),

('whatsapp-business-marketing-guide', 'How to Use WhatsApp Business to Manage Customers Effectively', 'Social Media & Digital Marketing', 'June 19, 2026', 'Learn how to use WhatsApp Business features like labels, catalogs, and quick replies to increase your sales in Pakistan.', 'In Pakistan, WhatsApp is not just a messaging app; it''s the ultimate sales tool. Over 80% of online shoppers prefer to chat before they buy. Are you using WhatsApp Business to its full potential?\n\n![WhatsApp Marketing](/Services Images/Digital Marketing.png)\n\n## 1. Setup Your Catalog\nStop sending hundreds of pictures to every customer. Use the Catalog feature to upload your products with prices and descriptions. Customers can browse your catalog just like an e-commerce store and add items to their cart directly inside WhatsApp.\n\n## 2. Use Quick Replies\nDo customers always ask for your bank details or delivery charges? Save these as Quick Replies. By typing `/bank`, the entire message will auto-fill, saving you hours of typing.\n\n## 3. Organize with Labels\nWhen you have 50 chats, it''s easy to lose track of who paid and who didn''t. Use labels like "New Customer", "Pending Payment", and "Order Complete" to color-code your chats.\n\n## 4. Integrate AI Chatbots\nIf you receive hundreds of messages a day, a human cannot reply fast enough. Integrating an AI chatbot can answer FAQs and take orders 24/7.\n\n---\n\n> [!IMPORTANT]\n> *Want to automate your customer support? Check out our [AI & Automation Services](/services/ai-automation) or [Contact Us](/contact) to build a custom WhatsApp bot!*'),

('chatgpt-for-business-examples', 'How to Use ChatGPT for Your Business — Practical Examples', 'AI & Technology', 'June 19, 2026', 'Stop wasting time on manual tasks. Learn exactly how Pakistani business owners can use ChatGPT to save time and make money.', 'ChatGPT is everywhere, but most people only use it to write essays. As a business owner, you can use it as your free, personal assistant. Here is how:\n\n![AI Business Solutions](/Services Images/AI automation.png)\n\n## 1. Writing Instagram Captions\nStop staring at a blank screen. Ask ChatGPT:\n*"Write 3 engaging Instagram captions in Roman Urdu for my new collection of men''s shoes. Include relevant hashtags."*\n\n## 2. Drafting Professional Emails\nNeed to reply to an angry client? Ask ChatGPT:\n*"Write a polite and professional email apologizing for a delayed delivery, offering a 5% discount on the next order."*\n\n## 3. Brainstorming Marketing Ideas\nAsk: *"I run a fast-food restaurant in Gulshan-e-Iqbal, Karachi. Give me 5 low-budget marketing ideas to increase weekend sales."*\n\n## 4. Writing Product Descriptions\nGive ChatGPT the basic details of your product, and it will write a persuasive description that sells.\n\nChatGPT is powerful, but custom AI solutions are even better. \n\n---\n\n> [!TIP]\n> *Want AI that is trained specifically on YOUR business data? Explore our [AI Solutions](/services/ai-automation) or [Contact Luma Softs](/contact) today.*'),

('case-study-karachi-small-business-tripled-sales', 'How a Karachi Small Business Tripled Sales With a Website', 'Client Case Studies', 'June 19, 2026', 'Read the success story of how a local retail business in Karachi transformed their operations and tripled their sales online.', 'Many local businesses believe that a physical shop on Tariq Road or Saddar is enough. This case study proves why taking your business online is the ultimate growth hack.\n\n![Case Study](/Services Images/Web development.png)\n\n## The Problem\nA local clothing boutique in Karachi was struggling with stagnant sales. They relied entirely on walk-in customers. They had an Instagram page, but managing DMs was exhausting, and orders were frequently missed.\n\n## The Solution\nWe stepped in and built a highly optimized, mobile-first **[eCommerce Website](/services/ecommerce-development)**. \n1.  **Inventory Management:** The website synced their stock automatically.\n2.  **Payment Gateway:** Integrated JazzCash and EasyPaisa for seamless local payments.\n3.  **WhatsApp Integration:** A floating WhatsApp button allowed instant customer support without cluttering DMs.\n\n## The Results\nWithin 3 months, the boutique saw incredible growth:\n*   **Sales Tripled:** They started getting orders from Lahore, Islamabad, and even the UAE.\n*   **Time Saved:** No more manually sending pictures to customers. They just shared website links.\n*   **Professional Image:** Customers trusted them more because they had a proper `.pk` domain.\n\n---\n\n> [!IMPORTANT]\n> *Ready to write your own success story? Explore our [Web Development Services](/services/web-development) or [Contact Us](/contact) to transform your business today!*');
