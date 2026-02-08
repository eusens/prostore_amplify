// app/api/check-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const uploadthingVars = {};
  
  for (const [key, value] of Object.entries(process.env)) {
    if (key.includes('UPLOADTHING')) {
      uploadthingVars[key] = value 
        ? `Set (${key === 'UPLOADTHING_SECRET' ? 'length: ' + value.length : 'value: ' + value.substring(0, 10) + '...'})` 
        : 'Not set';
    }
  }
  
  return NextResponse.json({
    message: 'Environment Variables Check',
    uploadthing: uploadthingVars,
    nodeEnv: process.env.NODE_ENV,
  });
}