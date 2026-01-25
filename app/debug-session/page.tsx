// app/debug-session/page.tsx
import { auth } from "@/auth";

export default async function DebugPage() {
  const session = await auth();
  
  return (
    <div>
      <h1>Session Debug</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h2>Environment Variables</h2>
      <p>NEXTAUTH_URL: {process.env.NEXTAUTH_URL || "未设置"}</p>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
    </div>
  );
}