// app/api/force-logout/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // 创建重定向响应
    const response = NextResponse.redirect(
      new URL('/', request.url)
    );
    
    // 清除 NextAuth cookies
    const authCookies = [
      '__Secure-next-auth.session-token',
      'next-auth.session-token',
      'next-auth.csrf-token',
      'next-auth.callback-url',
    ];
    
    authCookies.forEach(cookieName => {
      response.cookies.delete(cookieName);
    });
    
    return response;
  } catch (error) {
    console.error('Force logout error:', error);
    
    // 返回简单的重定向，即使清除失败
    return NextResponse.redirect(new URL('/', request.url));
  }
}