import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { STATIC_BLOGS } from '../../../data/blogs';

export async function GET() {
  try {
    const blogs = await query('SELECT slug, title, category, date, description FROM blogs ORDER BY created_at DESC');
    if (Array.isArray(blogs) && blogs.length > 0) {
      return NextResponse.json(blogs);
    }
  } catch (error) {
    console.warn('Error fetching blogs from db, using static fallback:', error.message);
  }

  return NextResponse.json(STATIC_BLOGS.map(({ slug, title, category, date, description }) => ({
    slug, title, category, date, description
  })));
}
