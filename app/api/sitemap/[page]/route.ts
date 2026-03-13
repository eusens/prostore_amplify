import { NextResponse } from 'next/server'
import { getAllProductSlugs } from '@/lib/actions/sitemap.actions'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page: string }> } // 改成 Promise
) {
  try {
    // 必须 await params
    const { page: pageParam } = await params
    console.log('📄 API sitemap 请求页码:', pageParam)
    
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.2000-watt-inverter.com'
    const page = parseInt(pageParam)
    
    if (isNaN(page) || page < 1) {
      return new NextResponse('Invalid page number', { status: 400 })
    }
    
    const { products, totalPages } = await getAllProductSlugs(page, 1000)
    
    if (page > totalPages) {
      return new NextResponse('Page not found', { status: 404 })
    }
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${products.map(product => `
  <url>
    <loc>${baseUrl}/product/${product.slug}</loc>
    <lastmod>${new Date(product.updatedAt).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `).join('')}
</urlset>`
    
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('生成 sitemap 失败:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}