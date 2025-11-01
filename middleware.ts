import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple password protection for sharing with friends
// Password: whale27
const CORRECT_PASSWORD = 'whale27';

export function middleware(request: NextRequest) {
  // Check if user has valid password cookie
  const passwordCookie = request.cookies.get('whale_access');
  
  // Allow access to login page and API routes
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // If password cookie is valid, allow access
  if (passwordCookie?.value === CORRECT_PASSWORD) {
    return NextResponse.next();
  }
  
  // Otherwise, redirect to login page
  return NextResponse.redirect(new URL('/login', request.url));
}

// Protect all routes except login page and static files
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
