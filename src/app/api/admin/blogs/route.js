import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

// Get all blogs for Admin Panel
export async function GET() {
  try {
    const blogs = await query('SELECT * FROM blogs ORDER BY created_at DESC');
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// Delete a blog
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    await query('DELETE FROM blogs WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}

// Update a blog manually
export async function PUT(request) {
  try {
    const { id, title, category, description, content } = await request.json();
    if (!id || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await query(
      'UPDATE blogs SET title = ?, category = ?, description = ?, content = ? WHERE id = ?',
      [title, category, description, content, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}
