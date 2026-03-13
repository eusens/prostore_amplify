import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // 从环境变量获取基础URL，如果没有则使用默认值
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://2000-watt-inverter.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart',
          '/checkout',
          '/account/*',
          '/admin/*',
          // 如果需要，可以取消注释这些
          // '/*?sort=*',
          // '/*?filter=*',
          // '/*?page=*',
        ],
      },
      // 可以针对特定爬虫设置不同规则
      // {
      //   userAgent: 'Googlebot',
      //   allow: '/',
      //   disallow: ['/admin/*'],
      // },
      // {
      //   userAgent: ['Bingbot', 'Slurp'],
      //   disallow: ['/'],
      // },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}