import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password for demo access - Luke can change this
const DEMO_PASSWORD = 'sacred27';

export function middleware(request: NextRequest) {
  // Check if password cookie exists and is correct
  const passwordCookie = request.cookies.get('whale_hunter_password');
  
  if (passwordCookie?.value === DEMO_PASSWORD) {
    return NextResponse.next();
  }

  // Check if password is in URL query
  const password = request.nextUrl.searchParams.get('password');
  
  if (password === DEMO_PASSWORD) {
    // Set cookie and redirect to clean URL
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('whale_hunter_password', DEMO_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }

  // If accessing password page, allow it
  if (request.nextUrl.pathname === '/password') {
    return NextResponse.next();
  }

  // Redirect to password page
  return NextResponse.redirect(new URL('/password', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - password (password page itself)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|password).*)',
  ],
};
