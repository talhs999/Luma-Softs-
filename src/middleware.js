import { NextResponse } from 'next/server';

export async function middleware(request) {
  // If the user tries to access /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // For now, we are using a simple cookie check until Supabase SSR is fully configured.
    // When the user logs in via Supabase, we can set a 'sb-access-token' or check Supabase session.
    // If you want a strict redirect to Home for unauthenticated users:
    const authCookie = request.cookies.get('sb-access-token') || request.cookies.get('supabase-auth-token');
    
    // If no valid auth session found, redirect to Home ("/")
    if (!authCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
