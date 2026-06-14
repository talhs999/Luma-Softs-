import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const portfolio = await query('SELECT * FROM portfolio ORDER BY created_at DESC');
    
    // Parse JSON fields
    const parsed = portfolio.map(item => {
      if (typeof item.images === 'string') {
        item.images = JSON.parse(item.images);
      }
      if (typeof item.technologies === 'string') {
        item.technologies = JSON.parse(item.technologies);
      }
      return item;
    });

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio.' }, { status: 500 });
  }
}
