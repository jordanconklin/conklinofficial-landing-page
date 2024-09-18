import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the token cookie
  console.log("Logging out...")
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('token', '', { 
    httpOnly: true, 
    expires: new Date(0),
    sameSite: 'strict',
    path: '/'
  });
  
  return response;
}