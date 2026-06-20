import mysql from 'mysql2/promise';

async function runUpdates() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'lumasoft_db',
    password: 'pak12345lumasofts',
    database: 'lumasoft_db',
  });

  try {
    // 1. Update Existing Blogs
    console.log("Updating existing blogs...");
    const [existingBlogs] = await pool.query('SELECT id, content FROM blogs');
    
    const backlinkSuffix = `\n\n---\n\n> [!TIP]\n> *Need professional help scaling your business online? Explore our [Web Development Services](/services/web-development) or [Contact Us](/contact) today to get a free technical consultation from Luma Softs!*`;

    for (const blog of existingBlogs) {
      if (!blog.content.includes('[Contact Us]')) {
        await pool.query('UPDATE blogs SET content = ? WHERE id = ?', [blog.content + backlinkSuffix, blog.id]);
      }
    }
    console.log(`Updated ${existingBlogs.length} existing blogs with backlinks.`);

    // 2. Insert 5 New Blogs
    console.log("Inserting 5 new blogs...");
    const newBlogs = [
      {
        slug: 'single-page-vs-multi-page-website',
        title: 'Single Page vs Multi Page Website — What\'s Right for Your Business?',
        category: 'Web Design & Development',
        date: 'June 19, 2026',
        description: 'Trying to decide between a single page or multi-page website for your Pakistani business? Learn the pros and cons of each.',
        content: `When building a website for your business in Karachi or Lahore, you will face a critical choice: **Single Page** or **Multi-Page**?

![Website Design Options](/Services Images/Web development.png)

## What is a Single Page Website?
A single-page website puts all your information (About, Services, Portfolio, Contact) on one long scrolling page. 

**Pros:**
*   **Fast & Mobile Friendly:** Perfect for mobile users who prefer scrolling over clicking.
*   **High Conversion:** Guides the user directly to a call-to-action (like a WhatsApp button).
*   **Cost Effective:** Generally cheaper to design and develop.

## What is a Multi-Page Website?
A multi-page website has separate pages for each section (e.g., \`/about\`, \`/services\`, \`/contact\`).

**Pros:**
*   **Better SEO:** You can rank different pages for different keywords on Google.
*   **Scalable:** You can easily add more services or products later.
*   **Professional Trust:** Looks more established for large corporations or software houses.

## Which One Should You Choose?
If you are a startup, freelancer, or run a single-product campaign, go for a Single Page. If you are a corporate agency or e-commerce store, you absolutely need a Multi-Page site.

---

> [!IMPORTANT]
> *Still confused? Let our experts guide you. Check out our [Web Development Services](/services/web-development) or [Contact Us](/contact) for a free consultation with Luma Softs!*`
      },
      {
        slug: 'seo-vs-paid-ads-pakistan',
        title: 'SEO vs Paid Ads — Which Gives Better ROI in Pakistan?',
        category: 'SEO & Google Ranking',
        date: 'June 19, 2026',
        description: 'Should you invest in SEO or run Facebook Ads in Pakistan? We compare the long-term ROI of both strategies.',
        content: `Every business owner in Pakistan wants more customers. But should you spend your budget on **SEO (Search Engine Optimization)** or **Paid Ads (Facebook/Google Ads)**?

![SEO vs Paid Ads](/Services Images/Digital Marketing.png)

## The Truth About Paid Ads
When you run Facebook or Google Ads, you get traffic *instantly*. If you spend Rs. 1000 today, you might get 10 messages today. 
**The Catch:** The moment you stop paying, the traffic stops completely. It's like renting a shop.

## The Power of SEO
SEO is the process of ranking your website naturally on Google's first page. It takes 3 to 6 months to see results.
**The Benefit:** Once you rank, the traffic is 100% FREE. You don't pay for clicks. It's like owning your own shop. 

## Which gives Better ROI?
In Pakistan, Paid Ads are great for quick sales (e.g., selling clothes on Eid). But for long-term B2B services, real estate, or software development, SEO provides a much higher Return On Investment.

**Pro Strategy:** Use Paid Ads for your first 3 months to generate cash flow, while simultaneously investing in SEO. Once SEO kicks in, reduce your ad spend!

---

> [!TIP]
> *Ready to dominate Google? Explore our [Digital Marketing Services](/services/digital-marketing) or [Contact Luma Softs](/contact) to start your SEO journey.*`
      },
      {
        slug: 'whatsapp-business-marketing-guide',
        title: 'How to Use WhatsApp Business to Manage Customers Effectively',
        category: 'Social Media & Digital Marketing',
        date: 'June 19, 2026',
        description: 'Learn how to use WhatsApp Business features like labels, catalogs, and quick replies to increase your sales in Pakistan.',
        content: `In Pakistan, WhatsApp is not just a messaging app; it's the ultimate sales tool. Over 80% of online shoppers prefer to chat before they buy. Are you using WhatsApp Business to its full potential?

![WhatsApp Marketing](/Services Images/Digital Marketing.png)

## 1. Setup Your Catalog
Stop sending hundreds of pictures to every customer. Use the Catalog feature to upload your products with prices and descriptions. Customers can browse your catalog just like an e-commerce store and add items to their cart directly inside WhatsApp.

## 2. Use Quick Replies
Do customers always ask for your bank details or delivery charges? Save these as Quick Replies. By typing \`/bank\`, the entire message will auto-fill, saving you hours of typing.

## 3. Organize with Labels
When you have 50 chats, it's easy to lose track of who paid and who didn't. Use labels like "New Customer", "Pending Payment", and "Order Complete" to color-code your chats.

## 4. Integrate AI Chatbots
If you receive hundreds of messages a day, a human cannot reply fast enough. Integrating an AI chatbot can answer FAQs and take orders 24/7.

---

> [!IMPORTANT]
> *Want to automate your customer support? Check out our [AI & Automation Services](/services/ai-automation) or [Contact Us](/contact) to build a custom WhatsApp bot!*`
      },
      {
        slug: 'chatgpt-for-business-examples',
        title: 'How to Use ChatGPT for Your Business — Practical Examples',
        category: 'AI & Technology',
        date: 'June 19, 2026',
        description: 'Stop wasting time on manual tasks. Learn exactly how Pakistani business owners can use ChatGPT to save time and make money.',
        content: `ChatGPT is everywhere, but most people only use it to write essays. As a business owner, you can use it as your free, personal assistant. Here is how:

![AI Business Solutions](/Services Images/AI automation.png)

## 1. Writing Instagram Captions
Stop staring at a blank screen. Ask ChatGPT:
*"Write 3 engaging Instagram captions in Roman Urdu for my new collection of men's shoes. Include relevant hashtags."*

## 2. Drafting Professional Emails
Need to reply to an angry client? Ask ChatGPT:
*"Write a polite and professional email apologizing for a delayed delivery, offering a 5% discount on the next order."*

## 3. Brainstorming Marketing Ideas
Ask: *"I run a fast-food restaurant in Gulshan-e-Iqbal, Karachi. Give me 5 low-budget marketing ideas to increase weekend sales."*

## 4. Writing Product Descriptions
Give ChatGPT the basic details of your product, and it will write a persuasive description that sells.

ChatGPT is powerful, but custom AI solutions are even better. 

---

> [!TIP]
> *Want AI that is trained specifically on YOUR business data? Explore our [AI Solutions](/services/ai-automation) or [Contact Luma Softs](/contact) today.*`
      },
      {
        slug: 'case-study-karachi-small-business-tripled-sales',
        title: 'How a Karachi Small Business Tripled Sales With a Website',
        category: 'Client Case Studies',
        date: 'June 19, 2026',
        description: 'Read the success story of how a local retail business in Karachi transformed their operations and tripled their sales online.',
        content: `Many local businesses believe that a physical shop on Tariq Road or Saddar is enough. This case study proves why taking your business online is the ultimate growth hack.

![Case Study](/Services Images/Web development.png)

## The Problem
A local clothing boutique in Karachi was struggling with stagnant sales. They relied entirely on walk-in customers. They had an Instagram page, but managing DMs was exhausting, and orders were frequently missed.

## The Solution
We stepped in and built a highly optimized, mobile-first **[eCommerce Website](/services/ecommerce-development)**. 
1.  **Inventory Management:** The website synced their stock automatically.
2.  **Payment Gateway:** Integrated JazzCash and EasyPaisa for seamless local payments.
3.  **WhatsApp Integration:** A floating WhatsApp button allowed instant customer support without cluttering DMs.

## The Results
Within 3 months, the boutique saw incredible growth:
*   **Sales Tripled:** They started getting orders from Lahore, Islamabad, and even the UAE.
*   **Time Saved:** No more manually sending pictures to customers. They just shared website links.
*   **Professional Image:** Customers trusted them more because they had a proper `.pk` domain.

---

> [!IMPORTANT]
> *Ready to write your own success story? Explore our [Web Development Services](/services/web-development) or [Contact Us](/contact) to transform your business today!*`
      }
    ];

    for (const blog of newBlogs) {
      await pool.query(
        'INSERT IGNORE INTO blogs (slug, title, category, date, description, content) VALUES (?, ?, ?, ?, ?, ?)',
        [blog.slug, blog.title, blog.category, blog.date, blog.description, blog.content]
      );
    }
    console.log("Inserted 5 new blogs.");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    pool.end();
  }
}

runUpdates();
