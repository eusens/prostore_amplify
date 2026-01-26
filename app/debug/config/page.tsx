// app/debug/config/page.tsx
export default async function ConfigPage() {
    const env = {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
      BASE_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    };
    
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>生产环境配置检查</h1>
        <pre>{JSON.stringify(env, null, 2)}</pre>
        <p>当前时间: {new Date().toISOString()}</p>
      </div>
    );
  }