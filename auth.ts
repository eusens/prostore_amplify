/* eslint-disable @typescript-eslint/no-explicit-any */
// auth.ts - 生产环境修复版
import { compareSync } from 'bcrypt-ts-edge';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/lib/prisma';

// 检测环境
const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = process.env.NEXTAUTH_URL || 
  (isProduction 
    ? 'https://main.doc4i9m2pz32j.amplifyapp.com' 
    : 'http://localhost:3000');

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !isProduction, // 生产环境关闭debug
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  // 🔥 关键修复：生产环境Cookie配置
  cookies: {
    sessionToken: {
      name: isProduction 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction, // 🔥 生产环境必须 true
        // domain: isProduction ? '.amplifyapp.com' : undefined, // 可选
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
      return session;
    },
    
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  // 🔥 关键：生产环境必须设置
  trustHost: true,
  // 🔥 关键：明确设置URL
  basePath: '/api/auth',
  useSecureCookies: isProduction,
});