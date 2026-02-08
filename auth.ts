/* eslint-disable @typescript-eslint/no-explicit-any */
// auth.ts - 使用环境变量版本
import { compareSync } from 'bcrypt-ts-edge';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/lib/prisma';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const isProduction = process.env.NEXTAUTH_URL?.includes('https://') || false;

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: !isProduction,
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: isProduction 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction,
      },
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          
          if (user && user.password && compareSync(credentials.password, user.password)) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name; // 确保从 token 中获取 name
      return session;
    },
    
    async jwt({ token, user, trigger, session }: any) {
      // 初始登录时设置 user 数据
      if (user) {
        token.role = user.role;
        token.name = user.name;
        
        // 用户登录时合并购物车（添加这部分）
        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get('sessionCartId')?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });

            if (sessionCart) {
              // 删除用户现有的购物车
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              });

              // 将 session 购物车分配给用户
              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: { userId: user.id },
              });
            }
          }
        }
      }
      
      // 处理 session 更新（例如名称更改）
      if (session?.user?.name && trigger === 'update') {
        token.name = session.user.name;
      }
      
      return token;
    },
    
    authorized({ request, auth }: any) {
      // Check for cart cookie
      const sessionCartId = request.cookies.get('sessionCartId')?.value;
      
      if (!sessionCartId) {
        // Generate cart cookie
        const newSessionCartId = crypto.randomUUID(); 
    
        // Create a new response
        const response = NextResponse.next();
    
        // Set the newly generated sessionCartId in the response cookies
        response.cookies.set({
          name: 'sessionCartId',
          value: newSessionCartId,
          httpOnly: true,
          secure: isProduction,
          sameSite: 'lax',
          path: '/',
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
    
        // Return the response with the sessionCartId set
        return response;
      } else {
        return true;
      }
    },
  },
  trustHost: true,
});