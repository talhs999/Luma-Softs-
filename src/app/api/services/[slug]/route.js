import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const services = await query('SELECT * FROM services WHERE slug = ?', [slug]);

    if (services.length === 0) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    const service = services[0];
    
    // Parse JSON fields since MySQL stores JSON as string in some environments
    if (typeof service.features === 'string') {
      service.features = JSON.parse(service.features);
    }
    if (typeof service.benefits === 'string') {
      service.benefits = JSON.parse(service.benefits);
    }
    if (typeof service.faq === 'string') {
      service.faq = JSON.parse(service.faq);
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Failed to fetch service.' }, { status: 500 });
  }
}
