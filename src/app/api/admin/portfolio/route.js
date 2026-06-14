import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const projects = await query('SELECT * FROM portfolio ORDER BY created_at DESC');
    const parsed = projects.map(item => {
      if (typeof item.technologies === 'string') {
        item.technologies = JSON.parse(item.technologies);
      }
      return item;
    });
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error fetching admin portfolio:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title, slug, category, featured_image, client, duration,
      technologies, description, challenge, solution, results, testimonial, live_url
    } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Title, slug and category are required.' }, { status: 400 });
    }

    await query(
      `INSERT INTO portfolio (
        title, slug, category, featured_image, client, duration,
        technologies, description, challenge, solution, results, testimonial, live_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        category,
        featured_image || null,
        client || null,
        duration || null,
        JSON.stringify(technologies || []),
        description || null,
        challenge || null,
        solution || null,
        results || null,
        testimonial || null,
        live_url || null
      ]
    );

    return NextResponse.json({ success: true, message: 'Project added successfully.' });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project.' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      id, title, slug, category, featured_image, client, duration,
      technologies, description, challenge, solution, results, testimonial, live_url
    } = body;

    if (!id || !title || !slug || !category) {
      return NextResponse.json({ error: 'ID, Title, slug and category are required.' }, { status: 400 });
    }

    await query(
      `UPDATE portfolio SET 
        title = ?, slug = ?, category = ?, featured_image = ?, client = ?, duration = ?,
        technologies = ?, description = ?, challenge = ?, solution = ?, results = ?, testimonial = ?, live_url = ?
      WHERE id = ?`,
      [
        title,
        slug,
        category,
        featured_image || null,
        client || null,
        duration || null,
        JSON.stringify(technologies || []),
        description || null,
        challenge || null,
        solution || null,
        results || null,
        testimonial || null,
        live_url || null,
        id
      ]
    );

    return NextResponse.json({ success: true, message: 'Project updated successfully.' });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    await query('DELETE FROM portfolio WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project.' }, { status: 500 });
  }
}
