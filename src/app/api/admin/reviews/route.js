import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const reviews = await query('SELECT * FROM reviews ORDER BY created_at DESC');
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, company, rating, text, image, time } = body;

    if (!name || !text) {
      return NextResponse.json({ error: 'Name and text are required.' }, { status: 400 });
    }

    await query(
      'INSERT INTO reviews (name, role, company, rating, text, image, time) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, role || null, company || null, rating || 5, text, image || null, time || null]
    );

    return NextResponse.json({ success: true, message: 'Review added successfully.' });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'Failed to add review.' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, role, company, rating, text, image, time } = body;

    if (!id || !name || !text) {
      return NextResponse.json({ error: 'ID, Name and text are required.' }, { status: 400 });
    }

    await query(
      'UPDATE reviews SET name = ?, role = ?, company = ?, rating = ?, text = ?, image = ?, time = ? WHERE id = ?',
      [name, role || null, company || null, rating || 5, text, image || null, time || null, id]
    );

    return NextResponse.json({ success: true, message: 'Review updated successfully.' });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required.' }, { status: 400 });
    }

    await query('DELETE FROM reviews WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Review deleted successfully.' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review.' }, { status: 500 });
  }
}
