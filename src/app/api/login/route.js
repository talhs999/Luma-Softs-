import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Auto-seed: Check if admin_users is empty
    let users = await query('SELECT * FROM admin_users');
    if (users.length === 0) {
      // Seed default admin: admin@lumasofts.com / Admin123!
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('Admin123!', salt);
      await query('INSERT INTO admin_users (email, password_hash) VALUES (?, ?)', ['admin@lumasofts.com', hash]);
      console.log('Default admin user seeded successfully: admin@lumasofts.com / Admin123!');
    }

    // Query the user
    const dbUsers = await query('SELECT * FROM admin_users WHERE email = ?', [email]);
    if (dbUsers.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const user = dbUsers[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Create response and set cookie
    const response = NextResponse.json({ success: true });
    
    // Set cookies for session validation
    const cookieOptions = {
      path: '/',
      httpOnly: false, // Allow client-side script in layout.js to delete it on logout
      maxAge: 86400, // 24 hours
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    };

    response.cookies.set('sb-access-token', 'authenticated_luma_admin', cookieOptions);
    response.cookies.set('admin-token', 'authenticated_luma_admin', { ...cookieOptions, httpOnly: true });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An error occurred during authentication.' }, { status: 500 });
  }
}
