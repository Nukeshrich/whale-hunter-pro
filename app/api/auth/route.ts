import { NextResponse } from 'next/server';

const CORRECT_PASSWORD = 'whale27';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === CORRECT_PASSWORD) {
      // Create response with success
      const response = NextResponse.json({ success: true });
      
      // Set cookie in response header
      response.cookies.set('whale_access', CORRECT_PASSWORD, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
