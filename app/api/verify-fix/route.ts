// app/api/verify-fix/route.ts
export const dynamic = 'force-dynamic';

export async function GET() {
  const result = {
    // 测试环境变量
    databaseUrl: process.env.DATABASE_URL ? '✅ 已设置' : '❌ 未设置',
    
    // 如果是 Neon，显示主机信息（不暴露密码）
    databaseHost: process.env.DATABASE_URL 
      ? process.env.DATABASE_URL.split('@')[1]?.split('/')[0] 
      : '未知',
    
    // 环境信息
    nodeEnv: process.env.NODE_ENV || '未设置',
    amplifyRegion: process.env.AWS_REGION || '未知',
    
    // 时间戳
    timestamp: new Date().toISOString(),
    
    // 调试：所有包含 URL 的环境变量
    allUrls: Object.keys(process.env)
      .filter(key => process.env[key]?.includes('://'))
      .map(key => ({ 
        key, 
        hasValue: true,
        valuePreview: process.env[key]!.substring(0, 20) + '...' 
      })),
  };
  
  // 记录到 CloudWatch
  console.log('验证端点被访问:', JSON.stringify(result, null, 2));
  
  return Response.json(result);
}