import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 添加这 3 行
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_ir2MwRYOu0Ue@ep-spring-cherry-ahpvvxhw-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
};

export default nextConfig;