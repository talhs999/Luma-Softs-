import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { STATIC_BLOGS } from '../../../../data/blogs';

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const blogs = await query('SELECT * FROM blogs WHERE slug = ?', [slug]);

    if (Array.isArray(blogs) && blogs.length > 0) {
      return NextResponse.json(blogs[0]);
    }
  } catch (error) {
    console.warn('Error fetching blog from DB, using fallback:', error.message);
  }

  const staticBlog = STATIC_BLOGS.find(b => b.slug === slug);
  if (staticBlog) {
    return NextResponse.json(staticBlog);
  }

  return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
}
