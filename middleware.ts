// middleware.ts - 不使用 auth() 的版本
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. 定义需要登录的保护路由
  const protectedPaths = [
    /^\/shipping-address(\/|$)/,
    /^\/payment-method(\/|$)/,
    /^\/place-order(\/|$)/,
    /^\/profile(\/|$)/,
    /^\/user\//,
    /^\/order\//,
    /^\/admin(\/|$)/,
  ];
  
  // 2. 检查是否为保护路径
  const isProtectedPath = protectedPaths.some((pattern) => pattern.test(pathname));
  
  // 3. 如果是保护路径，检查登录状态
  if (isProtectedPath) {
    // 方法A：检查 NextAuth session token cookie
    const authToken = request.cookies.get('next-auth.session-token')?.value || 
                     request.cookies.get('__Secure-next-auth.session-token')?.value;
    
    // 方法B：或者检查是否有 session cookie
    const hasAuthSession = !!authToken;
    
    if (!hasAuthSession) {
      // 未登录，重定向到登录页
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(signInUrl);
    }
  }
  
  // 4. 购物车Cookie逻辑
  const sessionCartId = request.cookies.get('sessionCartId')?.value;
  
  if (!sessionCartId) {
    const newSessionCartId = crypto.randomUUID();
    
    const response = NextResponse.next();
    const isProduction = process.env.NODE_ENV === 'production';
    
    response.cookies.set('sessionCartId', newSessionCartId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};