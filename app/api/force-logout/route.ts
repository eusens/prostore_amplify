// app/api/force-logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(
    new URL('/', process.env.NEXTAUTH_URL)
  );
  
  // 清除所有可能的 auth cookies
  const cookies = [
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    'next-auth.csrf-token',
    'next-auth.callback-url',
    'next-auth.session-token.0',
    'next-auth.session-token.1',
  ];
  
  cookies.forEach(cookie => {
    response.cookies.delete(cookie);
  });
  
  return response;
}