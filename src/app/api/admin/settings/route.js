import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const settings = await query('SELECT * FROM app_settings');
    const settingsMap = {};
    settings.forEach(s => {
      settingsMap[s.setting_key] = s.setting_value;
    });
    
    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { setting_key, setting_value } = await request.json();
    
    if (!setting_key || setting_value === undefined) {
      return NextResponse.json({ error: 'Missing key or value' }, { status: 400 });
    }

    // Insert or Update the setting
    await query(
      'INSERT INTO app_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [setting_key, String(setting_value), String(setting_value)]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
