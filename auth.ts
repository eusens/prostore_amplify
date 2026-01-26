/* eslint-disable @typescript-eslint/no-explicit-any */
// auth.ts - 不依赖 NODE_ENV 的版本
import { compareSync } from 'bcrypt-ts-edge';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/lib/prisma';

// 直接从 NEXTAUTH_URL 判断环境
const isProduction = process.env.NEXTAUTH_URL?.includes('https://') || false;

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: false, // 生产环境关闭 debug
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
        secure: isProduction, // 根据 URL 判断
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
  trustHost: true,
});