import { NextResponse } from 'next/server'
import { getProductsByPage } from '@/lib/actions/sitemap.actions'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page: string }> } // ✅ Promise
) {
//   console.log('🔥 产品 sitemap 被访问')

  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    'http://localhost:3000'

  // ✅ 关键修复
  const { page } = await params

  const pageNumber = Number(page)
  const pageSize = 5000

  // ✅ 防御
  if (isNaN(pageNumber) || pageNumber < 1) {
    return new NextResponse('Invalid page', { status: 400 })
  }

  const products = await getProductsByPage(pageNumber, pageSize)

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  for (const product of products) {
    xml += `
    <url>
      <loc>${baseUrl}/product/${product.slug}</loc>
      <lastmod>${product.updatedAt.toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `
  }

  xml += `</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}