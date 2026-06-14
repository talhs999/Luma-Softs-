import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const team = await query('SELECT * FROM team_members ORDER BY created_at ASC');
    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ error: 'Failed to fetch team.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, image_url, details, instagram, linkedin, twitter } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required.' }, { status: 400 });
    }

    await query(
      'INSERT INTO team_members (name, role, image_url, details, instagram, linkedin, twitter) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, role, image_url || null, details || null, instagram || null, linkedin || null, twitter || null]
    );

    return NextResponse.json({ success: true, message: 'Team member added successfully.' });
  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json({ error: 'Failed to add team member.' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, role, image_url, details, instagram, linkedin, twitter } = body;

    if (!id || !name || !role) {
      return NextResponse.json({ error: 'ID, Name and role are required.' }, { status: 400 });
    }

    await query(
      'UPDATE team_members SET name = ?, role = ?, image_url = ?, details = ?, instagram = ?, linkedin = ?, twitter = ? WHERE id = ?',
      [name, role, image_url || null, details || null, instagram || null, linkedin || null, twitter || null, id]
    );

    return NextResponse.json({ success: true, message: 'Team member updated successfully.' });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Failed to update team member.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Team member ID is required.' }, { status: 400 });
    }

    await query('DELETE FROM team_members WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Team member deleted successfully.' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member.' }, { status: 500 });
  }
}
