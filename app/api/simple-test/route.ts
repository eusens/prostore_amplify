// app/api/simple-test/route.ts
export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response(JSON.stringify({
    success: true,
    message: '简单测试',
    databaseUrlExists: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}