import { NextResponse } from 'next/server'
import { getTotalProductCount } from '@/lib/actions/sitemap.actions'

export async function GET() {
  const baseUrl = 'http://localhost:3000'
  const pageSize = 5000

  const totalProducts = await getTotalProductCount()
  const totalPages = Math.ceil(totalProducts / pageSize)

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  for (let i = 1; i <= totalPages; i++) {
    xml += `
    <sitemap>
      <loc>${baseUrl}/products-sitemap/${i}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    `
  }

  xml += `</sitemapindex>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}