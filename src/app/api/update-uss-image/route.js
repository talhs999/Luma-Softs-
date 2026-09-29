import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    await query(`
      UPDATE portfolio 
      SET featured_image = '/web-dev.png' 
      WHERE slug = 'united-strategic-solutions'
    `);
    return NextResponse.json({ success: true, message: "Image updated to a high-quality placeholder!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
