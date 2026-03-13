import type { MetadataRoute } from 'next'
import { getTotalProductPages } from '@/lib/actions/sitemap.actions'

export const revalidate = 86400 // 24小时重新生成

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.2000-watt-inverter.com'
  
  // 获取产品总页数
  const totalPages = await getTotalProductPages(1000)
  console.log('总页数:', totalPages)
  
  // 静态页面
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  // 如果有产品，生成分片索引
  if (totalPages > 0) {
    const productSitemaps = Array.from({ length: totalPages }, (_, i) => ({
      url: `${baseUrl}/api/sitemap/${i + 1}`,
      lastModified: new Date(),
    }))
    return [...staticRoutes, ...productSitemaps]
  }
  
  return staticRoutes
}