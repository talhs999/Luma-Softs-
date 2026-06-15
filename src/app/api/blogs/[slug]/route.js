import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET(request, { params }) {
  try {
    const slug = params.slug;
    const blogs = await query('SELECT * FROM blogs WHERE slug = ?', [slug]);

    if (blogs.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blogs[0]);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
