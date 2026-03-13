import { prisma } from '@/lib/prisma'

export async function getAllProductSlugs(page: number = 1, pageSize: number = 1000) {
  try {
    const skip = (page - 1) * pageSize
    
    const products = await prisma.product.findMany({
      select: {
        slug: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: pageSize,
    })
    
    const totalProducts = await prisma.product.count()
    const totalPages = Math.ceil(totalProducts / pageSize)
    
    return {
      products: products.map(p => ({
        slug: p.slug,
        updatedAt: p.createdAt,
      })),
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('获取产品列表失败:', error)
    return { 
      products: [], 
      totalPages: 0, 
      currentPage: page 
    }
  }
}

// ✅ 添加这个导出函数
export async function getTotalProductPages(pageSize: number = 1000) {
  try {
    const totalProducts = await prisma.product.count()
    return Math.ceil(totalProducts / pageSize)
  } catch (error) {
    console.error('获取产品总数失败:', error)
    return 0
  }
}