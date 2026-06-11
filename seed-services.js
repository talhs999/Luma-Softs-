const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  'https://wydrxumwpfgpkugyyrrw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5ZHJ4dW13cGZncGt1Z3l5cnJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDc2ODA2NCwiZXhwIjoyMDk2MzQ0MDY0fQ.M4OtvFuJj9sgFD7n7timSdr1eUzMxGxneym30OrsnJU'
);

const ALL_SERVICES = [
  {
    slug: "web-development",
    icon: "Monitor",
    title: "Web Development",
    image: "/Services Images/Web development.png",
    short_desc: "Custom websites, landing pages, business sites, and portfolio websites built with modern frameworks.",
    long_desc: "We design and develop high-performance websites that look stunning and drive results. Whether you need a simple landing page or a complex corporate website, our team delivers pixel-perfect solutions using Next.js, React, and modern web standards.",
    features: ["Custom Websites", "Business Websites", "Corporate Websites", "Landing Pages", "Portfolio Websites"],
    benefits: ["Fast Loading Speed", "SEO Optimized", "Mobile Responsive", "Modern Design", "Easy to Manage"],
    faq: [
      { q: "How long does it take to build a website?", a: "Typically 2-4 weeks depending on complexity." },
      { q: "Do you provide hosting?", a: "Yes, we can help set up hosting on platforms like Vercel, AWS, or your preferred provider." },
    ],
  },
  {
    slug: "ecommerce-development",
    icon: "ShoppingCart",
    title: "eCommerce Development",
    image: "/Services Images/Ecomerce development.png",
    short_desc: "WooCommerce, Shopify, and custom online stores with payment integration and checkout optimization.",
    long_desc: "Launch your online store with a platform that converts visitors into customers. We build beautiful, fast, and secure eCommerce solutions with seamless payment gateways and inventory management.",
    features: ["WooCommerce Stores", "Shopify Development", "Custom eCommerce", "Payment Integration", "Inventory Management"],
    benefits: ["Higher Conversion Rates", "Secure Payments", "Easy Product Management", "Mobile Shopping", "Analytics Dashboard"],
    faq: [
      { q: "Which platform do you recommend?", a: "It depends on your needs — Shopify for simplicity, WooCommerce for flexibility, or custom for full control." },
      { q: "Can you integrate payment gateways?", a: "Yes, we integrate Stripe, PayPal, JazzCash, EasyPaisa, and more." },
    ],
  },
  {
    slug: "wordpress-development",
    icon: "FileText",
    title: "WordPress Development",
    image: "/Services Images/Wordpress Development.png",
    short_desc: "Custom WordPress themes, plugins, and fully managed WordPress websites for businesses and blogs.",
    long_desc: "Harness the power of the world's most popular CMS. We build fast, secure, and custom WordPress websites tailored to your exact needs, including theme development, plugin integration, and performance optimization.",
    features: ["Custom Theme Development", "Plugin Integration", "Speed Optimization", "Security Setup", "Ongoing Maintenance"],
    benefits: ["Easy Content Management", "Highly Customizable", "SEO Friendly", "Secure & Reliable", "Mobile Responsive"],
    faq: [
      { q: "Can you design a custom theme for my brand?", a: "Yes, we design and develop custom WordPress themes from scratch to match your brand identity perfectly." },
      { q: "Do you offer maintenance services?", a: "We provide complete ongoing maintenance, security updates, and backups for WordPress websites." },
    ],
  },
  {
    slug: "software-development",
    icon: "Settings",
    title: "Software Development",
    image: "/Services Images/Software development.png",
    short_desc: "Custom CRM, ERP systems, management tools, and SaaS applications built for your business needs.",
    long_desc: "We build robust, scalable software that streamlines your operations. From CRM and ERP systems to complete SaaS platforms, we architect solutions that grow with your business.",
    features: ["Custom CRM", "ERP Systems", "Management Systems", "SaaS Applications", "API Development"],
    benefits: ["Streamlined Operations", "Data-Driven Decisions", "Scalable Architecture", "Custom Workflows", "Cloud-Based"],
    faq: [
      { q: "Can you build a custom CRM?", a: "Absolutely. We build tailored CRM solutions that fit your exact business workflow." },
      { q: "What technologies do you use?", a: "Node.js, Next.js, PostgreSQL, Supabase, and cloud platforms like AWS." },
    ],
  },
  {
    slug: "mobile-app-development",
    icon: "Smartphone",
    title: "Mobile App Development",
    image: "/Services Images/Mobile development.png",
    short_desc: "Native and cross-platform Android & iOS mobile applications with intuitive user experiences.",
    long_desc: "Reach your audience on every device with professionally crafted mobile applications. We build native Android, iOS, and cross-platform apps using React Native and Flutter.",
    features: ["Android Apps", "iOS Apps", "Cross-Platform Apps", "App Store Deployment", "Push Notifications"],
    benefits: ["Native Performance", "Offline Capability", "Intuitive UX", "App Store Ready", "Ongoing Support"],
    faq: [
      { q: "Do you build for both Android and iOS?", a: "Yes, we build native apps for each platform or cross-platform apps that work on both." },
      { q: "How long does app development take?", a: "Typically 6-12 weeks depending on features and complexity." },
    ],
  },
  {
    slug: "ui-ux-design",
    icon: "Target",
    title: "UI/UX Design",
    image: "/Services Images/UIUX design.png",
    short_desc: "Web and mobile UI design, wireframes, prototypes, and user experience optimization.",
    long_desc: "Great products start with great design. We create intuitive, visually stunning interfaces that users love, backed by research-driven UX principles and modern design systems.",
    features: ["Web UI Design", "Mobile UI Design", "Wireframes", "Prototypes", "Design Systems"],
    benefits: ["Better User Retention", "Consistent Branding", "Accessibility", "Faster Development", "Data-Driven Design"],
    faq: [
      { q: "What tools do you use?", a: "We use Figma for design and prototyping, along with Adobe Creative Suite." },
      { q: "Do you conduct user research?", a: "Yes, we can conduct user interviews, surveys, and usability testing." },
    ],
  },
  {
    slug: "graphic-design",
    icon: "Brush",
    title: "Graphic Design",
    image: "/Services Images/Graphic design.png",
    short_desc: "Logo design, brand identity, social media graphics, and professional marketing materials.",
    long_desc: "Make a lasting impression with professional graphic design. From logos and brand identity to social media content and marketing collateral, we create visuals that communicate your brand story.",
    features: ["Logo Design", "Brand Identity", "Social Media Design", "Marketing Materials", "Print Design"],
    benefits: ["Professional Branding", "Consistent Identity", "Higher Engagement", "Print & Digital Ready", "Quick Turnaround"],
    faq: [
      { q: "How many logo concepts do you provide?", a: "We typically provide 3-5 initial concepts with unlimited revisions on the selected design." },
      { q: "Can you create a full brand identity?", a: "Yes — logos, color palettes, typography, brand guidelines, stationery, and social media kits." },
    ],
  },
  {
    slug: "digital-marketing",
    icon: "LineChart",
    title: "Digital Marketing",
    image: "/Services Images/Digital Marketing.png",
    short_desc: "SEO, social media marketing, content marketing, and paid advertising strategies.",
    long_desc: "Grow your online presence and reach more customers with data-driven digital marketing. We create and execute strategies across SEO, social media, content, and paid advertising.",
    features: ["SEO Optimization", "Social Media Marketing", "Content Marketing", "Paid Advertising", "Analytics & Reporting"],
    benefits: ["Increased Traffic", "Better ROI", "Brand Awareness", "Lead Generation", "Measurable Results"],
    faq: [
      { q: "How long before I see results from SEO?", a: "SEO typically shows meaningful results within 3-6 months of consistent effort." },
      { q: "Do you manage social media accounts?", a: "Yes, we offer full social media management including content creation, scheduling, and engagement." },
    ],
  },
  {
    slug: "ai-automation",
    icon: "Bot",
    title: "AI & Automation",
    image: "/Services Images/AI automation.png",
    short_desc: "Custom AI chatbots, workflow automation, and intelligent software integration.",
    long_desc: "Leverage the power of AI to automate repetitive tasks and engage customers 24/7. We build custom chatbots, integrate OpenAI APIs, and automate workflows using Zapier and Make.",
    features: ["AI Chatbots", "Workflow Automation", "API Integration", "Data Analysis", "Custom AI Models"],
    benefits: ["24/7 Customer Support", "Reduced Manual Work", "Higher Efficiency", "Scalable Solutions", "Cost Savings"],
    faq: [
      { q: "Can you train AI on my business data?", a: "Yes, we build chatbots trained specifically on your company's documents, website, and data." },
      { q: "What systems can you automate?", a: "We can connect and automate CRM, email marketing, support tickets, and accounting systems." },
    ],
  },
  {
    slug: "copywriting",
    icon: "FileText",
    title: "Copywriting",
    image: "/Services Images/Copy writing.png",
    short_desc: "Persuasive website copy, sales funnels, and SEO-optimized blog posts.",
    long_desc: "Great design needs great words. We write compelling, conversion-focused copy that speaks to your audience and ranks well on search engines.",
    features: ["Website Copy", "Sales Funnels", "SEO Blogs", "Email Campaigns", "Ad Copy"],
    benefits: ["Higher Conversions", "Better SEO", "Clear Brand Voice", "Engaging Content", "More Sales"],
    faq: [
      { q: "Do you write SEO-optimized content?", a: "Yes, all our web copy and blog posts are optimized for search engines." },
      { q: "Can you help with email marketing?", a: "Absolutely, we write full email sequences and newsletters." },
    ],
  },
  {
    slug: "custom-apis",
    icon: "Plug",
    title: "Custom APIs",
    image: "/Services Images/Custom Api.png",
    short_desc: "Robust REST and GraphQL API development for seamless system integrations.",
    long_desc: "Connect your systems and scale your architecture with custom-built APIs. We develop secure, fast, and documented APIs to power your web and mobile applications.",
    features: ["REST APIs", "GraphQL APIs", "Third-party Integrations", "API Documentation", "Secure Endpoints"],
    benefits: ["Seamless Integration", "Scalable Architecture", "Secure Data Transfer", "Developer Friendly", "High Performance"],
    faq: [
      { q: "What technologies do you use for APIs?", a: "We primarily use Node.js, Express, Next.js, and Python." },
      { q: "Do you provide API documentation?", a: "Yes, we provide detailed Swagger/OpenAPI documentation." },
    ],
  },
  {
    slug: "video-editing",
    icon: "Video",
    title: "Video Editing",
    image: "/Services Images/Video Editing.png",
    short_desc: "Professional video editing, motion graphics, and social media reels.",
    long_desc: "Capture attention with high-quality video content. We edit promotional videos, YouTube content, corporate videos, and short-form reels for TikTok and Instagram.",
    features: ["Promo Videos", "Social Media Reels", "Motion Graphics", "Color Grading", "Audio Mixing"],
    benefits: ["Higher Engagement", "Professional Look", "Brand Awareness", "Platform Optimized", "Quick Turnaround"],
    faq: [
      { q: "Do you edit reels and TikToks?", a: "Yes, we specialize in high-retention short-form content." },
      { q: "Can you add motion graphics?", a: "Yes, we can add custom animations, lower thirds, and visual effects." },
    ],
  },
  {
    slug: "cloud-devops",
    icon: "Cloud",
    title: "Cloud & DevOps",
    image: "/Services Images/Cloud Dveops.png",
    short_desc: "AWS/Azure architecture, CI/CD pipelines, and server infrastructure scaling.",
    long_desc: "Ensure your applications are always fast and available. We design cloud architectures on AWS and Google Cloud, set up Docker/Kubernetes clusters, and automate deployments with CI/CD pipelines.",
    features: ["Cloud Architecture", "CI/CD Pipelines", "Docker & Kubernetes", "Server Migration", "24/7 Monitoring"],
    benefits: ["Zero Downtime", "Automatic Scaling", "Enhanced Security", "Cost Optimization", "Faster Deployments"],
    faq: [
      { q: "Which cloud providers do you support?", a: "We primarily work with AWS, Google Cloud Platform (GCP), and Vercel." },
      { q: "Can you migrate our existing servers?", a: "Yes, we offer complete, zero-downtime server migration services." },
    ],
  },
  {
    slug: "cybersecurity",
    icon: "Shield",
    title: "Cybersecurity",
    image: "/Services Images/Cyber Security.png",
    short_desc: "Penetration testing, vulnerability assessments, and secure infrastructure design.",
    long_desc: "Protect your business and your customers' data from modern threats. We provide comprehensive security audits, penetration testing, and implementation of secure protocols across your tech stack.",
    features: ["Penetration Testing", "Security Audits", "Data Encryption", "Compliance (GDPR/HIPAA)", "Malware Removal"],
    benefits: ["Data Protection", "Risk Mitigation", "Regulatory Compliance", "Customer Trust", "System Integrity"],
    faq: [
      { q: "Do you offer compliance audits?", a: "Yes, we help ensure your systems are compliant with GDPR, HIPAA, and other standards." },
      { q: "What if we've already been hacked?", a: "We offer emergency incident response and malware removal services." },
    ],
  },
  {
    slug: "qa-testing",
    icon: "Search",
    title: "QA & Testing",
    image: "/Services Images/QA Testing.png",
    short_desc: "Automated testing, manual QA, performance profiling, and bug tracking.",
    long_desc: "Deliver flawless software to your users. Our QA engineers rigorously test your applications across devices and browsers, finding and fixing edge-case bugs before they reach production.",
    features: ["Automated Testing", "Manual Testing", "Performance Testing", "API Testing", "Cross-Browser QA"],
    benefits: ["Flawless UX", "Fewer Crashes", "Faster Load Times", "Higher Quality", "Cost Savings"],
    faq: [
      { q: "Do you use automated testing tools?", a: "Yes, we use Cypress, Selenium, and Jest for automated test coverage." },
      { q: "Can you test an app built by another agency?", a: "Absolutely. We offer independent QA services for existing projects." },
    ],
  }
];

async function seed() {
  console.log('Clearing existing services...');
  const { error: deleteError } = await supabaseAdmin.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (deleteError) {
    console.log('Error deleting existing services:', deleteError);
  }

  console.log('Inserting new services...');
  const { data, error } = await supabaseAdmin.from('services').insert(ALL_SERVICES);

  if (error) {
    console.error('Error inserting services:', error);
  } else {
    console.log('Services inserted successfully!');
  }
}

seed();
