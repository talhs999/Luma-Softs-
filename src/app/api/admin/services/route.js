import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const services = await query('SELECT * FROM services ORDER BY created_at ASC');
    
    const parsed = services.map(item => {
      if (typeof item.features === 'string') {
        item.features = JSON.parse(item.features);
      }
      if (typeof item.benefits === 'string') {
        item.benefits = JSON.parse(item.benefits);
      }
      if (typeof item.faq === 'string') {
        item.faq = JSON.parse(item.faq);
      }
      return item;
    });

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error fetching admin services:', error);
    return NextResponse.json({ error: 'Failed to fetch services.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, title, icon, image, short_desc, long_desc, features, benefits, faq } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required.' }, { status: 400 });
    }

    await query(
      'INSERT INTO services (slug, title, icon, image, short_desc, long_desc, features, benefits, faq) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        slug,
        title,
        icon || 'Monitor',
        image || null,
        short_desc || null,
        long_desc || null,
        JSON.stringify(features || []),
        JSON.stringify(benefits || []),
        JSON.stringify(faq || [])
      ]
    );

    return NextResponse.json({ success: true, message: 'Service added successfully.' });
  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ error: 'Failed to add service.' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, slug, title, icon, image, short_desc, long_desc, features, benefits, faq } = body;

    if (!id || !slug || !title) {
      return NextResponse.json({ error: 'ID, Slug and title are required.' }, { status: 400 });
    }

    await query(
      'UPDATE services SET slug = ?, title = ?, icon = ?, image = ?, short_desc = ?, long_desc = ?, features = ?, benefits = ?, faq = ? WHERE id = ?',
      [
        slug,
        title,
        icon || 'Monitor',
        image || null,
        short_desc || null,
        long_desc || null,
        JSON.stringify(features || []),
        JSON.stringify(benefits || []),
        JSON.stringify(faq || []),
        id
      ]
    );

    return NextResponse.json({ success: true, message: 'Service updated successfully.' });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required.' }, { status: 400 });
    }

    await query('DELETE FROM services WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service.' }, { status: 500 });
  }
}
