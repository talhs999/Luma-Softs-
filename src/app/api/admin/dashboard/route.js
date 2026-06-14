import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    // Run count queries in parallel
    const [portfolioRes, teamRes, messagesRes, recentMessages] = await Promise.all([
      query('SELECT COUNT(*) as count FROM portfolio'),
      query('SELECT COUNT(*) as count FROM team_members'),
      query('SELECT COUNT(*) as count FROM messages'),
      query('SELECT name, created_at FROM messages ORDER BY created_at DESC LIMIT 4')
    ]);

    const stats = {
      portfolio: portfolioRes[0]?.count || 0,
      team: teamRes[0]?.count || 0,
      messages: messagesRes[0]?.count || 0
    };

    return NextResponse.json({ stats, recentMessages });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats.' }, { status: 500 });
  }
}
