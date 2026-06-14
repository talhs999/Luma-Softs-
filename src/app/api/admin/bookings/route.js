import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const bookings = await query('SELECT * FROM bookings ORDER BY created_at DESC');
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required.' }, { status: 400 });
    }

    await query('DELETE FROM bookings WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Booking deleted successfully.' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking.' }, { status: 500 });
  }
}
