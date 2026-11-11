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

  // 2. Sync All Projects from ALL_PORTFOLIO into Portfolio Table
  for (const item of ALL_PORTFOLIO) {
    try {
      const existing = await query('SELECT id FROM portfolio WHERE slug = ?', [item.slug]);
      const showHomeVal = item.show_on_home ? 1 : 0;
      if (existing.length > 0) {
        await query(
          'UPDATE portfolio SET title=?, category=?, featured_image=?, client=?, duration=?, technologies=?, description=?, challenge=?, solution=?, results=?, testimonial=?, live_url=?, show_on_home=? WHERE slug=?',
          [
            item.title,
            item.category,
            item.featuredImage,
            item.client,
            item.duration,
            JSON.stringify(item.technologies),
            item.description,
            item.challenge,
            item.solution,
            item.results,
            item.testimonial,
            item.liveUrl,
            showHomeVal,
            item.slug
          ]
        );
        portfolioResults.push({ slug: item.slug, status: 'updated' });
      } else {
        await query(
          'INSERT INTO portfolio (slug, title, category, featured_image, client, duration, technologies, description, challenge, solution, results, testimonial, live_url, show_on_home) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            item.slug,
            item.title,
            item.category,
            item.featuredImage,
            item.client,
            item.duration,
            JSON.stringify(item.technologies),
            item.description,
            item.challenge,
            item.solution,
            item.results,
            item.testimonial,
            item.liveUrl,
            showHomeVal
          ]
        );
        portfolioResults.push({ slug: item.slug, status: 'inserted' });
      }
    } catch (err) {
      portfolioResults.push({ slug: item.slug, error: err.message });
    }
  }

  return NextResponse.json({
    message: "Sync completed successfully!",
    blogs: blogResults,
    portfolio: portfolioResults
  });
}
