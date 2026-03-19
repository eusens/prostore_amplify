import { prisma } from '@/lib/prisma'

// ✅ 缓存总数
import { unstable_cache } from 'next/cache'

export const getTotalProductCount = unstable_cache(
  async () => {
    return await prisma.product.count()
  },
  ['product-count'],
  {
    revalidate: 86400,
  }
)

// ✅ 分页获取（优化版）
export async function getProductsByPage(
  page: number,
  pageSize: number = 5000
) {
  try {
    const skip = (page - 1) * pageSize

    // console.log(`📊 查询 page=${page}, skip=${skip}, take=${pageSize}`)

    const products = await prisma.product.findMany({
      select: {
        slug: true,
        createdAt: true,
      },
      orderBy: [
        { createdAt: 'desc' },
        { slug: 'asc' }, // ✅ 防止重复/丢失
      ],
      skip,
      take: pageSize,
    })

    // console.log(`📦 返回 ${products.length} 条`)

    return products.map((p) => ({
      slug: p.slug,
      updatedAt: p.createdAt,
    }))
  } catch  {
    // console.error('❌ 获取产品失败:', error)
    return []
  }
}