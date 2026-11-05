import { query } from "../../../lib/db";
import { STATIC_BLOGS } from "../../../data/blogs";
import { ALL_PORTFOLIO } from "../../../data/portfolio";
import { NextResponse } from "next/server";

export async function GET() {
  const blogResults = [];
  const portfolioResults = [];

  // 1. Sync All Blogs
  for (const b of STATIC_BLOGS) {
    try {
      const existing = await query('SELECT id FROM blogs WHERE slug = ?', [b.slug]);
      if (existing.length > 0) {
        await query(
          'UPDATE blogs SET title=?, category=?, date=?, description=?, content=? WHERE slug=?',
          [b.title, b.category, b.date, b.description, b.content, b.slug]
        );
        blogResults.push({ slug: b.slug, status: 'updated' });
      } else {
        await query(
          'INSERT INTO blogs (slug, title, category, date, description, content) VALUES (?, ?, ?, ?, ?, ?)',
          [b.slug, b.title, b.category, b.date, b.description, b.content]
        );
        blogResults.push({ slug: b.slug, status: 'inserted' });
      }
    } catch (err) {
      blogResults.push({ slug: b.slug, error: err.message });
    }
  }

  // 2. Sync Papa Bistro into Portfolio Table
  const papa = ALL_PORTFOLIO.find(p => p.slug === 'papa-bistro-salzburg');
  if (papa) {
    try {
      const existing = await query('SELECT id FROM portfolio WHERE slug = ?', [papa.slug]);
      if (existing.length > 0) {
        await query(
          'UPDATE portfolio SET title=?, category=?, featured_image=?, client=?, duration=?, technologies=?, description=?, challenge=?, solution=?, results=?, testimonial=?, live_url=?, show_on_home=1 WHERE slug=?',
          [
            papa.title,
            papa.category,
            papa.featuredImage,
            papa.client,
            papa.duration,
            JSON.stringify(papa.technologies),
            papa.description,
            papa.challenge,
            papa.solution,
            papa.results,
            papa.testimonial,
            papa.liveUrl,
            papa.slug
          ]
        );
        portfolioResults.push({ slug: papa.slug, status: 'updated' });
      } else {
        await query(
          'INSERT INTO portfolio (slug, title, category, featured_image, client, duration, technologies, description, challenge, solution, results, testimonial, live_url, show_on_home) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)',
          [
            papa.slug,
            papa.title,
            papa.category,
            papa.featuredImage,
            papa.client,
            papa.duration,
            JSON.stringify(papa.technologies),
            papa.description,
            papa.challenge,
            papa.solution,
            papa.results,
            papa.testimonial,
            papa.liveUrl
          ]
        );
        portfolioResults.push({ slug: papa.slug, status: 'inserted' });
      }
    } catch (err) {
      portfolioResults.push({ slug: papa.slug, error: err.message });
    }
  }

  return NextResponse.json({
    message: "Sync completed successfully!",
    blogs: blogResults,
    portfolio: portfolioResults
  });
}
