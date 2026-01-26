// app/debug/session/page.tsx
import { auth } from '@/auth';
import { cookies } from 'next/headers';

export default async function SessionDebugPage() {
  const session = await auth();
  const cookieStore = await cookies();
  
  // 获取所有可能的 auth cookies
  const authCookies = [
    '__Secure-next-auth.session-token',
    'next-auth.session-token',
    'next-auth.csrf-token',
    'next-auth.callback-url',
  ].map(name => ({
    name,
    value: cookieStore.get(name)?.value || '(not found)',
    exists: !!cookieStore.get(name),
  }));
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Session Debug</h1>
      
      <h2>Auth Session:</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      
      <h2>Auth Cookies:</h2>
      <ul>
        {authCookies.map(cookie => (
          <li key={cookie.name}>
            <strong>{cookie.name}:</strong> {cookie.exists ? '✓ Exists' : '✗ Not found'}
            {cookie.exists && cookie.value !== '(not found)' && (
              <span> (length: {cookie.value.length})</span>
            )}
          </li>
        ))}
      </ul>
      
      <h2>测试操作：</h2>
      <div>
        <a href="/api/force-logout" style={{ marginRight: '10px' }}>
          <button>强制登出</button>
        </a>
        <a href="/sign-in">
          <button>去登录页</button>
        </a>
      </div>
      
      <h2>手动登出表单：</h2>
      <form action="/api/auth/signout" method="POST">
        <button type="submit">使用 NextAuth 登出</button>
      </form>
    </div>
  );
}