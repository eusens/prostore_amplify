import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { unstable_cache } from 'next/cache'

const getStaticSitemap = unstable_cache(
  async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.2000-watt-inverter.com'
    const dateFallback = new Date().toISOString()

    const staticPages: ISitemapField[] = [
      {
        loc: baseUrl,
        lastmod: dateFallback,
        changefreq: 'yearly',  // 这些是预定义的值
        priority: 1.0,
      },
      {
        loc: `${baseUrl}/search`,
        lastmod: dateFallback,
        changefreq: 'weekly',   // 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
        priority: 0.8,
      },
    ]

    return staticPages
  },
  ['static-sitemap'],
  {
    tags: ['static-sitemap'],
    revalidate: 86400,
  }
)

export async function GET() {
  const sitemap = await getStaticSitemap()
  return getServerSideSitemap(sitemap)
}