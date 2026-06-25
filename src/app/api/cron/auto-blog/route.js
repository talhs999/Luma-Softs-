import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

const SYSTEM_PROMPT = `You are an expert SEO content writer for Luma Softs, a premium digital software agency in Karachi, Pakistan.
Generate a highly engaging, SEO-optimized blog post related to web development, UI/UX, AI chatbots, digital marketing, or e-commerce specifically targeted at Pakistani business owners.

The response MUST be a pure JSON object with the following keys: { "title": "", "slug": "", "category": "", "description": "", "content": "" }

CRITICAL SEO RULES:
1. Title: Must include your main keyword + 'Pakistan' or 'Karachi' + '2026'.
2. First Paragraph: Must directly answer the core topic question (50-80 words) and mention Karachi or Pakistani businesses.
3. H2 Headings Format: Use question-based headings to capture Google AI Overviews (e.g., 'What is X?', 'Why does X matter?', 'How to start X?', 'Common Mistakes').
4. Key Takeaways: Add a 'Key Takeaways' bulleted list right after the first paragraph.
5. Images & Links: You MUST include at least one Markdown image (e.g., ![Image](/Services Images/Web development.png)). You MUST include internal Markdown links to our services (e.g., [Web Development](/services/web-development)).
6. CTA: End the blog with: "Contact Luma Softs — Karachi's top [service] agency. Visit [our services](/services) or [Contact Us](/contact) for a free consultation."

Do NOT wrap the JSON in markdown code blocks like \`\`\`json. Return ONLY raw valid JSON.`;

export async function GET(request) {
  // Allow GET to be triggered by standard cron services easily
  return await handleCron();
}

export async function POST(request) {
  return await handleCron();
}

async function handleCron() {
  try {
    // 1. Check if Auto-Blog is enabled
    const settings = await query("SELECT setting_value FROM app_settings WHERE setting_key = 'auto_blog_enabled'");
    if (settings.length === 0 || settings[0].setting_value !== 'true') {
      return NextResponse.json({ message: 'Auto-blog feature is currently disabled in settings.' }, { status: 200 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is missing");
    }

    // 2. Generate Blog via Gemini
    const payload = {
      contents: [{ role: 'user', parts: [{ text: SYSTEM_PROMPT }] }],
      generationConfig: {
        temperature: 0.7, // Some creativity for blog topics
      }
    };

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from Gemini");
    }

    const data = await response.json();
    let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      throw new Error("Empty response from AI");
    }

    // Clean up potential markdown formatting from AI output
    aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const blogData = JSON.parse(aiText);
    
    // Generate Current Date in Format: Month DD, YYYY
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', dateOptions);

    // 3. Insert into Database
    await query(
      'INSERT INTO blogs (slug, title, category, date, description, content) VALUES (?, ?, ?, ?, ?, ?)',
      [blogData.slug, blogData.title, blogData.category, formattedDate, blogData.description, blogData.content]
    );

    // 4. Delete blogs older than 120 days (4 months)
    // created_at is a TIMESTAMP. We use MySQL INTERVAL logic.
    const deleteResult = await query('DELETE FROM blogs WHERE created_at < NOW() - INTERVAL 120 DAY');

    return NextResponse.json({ 
      success: true, 
      message: 'New blog posted and old blogs pruned.',
      generated_blog: blogData.title,
      deleted_count: deleteResult.affectedRows || 0
    });

  } catch (error) {
    console.error("Auto-blog cron error:", error);
    return NextResponse.json({ error: "Failed to run auto-blog cron script.", details: error.message }, { status: 500 });
  }
}
