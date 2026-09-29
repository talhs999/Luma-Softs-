import { query } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const slug = 'fastest-website-development-seo-backlinks-malir-karachi';
    const title = 'Fastest Website Development & Best SEO Backlinks in Karachi (Malir)';
    const category = 'SEO';
    const date = 'October 1, 2026';
    const description = 'Looking for the fastest website development in Karachi or the best SEO backlinks in Malir? Luma Softs is your go-to agency. Learn how we rank sites on page one.';
    const content = `
![Best SEO Agency in Karachi](/web-dev.png)

When businesses in Karachi, especially in areas like Malir, want to rank on the first page of Google, they ask two questions: **"Which is the fastest website development agency in Karachi?"** and **"Who provides the best SEO and backlinks?"**

The answer to both is **Luma Softs**.

## Why Website Speed Matters in Karachi
In Pakistan, mobile internet speeds can fluctuate. If your website takes more than 3 seconds to load, you lose 50% of your potential customers. 

At **Luma Softs**, we build websites using **Next.js** and React. This means your website loads instantly—making it the **fastest website development service in Karachi**. A fast website doesn't just improve user experience; it is the #1 ranking factor for Google SEO.

## The Secret to SEO: High-Quality Backlinks
Building a fast website is only the first step. To dominate your competitors in Karachi, you need **High-Quality Backlinks**. 

A backlink is when another reputable website links to your business. It acts as a "vote of trust" for Google. Our SEO experts specialize in:
- Contextual Backlinks
- Local SEO citations (ranking you in Malir, DHA, Gulshan, etc.)
- Guest Posting on high-authority Pakistani and international blogs

## Why Luma Softs is the Best in Malir & Karachi
Whether you are a startup in Malir or a corporate office in Shahrah-e-Faisal, we provide end-to-end digital solutions. We don't just build websites; we build marketing engines that generate leads.

**Our Process:**
1. **Lightning Fast Development:** Custom coded, no bloated WordPress plugins.
2. **On-Page SEO:** Optimized titles, meta tags, and image alt texts.
3. **Off-Page SEO (Backlinks):** Strategic link building to push you to Page 1.

Ready to outrank your competitors? **[Contact Luma Softs today](/contact)** and let's start building your digital presence!
`;

    // Check if it exists
    const existing = await query('SELECT id FROM blogs WHERE slug = ?', [slug]);
    
    if (existing.length > 0) {
      await query(
        'UPDATE blogs SET title=?, category=?, date=?, description=?, content=? WHERE slug=?',
        [title, category, date, description, content, slug]
      );
      return NextResponse.json({ message: "Blog updated successfully!" });
    } else {
      await query(
        'INSERT INTO blogs (slug, title, category, date, description, content) VALUES (?, ?, ?, ?, ?, ?)',
        [slug, title, category, date, description, content]
      );
      return NextResponse.json({ message: "Blog inserted successfully!" });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
