import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

const SYSTEM_PROMPT = `You are an expert SEO content writer for Luma Softs, a premium digital software agency in Karachi, Pakistan.
Generate a highly engaging, SEO-optimized blog post related to web development, UI/UX, AI chatbots, digital marketing, or e-commerce specifically targeted at Pakistani business owners.
Pick a random trending topic from these fields that hasn't been overused.

The response MUST be a pure JSON object with the following keys:
- title: A catchy title.
- slug: URL friendly slug (e.g., why-ecommerce-is-booming-in-pakistan).
- category: One of: Web Development, SEO, Digital Marketing, AI & Technology, Business Growth.
- description: A short 2-3 sentence meta description.
- content: The full markdown content of the blog post (at least 400 words). Make sure to use proper markdown headings (##), bullet points, and highlight Luma Softs as the best solution at the end. Use a mix of professional English and very natural Roman Urdu phrases where appropriate for the local audience to build trust.

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
