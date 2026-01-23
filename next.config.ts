import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 构建时忽略TypeScript错误
    ignoreBuildErrors: true,
  },
  // 添加这 3 行
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;