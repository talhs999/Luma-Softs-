import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Protect all /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for valid admin session cookie (set on login)
    const authCookie = request.cookies.get('admin-token') || request.cookies.get('sb-access-token');
    
    // If no valid auth session found, redirect to Home
    if (!authCookie || authCookie.value !== 'authenticated_luma_admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

