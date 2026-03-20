import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductPrice from '@/components/shared/product/product-price';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug, getRelatedProducts } from '@/lib/actions/product.actions';
import { Badge } from '@/components/ui/badge';
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';
import { auth } from '@/auth';
import ReviewList from './review-list';
import ContactBar from '@/components/shared/product/contact-bar';
import IconBoxes from '@/components/icon-boxes';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// ✅ Metadata 修复（必须 await params）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product does not exist.',
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    'https://www.2000-watt-inverter.com';

  const url = `${baseUrl}/product/${product.slug}`;

  return {
    title: `${product.name} | ${product.category} | Industrial Automation Parts`,
    description: product.description
      ? `${product.name} - ${product.description.slice(0, 150)}. Shop ${product.category} industrial automation parts with fast delivery.`
      : `${product.name} - Buy ${product.category} industrial automation parts with fast delivery.`,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: product.name,
      description: product.description,
      url: url,
      siteName: 'IAstore',
      images: product.images?.length
        ? [
            {
              url: product.images[0],
              width: 800,
              height: 800,
              alt: product.name,
            },
          ]
        : [],
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images?.length ? [product.images[0]] : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ 页面组件
const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;
  const cart = await getMyCart();

  const relatedProducts = await getRelatedProducts(product.id, product.category);

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            sku: product.slug,
            brand: {
              "@type": "Brand",
              name: product.brand || "Industrial",
            },
            category: product.category,
            offers: {
              "@type": "Offer",
              url: `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${product.slug}`,
              priceCurrency: "USD",
              price: product.price,
              availability: product.stock > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />

      {/* 面包屑 UI */}
      <nav className="mb-4" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-700 hover:underline">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link
              href={`/search?category=${encodeURIComponent(product.category)}&q=`}
              className="hover:text-gray-700 hover:underline"
            >
              {product.category}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-700 font-medium truncate max-w-[200px]">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* 面包屑 Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.2000-watt-inverter.com'
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": product.category,
                "item": `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.2000-watt-inverter.com'}/search?category=${encodeURIComponent(product.category)}&q=`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.2000-watt-inverter.com'}/product/${product.slug}`
              }
            ]
          })
        }}
      />

      <section>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* 图片区域 */}
          <div className="col-span-2">
            <ProductImages images={product.images || []} />
          </div>

          {/* Details */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>{product.category}</p>

              <h1 className="h3-bold">{product.name}</h1>

              <p>
                {product.rating} of {product.numReviews} reviews
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>

            <div className="mt-10">
              <p>Description:</p>
              <p>{product.brand}</p>
              <p>{product.description}</p>
            </div>
          </div>

          {/* Action */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <ProductPrice value={Number(product.price)} />
                </div>

                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">In stock</Badge>
                  ) : (
                    <Badge variant="destructive">Unavailable</Badge>
                  )}
                </div>

                {product.stock > 0 && (
                  <div className="flex-center">
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: Number(product.price),
                        qty: 1,
                        image: product.images?.[0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-8 space-y-4">
        <ContactBar productName={product.name} />
        <IconBoxes />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="h2-bold mb-5">Related Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`}>
                <Card className="hover:shadow-lg transition">
                  <CardContent className="p-2">
                    {p.images?.[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-48"
                      />
                    )}

                    <p className="mt-2 text-sm">{p.name}</p>
                    <p className="text-green-600">${p.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="mt-10">
        <h2 className="h2-bold mb-5">Customer Reviews</h2>
        <ReviewList
          productId={product.id}
          productSlug={product.slug}
          userId={userId || ''}
        />
      </section>
    </>
  );
};

export default ProductDetailsPage;