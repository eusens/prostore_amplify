import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 添加这 3 行
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;