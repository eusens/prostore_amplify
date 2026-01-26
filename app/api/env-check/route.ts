// app/api/env-check/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const allEnvVars = {
    // NextAuth 相关
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET 
      ? `SET (length: ${process.env.NEXTAUTH_SECRET.length})` 
      : 'NOT SET',
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET 
      ? `SET (length: ${process.env.NEXT_AUTH_SECRET.length})` 
      : 'NOT SET',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
    
    // 检查所有以 NEXT 开头的变量
    allNextVars: Object.keys(process.env)
      .filter(key => key.startsWith('NEXT'))
      .reduce((obj: any, key) => {
        obj[key] = process.env[key] 
          ? `SET (length: ${process.env[key]?.length})` 
          : 'EMPTY';
        return obj;
      }, {}),
  };
  
  return NextResponse.json(allEnvVars);
}