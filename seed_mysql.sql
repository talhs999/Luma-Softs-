-- ================================================================
-- LUMASOFTS - COMPLETE REAL DATA SEED FILE
-- Ye aapki ORIGINAL website ka pura data hai
-- phpMyAdmin: lumasoft_db select karo → SQL tab → paste → Go
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
'[{"q":"Which platform do you recommend?","a":"It depends on your needs — Shopify for simplicity, WooCommerce for flexibility, or custom for full control."},{"q":"Can you integrate payment gateways?","a":"Yes, we integrate Stripe, PayPal, JazzCash, EasyPaisa, and more."}]'),

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
'[{"q":"How many logo concepts do you provide?","a":"We typically provide 3-5 initial concepts with unlimited revisions on the selected design."},{"q":"Can you create a full brand identity?","a":"Yes — logos, color palettes, typography, brand guidelines, stationery, and social media kits."}]'),

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


