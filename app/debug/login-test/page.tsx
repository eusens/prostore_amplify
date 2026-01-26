// app/debug/login-test/page.tsx
'use client';

import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function LoginTestPage() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      setResult(res);
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignOut = async () => {
    setLoading(true);
    try {
      const res = await signOut({ redirect: false });
      setResult(res);
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>登录测试 (客户端)</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleSignIn} disabled={loading}>
          {loading ? '处理中...' : '登录'}
        </button>
        <button onClick={handleSignOut} disabled={loading} style={{ marginLeft: '10px' }}>
          登出
        </button>
      </div>
      
      {result && (
        <div>
          <h2>结果：</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}