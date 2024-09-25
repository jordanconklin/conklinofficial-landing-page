import { NextResponse } from 'next/server';
import { TEKK_APP_API_URL } from '../../config';

export const POST = async (request: Request) => {
  console.log('API route hit: /api/login');
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);

    const response = await fetch(`${TEKK_APP_API_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Backend response status:', response.status);
    const data = await response.json();
    console.log('Backend response data:', data);

    if (response.ok) {
      console.log('Login successful');
      const nextResponse = NextResponse.json({ message: 'Login successful' });
      nextResponse.cookies.set('token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/',
      });
      return nextResponse;
    } else {
      console.error('Login failed:', data.error);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}